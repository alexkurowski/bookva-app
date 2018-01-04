<template lang='slm'>
  .folder.file-tree-item.drag-handle[
      :class='[ classOpen, classEmpty ]'
      @click='toggleFolder' ]

    i.fa :class='folderIcon'
    Title :content='title'
</template>

<script>
  import Title from './Title'

  import { Project } from '@/helpers/store_helper'

  export default {
    name: 'Folder',

    props: [ 'folder' ],

    components: {
      Title
    },

    computed: {
      isOpen () {
        return Project.foldersOpen.includes(this.folder.id)
      },

      isEmpty () {
        return Object.values(Project.files)
          .filter(file => file.folder === this.folder.id)
          .length == 0
      },

      classOpen () {
        return this.isOpen
          ? 'open'
          : ''
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
        return this.folder.title ||
               this.$t('writer.default.title.folder')
      }
    },

    methods: {
      toggleFolder () {
        this.$store.commit('projectToggleFolderOpen', this.folder.id)
      },
    }
  }
</script>

<style lang='sass' scoped>
  .folder
    i
      width: 1.5rem
      font-size: 1.25rem
      padding-right: .5rem

    &.open.empty
      &:after
        content: 'Empty'
        position: absolute
        align-items: center
        display: flex
        top: 100%
        left: 0
        right: 0
        height: $sidebar-file-tree-height
        padding: 0 5rem
        opacity: .5
        pointer-events: none
</style>
