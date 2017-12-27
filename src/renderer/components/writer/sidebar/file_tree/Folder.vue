<template lang='slm'>
  .folder
    .title {{ title }}
</template>

<script>
  export default {
    name: 'Folder',

    props: [ 'folder' ],

    computed: {
      title () {
        return this.folder.title || "Untitled Folder"
      }
    }
  }
</script>

<style lang='sass' scoped>
  .folder
    display: flex
    align-items: center
    height: $sidebar-file-tree-height
    padding: 0 1rem
    white-space: nowrap
</style>
