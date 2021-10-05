<template>
  <div class="row">
    <div class="col width-full">
      <div id="divLogoContainer">
        <div class="ml-20px">
          <img
            class="responsive-img"
            :src="'JsStore_350_155.png' | imgPath"
            alt="JsStore logo"
          />
        </div>
      </div>
      <div id="divStyle"></div>
    </div>
    <div sm12 offset-md1 md10 offset-xl-2 xl8 class="margin-top-40px">
      <div id="divOverview">
        <h3>Execute Database operation in browsers with JsStore.</h3>
        <div>
          JsStore is an IndexedDB Wrapper. It makes IndexedDB super easy with
          its SQL like apis.
        </div>
      </div>
      <div class="row content-center mt-20px">
        <a class="btn primary mr-10px x-big ripple" href="docs/get-started">
          Get Started
        </a>
        <a
          class="btn secondary outlined mr-10px x-big"
          href="https://github.com/ujjwalguptaofficial/JsStore"
          target="_blank"
        >
          Github
          <i class="margin-left-10px fab fa-github"></i>
        </a>
        <a
          class="btn secondary outlined x-big"
          target="_blank"
          href="https://gitter.im/JsStore/Lobby"
        >
          Get Help
          <i class="margin-left-10px fab fa-gitter"></i>
        </a>
      </div>
      <div class="col mt-20px content-center">
        <h2>Open-source MIT Licensed | Supported with all frameworks</h2>
        <div class="row frameworks">
          <a
            class="vue"
            target="_blank"
            href="https://github.com/ujjwalguptaofficial/jsstore-examples/tree/master/vue"
          >
            <img :src="'vue-logo.png' | imgPath" />
          </a>
          <a
            class="vue"
            target="_blank"
            href="https://github.com/ujjwalguptaofficial/jsstore-examples/tree/master/react"
          >
            <img :src="'React.js_logo-512.png' | imgPath" />
          </a>
          <a
            class="vue"
            target="_blank"
            href="https://github.com/ujjwalguptaofficial/jsstore-examples/tree/master/svelte"
          >
            <img :src="'svelte.png' | imgPath" />
          </a>
          <a
            class="vue"
            target="_blank"
            href="https://github.com/ujjwalguptaofficial/jsstore-examples/tree/master/angular"
          >
            <img :src="'angular.png' | imgPath" />
          </a>
          <a
            class="vue"
            target="_blank"
            href="https://github.com/ujjwalguptaofficial/jsstore-examples/tree/master/electron"
          >
            <img :src="'electronjs.png' | imgPath" />
          </a>
        </div>
      </div>
      <div class="mt-20px top-border">
        <h4></h4>
        <div class="row wrap features content-center">
          <div
            class="features__item"
            v-for="item in features"
            :key="item.title"
          >
            <h4 class="div-header">{{ item.title }}</h4>
            <span class="div-body">
              {{ item.subTitle }}
            </span>
          </div>
        </div>
      </div>
      <div class="col mt-20px top-border content-center">
        <h3>A Big thanks to these open source tools</h3>
        <div class="row mt-20px content-v-center">
          <a
            target="_blank"
            title="github"
            href="https://github.com/ujjwalguptaofficial/JsStore"
          >
            <img
              class="responsive-img"
              :src="'github.svg' | imgPath"
              alt="github logo"
            />
          </a>
          <a
            target="_blank"
            class="ml-20px"
            title="gitter"
            href="https://gitter.im/JsStore"
          >
            <img
              style="height: 50px; width: 50px; padding-top: 8px"
              class="responsive-img"
              :src="'gitter.svg' | imgPath"
              alt="github logo"
            />
          </a>
          <a
            target="_blank"
            class="ml-20px"
            title="npm"
            href="https://www.npmjs.com/package/jsstore"
          >
            <img
              style="height: 50px; width: 50px; padding-top: 8px"
              class="responsive-img"
              :src="'Npm-logo.svg' | imgPath"
              alt="npm logo"
            />
          </a>
          <a
            target="_blank"
            class="ml-20px"
            title="travis"
            href="https://travis-ci.org/ujjwalguptaofficial/JsStore"
          >
            <img
              style="height: 50px; width: 50px; padding-top: 8px"
              class="responsive-img"
              :src="'travis.png' | imgPath"
              alt="travis logo"
            />
          </a>
          <a
            target="_blank"
            class="ml-20px"
            title="meidum"
            href="https://medium.com/jsstore"
          >
            <svg class="svgIcon-use" width="45" height="45" viewBox="0 0 45 45">
              <path
                d="M5 40V5h35v35H5zm8.56-12.627c0 .555-.027.687-.318 1.03l-2.457 2.985v.396h6.974v-.396l-2.456-2.985c-.291-.343-.344-.502-.344-1.03V18.42l6.127 13.364h.714l5.256-13.364v10.644c0 .29 0 .342-.185.528l-1.848 1.796v.396h9.19v-.396l-1.822-1.796c-.184-.186-.21-.238-.21-.528V15.937c0-.291.026-.344.21-.528l1.823-1.797v-.396h-6.471l-4.622 11.542-5.203-11.542h-6.79v.396l2.14 2.64c.239.292.291.37.291.768v10.353z"
              />
            </svg>
          </a>
          <a
            target="_blank"
            class="ml-20px"
            title="saucelab"
            href="https://saucelabs.com/u/ujjwalgupta"
          >
            <img
              style="height: 55px; width: 50px; padding-top: 8px"
              class="responsive-img"
              :src="'saucelab.png' | imgPath"
              alt="travis logo"
            />
          </a>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  head() {
    return {
      meta: [
        {
          hid: "keywords",
          name: "keywords",
          content: "jsstore, sql, indexeddb, storage, wrapper",
        },
        {
          hid: "description",
          name: "description",
          content:
            "JsStore is a client side javascript library for performing database operation inside browser using indexeddb.",
        },
      ],
    };
  },
  created() {
    this.features = [
      {
        title: "Web worker support",
        subTitle: "Code can be executed in Web Worker or without Worker",
      },
      {
        title: "Advanced query support",
        subTitle: "support of join, intersect, union, groupby etc",
      },
      {
        title: "Cross Browsers",
        subTitle:
          "Develop your application without worrying about cross browser compatibility.",
      },
      {
        title: "Sql support",
        subTitle: "Using an extension SqlWeb",
      },
      {
        title: "TypeScript Support",
        subTitle: "Typed result, intillisense",
      },
      {
        title: "Debugging tool",
        subTitle: "JsStore provides IDBStudio to help you debug, manage db.",
      },
    ];
  },
};
</script>


<style lang="scss" scoped>
.flixlovers {
  width: 150px;
  margin-right: 10px;
}
#divLogoContainer {
  position: absolute;
  width: 100%;
  background-color: #42a5f5;
  text-align: center;
  color: white;
  z-index: 1;
}

#divStyle {
  position: relative;
  background-color: #42a5f5;
  color: #fff;
  width: 100%;
  /* height: 150px; */
  height: 204px;
  transform: skewY(5deg);
}

#divOverview {
  font-family: 0;
  text-align: center;
}

.logo-text {
  font-size: 50px;
}

#divLogoContainer div .logo-tagline {
  display: block;
}

#divLinkGroup {
  text-align: center;
  margin-top: 30px;
}

.frameworks {
  margin-top: 20px;
  //   img {
  //     height: 80px;
  //   }

  .vue {
    img {
      width: 40px;
      height: auto;
    }
    margin-right: 20px;
  }
}

.features__item {
  margin-bottom: 28px;
  margin-right: 28x;
  width: 350px;
}
</style>