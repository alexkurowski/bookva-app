<template lang='slm'>
  .folder.file-tree-item.drag-handle [
    :class='[ classOpen, classOpenFiles, classEmpty ]'
    @click='toggleFolder'
    @contextmenu='openMenu'
  ]
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

      classOpenFiles () {
        if (this.isEmpty) return ''

        return Object
          .values(Project.files)
          .filter(file => file.folder == this.folder.id)
          .filter(file => Project.filesOpen.includes(file.id))
          .length > 0
            ? 'has-open-files'
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

      openMenu (event) {
        const items = []

        items.push({
          text: this.isOpen
            ? this.$t('contextMenu.folder.close')
            : this.$t('contextMenu.folder.open'),
          commit: 'projectToggleFolderOpen',
          params: this.folder.id
        })
        items.push({
          text: this.$t('contextMenu.folder.addFile'),
          commit: 'projectAddFile',
          params: {
            folder: this.folder.id
          }
        })

        items.push({
          text: 'hr'
        })

        if (this.isEmpty) {
          items.push({
            text: this.$t('contextMenu.folder.remove'),
            commit: 'projectRemoveFolderKeepFiles',
            params: this.folder.id
          })
        } else {
          items.push({
            text: this.$t('contextMenu.folder.removeWithFiles'),
            dispatch: 'modalShow',
            params: {
              type: 'Confirm',
              content: 'removeFolderWithFiles',
              commit: 'projectRemoveFolderWithFiles',
              params: this.folder.id
            }
          })
          items.push({
            text: this.$t('contextMenu.folder.removeKeepFiles'),
            dispatch: 'modalShow',
            params: {
              type: 'Confirm',
              content: 'removeFolderKeepFiles',
              commit: 'projectRemoveFolderKeepFiles',
              params: this.folder.id
            }
          })
        }

        this.$store.dispatch('contextMenuShow', {
          position: {
            x: event.x,
            y: event.y
          },
          items: items
        })
      }
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

    &:before
      content: ''
      position: absolute
      left: 0
      top: 0
      bottom: 0
      width: 4px
      opacity: 0
      background: transparent

    &.has-open-files
      &:before
        opacity: 1
        transition: background .3s
        background: $color-action !important
</style>
