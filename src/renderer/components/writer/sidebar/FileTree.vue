<template lang='slm'>
  #file-tree

    Draggable[ id='file-list'
               v-model='files'
               :options='draggableOptions'
               @start='onDragStart'
               @end='onDragEnd' ]

      .entry v-for='file in files'
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
      files: {
        get () {
          return Project.files
        },
        set (files) {
        }
      },
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
