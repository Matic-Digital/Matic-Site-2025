import { NextResponse } from 'next/server';
import { getFiberyAPI } from '@/lib/fibrey';

export async function GET() {
  try {
    const fiberyAPI = getFiberyAPI();
    
    // Get all types from Fibery to see what's available
    const allTypes = await fiberyAPI.queryEntities({
      'q/from': 'fibery/type',
      'q/select': [
        'fibery/id',
        'fibery/name'
      ],
      'q/limit': 100
    });
    
    return NextResponse.json({ types: allTypes });
  } catch (error) {
    console.error('Error fetching Fibery types:', error);
    return NextResponse.json(
      { error: 'Failed to fetch types', details: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    );
  }
}
