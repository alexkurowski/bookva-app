<template lang='slm'>
  #file-tree

    Draggable[ id='file-list'
               v-model='fileTree'
               :options='draggableOptions'
               @start='onDragStart'
               @end='onDragEnd' ]

      .entry v-for='file in fileTree'
        Folder :folder='file' v-if='file.isFolder'
        File :file='file' v-else-if='isFolderOpen(file)'
</template>

<script>
  import Draggable from 'vuedraggable'
  import File from './file_tree/File'
  import Folder from './file_tree/Folder'

  import { Project } from '@/helpers/store_helper'

  const orderSort = (a, b) => (a.order - b.order)

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
          handle: '.entry'
        }
      }
    },

    computed: {
      files () {
        return Object
          .values(Project.files)
          .sort(orderSort)
      },

      folders () {
        return Object
          .values(Project.folders)
          .sort(orderSort)
      },

      fileTree: {
        get () {
          let result = []

          result.push( ...this.filesInFolder(null) )
          this.folders.forEach(folder => {
            result.push(folder)
            result.push( ...this.filesInFolder(folder.id) )
          })

          return result
        },

        set (fileTree) {
          let fileOrder   = 0
          let folderOrder = 0
          let folderId    = null

          fileTree.forEach(entry => {
            if (entry.isFolder) {

              this.$store.commit('updateFolder', {
                id: entry.id,
                order: folderOrder
              })
              folderOrder++
              folderId = entry.id

            } else {

              this.$store.commit('updateFile', {
                id: entry.id,
                folder: folderId,
                order: fileOrder
              })
              fileOrder++

            }
          })
        }
      }
    },

    methods: {
      filesInFolder (folder) {
        return this
          .files
          .filter(file => file.folder === folder)
      },

      isFolderOpen (folder) {
        return true
      },

      onDragStart (event) {
      },

      onDragEnd (event) {
      },
    }
  }
</script>

<style lang='sass' scoped>
</style>
