import { NextRequest, NextResponse } from 'next/server';
import { getFiberyAPI } from '@/lib/fibrey';

export async function POST(request: NextRequest) {
  try {
    // Check if Fibery is configured
    if (!process.env.FIBERY_API_TOKEN || !process.env.FIBERY_ACCOUNT) {
      console.error('❌ Fibery not configured - missing API token or account');
      return NextResponse.json(
        { error: 'Fibery integration not configured' },
        { status: 503 }
      );
    }
    
    const fiberyAPI = getFiberyAPI();
    
    // Handle both JSON and FormData
    const contentType = request.headers.get('content-type');
    let submissionData: Record<string, string | File | null>;
    
    if (contentType?.includes('multipart/form-data')) {
      const formData = await request.formData();
      submissionData = {};
      
      for (const [key, value] of formData.entries()) {
        submissionData[key] = value instanceof File ? value : String(value);
      }
    } else {
      submissionData = await request.json();
    }
    
    console.log('📝 Received submission data:', Object.keys(submissionData));
    
    // Get the form type name - use environment variable or default
    const FORM_TYPE_NAME = process.env.FIBERY_FORM_TYPE || '(XX5678) Matic Site General Task Board/Inbound Requests';
    const FIELD_PREFIX = '(XX5678) Matic Site General Task Board';
    
    // Convert form data to Fibery entity format
    const entityData: Record<string, any> = {};
    
    // Map form fields to Fibery fields with correct naming
    const fieldMapping: Record<string, string> = {
      'Name': `${FIELD_PREFIX}/Name`,
      'Email': `${FIELD_PREFIX}/Work Email`,
      'Phone': `${FIELD_PREFIX}/Phone`,
      'Company': `${FIELD_PREFIX}/Company`,
      'Message': `${FIELD_PREFIX}/Goals`, // Rich text field for message
    };
    
    // Map form fields to Fibery fields
    Object.entries(submissionData).forEach(([key, value]) => {
      // Skip metadata fields and file-related fields
      if (key === 'recaptchaToken' || key === 'timestamp' || key === 'source' || key === 'formType' ||
          key === 'attachment' || key === 'fileName' || key === 'fileSize' || key === 'fileType') {
        return;
      }
      
      // For files, we'll need to handle them differently
      if (value instanceof File) {
        console.log(`📎 File attachment: ${value.name} (${value.size} bytes)`);
        // TODO: Handle file upload to Fibery
        return;
      }
      
      // Map the field name to Fibery field name
      const fiberyFieldName = fieldMapping[key];
      
      // Only add fields that have a mapping (skip unmapped fields)
      if (fiberyFieldName) {
        entityData[fiberyFieldName] = value;
      }
    });
    
    // Note: Type field is a relation field in Fibery, not a text field
    // We would need to look up the entity ID for "New project" or "Something else"
    // Skipping for now - can be added later if needed
    
    // Separate rich text content and form type from entity data
    const goalsContent = entityData[`${FIELD_PREFIX}/Goals`];
    delete entityData[`${FIELD_PREFIX}/Goals`]; // Remove from entity data
    
    const formType = submissionData.formType;
    
    console.log('🚀 Creating Fibery entity in type:', FORM_TYPE_NAME);
    console.log('📋 Entity data:', JSON.stringify(entityData, null, 2));
    
    // Create entity in Fibery (without Goals field)
    const result = await fiberyAPI.createEntity(FORM_TYPE_NAME, entityData);
    const entityId = result['fibery/id'];
    
    console.log('✅ Fibery entity created:', entityId);
    
    // Query the entity to get the Goals field with its secret
    const queryResult = await fiberyAPI.request<any[]>('fibery.entity/query', {
      query: {
        'q/from': FORM_TYPE_NAME,
        'q/select': [
          'fibery/id',
          {
            [`${FIELD_PREFIX}/Goals`]: [
              'fibery/id',
              'Collaboration~Documents/secret'
            ]
          }
        ],
        'q/where': ['=', ['fibery/id'], '$id'],
        'q/limit': 1
      },
      params: {
        '$id': entityId
      }
    });
    
    const entity = queryResult[0];
    
    // Update the Goals rich text field if there's a message
    if (goalsContent && entity?.[`${FIELD_PREFIX}/Goals`]) {
      try {
        const goalsSecret = entity[`${FIELD_PREFIX}/Goals`]['Collaboration~Documents/secret'];
        
        if (goalsSecret) {
          console.log('📝 Updating Goals rich text field...');
          
          // Update the document content
          const docResponse = await fetch(`https://${process.env.FIBERY_ACCOUNT}.fibery.io/api/documents/commands?format=html`, {
            method: 'POST',
            headers: {
              'Authorization': `Token ${process.env.FIBERY_API_TOKEN}`,
              'Content-Type': 'application/json',
            },
            body: JSON.stringify([{
              command: 'create-or-update-documents',
              args: [{
                secret: goalsSecret,
                content: goalsContent
              }]
            }])
          });
          
          if (!docResponse.ok) {
            console.error('Failed to update Goals field:', await docResponse.text());
          } else {
            console.log('✅ Goals field updated');
          }
        }
      } catch (docError) {
        console.error('Error updating Goals field:', docError);
        // Don't fail the whole request if just the Goals update fails
      }
    }
    
    // Update the Type field if provided
    if (formType) {
      try {
        console.log('📝 Looking up Type field option:', formType);
        
        // Query for the Type option entity
        const typeOptions = await fiberyAPI.request<any[]>('fibery.entity/query', {
          query: {
            'q/from': `${FIELD_PREFIX}/Type`,
            'q/select': ['fibery/id', `${FIELD_PREFIX}/Name`],
            'q/where': ['=', [`${FIELD_PREFIX}/Name`], '$typeName'],
            'q/limit': 1
          },
          params: {
            '$typeName': formType
          }
        });
        
        if (typeOptions && typeOptions.length > 0) {
          const typeId = typeOptions[0]['fibery/id'];
          console.log('📝 Updating Type field to:', formType, typeId);
          
          // Update the entity with the Type relation
          await fiberyAPI.request('fibery.entity/update', {
            type: FORM_TYPE_NAME,
            entity: {
              'fibery/id': entityId,
              [`${FIELD_PREFIX}/Type`]: {
                'fibery/id': typeId
              }
            }
          });
          
          console.log('✅ Type field updated');
        } else {
          console.warn('⚠️ Type option not found:', formType);
        }
      } catch (typeError) {
        console.error('Error updating Type field:', typeError);
        // Don't fail the whole request if just the Type update fails
      }
    }
    
    return NextResponse.json({ 
      success: true, 
      id: result['fibery/id'] 
    });
  } catch (error) {
    console.error('❌ Error submitting to Fibery:', error);
    return NextResponse.json(
      { error: 'Failed to submit form', details: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    );
  }
}
