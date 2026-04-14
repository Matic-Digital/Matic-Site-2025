/**
 * Fibery API integration utilities
 * Based on official Fibery API documentation: https://the.fibery.io/@public/User_Guide/Guide/HTTP-API-259
 */

export interface FiberyField {
  'fibery/id': string;
  'fibery/name': string;
  'field/type': string;
  'field/meta'?: {
    'ui/label'?: string;
    'field/required'?: boolean;
  };
}

export interface FiberyType {
  'fibery/id': string;
  'fibery/name': string;
  'fibery/fields': FiberyField[];
}

export interface FiberySubmission {
  [fieldName: string]: string | File | null;
}

class FiberyAPI {
  private apiToken: string;
  private baseUrl: string;

  constructor(apiToken: string, account: string) {
    this.apiToken = apiToken;
    this.baseUrl = `https://${account}.fibery.io/api/commands`;
  }

  private async request<T>(command: string, args: any): Promise<T> {
    const response = await fetch(this.baseUrl, {
      method: 'POST',
      headers: {
        'Authorization': `Token ${this.apiToken}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        command,
        args
      }),
    });

    if (!response.ok) {
      throw new Error(`Fibery API error: ${response.status} ${response.statusText}`);
    }

    const result = await response.json();
    
    if (!result.success) {
      throw new Error(`Fibery command failed: ${JSON.stringify(result)}`);
    }

    return result.result;
  }

  /**
   * Get type (database) schema by type name
   */
  async getType(typeName: string): Promise<FiberyType> {
    return this.request<FiberyType>('fibery.schema/query', {
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
  }

  /**
   * Create a new entity in the specified type
   */
  async createEntity(typeName: string, data: Record<string, any>): Promise<{ 'fibery/id': string }> {
    const result = await this.request<any[]>('fibery.entity/create', {
      type: typeName,
      entity: data
    });
    
    // The API returns an array with the created entity
    return result[0] || result;
  }

  /**
   * Query entities from a type
   */
  async queryEntities(query: any): Promise<any[]> {
    return this.request('fibery.entity/query', { query });
  }
}

// Create singleton instance (server-side only)
let fiberyInstance: FiberyAPI | null = null;

export function getFiberyAPI(): FiberyAPI {
  if (!fiberyInstance) {
    const apiToken = process.env.FIBERY_API_TOKEN;
    const account = process.env.FIBERY_ACCOUNT;
    
    if (!apiToken || !account) {
      throw new Error('Fibery API token and account not found in environment variables');
    }
    
    fiberyInstance = new FiberyAPI(apiToken, account);
  }
  return fiberyInstance;
}

/**
 * Client-side API wrapper that uses Next.js API routes
 */
export class FiberyClientAPI {
  async getContactFormType(): Promise<FiberyType> {
    const response = await fetch('/api/fibery/contact-form-type');
    if (!response.ok) {
      throw new Error(`Failed to fetch contact form type: ${response.statusText}`);
    }
    return response.json();
  }

  async submitContactForm(data: FiberySubmission): Promise<{ success: boolean; id: string }> {
    // Check if we have files
    const hasFiles = Object.values(data).some(value => value instanceof File);
    
    let body: FormData | string;
    let headers: Record<string, string> = {};
    
    if (hasFiles) {
      const formData = new FormData();
      Object.entries(data).forEach(([key, value]) => {
        if (value instanceof File) {
          formData.append(key, value);
        } else if (value !== null) {
          formData.append(key, String(value));
        }
      });
      body = formData;
      // Don't set Content-Type for FormData - browser will set it with boundary
    } else {
      body = JSON.stringify(data);
      headers['Content-Type'] = 'application/json';
    }

    const response = await fetch('/api/fibery/contact-form-submit', {
      method: 'POST',
      headers,
      body,
    });

    if (!response.ok) {
      throw new Error(`Failed to submit contact form: ${response.statusText}`);
    }

    return response.json();
  }
}

/**
 * Client-side hook for Fibery API
 */
export function useFiberyAPI() {
  return new FiberyClientAPI();
}
