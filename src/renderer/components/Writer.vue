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

  export default {
    name: 'writer',

    components: {
      Editor,
      EditorSeparator,
      Sidebar
    }
  }
</script>

<style lang='sass' scoped>
</style>
