<template lang='slm'>
  .file.file-tree-item.drag-handle[
      :class='classOpen'
      @click='openFile' ]

    Title :editable='false' {{ title }}
</template>

<script>
  import Title from './Title'

  import { Writer, Project } from '@/helpers/store_helper'

  export default {
    name: 'File',

    props: [ 'file' ],

    components: {
      Title
    },

    computed: {
      isOpen () {
        return Writer.filesOpen.includes(this.file.id)
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
        this.$store.commit('openFile', this.file.id)
        this.$root.resetEditors()
      },
    }
  }
</script>

<style lang='sass' scoped>
  .file
    padding-left: 3rem

    &.open
      &:before
        content: ''
        position: absolute
        left: 0
        top: 0
        bottom: 0
        width: 4px
        background: $color-action !important
</style>
