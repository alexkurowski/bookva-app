<template lang='slm'>
  .export-info

    .export-info-field.export-title
      label {{ $t('export.body.title.label') }}
      input#export-title [
        :placeholder='$t("export.body.title.placeholder")'
        :value='title'
      ]

    .export-info-field.export-author
      label {{ $t('export.body.author.label') }}
      input#export-author [
        :placeholder='$t("export.body.author.placeholder")'
        :value='author'
      ]
</template>

<script>
  import { Project } from '@/helpers/store_helper'

  export default {
    name: 'Info',

    computed: {
      title () {
        return Project.projectTitle
      },

      author () {
        return Project.projectAuthor
      },
    }
  }
</script>

<style lang='sass' scoped>
  .export-info
    display: flex

  .export-info-field
    flex: 1
    padding: 0 1rem

  label
    font-weight: bold
    opacity: .75

  input
    color: inherit
    background: transparent
    width: 100%
    padding: .5rem
    margin-top: .5rem
    border: 1px solid currentColor
    border-radius: 4px
    outline: none
    box-sizing: border-box
    transition: border-color .2s

    &:focus
      border-color: $color-action

    &::placeholder
      color: currentColor
      opacity: .6
</style>
