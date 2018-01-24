document.addEventListener('DOMContentLoaded', () => {
  document.body.ondragstart = (event) => {
    if ( !event.target.className )
      return false

    if ( event.target.className.indexOf('entry') == -1 )
      return false
  }
})

document.addEventListener('keydown', (event) => {
  if (event.key == 'F11')
    document.getElementById('fullscreen-toggle').click()
})

global.resetEditors = function () {
  setTimeout(() => {
    document
      .querySelectorAll('.medium-editor')
      .forEach(editor => {
        editor.__vue__.reset()
        if ( editor.innerText.replace(/\n| /, '') )
          editor.classList.remove('medium-editor-placeholder')
        else
          editor.classList.add('medium-editor-placeholder')
      })
  }, 0)
}

global.findBarFocus = function () {
  setTimeout(() => {
    const findInput = document.querySelector('#find-bar input')
    if (findInput)
      findInput.focus()
  }, 0)
}

global.findBarOnHide = function () {
  const findInput = document.querySelector('#find-bar input')
  if (findInput)
    findInput.value = ""
}
