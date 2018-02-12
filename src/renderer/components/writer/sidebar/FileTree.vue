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

      .entry.root-entry [
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
          .entry [
            :data-file-id='file.id'
            v-for='file in filesInFolder(entry.id)'
          ]
            File :file='file'

      .entry.root-entry [
        :data-file-id='entry.id'
        v-else
      ]
        File :file='entry'

    .controls
      .add-menu [
        :title='$t("writer.sidebar.fileTree.title.add")'
        @click='openAddMenu'
      ]
        .icon.icon-plus
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
          draggable: '.entry',
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

        if ( !fileId )
          this.draggableOptions.draggable = '.root-entry'

        if ( fileId && !isOpen )
          this.$store.commit('sidebarSetDraggedFileId', fileId)
      },

      onEnd () {
        this.draggableOptions.draggable = '.entry'

        this.$store.commit('sidebarSetDraggedFileId', null)
      },

      addFile () {
        this.$store.commit('projectAddFile')
      },

      addFolder () {
        this.$store.commit('projectAddFolder')
      },

      openAddMenu (event) {
        this.$store.dispatch('contextMenuShow', {
          position: {
            x: event.x,
            y: event.y
          },
          items: [
            {
              icon: 'icon icon-plus',
              text: this.$t('contextMenu.add.file'),
              commit: 'projectAddFile'
            },
            {
              icon: 'icon icon-plus',
              text: this.$t('contextMenu.add.folder'),
              commit: 'projectAddFolder'
            }
          ]
        })
      },
    }
  }
</script>

<style lang='sass' scoped>
  #file-tree
    position: relative
    min-height: 100%
    padding-bottom: $status-bar-height
    box-sizing: border-box

  .root
    padding-bottom: 1rem

  .controls
    display: flex
    justify-content: flex-start
    position: absolute
    bottom: 0
    left: 0
    right: 0
    height: $status-bar-height

  .add-menu
    padding: .5rem
    cursor: pointer
    transition: opacity .3s

    &:hover
      opacity: .5

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
