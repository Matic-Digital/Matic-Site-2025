/**
 * Test script to fetch Fibery form schema
 * Run with: node scripts/test-fibery.js
 */

const FIBERY_API_TOKEN = process.env.FIBERY_API_TOKEN || '5a5504d5.21c2c61ec02cbfe118a9f3e69c0393b0a20';
const FIBERY_ACCOUNT = process.env.FIBERY_ACCOUNT || 'matic';
const FIBERY_FORM_UUID = process.env.FIBERY_CONTACT_FORM_UUID || 'f4d41f40-381f-11f1-9a0e-1fa8910f1147';
const FIBERY_FORM_TYPE = process.env.FIBERY_FORM_TYPE || 'Matic-Contact-Form';

const baseUrl = `https://${FIBERY_ACCOUNT}.fibery.io/api/commands`;

async function fiberyRequest(command, args) {
  const response = await fetch(baseUrl, {
    method: 'POST',
    headers: {
      'Authorization': `Token ${FIBERY_API_TOKEN}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      command,
      args
    }),
  });

  if (!response.ok) {
    const text = await response.text();
    throw new Error(`Fibery API error: ${response.status} ${response.statusText}\n${text}`);
  }

  const result = await response.json();
  
  if (!result.success) {
    throw new Error(`Fibery command failed: ${JSON.stringify(result, null, 2)}`);
  }

  return result.result;
}

async function main() {
  console.log('🔍 Fetching Fibery Contact Form Schema...\n');
  console.log('Configuration:');
  console.log(`  Account: ${FIBERY_ACCOUNT}`);
  console.log(`  Form UUID: ${FIBERY_FORM_UUID}`);
  console.log(`  Form Type: ${FIBERY_FORM_TYPE}\n`);

  try {
    // First, list all available types
    console.log('📋 Step 1: Listing all available types...');
    const types = await fiberyRequest('fibery.schema/query', {
      'q/from': 'fibery/type',
      'q/select': [
        'fibery/id',
        'fibery/name',
      ],
      'q/limit': 100
    });
    
    console.log('\nAvailable Types Response:');
    console.log(JSON.stringify(types, null, 2));
    
    if (Array.isArray(types)) {
      console.log('\nAvailable Types:');
      types.forEach(type => {
        console.log(`  - ${type['fibery/name']}`);
      });
      
      console.log('\n\n🔍 Searching for "Inbound" or "Request" types:');
      const inboundTypes = types.filter(type => 
        type['fibery/name'].toLowerCase().includes('inbound') || 
        type['fibery/name'].toLowerCase().includes('request')
      );
      inboundTypes.forEach(type => {
        console.log(`  ✅ ${type['fibery/name']}`);
      });
    }

    const typeName = FIBERY_FORM_TYPE;
    console.log(`\n✅ Using form type: ${typeName}`);

    // Get the type schema
    console.log('\n📋 Step 2: Fetching type schema...');
    const typeSchema = await fiberyRequest('fibery.schema/query', {
      'q/from': 'fibery/type',
      'q/select': [
        'fibery/id',
        'fibery/name',
        {
          'fibery/fields': [
            'fibery/id',
            'fibery/name', 
            'field/type',
            'field/meta'
          ]
        }
      ],
      'q/where': ['=', ['fibery/name'], typeName],
      'q/limit': 1
    });

    console.log('\n✅ Type Schema:');
    console.log(JSON.stringify(typeSchema, null, 2));

    if (typeSchema && typeSchema.length > 0 && typeSchema[0]['fibery/fields']) {
      console.log('\n📝 Available Fields:');
      typeSchema[0]['fibery/fields'].forEach(field => {
        const fieldType = field['field/type'];
        const fieldName = field['fibery/name'];
        const required = field['field/meta']?.['field/required'] || false;
        console.log(`  - ${fieldName} (${fieldType})${required ? ' [REQUIRED]' : ''}`);
      });
    }

    // Try to create a test entity
    console.log('\n📋 Step 3: Testing entity creation...');
    const testData = {
      'Name': 'Test Submission',
      'Email': 'test@example.com',
      'Phone': '+1234567890',
      'Message': 'This is a test message'
    };

    console.log('Test data:', JSON.stringify(testData, null, 2));

    try {
      const result = await fiberyRequest('fibery.entity/create', {
        type: typeName,
        entity: testData
      });

      console.log('\n✅ Test entity created successfully!');
      console.log('Result:', JSON.stringify(result, null, 2));
    } catch (createError) {
      console.log('\n❌ Failed to create test entity:');
      console.log(createError.message);
    }

  } catch (error) {
    console.error('\n❌ Error:', error.message);
    if (error.stack) {
      console.error('\nStack trace:', error.stack);
    }
  }
}

main();
