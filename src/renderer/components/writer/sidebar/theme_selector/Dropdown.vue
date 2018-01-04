<template lang='slm'>
  .dropdown[ @click='toggle'
             v-clickaway='hide' ]

    .selected {{ selectedText }} {{ suffix }}

    .options v-if='shown'
      .option[ v-for='name, value in options'
               :data-value='value'
               @click='select' ]
        | {{ name }} {{ suffix }}
</template>

<script>
  import { Writer } from '@/helpers/store_helper'

  export default {
    name: 'Dropdown',

    props: [ 'type', 'suffix', 'options', 'change' ],

    data () {
      return {
        value: this.selected,
        shown: false
      }
    },

    computed: {
      selected () {
        return Writer[this.type]
      },

      selectedText () {
        return this.options[this.selected]
      }
    },

    methods: {
      toggle () {
        this.shown = !this.shown
      },

      hide () {
        this.shown = false
      },

      select (event) {
        event.stopPropagation()
        this.shown = false

        let value = event.target.dataset.value
        this.change(this.type, value)
      }
    },
  }
</script>

<style lang='sass' scoped>
</style>
