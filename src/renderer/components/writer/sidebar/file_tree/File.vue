<template lang='slm'>
  .file.file-tree-item.drag-handle[
      :class='classOpen'
      @click='openFile'
      @contextmenu='openMenu' ]

    Title :editable='false' :content='title'
</template>

<script>
  import Title from './Title'

  import { Project } from '@/helpers/store_helper'

  export default {
    name: 'File',

    props: [ 'file' ],

    components: {
      Title
    },

    computed: {
      isOpen () {
        return Project.filesOpen.includes(this.file.id)
      },

      classOpen () {
        return this.isOpen
          ? 'open'
          : ''
      },

      title () {
        return this.file.title ||
               this.$t('writer.default.title.file')
      },

      paneIndex () {
        if (!this.isOpen) return null
        return Project.filesOpen.indexOf(this.file.id)
      }
    },

    methods: {
      openFile () {
        this.$store.commit('projectFileOpenFill', this.file.id)
      },

      openMenu (event) {
        const items = []

        if (!this.isOpen) {
          items.push({
            text: 'Open',
            callback: 'projectFileOpenFill',
            callbackArgs: this.file.id
          })

          const open1or2 =
            Project.filesOpen.length == 1 ||
            Project.filesOpen.length == 2

          const open2or3 =
            Project.filesOpen.length == 2 ||
            Project.filesOpen.length == 3

          if (open1or2) {
            items.push({
              text: 'Open in left pane',
              callback: 'projectFileOpenPane',
              callbackArgs: {
                id: this.file.id,
                pane: 0
              }
            })
          }

          if (open2or3) {
            items.push({
              text: 'Open in middle pane',
              callback: 'projectFileOpenPane',
              callbackArgs: {
                id: this.file.id,
                pane: 1
              }
            })
          }

          if (open1or2) {
            items.push({
              text: 'Open in right pane',
              callback: 'projectFileOpenPane',
              callbackArgs: {
                id: this.file.id,
                pane: 2
              }
            })
          }
        } else {
          items.push({
            text: 'Close',
            callback: 'projectFileClosePane',
            callbackArgs: this.paneIndex
          })
        }

        items.push({
          text: 'Remove',
          callback: 'modalShow',
          callbackArgs: {
            type: 'Confirm',
            content: 'removeFile',
            callback: 'projectRemoveFile',
            callbackArgs: this.file.id
          }
        })

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
  .file
    padding-left: 3rem

    &:before
      content: ''
      position: absolute
      left: 0
      top: 0
      bottom: 0
      width: 4px
      background: transparent

    &.open
      &:before
        transition: background .3s
        background: $color-action !important
</style>
