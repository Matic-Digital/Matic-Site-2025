const FIBERY_API_TOKEN = '5a5504d5.21c2c61ec02cbfe118a9f3e69c0393b0a20';
const FIBERY_ACCOUNT = 'matic';
const TYPE_NAME = '(XX5678) Matic Site General Task Board/Inbound Requests';
const baseUrl = `https://${FIBERY_ACCOUNT}.fibery.io/api/commands`;

async function fiberyRequest(command, args) {
  const response = await fetch(baseUrl, {
    method: 'POST',
    headers: {
      'Authorization': `Token ${FIBERY_API_TOKEN}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ command, args }),
  });

  const result = await response.json();
  if (!result.success) {
    throw new Error(JSON.stringify(result, null, 2));
  }
  return result.result;
}

async function main() {
  console.log(`📋 Fetching schema for: ${TYPE_NAME}\n`);

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
    'q/where': ['=', ['fibery/name'], TYPE_NAME],
    'q/limit': 1
  });

  const types = typeSchema['fibery/types'];
  if (!types || types.length === 0) {
    console.log('❌ Type not found!');
    return;
  }

  const type = types[0];
  console.log('✅ Type found!\n');
  console.log('📝 Available Fields:\n');
  
  const fields = type['fibery/fields'].filter(f => !f['fibery/deleted?']);
  
  fields.forEach(field => {
    const fieldType = field['fibery/type'];
    const fieldName = field['fibery/name'];
    const required = field['fibery/meta']?.['fibery/required?'] || false;
    const readonly = field['fibery/meta']?.['fibery/readonly?'] || false;
    const title = field['fibery/meta']?.['ui/title?'] || false;
    
    let flags = [];
    if (required) flags.push('REQUIRED');
    if (readonly) flags.push('READONLY');
    if (title) flags.push('TITLE');
    
    const flagStr = flags.length > 0 ? ` [${flags.join(', ')}]` : '';
    console.log(`  - ${fieldName}`);
    console.log(`    Type: ${fieldType}${flagStr}`);
  });

  // Try to create a test entity
  console.log('\n\n📋 Testing entity creation...\n');
  const testData = {
    '(XX5678) Matic Site General Task Board/Name': 'Test Contact Form Submission',
  };

  console.log('Test data:', JSON.stringify(testData, null, 2));

  try {
    const result = await fiberyRequest('fibery.entity/create', {
      type: TYPE_NAME,
      entity: testData
    });

    console.log('\n✅ Test entity created successfully!');
    console.log('Result:', JSON.stringify(result, null, 2));
  } catch (createError) {
    console.log('\n❌ Failed to create test entity:');
    console.log(createError.message);
  }
}

main();
