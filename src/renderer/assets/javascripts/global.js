document.addEventListener('DOMContentLoaded', () => {
  document.body.ondragstart = (event) => {
    if ( !event.target.className )
      return false

    if ( event.target.className.indexOf('entry') == -1 )
      return false
  }
})

global.resetEditors = function () {
  setTimeout(() => {
    document
      .querySelectorAll('.medium-editor')
      .forEach(editor => {
        editor.__vue__.reset()
        if (editor.innerText)
          editor.classList.remove('medium-editor-placeholder')
        else
          editor.classList.add('medium-editor-placeholder')
      })
  }, 0)
}
