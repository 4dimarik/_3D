export default class Tabs {
  constructor({ tabPanelSelector, tabPanelItemSelectors }) {
    this.tabPanelSelector = tabPanelSelector;
    this.tabPanelItemSelectors = tabPanelItemSelectors;
    this.init();
  }
  init() {
    this.tabPanel = document.querySelector(this.tabPanelSelector);
    this.navItems = this.tabPanel.querySelectorAll(
      this.tabPanelItemSelectors.navItemSelector
    );
    this.tabItems = this.tabPanel.querySelectorAll(
      this.tabPanelItemSelectors.tabItemSelector
    );
    this.setEvents();
  }
  setEvents() {
    this.tabPanel.addEventListener("click", (e) => {
      const { target } = e;
      const navItem = target.closest(
        this.tabPanelItemSelectors.navItemSelector
      );
      if (navItem) {
        this.navItems.forEach((item, index) => {
          if (item === navItem) {
            item.classList.add("active");
            this.tabItems[index].classList.remove("d-none");
          } else {
            item.classList.remove("active");
            this.tabItems[index].classList.add("d-none");
          }
        });
      }
    });
  }
}
