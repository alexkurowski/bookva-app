document.addEventListener('DOMContentLoaded', () => {
  document.body.ondragstart = (event) => {
    if ( !event.target.className )
      return false

    if ( event.target.className.indexOf('entry') == -1 )
      return false
  }
})
