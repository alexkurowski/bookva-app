<template lang='slm'>
  .chapters
    .export-file-tree
      .entry [
        v-for='entry in root'
        v-if='entry.isFolder'
      ]
        span Folder: {{ entry.title }}

        .entry.in-folder [
          v-for='entry in filesInFolder(entry.id)'
        ]
          span -- File: {{ entry.title }}

      .entry [
        v-else
      ]
        span File: {{ entry.title }}
</template>

<script>
  import Draggable from 'vuedraggable'

  import { Project } from '@/helpers/store_helper'

  const orderSort = (a, b) => (a.order - b.order)

  export default {
    name: 'Chapters',

    components: {
      Draggable
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
      }
    },

    methods: {
      filesInFolder (folder) {
        return this
          .files
          .filter(file => file.folder === folder)
      },
    }
  }
</script>

<style lang='sass' scoped>
  .entry
    min-height: 64px
</style>
