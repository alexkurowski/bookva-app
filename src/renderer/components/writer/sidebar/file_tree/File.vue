<template lang='slm'>
  .file @click='openFile'
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
    },

    methods: {
      openFile () {
        this.$store.commit('openFile', this.file.id)
      }
    }
  }
</script>

<style lang='sass' scoped>
  .file
    display: flex
    align-items: center
    height: $sidebar-file-tree-height
    padding: 0 1rem
    white-space: nowrap
</style>
