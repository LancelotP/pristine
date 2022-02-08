import { useState } from 'react';

import type { QueryBuilderConfig } from '../components/organisms/QueryBuilder/QueryBuilder';
import { QueryBuilder } from '../components/organisms/QueryBuilder/QueryBuilder';

export function App() {
  const config: QueryBuilderConfig = {
    target: 'User',
    models: {
      Company: {
        memberships: {
          type: 'relation-many',
          target: 'CompanyMembership',
        },
      },
      CompanyMembership: {
        company: {
          type: 'relation-one',
          target: 'Company',
        },
        user: {
          type: 'relation-one',
          target: 'User',
        },
      },
      User: {
        companyMembership: {
          type: 'relation-one',
          target: 'CompanyMembership',
        },
        email: {
          type: 'string',
        },
        notifications: {
          type: 'relation-many',
          target: 'Notification',
        },
        status: {
          type: 'enum',
          values: ['ACTIVE', 'DEACTIVATED', 'INVITED'],
        },
      },
      Notification: {
        author: {
          type: 'relation-one',
          target: 'User',
        },
        createdAt: {
          type: 'datetime',
        },
      },
    },
  };

  const [query, setQuery] = useState<any>({
    AND: [
      {
        companyMembership: {
          AND: [
            {
              company: {
                AND: [
                  {
                    memberships: {
                      EVERY: {
                        AND: [
                          {
                            user: {
                              OR: [
                                {
                                  email: {
                                    contains: 'happy',
                                  },
                                },
                              ],
                            },
                          },
                        ],
                      },
                    },
                  },
                ],
              },
            },
          ],
        },
      },
    ],
  });

  return (
    <div>
      <QueryBuilder config={config} value={query} onChange={setQuery} />
    </div>
  );
  // return ;
}

export default App;
