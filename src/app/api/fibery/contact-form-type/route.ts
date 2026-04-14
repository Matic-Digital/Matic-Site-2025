import { NextResponse } from 'next/server';
import { getFiberyAPI } from '@/lib/fibrey';

export async function GET() {
  try {
    const fiberyAPI = getFiberyAPI();
    
    // Get the form type name from environment
    const FORM_TYPE_NAME = process.env.FIBERY_FORM_TYPE;
    
    if (!FORM_TYPE_NAME) {
      console.log('No FIBERY_FORM_TYPE provided, using fallback form');
      return NextResponse.json(getFallbackForm());
    }
    
    try {
      // Get the type schema directly
      const typeSchema = await fiberyAPI.getType(FORM_TYPE_NAME);
      
      if (!typeSchema) {
        console.log('Type schema not found, using fallback');
        return NextResponse.json(getFallbackForm());
      }
      
      return NextResponse.json({
        'fibery/id': typeSchema['fibery/id'],
        'fibery/name': typeSchema['fibery/name'] || 'Contact Form',
        'fibery/fields': typeSchema['fibery/fields'] || getFallbackForm()['fibery/fields']
      });
      
    } catch (entityError) {
      console.log('Error fetching form type:', entityError);
      return NextResponse.json(getFallbackForm());
    }
    
  } catch (error) {
    console.error('Error fetching Fibery contact form:', error);
    return NextResponse.json(getFallbackForm());
  }
}

function getFallbackForm() {
  return {
    'fibery/id': 'fallback-contact-form',
    'fibery/name': 'Contact Form',
    'fibery/fields': [
      {
        'fibery/id': 'name-field',
        'fibery/name': 'Name',
        'field/type': 'fibery/text',
        'field/meta': {
          'ui/label': 'Full Name',
          'field/required': true
        }
      },
      {
        'fibery/id': 'email-field',
        'fibery/name': 'Email',
        'field/type': 'fibery/email',
        'field/meta': {
          'ui/label': 'Email Address',
          'field/required': true
        }
      },
      {
        'fibery/id': 'phone-field',
        'fibery/name': 'Phone',
        'field/type': 'fibery/phone',
        'field/meta': {
          'ui/label': 'Phone Number',
          'field/required': false
        }
      },
      {
        'fibery/id': 'company-field',
        'fibery/name': 'Company',
        'field/type': 'fibery/text',
        'field/meta': {
          'ui/label': 'Company',
          'field/required': false
        }
      },
      {
        'fibery/id': 'message-field',
        'fibery/name': 'Message',
        'field/type': 'fibery/rich-text',
        'field/meta': {
          'ui/label': 'Message',
          'field/required': true
        }
      }
    ]
  };
}
