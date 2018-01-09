<template lang='slm'>
  #sidebar-controls
    .btn[
      :title='$t("writer.sidebar.title.projectMenu")'
      @click='openProjectMenu'
      @contextmenu='openProjectMenu'
    ]
      .icon.icon-book

    .btn[
      :title='$t("writer.sidebar.title.fileTree")'
      :class='isActive("FileTree")'
      @click='setSidebarPage("FileTree")'
    ]
      .icon.icon-bookmark

    .btn[
      :title='$t("writer.sidebar.title.themeSelector")'
      :class='isActive("ThemeSelector")'
      @click='setSidebarPage("ThemeSelector")'
    ]
      .icon.icon-adjust-contrast

    .btn[
      :title='$t("writer.sidebar.title.share")'
      v-if='showShareButton'
    ]
      .icon.icon-world-outline
</template>

<script>
  import { Sidebar } from '@/helpers/store_helper'
  import { openProjectMenu } from '@/helpers/project_menu'
  import Config from '@/config/config'

  export default {
    name: 'Controls',

    computed: {
      showShareButton () {
        return Config.showShareButton
      }
    },

    methods: {
      isActive (page) {
        return Sidebar.sidebarPage == page
          ? 'active'
          : ''
      },

      setSidebarPage (page) {
        this.$store.commit('sidebarSetPage', page)
      },

      openProjectMenu (event) {
        openProjectMenu(event, this.$store.dispatch)
      }
    }
  }
</script>

<style lang='sass' scoped>
  #sidebar-controls
    display: flex
    justify-content: space-between

  .btn
    display: flex
    align-items: center
    justify-content: center
    position: relative
    width: $sidebar-controls-width
    height: $sidebar-controls-height
    cursor: pointer

    .icon
      font-size: 1.5em

    &:after
      content: ''
      position: absolute
      top: 0
      left: 0
      right: 0
      bottom: 0
      background: $color-subtle
      opacity: 0
      transition: opacity .3s

      top: $sidebar-controls-height - 4px
      background: $color-action

    &:hover
      &:after
        opacity: 1

    &.active
      &:after
        opacity: 1
</style>
