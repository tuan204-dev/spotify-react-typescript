const dateFormatConvertor = (dateString: string | undefined): string => {
  if(!dateString) return ''
  const date = new Date(dateString)
  return date.toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  })
}

export default dateFormatConvertor
