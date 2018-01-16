<template lang='slm'>
  #modal [
    :class='modalClass'
  ]
    ConfirmModal v-if='isType("Confirm")'/
    ExportManagerModal v-else-if='isType("ExportManager")'/
    AboutModal v-else-if='isType("About")'/
</template>

<script>
  import ConfirmModal from './modals/Confirm'
  import ExportManagerModal from './modals/ExportManager'
  import AboutModal from './modals/About'

  import { Modal } from '@/helpers/store_helper'

  export default {
    name: 'Modal',

    components: {
      ConfirmModal,
      ExportManagerModal,
      AboutModal
    },

    computed: {
      modalClass () {
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
    align-items: flex-start
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
    overflow-y: auto

    &.shown
      opacity: 1
      backdrop-filter: blur(2px)

      .modal
        top: 0

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
    margin: 4rem 0
    border-radius: 4px
    box-shadow: 0 1px 4px 2px $color-subtle
    transition: top .5s ease
</style>
