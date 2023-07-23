// import { scopes } from '@/config/spotify'
// import { generateCodeChallenge, generateRandomString } from '@/utils'

// const authorizeApi = async () => {
//   const clientId = import.meta.env.VITE_SPOTIFY_CLIENT_ID
//   const codeVerifier = generateRandomString(128)
//   const codeChallenge = await generateCodeChallenge(codeVerifier)
//   const state = generateRandomString(16)
//   const scope = scopes

//   localStorage.setItem('spotify_code_verifier', codeVerifier)

//   const args = new URLSearchParams({
//     response_type: 'code',
//     client_id: clientId,
//     scope: scope,
//     redirect_uri: `${window.location.origin}/`,
//     state: state,
//     code_challenge_method: 'S256',
//     code_challenge: codeChallenge,
//   })
//   window.location.replace('https://accounts.spotify.com/authorize?' + args)
// }

// export default authorizeApi
