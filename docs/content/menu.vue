<template>
  <div class="b-menu row">
    <div class="row col-6 col-sm-4 b-menu__left">
      <button v-if="shouldShowMenuIcon" @click="onMenuBtnClick" class="b-menu__left__hamburger">
        <i class="material-icons">menu</i>
      </button>
      <a class="row b-menu__left__icon content-v-center" href="" title="JsStore Index Page">
        <img :src="'logo.svg' | imgPath" alt="MaticJs Logo" />
        <span class="ml-10px">Matic.js</span>
      </a>
    </div>
    <div id="b-menu__github-info" class="col-6 col-sm-8 row content-v-center b-menu__github-info">
      <a class="b-menu__github-info__item" title="star jsstore" :href="githubUrl">
        <i class="fab fa-github"></i>
        Star
        <span class="star-count" v-if="starCount">{{ starCount }}</span>
      </a>
      <span class="b-menu__github-info__item hide-on-mobile">
        <span class="ml-10px mr-10px">|</span>
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
      </span>
      <span class="b-menu__github-info__item hide-on-mobile">
      <template v-if="release">
        <span class="ml-10px mr-10px">|</span>
        <a target="_blank" :href="release.url">{{ release.tag }}</a>
      </template>
      </span>
    </div>
  </div>
</template>
<script>
import { bus } from '@/utils';

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
      bus.$emit('menuClicked');
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
  align-items: center;
  background: var(--primary-color);
  padding: 0 10px;
  height: 64px;
  color: var(--primary-contrast-color);
  position: sticky;
  z-index: 1001;
  top: 0;

  &__left{
    &__icon{
      img{
        height: 22px;
      }
    }

    &__hamburger{
       background-color: transparent;
      outline: none;
      border: 0;
      color: white;
      height: 64px;
      margin-right: 10px;
    }

    /* for bigger devices */
    @media (min-width: 768px){
      &__icon{
        img{
          height: 30px;
        }
      }

      &__hamburger{
        display: none;
      }
    }
  }
}

a {
  color: var(--primary-contrast-color);
}

.b-menu__github-info{
  justify-content: flex-end;

  &__item{
    @media (max-width: 576px){
      &.hide-on-mobile{
        display:none;
      }
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

