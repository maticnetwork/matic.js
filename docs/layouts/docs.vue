<template>
  <div class="row b-tutorial">
    <div class="col-sm-4 col-md-3 col-lg-2 b-tutorial__links">
      <input
        class="textbox b-tutorial__links__search"
        type="text"
        placeholder="Search in docs"
        v-model="searchText"
        @input="onSearch"
      />
      <div
        class="b-tutorial__links__search-result"
        v-if="searchResults.length > 0"
      >
        <a
          class="row content-v-center ripple"
          v-for="link in searchResults"
          :key="link.text"
          :href="link.url"
          >{{ link.text }}</a
        >
      </div>
      <div v-else v-for="(link, index) in links" :key="link.text">
        <a
          class="row content-v-center b-tutorial__links__item ripple"
          :class="{
            'b-tutorial__links__item--active':
              childActiveUrlIndex < 0 && index === activeUrlIndex,
            'b-tutorial__links__item--active-with-children':
              link.children && childActiveUrlIndex < 0,
          }"
          :href="url(link)"
        >
          <template v-if="link.children">
            <i v-if="index === activeUrlIndex" class="fas fa-chevron-down"></i>
            <i v-else class="fas fa-chevron-right"></i>
          </template>
          {{ link.text }}
        </a>
        <template v-if="index === activeUrlIndex">
          <a
            v-for="(item, childIndex) in link.children"
            :key="item.url"
            class="row content-v-center b-tutorial__links__item-children ripple"
            :class="{
              'b-tutorial__links__item--active':
                childIndex === childActiveUrlIndex,
            }"
            :href="url(link.url + '/' + item.url)"
          >
            {{ item.text }}
          </a>
        </template>
      </div>
    </div>
    <div class="b-tutorial__content col-sm-8 col-md-9 col-lg-8">
      <slot></slot>
      <div class="b-tutorial__content__btns">
        <a :href="prevUrl">
          <i class="fas fa-chevron-left"></i>
        </a>
        <a :href="nextUrl">
          <i class="fas fa-chevron-right"></i>
        </a>
      </div>
    </div>
    <div class="col-lg-2 width-full pl-10px pr-5px">
      <a class="ad-container" target="_blank" href="https://jsstore.net/">
        <h6>JsStore</h6>
        <img class="mt-5px" src="//jsstore.net/img/JsStore_350_155.png" />
        <div>Complete IndexeDB wrapper with SQL like api.</div>
      </a>
    </div>
    <div class="b-tutorial__sticky-btn">
      <a
        class="btn rounded secondary margin-bottom-70px"
        alt="edit this doc"
        target="_blank"
        href="https://gitter.im/fortjs/Lobby"
      >
        <i class="fab fa-gitter"></i>
      </a>
      <a
        alt="edit this doc"
        target="_blank"
        :href="`https://github.com/ujjwalguptaofficial/fortjs.docs/edit/master/content${currentUrl}.md`"
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
<script  >
import { copyToClipboard } from "@/utils";
import FlexSearch from "flexsearch";
export default {
  created() {
    this.ads = ["Component based framework for nodejs"];
    this.finder = new FlexSearch({
      encode: "balance",
      tokenize: "forward",
      threshold: 0,
      async: true,
      worker: false,
      cache: false,
    });
  },
  head() {
    return {
      title: `JsStore - ${this.title}`,
      meta: [
        // hid is used as unique identifier. Do not use `vmid` for it as it will not work
        {
          hid: "keywords",
          name: "keywords",
          content: this.keywords,
        },
        {
          hid: "description",
          name: "description",
          content: this.description,
        },
      ],
    };
  },
  props: {
    contentSrc: String,
    title: String,
    description: String,
    keywords: String,
  },
  computed: {
    currentUrl() {
      let path = this.$route.path;
      const length = path.length;
      if (path[length - 1] === "/") {
        path = path.substr(0, length - 1);
      }
      return path;
    },
    activeUrlIndex() {
      const splittedPath = this.currentUrl.split("/");
      const lastPath = splittedPath[splittedPath.length - 1];
      const result = this.links.findIndex((val) => {
        if (val.url === lastPath) {
          this.childActiveUrlIndex = -1;
          return true;
        }
        const children = val.children;
        if (children) {
          for (let i = 0, length = children.length; i < length; i++) {
            if (children[i].url === lastPath) {
              this.childActiveUrlIndex = i;
              return true;
            }
          }
        }
      });
      // console.log("result", result, this.childActiveUrlIndex);
      return result;
    },
    prevUrl() {
      return this.getLink(-1);
    },
    nextUrl() {
      return this.getLink(1);
    },
  },
  data() {
    return {
      links: [],
      childActiveUrlIndex: -1,
      searchResults: [],
      searchText: "",
    };
  },
  fetch() {
    const links = require("../content/docs");
    this.links = links;
  },
  mounted() {
    window.comp = this;
    hljs.highlightAll();
    const copyHtml = `Copy <i class="margin-left-10px far fa-copy"></i>`;
    document.querySelectorAll("pre code").forEach((el) => {
      const div = document.createElement("div");
      div.className = "code-copy ripple";
      div.innerHTML = copyHtml;
      el.parentNode.prepend(div);
      div.onclick = () => {
        const text = el.innerText;
        copyToClipboard(text);
        div.innerHTML = `Copied <i class="margin-left-10px fas fa-check"></i>`;
        setTimeout(() => {
          div.innerHTML = copyHtml;
        }, 1000);
      };
    });
    this.addLinksToFinder();
  },
  methods: {
    onSearch() {
      if (this.searchTimer) {
        clearTimeout(this.searchTimer);
      }
      this.searchTimer = setTimeout(() => {
        this.finder.search(this.searchText).then((results) => {
          this.searchResults = results.map((item) => {
            return { url: item, text: this.flatLinks[item] };
          });
          this.searchTimer = null;
        });
      }, 200);
    },
    addLinksToFinder() {
      const flatLinks = {};
      this.links.forEach((link) => {
        let url = this.url(link.url);
        flatLinks[url] = link.text;
        this.finder.add(url, link.text);
        if (link.children) {
          link.children.forEach((item) => {
            url = this.url(link.url + "/" + item.url);
            flatLinks[url] = item.text;
            this.finder.add(url, item.text);
          });
        }
      });
      this.flatLinks = flatLinks;
    },
    url(value) {
      let url = value;
      if (typeof value === "object") {
        url = value.url;
        const children = value.children;
        if (value.expand && children) {
          url = url + "/" + children[0].url;
        }
      }
      return "/tutorial/" + url;
    },
    getLink(delta) {
      const childActiveUrlIndex = this.childActiveUrlIndex;
      let path;
      let activeLink = this.links[this.activeUrlIndex];
      const activeLinkChildren = activeLink.children;
      if (childActiveUrlIndex >= 0 || (activeLinkChildren && delta > 0)) {
        const nextChildren = activeLinkChildren[childActiveUrlIndex + delta];
        if (nextChildren) {
          path = activeLink.url + "/" + nextChildren.url;
        } else if (delta < 0) {
          path = activeLink.url;
        }
      }
      if (!path) {
        const deltaLink = this.links[this.activeUrlIndex + delta];
        if (deltaLink) {
          path = deltaLink.url;
        }
      }

      return path ? this.url(path) : "/";
    },
    goto(delta) {
      return this.$router.push({
        path: this.getLink(delta),
      });
    },
  },
};
</script>
<style scoped lang="scss">
.b-tutorial {
  padding: 10px 10px 0 10px;
}
.b-tutorial__links {
  padding-right: 30px;
  border-right: 1px solid #e9ecef;
  position: sticky;
  top: 4rem;
  z-index: 100;
  height: calc(100vh - 4rem);
  overflow-y: scroll;
  &::-webkit-scrollbar {
    width: 3px;
  }
  &::-webkit-scrollbar-thumb {
    background: #e4dddd;
  }
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

.b-tutorial__links__item-children {
  @extend .b-tutorial__links__item;
  margin-left: 20px;
  font-size: 1rem;
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
.b-tutorial__content {
  padding-left: 40px;
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
  right: 0;
  bottom: 20px;
  display: flex;
  flex-direction: column;
  z-index: 1000;
  a {
    width: 56px;
    height: 56px;
    border-radius: 50%;
    margin-bottom: 10px;
    padding: 0;
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
.b-tutorial__links__search-result {
  a {
    @extend .b-tutorial__links__item;
  }
}
</style>