const axios = require('axios');
const qs = require('qs');

// Step 1: Authenticate the user
const authData = qs.stringify({
  token: 'jhCce9jtbQvxsRdfYjF3xn/enP2ZHXWuqUwXDrk4OugAnrVDO5DaUkO/odwulPzi7qDxQ4q5kW2lKQ==',
  StudentId1: 'N200081',
  StudentDob1: '16ZAY'
});

const authConfig = {
  headers: {
    'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
    'Cookie': 'PHPSESSID=8i9tfr0ud8ahh1e1lnpbiukfr3',
    'Referer': 'https://examcell.rguktn.ac.in/results/202324_20E2_S2_Reg/',
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/127.0.0.0 Safari/537.36',
    'X-Requested-With': 'XMLHttpRequest'
  }
};

axios.post('https://examcell.rguktn.ac.in/results/202324_20E2_S2_Reg/authenticate_user.php', authData, authConfig)
  .then(authResponse => {
    // Assuming the token for the next step is included in the authResponse data
    const newToken = authResponse.data.token; // Replace with actual path to token if necessary

    // Step 2: Get the result
    const resultData = qs.stringify({
      SID: 'N200081',
      token: newToken
    });

    const resultConfig = {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
        'Cookie': 'PHPSESSID=8i9tfr0ud8ahh1e1lnpbiukfr3',
        'Referer': 'https://examcell.rguktn.ac.in/results/202324_20E2_S2_Reg/',
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/127.0.0.0 Safari/537.36',
        'X-Requested-With': 'XMLHttpRequest'
      }
    };

    return axios.post('https://examcell.rguktn.ac.in/results/202324_20E2_S2_Reg/getResult.php', resultData, resultConfig);
  })
  .then(resultResponse => {
    console.log(resultResponse.data);
  })
  .catch(error => {
    console.error('Error:', error);
  });
