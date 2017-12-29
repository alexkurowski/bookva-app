<template lang='slm'>
  .folder
    i.icon.icon-folder
    .title {{ title }}
</template>

<script>
  export default {
    name: 'Folder',

    props: [ 'folder' ],

    computed: {
      title () {
        return this.folder.title || this.$t('writer.default.title.folder')
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

    i
      width: 1.5rem
      font-size: 1.5rem
      padding-right: .5rem
</style>
