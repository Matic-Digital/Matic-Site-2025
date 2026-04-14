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
  console.log('Testing different rich text formats for Goals field...\n');

  // Test 1: Plain string
  console.log('Test 1: Plain string');
  try {
    const result1 = await fiberyRequest('fibery.entity/create', {
      type: TYPE_NAME,
      entity: {
        '(XX5678) Matic Site General Task Board/Name': 'Test Plain String',
        '(XX5678) Matic Site General Task Board/Goals': 'This is a plain text message'
      }
    });
    console.log('✅ Success with plain string');
    console.log('Result:', JSON.stringify(result1, null, 2));
  } catch (e) {
    console.log('❌ Failed with plain string');
    console.log(e.message);
  }

  console.log('\n---\n');

  // Test 2: Fibery document format
  console.log('Test 2: Fibery document format');
  try {
    const result2 = await fiberyRequest('fibery.entity/create', {
      type: TYPE_NAME,
      entity: {
        '(XX5678) Matic Site General Task Board/Name': 'Test Document Format',
        '(XX5678) Matic Site General Task Board/Goals': {
          'fibery/document': {
            'content': [
              {
                'type': 'paragraph',
                'content': [
                  {
                    'type': 'text',
                    'text': 'This is rich text content'
                  }
                ]
              }
            ]
          }
        }
      }
    });
    console.log('✅ Success with document format');
    console.log('Result:', JSON.stringify(result2, null, 2));
  } catch (e) {
    console.log('❌ Failed with document format');
    console.log(e.message);
  }

  console.log('\n---\n');

  // Test 3: Secret format
  console.log('Test 3: Secret/MD format');
  try {
    const result3 = await fiberyRequest('fibery.entity/create', {
      type: TYPE_NAME,
      entity: {
        '(XX5678) Matic Site General Task Board/Name': 'Test Secret Format',
        '(XX5678) Matic Site General Task Board/Goals': {
          'secret': 'This is markdown content',
          'md': true
        }
      }
    });
    console.log('✅ Success with secret format');
    console.log('Result:', JSON.stringify(result3, null, 2));
  } catch (e) {
    console.log('❌ Failed with secret format');
    console.log(e.message);
  }
}

main();
