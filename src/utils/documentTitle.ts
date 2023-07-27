const documentTitle = (title: string): void => {
  if (!title) return
  window.document.title = title
}

export default documentTitle