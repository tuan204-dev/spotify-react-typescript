const stringCleaner = (input?: string): string =>  {
  if(!input) return ''
  // Replace HTML entities
  const replacedEntities = input
    .replace(/&amp;/g, "&")
    .replace(/&#x2F;/g, "/");

  // Remove duplicate slashes
  const cleanedString = replacedEntities.replace(/\/{2,}/g, "/");

  return cleanedString;
}

export default stringCleaner