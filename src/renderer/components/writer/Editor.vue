<template lang='slm'>
  .editor[
    :class='[ classHidden, classSide, classSize, classFontFamily, classFontSize ]'
    :style='style' ]

    .medium-container
      Medium :file='file' type='title'/
      Medium :file='file' type='content'/
</template>

<script>
  import Medium from './Medium'

  import { Writer, Project } from '../helpers/store_helper'

  export default {
    name: 'Editor',

    props: [
      'index'
    ],

    components: {
      Medium
    },

    computed: {
      fileId () {
        return Writer.filesOpen[ this.index ]
      },

      file () {
        return Project.files[ this.fileId ]
      },

      classHidden () {
        return this.file
          ? ''
          : 'hidden'
      },

      classSide () {
        return this.index == 0
          ? 'editor-left'
          : 'editor-right'
      },

      classSize () {
        return Writer.filesOpen.length == 2
          ? 'editor-half'
          : 'editor-full'
      },

      classFontFamily () {
        return ''
      },

      classFontSize () {
        return ''
      },

      style () {
        return ''
      }
    },

    mounted () {
    }
  }
</script>

<style lang='sass' scoped>
  .editor
    position: absolute
    top: 0
    left: 0
    right: 0
    bottom: 0
    text-align: center
    overflow-y: scroll
    z-index: 500

  .medium-container
    position: relative
    max-width: 700px
    padding: 20vh .5rem 0
    margin: 0 auto
    background: transparent
    overflow: hidden

  .medium-editor
    width: 100%
    border: none
    outline: none
    cursor: text
    line-height: 1.75
    text-align: left

    // medium-editor placeholder
    &:after
      font-style: normal
      cursor: text
      transition: opacity .2s
      opacity: .5

    &:hover
      &:after
        opacity: .2
</style>
