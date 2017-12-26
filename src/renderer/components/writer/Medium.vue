<template lang='slm'>
  div :class='className'
</template>

<script>
  import MediumEditor from 'medium-editor/dist/js/medium-editor.min'

  export default {
    name: 'Medium',

    props: [ 'file', 'type' ],

    data () {
      return {
        editor: null
      }
    },

    computed: {
      className () {
        return `medium-editor medium-${ this.type }`
      }
    },

    mounted () {
      if (this.type == 'title') {
        this.editor = new MediumEditor(this.$el, {
          disableReturn: true,
          toolbar: false
        })
      } else
      if (this.type == 'content') {
        this.editor = new MediumEditor(this.$el, {
          toolbar: {
            buttons: ['bold', 'italic', 'underline', 'h1', 'h2', 'justifyLeft', 'justifyCenter', 'justifyRight', 'justifyFull', 'removeFormat'],
          },
          buttonLabels: 'fontawesome'
        })
      }
    }
  }
</script>

<style lang='sass' scoped>
</style>
