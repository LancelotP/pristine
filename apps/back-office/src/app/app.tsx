import { useState } from 'react';

import type { QueryBuilderConfig } from '../components/organisms/QueryBuilder/QueryBuilder';
import { QueryBuilder } from '../components/organisms/QueryBuilder/QueryBuilder';
import { QueryVisualizer } from '../components/organisms/QueryVisualizer/QueryVisualizer';

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
    // email: {
    //   equals: 'l;k',
    // },
    // AND: [
    //   {
    //     OR: [
    //       {
    //         AND: [],
    //       },
    //       {
    //         notifications: {
    //           EVERY: {
    //             AND: [
    //               {
    //                 author: {
    //                   AND: [
    //                     {
    //                       email: {
    //                         equals: 'kjlkj',
    //                       },
    //                     },
    //                     {
    //                       email: {
    //                         equals: 'ACTIVE',
    //                       },
    //                     },
    //                   ],
    //                 },
    //               },
    //             ],
    //           },
    //         },
    //       },
    //     ],
    //   },
    // ],
  });

  return (
    <div>
      <QueryBuilder config={config} value={query} onChange={setQuery} />
      <QueryVisualizer config={config} query={query} />
    </div>
  );
  // return ;
}

export default App;
