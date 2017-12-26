<template lang='slm'>
  .view :class='className'
    #background

    Editor :index='0'/
    Editor :index='1'/
    EditorSeparator/

    Sidebar/
</template>

<script>
  import Editor from './writer/Editor'
  import EditorSeparator from './writer/EditorSeparator'
  import Sidebar from './writer/Sidebar'

  import { Writer, Project } from './helpers/store_helper'

  export default {
    name: 'writer',

    components: {
      Editor,
      EditorSeparator,
      Sidebar
    },

    computed: {
      className () {
        return `scheme-${ Writer.scheme } font-family-${ Writer.fontFamily } font-size-${ Writer.fontSize }`
      }
    },

    created () {
      // TODO: fetch project data from a file

      this.$store.commit('newProject')
    }
  }
</script>

<style lang='sass' scoped>
  #background
    position: fixed
    top: 0
    left: 0
    right: 0
    bottom: 0
    z-index: -1000
    pointer-events: none
</style>
