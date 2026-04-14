import { NextResponse } from 'next/server';
import { getFiberyAPI } from '@/lib/fibrey';

export async function GET() {
  try {
    const fiberyAPI = getFiberyAPI();
    
    // Use a specific form UUID - you'll need to replace this with your actual form UUID
    const CONTACT_FORM_UUID = process.env.FIBERY_CONTACT_FORM_UUID;
    
    if (!CONTACT_FORM_UUID) {
      console.log('No FIBERY_CONTACT_FORM_UUID provided, using fallback form');
      return NextResponse.json(getFallbackForm());
    }
    
    try {
      // Get the specific form entity by UUID
      const formEntity = await fiberyAPI.queryEntities({
        'q/from': 'fibery/entity',
        'q/select': [
          'fibery/id',
          'fibery/name',
          'fibery/type',
          // Add any custom fields you want to retrieve
        ],
        'q/where': ['=', ['fibery/id'], CONTACT_FORM_UUID],
        'q/limit': 1
      });
      
      if (!formEntity || formEntity.length === 0) {
        console.log('Form entity not found, using fallback');
        return NextResponse.json(getFallbackForm());
      }
      
      const form = formEntity[0];
      
      // Get the type schema for this form to understand its fields
      const typeName = form['fibery/type'];
      const typeSchema = await fiberyAPI.getType(typeName);
      
      return NextResponse.json({
        'fibery/id': form['fibery/id'],
        'fibery/name': form['fibery/name'] || 'Contact Form',
        'fibery/fields': typeSchema?.['fibery/fields'] || getFallbackForm()['fibery/fields']
      });
      
    } catch (entityError) {
      console.log('Error fetching form entity:', entityError);
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
