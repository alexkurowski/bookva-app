<template lang='slm'>
  .file.file-tree-item[ :class='className'
                        @click='openFile' ]
    Title :editable='false' {{ title }}
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
      className () {
        return Project.folders[this.file.folder]
          ? 'in-folder'
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
  .in-folder
    padding-left: 3rem
</style>
