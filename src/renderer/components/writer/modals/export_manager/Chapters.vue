<template lang='slm'>
  .chapters

    .export-file-tree
      table
        tr
          th.icon
          th.icon
          th.left-aligned Title
          th Words

        tr [
          v-for='entry in fileTree'
          @click='toggle(entry)'
        ]
          td
            i.fa.fa-fw.fa-check-square-o [
              v-if='isSelected(entry)'
            ]
            i.fa.fa-fw.fa-square-o [
              v-else
            ]
          td
            i.fa.fa-fw.fa-folder-open-o [ v-if='entry.isFolder' ]
          td.left-aligned [
            :class='{ "in-folder": !entry.isFolder && entry.folder }'
          ]
            | {{ entry.title || 'Untitled' }}
          td
            span [
              v-if='!entry.isFolder'
            ]
              | {{ entry.wordCount }}

    .selected-files
      table
        tr
          th Chapters to export

        Draggable [
          v-model='selected'
        ]
          .entry [
            v-for='file in selected'
          ]
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

  .export-file-tree
    flex: 1
    padding: 1rem

    .fa-fw
      width: 1rem
      margin-right: .5rem
      text-align: left

  .selected-files
    flex: 1
    padding: 1rem

    .entry
      display: flex
      align-items: center
      justify-content: flex-start
      height: $item-height
      padding: 0 .5rem
      cursor: pointer

      &:hover
        background: $color-subtle

  table
    width: 100%
    border-collapse: collapse

  tr
    height: $item-height
    cursor: pointer

    &:hover
      background: $color-subtle

  th,
  td
    text-align: center
    vertical-align: middle

  td.in-folder
    padding-left: 1rem

  .icon
    width: 2rem

  .left-aligned
    text-align: left

  .right-aligned
    text-align: right

  .big-size
    font-size: 1.5rem
</style>
