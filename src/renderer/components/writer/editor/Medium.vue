<template lang='slm'>
  .medium-editor [
    :class='className'
    @focus='onFocus'
    @keydown='onKeydown'
    @input='update'
    @mousedown='preventSelection'
    @selectstart='preventSelection'
  ]
</template>

<script>
  import MediumEditor from 'medium-editor/dist/js/medium-editor.min'

  import Config from '@/config/config'

  import { Application } from '@/helpers/store_helper'

  export default {
    name: 'Medium',

    props: [ 'index', 'file', 'type' ],

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

        typewriterKeys: [
          'ArrowUp',
          'ArrowDown',
          'ArrowLeft',
          'ArrowRight',
          'Home',
          'End',
          'PageUp',
          'PageDown',
          'Delete',
          'Backspace'
        ]
      }
    },

    computed: {
      className () {
        return `
        medium-${ this.type }
        medium-editor-index-${ this.index }
        `
      },

      typewriterMode () {
        return Application.typewriterMode
      },
    },

    methods: {
      onFocus () {
        this.$store.commit('applicationSetLastPaneFocused', this.index)
      },

      onKeydown (event) {
        if ( this.type == 'title' &&
             event.key == 'Enter' ) {
          this
            .$el
            .parentNode
            .lastChild
            .focus()
        }

        if ( this.type == 'content' &&
             event.key == 'Tab' ) {
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

        if ( this.type == 'content' &&
             this.typewriterMode &&
             this.typewriterKeys.includes(event.key) ) {
          event.preventDefault()
        }
      },

      update (event) {
        this.$store.commit('applicationEnterFocusMode')

        this.$store.dispatch('projectUpdateFileContent', {
          id: this.file.id,
          type: this.type,
          element: event.target
        })
      },

      preventSelection (event) {
        if ( this.type == 'content' &&
             this.typewriterMode ) {
          event.preventDefault()
          focusAndSelectEnd(this.$el)
        }
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
    width: 100%
    border: none
    outline: none
    cursor: text
    line-height: 1.75
    text-align: left

    &:after
      color: currentColor
      font-style: normal
      cursor: text
      transition: opacity .2s
      opacity: .5

    &:hover
      &:after
        opacity: .2

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
</style>
