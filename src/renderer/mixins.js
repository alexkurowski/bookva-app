export default [{
  methods: {
    resetEditors () {
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
  }
}]
