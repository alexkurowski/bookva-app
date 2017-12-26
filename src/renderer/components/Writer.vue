<template lang='slm'>
  .view
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

    created () {
      // TODO: fetch project data from a file

      this.$store.commit('newProject')
    }
  }
</script>

<style lang='sass' scoped>
</style>
