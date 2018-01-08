<template lang='slm'>
  #modal-container :class='shown'
    ConfirmModal v-if='isType("Confirm")'/
</template>

<script>
  import ConfirmModal from './modals/Confirm'

  import { Modal } from '@/helpers/store_helper'

  export default {
    name: 'ModalContainer',

    components: {
      ConfirmModal
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
  #modal-container
    display: flex
    align-items: center
    justify-content: center
    position: fixed
    top: 0
    left: 0
    right: 0
    bottom: 0
    background: rgba(255, 255, 255, 0.6)
    z-index: 10000
    opacity: 0
    transition: opacity .5s, backdrop-filter .3s

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
    top: 100px
    min-width: 300px
    min-height: 160px
    padding: 1rem
    background: white
    border-radius: 10px
    box-shadow: 0 1px 4px 2px $color-subtle
    transition: top .3s ease
    text-align: center
</style>
