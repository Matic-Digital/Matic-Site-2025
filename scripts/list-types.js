const FIBERY_API_TOKEN = '5a5504d5.21c2c61ec02cbfe118a9f3e69c0393b0a20';
const FIBERY_ACCOUNT = 'matic';
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
  return result.result;
}

async function main() {
  const schema = await fiberyRequest('fibery.schema/query', {
    'q/from': 'fibery/type',
    'q/select': ['fibery/name'],
    'q/limit': 200
  });

  const types = schema['fibery/types'].map(t => t['fibery/name']).sort();
  
  console.log('All Types:');
  types.forEach(t => console.log(`  ${t}`));
  
  console.log('\n\nInbound/Request Types:');
  types.filter(t => t.toLowerCase().includes('inbound') || t.toLowerCase().includes('request'))
    .forEach(t => console.log(`  ✅ ${t}`));
}

main();
