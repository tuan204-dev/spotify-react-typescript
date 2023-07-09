export const unicodeDecoder = (input: string | undefined): string => {
  if(!input) return ''
  return input.replace(
    /&#(\d+);/g,
    (_: string, dec: string): string => {
      return String.fromCharCode(parseInt(dec, 10))
    }
  )
}
