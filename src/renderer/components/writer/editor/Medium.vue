<template lang='slm'>
  .medium-editor[
    :class='className'
    @keydown='onKeydown'
    @input='update'
  ]
</template>

<script>
  import MediumEditor from 'medium-editor/dist/js/medium-editor.min'

  import Config from '@/config/config'

  export default {
    name: 'Medium',

    props: [ 'file', 'type' ],

    data () {
      return {
        editor: null,

        options: {
          title: {
            placeholder: {
              text: this.$t('writer.placeholder.title'),
              hideOnClick: false
            },
            disableReturn: true,
            imageDragging: false,
            toolbar: false,
          },

          content: {
            placeholder: {
              text: this.$t('writer.placeholder.content'),
              hideOnClick: false
            },
            imageDragging: false,
            toolbar: {
              buttons: ['bold', 'italic', 'underline', 'h1', 'h2', 'justifyLeft', 'justifyCenter', 'justifyRight', 'justifyFull', 'removeFormat'],
            },
            buttonLabels: 'fontawesome',
          }
        },
      }
    },

    computed: {
      className () {
        return `medium-${ this.type }`
      }
    },

    methods: {
      onKeydown (event) {
        if (event.key == 'Tab') {
          event.preventDefault()

          const selection = document.getSelection()
          const range     = selection.getRangeAt(0)
          const tabNode   = document.createTextNode("\u00a0\u00a0\u00a0\u00a0")

          range.insertNode(tabNode);

          range.setStartAfter(tabNode);
          range.setEndAfter(tabNode);
          selection.removeAllRanges();
          selection.addRange(range);

          this.update(event)
        }
      },

      update (event) {
        this.$store.dispatch('projectUpdateFileContent', {
          id: this.file.id,
          type: this.type,
          element: event.target
        })
      },

      reset () {
        if (this.file)
          this.$el.innerHTML = this.file[this.type]
      }
    },

    mounted () {
      this.editor = new MediumEditor(this.$el, this.options[this.type])
    }
  }
</script>

<style lang='sass' scoped>
  .medium-editor
    &:after
      color: currentColor

  .medium-title
    margin-bottom: 1rem

  .medium-content
    resize: none

    > *
      font-family: inherit

    *
      margin-bottom: 1em

    h2
      font-size: 150%

  .medium-editor-dragover
    background: transparent
</style>
