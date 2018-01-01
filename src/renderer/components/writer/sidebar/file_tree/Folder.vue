<template lang='slm'>
  .folder[ :class='classEmpty'
           @click='toggleFolder' ]
    i.fa :class='folderIcon'
    .title {{ title }}
</template>

<script>
  import { Writer, Project } from '@/helpers/store_helper'

  export default {
    name: 'Folder',

    props: [ 'folder' ],

    computed: {
      isOpen () {
        return Writer.foldersOpen.includes(this.folder.id)
      },

      isEmpty () {
        return Object.values(Project.files)
          .filter(file => file.folder === this.folder.id)
          .length == 0
      },

      classEmpty () {
        return this.isEmpty
          ? 'empty'
          : ''
      },

      folderIcon () {
        return this.isOpen
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
    position: relative
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

    &.empty
      &:after
        content: 'Empty'
        position: absolute
        align-items: center
        display: flex
        top: 100%
        left: 0
        right: 0
        height: $sidebar-file-tree-height
        padding: 0 3rem
        opacity: .5
        pointer-events: none
</style>
