
export default function htmlCleaner(htmlString: string | undefined): string | null {
  if(!htmlString) return null
  const parser = new DOMParser();
  const doc = parser.parseFromString(htmlString, 'text/html');
  const playlistNames: string[] = [];

  const links = doc.querySelectorAll('a');
  links.forEach((link) => {
    const playlistName = link.textContent;
    if (playlistName) {
      playlistNames.push(playlistName);
    }
  });

  return playlistNames.join(', ');
}