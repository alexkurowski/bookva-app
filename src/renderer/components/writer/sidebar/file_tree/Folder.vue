<template lang='slm'>
  .folder @click='toggleFolder'
    i.fa :class='folderIcon'
    .title {{ title }}
</template>

<script>
  import { Writer } from '@/helpers/store_helper'

  export default {
    name: 'Folder',

    props: [ 'folder' ],

    computed: {
      folderIcon () {
        return Writer.foldersOpen.includes(this.folder.id)
          ? 'fa-folder-open-o'
          : 'fa-folder-o'
      },

      title () {
        return this.folder.title || this.$t('writer.default.title.folder')
      }
    },

    methods: {
      toggleFolder () {
        this.$store.commit('toggleFolder', this.folder.id)
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
    user-select: none
    cursor: pointer

    i
      width: 1.5rem
      font-size: 1.25rem
      padding-right: .5rem
</style>
