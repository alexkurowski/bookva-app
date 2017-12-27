<template lang='slm'>
  #file-tree

    Draggable[ id='file-list'
               v-model='fileList'
               :options='draggableOptions'
               @start='onDragStart'
               @end='onDragEnd' ]

      .entry v-for='file in fileList'
        File :file='file'
</template>

<script>
  import Draggable from 'vuedraggable'
  import File from './file_tree/File'
  import Folder from './file_tree/Folder'

  import { Project } from '../../helpers/store_helper'

  export default {
    name: 'FileTree',

    components: {
      Draggable,
      File,
      Folder
    },

    data () {
      return {
        draggableOptions: {
          handle: '.file',
          filter: '.folder'
        }
      }
    },

    computed: {
      /**
       * Returns an array of all folder names in the project,
       * including temporary ones, uniqued and sorted
       */
      folders () {
        return [
          ...new Set(
            Project
              .files
              .map(file => file.folder)
              .filter(folder => folder)
              .concat(Project.tempFolders)
          )
        ].sort((a, b) => (b.order - a.order))
      },

      fileList: {
        get () {
        },

        set (fileList) {
        }
      }
    },

    methods: {
      onDragStart (event) {
      },

      onDragEnd (event) {
      },
    }
  }
</script>

<style lang='sass' scoped>
</style>
