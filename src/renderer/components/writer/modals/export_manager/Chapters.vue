<template lang='slm'>
  .chapters

    .table-container.export-file-tree
      .table
        .header.row
          .item.icon
          .item.icon
          .item.left-aligned.max-width Title
          .item.words Words

        .row [
          v-for='entry in fileTree'
          @click='toggle(entry)'
        ]
          .item.icon.left-aligned
            i.fa.fa-fw.fa-check-square-o [
              v-if='isSelected(entry)'
            ]
            i.fa.fa-fw.fa-square-o [
              v-else
            ]

          .item.icon
            i.fa.fa-fw.fa-folder-open-o [ v-if='entry.isFolder' ]

          .item.max-width.left-aligned.no-wrap [
            :class='{ "in-folder": !entry.isFolder && entry.folder }'
          ]
            | {{ entry.title || 'Untitled' }}

          .item.words.right-aligned
            span [
              v-if='!entry.isFolder'
            ]
              | {{ entry.wordCount }}

    .table-container.selected-files
      .table
        .header.row
          th.left-aligned Chapters to export

        Draggable [
          v-model='selected'
        ]
          .row.entry [
            v-for='file in selected'
          ]
            span.no-wrap
              | {{ file.title || 'Untitled' }}
</template>

<script>
  import Draggable from 'vuedraggable'

  import { Project } from '@/helpers/store_helper'

  export default {
    name: 'Chapters',

    components: {
      Draggable
    },

    data () {
      return {
        draggableOptions: {
          draggable: '.entry'
        },

        selected: [],
      }
    },

    computed: {
      files () {
        return Object
          .values(Project.files)
      },

      folders () {
        return Object
          .values(Project.folders)
          .filter(folder => (
            this
              .files
              .filter(file => file.folder == folder.id)
              .length > 0
          ))
      },

      fileTree () {
        return [
          ...this.files,
          ...this.folders
        ].sort((a, b) => (a.order - b.order))
      },
    },

    methods: {
      selectFile (file) {
        if (!this.isSelected(file))
          this.selected.push(file)
      },

      selectFolder (folder) {
        this
          .files
          .filter(file => file.folder == folder.id)
          .forEach(file => this.selectFile(file))
      },

      deselectFile (file) {
        const index = this.selected.indexOf(file)
        if (index != -1)
          this.selected.splice(index, 1)
      },

      deselectFolder (folder) {
        this
          .files
          .filter(file => file.folder == folder.id)
          .forEach(file => this.deselectFile(file))
      },

      toggle (entry) {
        if (this.isSelected(entry)) {
          if (entry.isFolder) {
            this.deselectFolder(entry)
          } else {
            this.deselectFile(entry)
          }
        } else {
          if (entry.isFolder) {
            this.selectFolder(entry)
          } else {
            this.selectFile(entry)
          }
        }
      },

      isSelected (entry) {
        if (entry.isFolder) {
          return this
            .files
            .filter(file => file.folder == entry.id)
            .every(file => this.selected.includes(file))
        } else {
          return this.selected.includes(entry)
        }
      }
    }
  }
</script>

<style lang='sass' scoped>
  $item-height: 36px

  .chapters
    display: flex

  .table-container
    flex: 1
    width: 50%
    padding: 1rem
    box-sizing: border-box

  .table
    display: flex
    flex-direction: column

  .header
    font-weight: bold

  .row
    display: flex
    height: $item-height
    align-items: center
    max-width: 100%
    overflow: hidden
    cursor: pointer

    &:hover
      background: $color-subtle

  .item
    display: block
    padding: 0 .5rem

    &.icon
      width: 1rem

      .fa-fw
        width: 0

    &.max-width
      flex: 1

    &.words
      width: 3rem
      text-align: center

    &.in-folder
      padding-left: 1.5rem


  .entry
    display: flex
    align-items: center
    justify-content: flex-start
    height: $item-height
    padding: 0 .5rem
    cursor: pointer

  .left-aligned
    text-align: left !important

  .right-aligned
    text-align: right !important

  .max-width
    width: 100%

  .no-wrap
    white-space: nowrap
    overflow: hidden
</style>
