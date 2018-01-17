<template lang='slm'>
  .modal
    .modal-header {{ modalHeader }}
    .modal-body {{ modalBody }}
    .modal-footer
      .empty
      .modal-choice.secondary @click='hide'
        | {{ $t('modal.alert.ok') }}
</template>

<script>
  import { Modal } from '@/helpers/store_helper'

  export default {
    name: 'AlertModal',

    computed: {
      modalHeader () {
        return this.$t(`modal.${ Modal.modalContentKey }.header`)
      },

      modalBody () {
        return this.$t(`modal.${ Modal.modalContentKey }.body`)
      },
    },

    methods: {
      hide () {
        this.$store.dispatch('modalHide')
      }
    }
  }
</script>

<style lang='sass' scoped>
  .modal
    max-width: 60%
</style>
