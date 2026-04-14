import { NextRequest, NextResponse } from 'next/server';
import { getFiberyAPI } from '@/lib/fibrey';

export async function POST(request: NextRequest) {
  try {
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
    const FORM_TYPE_NAME = process.env.FIBERY_FORM_TYPE || 'Matic-Contact-Form';
    
    // Convert form data to Fibery entity format
    const entityData: Record<string, any> = {
      'fibery/type': FORM_TYPE_NAME
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
      
      // Add field with Fibery naming convention
      const fiberyFieldName = `${FORM_TYPE_NAME}/${key}`;
      entityData[fiberyFieldName] = value;
    });
    
    // Add metadata from submission
    if (submissionData.timestamp) {
      entityData[`${FORM_TYPE_NAME}/Submission Date`] = submissionData.timestamp;
    }
    if (submissionData.source) {
      entityData[`${FORM_TYPE_NAME}/Source`] = submissionData.source;
    }
    if (submissionData.formType) {
      entityData[`${FORM_TYPE_NAME}/Form Type`] = submissionData.formType;
    }
    
    console.log('🚀 Creating Fibery entity:', FORM_TYPE_NAME);
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
