// import axios from 'axios';
// import { getAccessToken } from './getAccessToken';

// Replace these with your actual credentials
// const clientId = import.meta.env.VITE_SPOTIFY_CLIENT_ID;
// const clientSecret = import.meta.env.VITE_SPOTIFY_CLIENT_SECRET;

// Function to get the access token
// const getAccessToken = async () => {
//   const response = await axios.post('https://accounts.spotify.com/api/token', {
//     grant_type: 'client_credentials',
//     client_id: clientId,
//     client_secret: clientSecret,
//   });

//   return response.data.access_token;
// };

// export const getUserQueue = async () => {
//   const accessToken = await getAccessToken();
  
//   const config = {
//     headers: {
//       'Authorization': `Bearer ${accessToken}`,
//     },
//   };

//   try {
//     const { data } = await axios.get('https://api.spotify.com/v1/me/player/queue', config);
//     return data;
//   } catch (error) {
//     console.error('Error fetching user queue:', error);
//     throw error;
//   }
// };
