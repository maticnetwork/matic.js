<template>
  <div class="b-links" :class="{ 'b-links--ischild': isChild }">
    <div v-for="(link, index) in links" :key="link.text">
      <a
        class="row content-v-center b-tutorial__links__item ripple"
        :class="{
          'b-tutorial__links__item--active': isActiveUrl(link),
        }"
        :href="removeSlash(url(link, relative))"
      >
        <template v-if="link.children">
          <i v-if="index === activeUrlIndex" class="fas fa-chevron-down"></i>
          <i v-else class="fas fa-chevron-right"></i>
        </template>
        {{ link.text }}
      </a>
      <Links
        v-if="index === activeUrlIndex && link.children"
        :links="link.children"
        :url="url"
        :activeUrlIndex="getActiveUrlIndex(link.children, childDepth - 1)"
        :childActiveUrlIndex="childActiveUrlIndex"
        :childDepth="childDepth - 1"
        :relative="relative + link.url + '/'"
        :currentUrlIndex="index"
        :isChild="true"
      />
    </div>
  </div>
</template>

<script>
import LinksD from './links.vue'

export default {
  name: 'Links',
  components: {
    LinksD,
  },
  props: {
    spllitedUrl: {},
    links: Array,
    url: {},
    activeUrlIndex: {},
    childActiveUrlIndex: {},
    childDepth: {},
    relative: {
      default: '/docs/',
    },
    isChild: {
      type: Boolean,
    },
  },
  methods: {
    getActiveUrlIndex(links, depth) {
      if (depth > 0) {
        const spllitedUrl = this.spllitedUrl
        const targetPath = spllitedUrl[spllitedUrl.length - 1 - depth]
        return links.findIndex(q => q.url.match(new RegExp(targetPath, 'i')))
      }
      // debugger
      return depth >= 0 ? 0 : -1
    },
    isActiveUrl(link) {
      // return this.childDepth <= 0 && link === this.$route.path
      link = this.url(link, this.relative)
      const result = link === this.$route.path
      if (process.browser && result) {
        const className = 'b-tutorial__links__item--active'
        const el = document.querySelectorAll(`.${className}`)
        if (el.length > 1) {
          el[0].classList.remove(className)
        }
      }
      return result
    },
    removeSlash(value) {
      // remove / from string at 0th index
      if (value[0] === '/') {
        return value.substr(1)
      }
      return value
    },
  },
}
</script>

<style lang="scss" scoped>
.b-tutorial__links__item {
  cursor: pointer;
  padding: 10px;
  color: var(--link-color);
  font-size: 1.1rem;
  &:hover {
    background-color: rgba(0, 0, 0, 0.05);
  }
  .fas {
    margin-right: 5px;
  }
}

.b-tutorial__links__item--active {
  /* background: var(--secondary-color); */
  border: 1px solid;
  border-radius: 3px;
  text-align: center;
  color: var(--secondary-color);
  justify-content: center;
}
.b-tutorial__links__item--active-with-children {
  justify-content: unset;
}

.b-links--ischild {
  margin-left: 15px;
}
</style>
