export default [{
  methods: {
    resetEditors () {
      setTimeout(() => {
        document
          .querySelectorAll('.medium-editor')
          .forEach(editor => editor.__vue__.reset())
        document
          .querySelectorAll('.medium-editor')
          .forEach(editor => editor.click())
      }, 0)
    }
  }
}]
