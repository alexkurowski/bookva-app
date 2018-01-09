<template lang='slm'>
  #file-tree

    Draggable [
      class='root'
      :list='root'
      :options='draggableOptions'
      :move='onMove'
      @sort='onSort'
      @start='onStart'
      @end='onEnd'
    ]

      .entry [
        :data-folder-id='entry.id'
        v-for='entry in root'
        v-if='entry.isFolder'
      ]
        Folder :folder='entry'

        Draggable [
          :list='filesInFolder(entry.id)'
          :class='inFolderClass'
          :options='draggableOptions'
          :move='onMove'
          @sort='onSort'
          @start='onStart'
          @end='onEnd'
          v-show='isFolderOpen(entry.id)'
        ]
          .entry[
            :data-file-id='file.id'
            v-for='file in filesInFolder(entry.id)'
          ]
            File :file='file'

      .entry[
        :data-file-id='entry.id'
        v-else
      ]
        File :file='entry'

    .controls
      .add-file.file-tree-item[
        :data-folder-id='null'
        @click='addFile'
      ]
        i.icon.icon-plus
        | {{ $t('writer.sidebar.new.file') }}

      .add-folder.file-tree-item[
        @click='addFolder'
      ]
        i.icon.icon-plus
        | {{ $t('writer.sidebar.new.folder') }}
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
        return Project.foldersOpen.includes(folder)
      },

      isFolderEmpty (folder) {
        return Object.values(Project.files)
          .filter(file => file.folder === folder)
          .length == 0
      },

      getParentFolderId (node) {
        const parent = node.parentNode
        const isInFolder =
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

      // FIXME (Alex): this onMove and onSort part is a terrible hack
      // but I couldn't think of a better way to achieve the desired FileTree behavior...
      onMove (event, origEvent) {
        setTimeout(() => {
          const entries = [
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

      onSort (event) {
        let order = 0

        this
          .dragged
          .forEach(entry => {
            if (entry.node.dataset.fileId) {

              this.$store.commit('projectUpdateFile', {
                id: entry.node.dataset.fileId,
                folder: entry.folder,
                order: order++
              })

            } else
            if (entry.node.dataset.folderId) {

              this.$store.commit('projectUpdateFolder', {
                id: entry.node.dataset.folderId,
                order: order++
              })

            }
          })
      },

      onStart (event) {
        const fileId = event.item.dataset.fileId
        const isOpen = Project.filesOpen.includes(fileId)
        if ( fileId && !isOpen )
          this.$store.commit('sidebarSetDraggedFileId', fileId)
      },

      onEnd () {
        this.$store.commit('sidebarSetDraggedFileId', null)
      },

      addFile () {
        this.$store.commit('projectAddFile')
      },

      addFolder () {
        this.$store.commit('projectAddFolder')
      },
    }
  }
</script>

<style lang='sass' scoped>
  .root
    padding-bottom: 1rem

  .add-file,
  .add-folder
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
      padding-left: 5rem

  .sortable-drag
    opacity: 0.5 !important

  .dropper
    position: fixed
    top: 0
    left: $sidebar-width
    right: 0
    bottom: 0
    background: $color-action
    opacity: .5
</style>
