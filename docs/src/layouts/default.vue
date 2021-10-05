<template>
  <div>
    <Menu />
    <nuxt />
    <AppFooter />
  </div>
</template>

<script>
import Vue from "vue";
import "@/styles/index.scss";
import Menu from "~/content/menu.vue";
import AppFooter from "~/content/footer.vue";
Vue.filter("imgPath", (val) => {
  return "img/" + val;
});

export default {
  components: { Menu, AppFooter },
  mounted() {
    document.querySelectorAll("h1,h2,h3,h4,h5,h6").forEach((el) => {
      if (!el.id) return;
      const link = document.createElement("a");
      link.classList = "anchor";
      link.innerText = "#";
      link.href = "#" + el.id;
      link.setAttribute("aria-hidden", "true");
      el.appendChild(link);
    });
    const tabsElement = document.querySelector("div.tabs");
    if (tabsElement == null) return;
    let activeIndex;
    const tabs = tabsElement.querySelectorAll(".tab");
    const tabNameItems = [];

    const tabNames = document.createElement("div");
    tabNames.className = "tabs__names";
    tabsElement.appendChild(tabNames);

    tabs.forEach((item, index) => {
      const name = item.getAttribute("name");
      const tab = document.createElement("div");
      tab.innerText = name;
      tab.className = "tabs__names__item";
      tab.setAttribute("target", name);
      item.style.cssText = "display:none";
      if (item.getAttribute("active") == "true") {
        activeIndex = index;
      }
      tabNameItems.push(tab);
    });
    const tabContent = document.createElement("div");
    tabContent.className = "tabs__content";
    tabsElement.appendChild(tabContent);
    tabContent.innerHTML = "OKKKKKK";

    activeIndex = activeIndex || 0;

    tabNameItems.forEach((tab, index) => {
      tabNames.appendChild(tab);
      tab.onclick = (e) => {
        const el = e.target;
        tabNameItems[activeIndex].classList.remove("active");

        activeIndex = index;

        el.classList.add("active");
        const target = el.getAttribute("target");
        const targetTab = tabsElement.querySelectorAll(".tab")[activeIndex];
        if (targetTab) {
          tabContent.innerHTML = targetTab.innerHTML;
        }
      };
      if (index === activeIndex) {
        tab.click();
      }
    });
  },
};
</script>
 <style>
.code-copy {
  z-index: 1000;
  cursor: pointer;
  padding: 5px;
  margin-bottom: -30px;
  text-align: right;
}
</style>