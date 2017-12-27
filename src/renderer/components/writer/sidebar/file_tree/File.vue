<template lang='slm'>
  .file
    .title {{ title }}
</template>

<script>
  export default {
    name: 'File',

    props: [ 'file' ],

    computed: {
      title () {
        return this.file.title || "Untitled"
      }
    }
  }
</script>

<style lang='sass' scoped>
  .file
    display: flex
    align-items: center
    height: $sidebar-file-tree-height
    white-space: nowrap
</style>
