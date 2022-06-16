<template>
  <Docs :propLinks="savedLinks" relativeUrl="/v2/docs/" :title="title" :description="description" :keywords="keywords">
    <slot></slot>
  </Docs>
</template>

<script>
import Docs from '../docs.vue'
export default {
  components: {
    Docs,
  },
  props: {
    title: String,
    description: String,
    keywords: String,
  },
  data() {
    return {
      savedLinks: [],
    }
  },
  fetch() {
    const links = require('../../content/v2/docs')
    this.savedLinks = links
  },
}
</script>

<style>
</style>