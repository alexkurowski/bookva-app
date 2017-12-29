<template lang='slm'>
  #file-tree

    Draggable[ :options='draggableOptions'
               @sort='onDrag' ]

      div v-for='entry in root'
        .entry v-if='entry.isFolder'
          Folder :folder='entry'

          Draggable[ class='in-folder'
                     :options='draggableOptions'
                     @sort='onDrag'
                     v-if='isFolderOpen(entry.id)' ]

            .entry v-for='file in filesInFolder(entry.id)'
              File :file='file'

        .entry v-else='true'
          File :file='entry'
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
          group: 'fileTree',
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

      root () {
        return [
          ...this.folders,
          ...this.filesInFolder(null)
        ].sort(orderSort)
      },

      // fileTree: {
      //   get () {
      //     let result = []

      //     result.push( ...this.filesInFolder(null) )
      //     this.folders.forEach(folder => {
      //       result.push(folder)
      //       result.push( ...this.filesInFolder(folder.id) )
      //     })

      //     return result
      //   },

      //   set (fileTree) {
      //     console.log("INFO before", JSON.stringify(this.fileTree.map(e => [e.title, e.folder, e.order])))
      //     console.log("INFO new val", JSON.stringify(fileTree.map(e => [e.title, e.folder, e.order])))
      //     let fileOrder   = 0
      //     let folderOrder = 0
      //     let folderId    = null

      //     fileTree.forEach(entry => {
      //       if (entry.isFolder) {

      //         this.$store.commit('updateFolder', {
      //           id: entry.id,
      //           order: folderOrder
      //         })
      //         folderOrder++
      //         folderId = entry.id

      //       } else {

      //         this.$store.commit('updateFile', {
      //           id: entry.id,
      //           folder: folderId,
      //           order: fileOrder
      //         })
      //         fileOrder++

      //       }
      //     })
      //     console.log("INFO after", JSON.stringify(this.fileTree.map(e => [e.title, e.folder, e.order])))
      //   }
      // }
    },

    methods: {
      filesInFolder (folder) {
        return this
          .files
          .filter(file => file.folder === folder)
      },

      isFolderOpen (folder) {
        return false
      },

      onDrag (event) {
        console.log("CALL onDrag", event, this)
      },

      onUpdate (event) {
        let fileOrder   = 0
        let folderOrder = 0
        let folderId    = null

        document
          .querySelectorAll('#file-tree .entry')
          .forEach(entry => {
            if (entry.dataset.fileId) {

              this.$store.commit('updateFile', {
                id: entry.dataset.fileId,
                folder: folderId,
                order: fileOrder
              })
              fileOrder++

            } else
            if (entry.dataset.folderId) {

              this.$store.commit('updateFolder', {
                id: entry.dataset.folderId,
                order: folderOrder
              })
              folderOrder++
              folderId = entry.dataset.folderId

            }
          })
      },
    }
  }
</script>

<style lang='sass' scoped>
  #file-tree > div
    padding-bottom: 1rem
</style>
