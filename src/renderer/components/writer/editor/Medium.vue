<template lang='slm'>
  .medium-editor[
    :class='className'
    @input='update'
  ]
</template>

<script>
  import MediumEditor from 'medium-editor/dist/js/medium-editor.min'

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
        }
      }
    },

    computed: {
      className () {
        return `medium-${ this.type }`
      }
    },

    methods: {
      update (event) {
        this.$store.commit('projectUpdateFile', {
          id: this.file.id,
          [this.type]: event.target.innerHTML
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
