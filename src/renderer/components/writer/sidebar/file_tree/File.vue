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
      }
    },

    methods: {
      openFile () {
        this.$store.commit('projectFileOpenFill', this.file.id)
      },

      openMenu (event) {
        this.$store.dispatch('contextMenuShow', {
          position: {
            x: event.x,
            y: event.y
          },
          items: [
            {
              text: 'Remove',
              callback: 'modalShow',
              callbackArgs: {
                type: 'Confirm',
                content: 'removeFile',
                callback: 'projectRemoveFile',
                callbackArgs: this.file.id
              }
            }
          ]
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
