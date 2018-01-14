<template lang='slm'>
  #modal :class='shown'
    ConfirmModal v-if='isType("Confirm")'/
    ExportManagerModal v-if='isType("ExportManager")'/
</template>

<script>
  import ConfirmModal from './modals/Confirm'
  import ExportManagerModal from './modals/ExportManager'

  import { Modal } from '@/helpers/store_helper'

  export default {
    name: 'Modal',

    components: {
      ConfirmModal,
      ExportManagerModal
    },

    computed: {
      shown () {
        return Modal.modalShown
          ? 'shown'
          : ''
      }
    },

    methods: {
      isType (type) {
        return Modal.modalType == type
      }
    }
  }
</script>

<style lang='sass' scoped>
  #modal
    display: flex
    align-items: center
    justify-content: center
    position: fixed
    top: 0
    left: 0
    right: 0
    bottom: 0
    z-index: 10000
    opacity: 0
    transition: opacity .3s, backdrop-filter .3s
    user-select: none

    &.shown
      opacity: 1
      backdrop-filter: blur(2px)

      .modal
        top: 0 !important

    &:not(.shown)
      pointer-events: none

  .modal
    display: flex
    justify-content: space-between
    flex-direction: column
    position: relative
    top: 2rem
    min-width: 300px
    min-height: 160px
    padding: 1rem 2rem
    color: $dark-fg
    background: $dark-bg
    border-radius: 4px
    box-shadow: 0 1px 4px 2px $color-subtle
    transition: top .5s ease
    text-align: center
</style>
