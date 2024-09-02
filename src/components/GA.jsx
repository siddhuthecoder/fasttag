// import React, { useEffect, useState } from 'react';
// import gapa from '@babel/core'

// const GAViewCount = () => {
//   const [views, setViews] = useState(null);

//   useEffect(() => {
//     const fetchData = async () => {
//       const response = await gapi.client.analytics.data.ga.get({
//         'ids': 'ga:G-3XSK3H3LDG', // Replace with your View ID
//         'start-date': '7daysAgo',
//         'end-date': 'today',
//         'metrics': 'ga:pageviews',
//         'dimensions': 'ga:pagePath',
//         'filters': 'ga:pagePath==/', // Replace with the path of the page you want to track
//       });

//       const result = response.result;
//       const viewsCount = result.rows ? result.rows[0][1] : 0;
//       setViews(viewsCount);
//     };

//     gapi.load('client:auth2', () => {
//       gapi.client.init({
//         apiKey: 'YOUR_API_KEY', // Replace with your API key
//         clientId: 'YOUR_CLIENT_ID', // Replace with your Client ID
//         discoveryDocs: ['https://analytics.googleapis.com/$discovery/rest?version=v3'],
//         scope: 'https://www.googleapis.com/auth/analytics.readonly',
//       }).then(() => {
//         fetchData();
//       });
//     });
//   }, []);

//   return (
//     <div>
//       <h3>Page Views: {views ? views : 'Loading...'}</h3>
//     </div>
//   );
// };

// export default GAViewCount;
import React from 'react'

const GAViewCount = () => {
  return (
    <div>
      
    </div>
  )
}

export default GAViewCount
