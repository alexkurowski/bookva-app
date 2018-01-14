<template lang='slm'>
  .modal
    .modal-header {{ modalHeader }}
    .modal-body {{ modalBody }}
    .modal-footer
      .modal-choice.secondary @click='cancel'
        i.icon.icon-cancel
        | Cancel
      .modal-choice.primary @click='confirm'
        i.icon.icon-tick
        | Confirm
</template>

<script>
  import { Modal } from '@/helpers/store_helper'

  export default {
    name: 'ConfirmModal',

    computed: {
      modalHeader () {
        return this.$t(`modal.${ Modal.modalContentKey }.header`)
      },

      modalBody () {
        return this.$t(`modal.${ Modal.modalContentKey }.body`)
      },
    },

    methods: {
      confirm () {
        if (Modal.modalStoreCommit) {
          this.$store.commit(
            Modal.modalStoreCommit,
            Modal.modalStoreParams
          )
        }

        if (Modal.modalStoreDispatch) {
          this.$store.dispatch(
            Modal.modalStoreDispatch,
            Modal.modalStoreParams
          )
        }

        this.$store.commit('modalHide')
      },

      cancel () {
        this.$store.commit('modalHide')
      }
    }
  }
</script>

<style lang='sass' scoped>
  .modal
    max-width: 60%
    margin: auto
</style>
