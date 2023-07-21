import { useEffect } from 'react'
import { scopes } from '@/config/spotify'
import userApi from '@/APIs/userApi'

const Login = () => {
  const END_POINT = 'https://accounts.spotify.com/authorize'
  const RESPONSE_TYPE = 'code'
  const CLIENT_ID = import.meta.env.VITE_SPOTIFY_CLIENT_ID
  const ClIEND_SECRET = import.meta.env.VITE_SPOTIFY_CLIENT_SECRET
  const SCOPE = scopes
  const REDIRECT_URI = 'http://localhost:5000/'

  const AUTHORIZATION_CODE =
    'AQArXxnHc6CPLoy6sPrfk07jSgVeEnVv_MV0JgPjNCAR1pRHJxjt8XOWetMFeLqjlPVY5inuTzetU0rGcb_9CeLhnztuWP9awy6g3yIfBcB8BleLjPDbYSFbvXpd6HAfhqUkChh5pKz8fbkpR4a8W_IvTPsWJFbvoB6UVQliYNzmrdBpvKWPqFR7-Zp02wyKtVVOYqYTXCLsrauRGG3auaBi801gN1zTwIdeZ1G8bBnKWszsP_gQpkmpgcC9kH23M-aM7R44GNDVIrkGhaaqJIOy6L-WsDR4QbnntZnQBteve2NioosNe9az3bvws9-1oUSaAYYh-37eu-chwfQ_sg9dEMjP4mg_jP4hKY2O6elJrRegGIlnogI7mxsJt2U37rX-R0lZKqC6uZSI8xg2eoCWOm3ZlIO2ukO495BFHiJEDLLxfWqkdU98MZSlovjmbtBcFuj9szI3x-ZKiHMrzvb6qcgow85mUuwD3b6eyqC-DRfrKwfU1CdGwM1rfbfkAwYT4Wti9_RiEuZ_FiaSZzfZNErlZ0T4U6hTnmdmTKOS80cHaL9qVkIug5kTdcn-s7WYEq7QZtygxOUMGEOp0jVddiKt-nTZWcnWRedVvtCEuTAGPWg653XWA0qfKuV7mwUnnWmQu5WK15XT4ad6Yc_tY9tUu3iylXUd52PyM4dFQW-CfpdpXXeHmeT63GPLSFmOC0v2elJvkd7p'

  const params = new URLSearchParams()
  params.append('grant_type', 'authorization_code')
  params.append('code', AUTHORIZATION_CODE) // Replace with the actual authorization code
  params.append('redirect_uri', REDIRECT_URI) // Replace with your app's Redirect URI
  params.append('client_id', CLIENT_ID) // Replace with your app's Client ID
  params.append('client_secret', ClIEND_SECRET)

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch('https://accounts.spotify.com/api/token', {
        method: 'POST',
        body: params,
      })

      const data = await response.json()
      console.log(data)
    }
    fetchData()
  }, [])

  useEffect(() => {
    const fetchUserData = async () => {
      const data = await userApi()
      console.log(data)
    }
    fetchUserData()
  }, [])

  return (
    <div>
      <a
        href={`${END_POINT}?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=${RESPONSE_TYPE}&scope=${SCOPE}`}
      >
        Login
      </a>
    </div>
  )
}

export default Login

// {
//   "access_token": "BQC9QbA90mI6eHeFy8oncu5clA-WvcapO8Zk112rQNzEXUSlGS3xFXFwIJObU2vMh0K2yzL0MZDZrO10cQ0TigPLLhvia0fTopS8hgFQsDia7wMGhD7lKvhza477zP3n2B9VGBwHszo5FMcrjbWF87DPeZe_Z9eUdog9JiY9iRQAYLKlBCD3SA40EjsXGNG0sea0VcFCR_fQUCbwk3kc2ZpY4pnAKQyTl-98Frw_cvVhZhoQqDtg3DRoB6PqtN5HYmr3ulkWlRgvAbmVPl5E9o1ISIO4ERQ7ZRM0Ou_1kdHufgiyQ0TwvyHy4xBH6rbthde_ri6ntaqjzspAq11ylPUx",
//   "token_type": "Bearer",
//   "expires_in": 3600,
//   "refresh_token": "AQCCVGWrJK-3lwDftBXvl-w05guQVorS2WhClA1znLA_VrAuRpeMR-Fdg9Icm2doW2_elz4KPr2QxXUNl8bRuxV0nGCUqLDkXK7RtS8ULEFZcg2HIyJpBmW6GcLEN0ucBjQ",
//   "scope": "playlist-read-private playlist-read-collaborative ugc-image-upload user-follow-read playlist-modify-private user-read-email user-read-private app-remote-control streaming user-modify-playback-state user-follow-modify user-library-read user-library-modify playlist-modify-public user-read-playback-state user-read-currently-playing user-read-recently-played user-read-playback-position user-top-read"
// }
