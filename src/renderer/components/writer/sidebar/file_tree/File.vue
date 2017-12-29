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
          ? ''
          : ''
      },

      title () {
        return this.file.title || this.$t('writer.default.title.file')
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
    cursor: pointer

  .in-folder .file
    padding-left: 3rem
</style>
