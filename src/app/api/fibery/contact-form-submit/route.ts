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
      // Skip metadata fields that we'll add separately
      if (key === 'recaptchaToken' || key === 'timestamp' || key === 'source' || key === 'formType') {
        return;
      }
      
      // For files, we'll need to handle them differently
      if (value instanceof File) {
        console.log(`📎 File attachment: ${value.name} (${value.size} bytes)`);
        // TODO: Handle file upload to Fibery
        return;
      }
      
      // Map the field name to Fibery field name
      const fiberyFieldName = fieldMapping[key] || `${FIELD_PREFIX}/${key}`;
      
      // Handle rich text fields - Goals field expects rich text format
      if (key === 'Message') {
        // Convert plain text to Fibery rich text format
        entityData[fiberyFieldName] = {
          'format': 'markdown',
          'content': value as string
        };
      } else {
        entityData[fiberyFieldName] = value;
      }
    });
    
    // Add form type metadata if provided (New project / Something else)
    if (submissionData.formType) {
      entityData[`${FIELD_PREFIX}/Type`] = submissionData.formType;
    }
    
    console.log('🚀 Creating Fibery entity in type:', FORM_TYPE_NAME);
    console.log('📋 Entity data:', JSON.stringify(entityData, null, 2));
    
    // Create entity in Fibery
    const result = await fiberyAPI.createEntity(FORM_TYPE_NAME, entityData);
    
    console.log('✅ Fibery entity created:', result['fibery/id']);
    
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
