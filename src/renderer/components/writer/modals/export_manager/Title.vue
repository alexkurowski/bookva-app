<template lang='slm'>
  .export-title

    label {{ $t('export.body.title.label') }}
    input#export-title [
      :placeholder='$t("export.body.title.placeholder")'
    ]
</template>

<script>
  export default {
    name: 'Title'
  }
</script>

<style lang='sass' scoped>
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
