<template>
  <div class="row b-tutorial">
    <div class="col-sm-4 col-md-3 col-lg-3 b-tutorial__links" :class="{ show: isMenuOpened }">
      <input
        class="textbox b-tutorial__links__search"
        type="text"
        placeholder="Search in docs"
        v-model="searchText"
        @input="onSearch"
      />
      <div class="b-tutorial__links__search-result" v-if="searchResults.length > 0">
        <a class="row content-v-center ripple" v-for="link in searchResults" :key="link.text" :href="link.url">{{
          link.text
        }}</a>
      </div>
      <Links
        v-else
        :links="links"
        :url="url"
        :activeUrlIndex="activeUrlIndex"
        :childActiveUrlIndex="childActiveUrlIndex"
        :childDepth="childDepth"
        :isParent="true"
        :spllitedUrl="spllitedUrl"
        :relative="relativeUrl"
      />
    </div>
    <div class="b-tutorial__content col-12 col-md-9 col-lg-6 pb-20px">
      <slot></slot>
      <!-- <div class="b-tutorial__content__btns">
        <a :href="prevUrl">
          <i class="fas fa-chevron-left"></i>
        </a>
        <a :href="nextUrl">
          <i class="fas fa-chevron-right"></i>
        </a>
      </div> -->
    </div>
    <div class="col-lg-3 width-full pl-10px pr-5px"></div>
    <div class="b-tutorial__sticky-btn">
      <a
        class="btn rounded secondary margin-bottom-70px"
        alt="discord link"
        target="_blank"
        href="https://discord.com/invite/polygon"
      >
        <i class="fab fa-discord"></i>
      </a>
      <a
        alt="edit this doc"
        target="_blank"
        :href="`https://github.com/maticnetwork/matic.js/edit/docs/content${currentUrl}.md`"
        class="btn secondary"
        fixed
        bottom
        right
        fab
      >
        <i class="far fa-edit"></i>
      </a>
    </div>
  </div>
</template>
<script>
import { copyToClipboard, bus } from '@/utils'
import FlexSearch from 'flexsearch'
import Links from './links.vue'

export default {
  components: {
    Links,
  },
  created() {
    this.finder = new FlexSearch({
      encode: 'balance',
      tokenize: 'forward',
      threshold: 0,
      async: true,
      worker: false,
      cache: false,
    })

    // adding event listener for resize
    if (process.browser) {
      window.addEventListener('resize', this.onResize)
    }

    // this event checks for menu onclick
    bus.$on('menuClicked', () => {
      this.toggleMenu()
    })
  },
  destroyed() {
    bus.$off('menuClicked')

    if (process.browser) {
      window.removeEventListener('resize', this.onResize)
    }
  },
  head() {
    return {
      title: `Matic.js ${this.title != 'undefined' ? '- ' + this.title : ''}`,
      meta: [
        // hid is used as unique identifier. Do not use `vmid` for it as it will not work
        {
          hid: 'keywords',
          name: 'keywords',
          content: this.keywords,
        },
        {
          hid: 'description',
          name: 'description',
          content: this.description,
        },
      ],
    }
  },
  props: {
    contentSrc: String,
    title: String,
    description: String,
    keywords: String,
    relativeUrl: {
      default: '/docs/',
    },
    propLinks: {},
  },
  computed: {
    links() {
      return this.propLinks || this.savedLinks
    },
    currentUrl() {
      let path = this.$route.path
      const length = path.length
      if (path[length - 1] === '/') {
        path = path.substr(0, length - 1)
      }
      if (this.isRouteWithIndex) {
        path += '/index'
      }
      return path
    },
    spllitedUrl() {
      return this.currentUrl.split('/').slice(this.relativeUrl.split('/').length - 1)
    },
    activeUrlIndex() {
      const splittedPath = this.spllitedUrl
      const lastPath = splittedPath[splittedPath.length - 1]
      // this.childDepth = -1
      let routeIndex = 0
      const getActiveUrlIndex = (links, isChild = false) => {
        const result = links.findIndex((val, index) => {
          if (val.url === splittedPath[routeIndex]) {
            ++routeIndex
            if (val.url === lastPath) {
              // debugger
              const targetParent = links[index]
              if (targetParent.children) {
                ++this.childDepth
                this.isRouteWithIndex = true
              }
              if (isChild) {
                this.childActiveUrlIndex = index
              } else {
                this.childActiveUrlIndex = -1
                this.childDepth = 0
              }
              return true
            }
          }

          const children = val.children
          if (children) {
            const index = getActiveUrlIndex(children, true)
            if (index >= 0) {
              ++this.childDepth
              return true
            }
            // for (let i = 0, length = children.length; i < length; i++) {
            //   if (children[i].url === lastPath) {
            //     this.childActiveUrlIndex = i
            //     return true
            //   }
            // }
          }
        })
        return result
      }
      const activeUrl = getActiveUrlIndex(this.links)
      // console.log('result', activeUrl, this.childDepth, this.childActiveUrlIndex)
      return activeUrl
    },
    prevUrl() {
      return this.getLink(-1)
    },
    nextUrl() {
      return this.getLink(1)
    },
  },
  data() {
    return {
      savedLinks: [],
      childActiveUrlIndex: -1,
      searchResults: [],
      searchText: '',
      childDepth: 0,
      isRouteWithIndex: false,
      isMenuOpened: true,
      width: '',
    }
  },
  fetch() {
    const links = require('../content/docs')
    this.savedLinks = links
  },
  mounted() {
    this.onResize()
    hljs.highlightAll()
    const copyHtml = `Copy <i class="margin-left-10px far fa-copy"></i>`
    document.querySelectorAll('pre code').forEach(el => {
      const div = document.createElement('div')
      div.className = 'code-copy ripple'
      div.innerHTML = copyHtml
      el.parentNode.prepend(div)
      div.onclick = () => {
        const text = el.innerText
        copyToClipboard(text)
        div.innerHTML = `Copied <i class="margin-left-10px fas fa-check"></i>`
        setTimeout(() => {
          div.innerHTML = copyHtml
        }, 1000)
      }
    })

    // focus on active elements
    document.querySelector('.b-tutorial__links__item--active').focus()
    this.addLinksToFinder()
  },
  methods: {
    onSearch() {
      if (this.searchTimer) {
        clearTimeout(this.searchTimer)
      }
      this.searchTimer = setTimeout(() => {
        this.finder.search(this.searchText).then(results => {
          this.searchResults = results.map(item => {
            return { url: item, text: this.flatLinks[item] }
          })
          this.searchTimer = null
        })
      }, 200)
    },
    addLinksToFinder() {
      const flatLinks = {}
      this.links.forEach(link => {
        let url = this.url(link.url)
        flatLinks[url] = link.text
        this.finder.add(url, link.text)
        if (link.children) {
          link.children.forEach(item => {
            url = this.url(link.url + '/' + item.url)
            flatLinks[url] = item.text
            this.finder.add(url, item.text)
          })
        }
      })
      this.flatLinks = flatLinks
    },
    url(value, relativeUrl = '/docs/') {
      let url = value
      // debugger
      if (typeof value === 'object') {
        url = value.url
        const children = value.children
        if (value.expand && children) {
          return this.url(children[0], relativeUrl + url + '/')
        }
      }
      return relativeUrl + url
    },
    getLink(delta) {
      // console.log('delta', delta, 'activeUrlIndex', this.activeUrlIndex)
      const childActiveUrlIndex = this.childActiveUrlIndex
      let path
      let activeLink = this.links[this.activeUrlIndex]
      // console.log('activeLink', childActiveUrlIndex, this.activeUrlIndex, activeLink, delta, this.activeUrlIndex)
      const activeLinkChildren = activeLink.children
      if (childActiveUrlIndex >= 0 || (activeLinkChildren && delta > 0)) {
        const nextChildren = activeLinkChildren[childActiveUrlIndex + delta]
        if (nextChildren) {
          path = activeLink.url + '/' + nextChildren.url
        } else if (delta < 0) {
          path = activeLink.url
        }
      }
      if (!path) {
        const deltaLink = this.links[this.activeUrlIndex + delta]
        if (deltaLink) {
          path = deltaLink.url
        }
      }

      return path ? this.url(path) : '/'
    },
    goto(delta) {
      return this.$router.push({
        path: this.getLink(delta),
      })
    },
    onResize(e) {
      if (process.browser) {
        this.width = window.innerWidth
      }

      if (this.width < 768) {
        this.isMenuOpened = false
      } else {
        this.isMenuOpened = true
      }
    },
    toggleMenu() {
      this.isMenuOpened = !this.isMenuOpened
    },
  },
}
</script>
<style scoped lang="scss">
.b-tutorial {
  padding: 10px 10px 0 10px;
}
.b-tutorial__links {
  box-sizing: border-box;
  padding: 20px 30px 30px 0;
  border-right: 1px solid #e9ecef;
  position: fixed;
  top: 4rem;
  z-index: 1100;
  height: calc(100vh - 4rem);
  overflow-y: scroll;
  background-color: white;
  transform: translateX(-100%);
  transition: 0.3s ease;
  max-width: 260px;

  &.show {
    transform: translateX(0);
  }

  &::-webkit-scrollbar {
    width: 3px;
  }
  &::-webkit-scrollbar-thumb {
    background: #e4dddd;
  }

  @media (min-width: 768px) {
    position: sticky;
  }
}
.b-tutorial__content {
  padding: 15px 5px;
  overflow-x: hidden;

  @media (min-width: 768px) {
    padding: 20px 40px;
  }
}
.b-tutorial__content__btns {
  display: flex;
  justify-content: space-between;
  font-size: 2rem;
  margin-top: 30px;
  margin-bottom: 20px;
  i {
    cursor: pointer;
  }
}
.b-tutorial__sticky-btn {
  position: fixed;
  right: 10px;
  bottom: 10px;
  display: flex;
  flex-direction: column;
  z-index: 1000;
  a {
    width: 56px;
    height: 56px;
    border-radius: 50%;
    margin-bottom: 10px;
    padding: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 20px;
  }
}
.ad-container {
  text-align: center;
  border: 1px solid;
  display: flex;
  flex-direction: column;
  padding: 5px;
  cursor: pointer;
}
.b-tutorial__links__search {
  padding: 5px 5px;
  max-width: 100%;
  margin-bottom: 20px;
}
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
.b-tutorial__links__search-result {
  a {
    @extend .b-tutorial__links__item;
  }
}
</style>
