<template>
  <div class="b-menu row">
    <template v-if="shouldShowMenuIcon">
      <button @click="onMenuBtnClick" class="b-menu__hamburger" style="color: white; padding-right: 10px">
        <i class="material-icons">menu</i>
      </button>
      <a class="row b-menu__icon content-v-center" href="" title="JsStore Index Page">
        <img :src="'logo.svg' | imgPath" alt="MaticJs Logo" />
        <span class="ml-10px">Matic.js</span>
      </a>
    </template>
    <div v-else></div>
    <div id="b-menu__github-info" class="row content-v-center">
      <div>
        <a title="star jsstore" :href="githubUrl">
          <i class="fab fa-github"></i>
          Star
          <span class="star-count" v-if="starCount">{{ starCount }}</span>
        </a>
      </div>
      <div class="ml-10px mr-10px">|</div>
      <a title="fork on github" :href="forkUrl">
        <svg
          version="1.1"
          width="10"
          height="18"
          style="fill: white; vertical-align: sub"
          viewBox="0 0 10 16"
          class="octicon octicon-repo-forked"
          aria-hidden="true"
        >
          <path
            fill-rule="evenodd"
            d="M8 1a1.993 1.993 0 0 0-1 3.72V6L5 8 3 6V4.72A1.993 1.993 0 0 0 2 1a1.993 1.993 0 0 0-1 3.72V6.5l3 3v1.78A1.993 1.993 0 0 0 5 15a1.993 1.993 0 0 0 1-3.72V9.5l3-3V4.72A1.993 1.993 0 0 0 8 1zM2 4.2C1.34 4.2.8 3.65.8 3c0-.65.55-1.2 1.2-1.2.65 0 1.2.55 1.2 1.2 0 .65-.55 1.2-1.2 1.2zm3 10c-.66 0-1.2-.55-1.2-1.2 0-.65.55-1.2 1.2-1.2.65 0 1.2.55 1.2 1.2 0 .65-.55 1.2-1.2 1.2zm3-10c-.66 0-1.2-.55-1.2-1.2 0-.65.55-1.2 1.2-1.2.65 0 1.2.55 1.2 1.2 0 .65-.55 1.2-1.2 1.2z"
          />
        </svg>
        Fork
      </a>
      <template v-if="release">
        <div class="ml-10px mr-10px">|</div>
        <a target="_blank" :href="release.url">{{ release.tag }}</a>
      </template>
    </div>
  </div>
</template>
<script>
export default {
  created() {
    this.repoUrl = 'maticnetwork/matic.js'
  },
  computed: {
    shouldShowMenuIcon() {
      return this.$route.path != '/'
    },
    githubUrl() {
      return 'https://github.com/' + this.repoUrl
    },
    forkUrl() {
      return this.githubUrl + '/fork'
    },
    apiUrl() {
      return 'https://api.github.com/repos/' + this.repoUrl
    },
  },
  data() {
    return {
      release: null,
      starCount: null,
    }
  },
  async mounted() {
    this.activeVersion = this.getVersion()
    try {
      const responses = await Promise.all([fetch(this.apiUrl), fetch(`${this.apiUrl}/releases`)])
      this.starCount = (await responses[0].json()).stargazers_count
      const releaseResponse = await responses[1].json()
      this.release = {
        tag: releaseResponse[0].tag_name,
        url: releaseResponse[0].html_url,
      }
    } catch (ex) {}
  },
  methods: {
    onMenuBtnClick() {
      this.$emit('menu_click')
    },

    onVersionChange() {
      this.$emit('version_change', this.activeVersion)
    },

    getVersion() {
      const currentUrl = this.$route.path
      if (currentUrl.indexOf('v1') >= 0 && currentUrl.indexOf('v2') < 0) {
        return 1
      } else if (currentUrl.indexOf('v2') >= 0 && currentUrl.indexOf('v3') < 0) {
        return 2
      }
      return 3
    },
  },
}
</script>
<style lang="scss" scoped>
.b-menu {
  justify-content: space-between;
  background: var(--primary-color);
  padding: 0 10px;
  height: 64px;
  color: var(--primary-contrast-color);
  position: sticky;
  z-index: 1001;
  top: 0;
}

a {
  color: var(--primary-contrast-color);
}

.b-menu__icon {
  img {
    height: 50px;
  }
}

@media (min-width: 768px) {
  .b-menu__hamburger {
    display: none;
  }

  .b-menu__icon {
    img {
      height: unset;
    }
  }
}
#selectVersions {
  -webkit-appearance: menulist;
  background-color: white;
  margin-top: -3px;
  margin-left: 5px;
  padding: 3px;
  width: 50px;
}
.height-50px {
  height: 50px;
}
.star-count {
  padding: 5px;
  color: black;
  background: white;
  margin-left: 6px;
  position: relative;
  border-radius: 4px;
}
.star-count:before {
  content: '';
  position: absolute;
  display: inline-block;
  width: 0;
  height: 0;
  border-color: transparent;
  border-style: solid;
  top: 50%;
  border-right-color: #fafafa;
  left: -5px;
  margin-top: -6px;
  border-width: 6px 6px 6px 0;
  /* content: "";
  position: absolute;
  height: 0;
  width: 0;
  right: 100%;
  top: 0;
  border: 20px solid transparent;
  border-right: 20px solid red; */
}
</style>

