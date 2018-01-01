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

    .add-file[ :data-folder-id='null'
               @click='addFile' ]
      i.icon.icon-plus
      | {{ $t('writer.sidebar.new.file') }}

    .add-folder[ @click='addFolder' ]
      i.icon.icon-plus
      | {{ $t('writer.sidebar.new.folder') }}
</template>

<script>
  import Draggable from 'vuedraggable'
  import File from './file_tree/File'
  import Folder from './file_tree/Folder'

  import { Writer, Project } from '@/helpers/store_helper'

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
          handle: '.drag-handle',
          animation: 300,
          scrollSpeed: 15
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
        return Writer.foldersOpen.includes(folder)
      },

      isFolderEmpty (folder) {
        return Object.values(Project.files)
          .filter(file => file.folder === folder)
          .length == 0
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

      // FIXME (Alex): this onMove and onDrag part is a terrible hack
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

      addFile () {
        this.$store.commit('addFile')
      },

      addFolder () {
        let params = {}
        this.$store.commit('addFolder', params)
        this.$store.commit('toggleFolder', params.id)
      },
    }
  }
</script>

<style lang='sass' scoped>
  #file-tree > div
    padding-bottom: 1rem

  .add-file,
  .add-folder
    display: flex
    align-items: center
    height: $sidebar-file-tree-height
    padding: 0 1rem !important
    user-select: none
    cursor: pointer

    i
      width: 1.5rem
      padding-right: .5rem
      text-align: center

  .empty-folder
    display: flex
    align-items: center
    height: $sidebar-file-tree-height
    padding: 0 1rem
    padding-left: 3rem
    opacity: .5
    user-select: none

  .in-folder
    min-height: $sidebar-file-tree-height

    .file
      padding-left: 3rem
</style>
