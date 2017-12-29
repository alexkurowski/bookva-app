<template lang='slm'>
  #file-tree

    Draggable[ :list='root'
               :options='draggableOptions'
               :move='onMove'
               @sort='onDrag' ]

      .entry[ :data-folder-id='entry.id'
              v-for='entry in root'
              v-if='entry.isFolder' ]
        Folder :folder='entry'

        Draggable[ :list='filesInFolder(entry.id)'
                   :class='inFolderClass'
                   :options='draggableOptions'
                   :move='onMove'
                   @sort='onDrag'
                   v-show='isFolderOpen(entry.id)' ]

          .entry[ :data-file-id='file.id'
                  v-for='file in filesInFolder(entry.id)' ]
            File :file='file'

      .entry[ :data-file-id='entry.id'
              v-else ]
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
        },

        dragged: [],

        inFolderClass: 'in-folder'
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

      getParentFolderId (node) {
        let parent = node.parentNode
        let isInFolder =
          node
            .parentNode
            .className
            .indexOf(this.inFolderClass) != -1

        if (isInFolder) {
          return node
            .parentNode
            .parentNode
            .dataset
            .folderId
        } else {
          return null
        }
      },

      // FIXME: this onMove and onDrag part is a terrible hack
      // but I couldn't think of a better way to achieve the desired FileTree behavior...
      onMove (event, origEvent) {
        setTimeout(() => {
          let entries = [
            ...document
              .querySelectorAll('#file-tree .entry:not([style*="display:none"]):not([style*="display: none"])')
          ]

          this.dragged =
            entries
              .map(entry => ({
                node: entry,
                folder: this.getParentFolderId(entry)
              }))
        }, 0)
      },

      onDrag (event) {
        let order = 0

        this
          .dragged
          .forEach(entry => {
            if (entry.node.dataset.fileId) {

              this.$store.commit('updateFile', {
                id: entry.node.dataset.fileId,
                folder: entry.folder,
                order: order++
              })

            } else
            if (entry.node.dataset.folderId) {

              this.$store.commit('updateFolder', {
                id: entry.node.dataset.folderId,
                order: order++
              })

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
