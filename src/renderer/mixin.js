export default [{
  methods: {
    resetEditors () {
      setTimeout(() => {
        document
          .querySelectorAll('.medium-editor')
          .forEach(editor => {
            editor.__vue__.reset()
            editor.click()
          })
      }, 0)
    }
  }
}]
