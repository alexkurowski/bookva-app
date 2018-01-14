<template lang='slm'>
  #export-manager.view
    .header
      span.big {{ $t('export.header.big') }}
      span.small {{ $t('export.header.small') }}

    .body
      Title/
      Chapters/

    .bottom
      .btn [
        @click='onExport'
      ] Export

      .btn [
        @click='onBack'
      ] Cancel
</template>

<script>
  import Title from './export_manager/Title'
  import Chapters from './export_manager/Chapters'

  import { Appearance } from '@/helpers/store_helper'

  export default {
    name: 'ExportManager',

    components: {
      Title,
      Chapters
    },

    methods: {
      onExport () {
      },

      onBack () {
        this.$router.go(-1)
      }
    }
  }
</script>

<style lang='sass' scoped>
  .view
    display: flex
    flex-direction: column
    user-select: none

    > *
      padding: 1rem

  .header
    display: flex

    .big
      font-size: 1.25rem
      font-weight: bold
      margin-right: 3rem
      white-space: nowrap

    .small
      line-height: 1.25rem

  .body
    flex: 1
    overflow-y: auto

  .bottom
    display: flex
    justify-content: center

    .btn
      display: flex
      align-items: center
      justify-content: center
      width: 5rem
      padding: .75rem
      margin: 0 .5rem
      border: 1px solid currentColor
      border-radius: 4px
      transition: opacity .3s
      cursor: pointer

      &:hover
        opacity: .5
</style>
