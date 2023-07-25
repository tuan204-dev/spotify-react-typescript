import { REDIRECT_URI } from '@/constants/auth'

const transformDomain = (inputString: string): string => {
  return inputString.replace(/https:\/\/open\.spotify\.com\//g, REDIRECT_URI)
}

export default transformDomain
