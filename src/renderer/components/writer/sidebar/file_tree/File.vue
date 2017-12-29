<template lang='slm'>
  .file[ :class='className'
         @click='openFile' ]
    .title {{ title }}
</template>

<script>
  import { Project } from '@/helpers/store_helper'

  export default {
    name: 'File',

    props: [ 'file' ],

    computed: {
      className () {
        return Project.folders[this.file.folder]
          ? 'in-folder'
          : ''
      },

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

    &.in-folder
      padding-left: 3rem
</style>
