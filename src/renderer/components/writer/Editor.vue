<template lang='slm'>
  .editor[
    :class='[ classHidden, classSide, classSize, classFontFamily, classFontSize ]'
    :style='style' ]

    Medium :file='file' type='title'/
    Medium :file='file' type='content'/
</template>

<script>
  import { Writer, Project } from '../helpers/store_helper'
  import Medium from './Medium'

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
</style>
