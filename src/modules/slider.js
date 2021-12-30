export default class Slider {
  constructor({
    sliderBlockSelector,
    slideSelector,
    activeSlideClass = "portfolio-item-active",
    slideBtnClass,
    dotsBlockSelector,
    dotClass,
    dotActiveClass = "dot-active",
  }) {
    this.sliderBlockSelector = sliderBlockSelector;
    this.slideSelector = slideSelector;
    this.activeSlideClass = activeSlideClass;
    this.slideBtnClass = slideBtnClass;
    this.dotsBlockSelector = dotsBlockSelector;
    this.dotClass = dotClass;
    this.dotActiveClass = dotActiveClass;
    this.init();
  }
  init() {
    this.sliderBlock = document.querySelector(this.sliderBlockSelector);
    if (!this.sliderBlock) {
      console.error(
        `Элемент с селектором ${this.sliderBlockSelector} не найден`
      );
      return;
    }
    this.slides = document.querySelectorAll(this.slideSelector);
    if (!this.slides) {
      console.error(`Элементы с селектором ${this.slideSelector} не найдены`);
      return;
    }
    this.currentSlide = 0;
    this.timeInterval = 1500;

    this.dotsBlock = this.sliderBlock.querySelector(this.dotsBlockSelector);
    this.addDots();

    this.startSlide();
    this.setEventListeners();
  }
  changeSlide(direction, index) {
    this.slides[this.currentSlide].classList.remove(this.activeSlideClass);
    this.dots[this.currentSlide].classList.remove(this.dotActiveClass);
    if (direction === "next") {
      this.currentSlide =
        this.currentSlide + 1 >= this.slides.length ? 0 : this.currentSlide + 1;
    }
    if (direction === "prev") {
      this.currentSlide =
        this.currentSlide - 1 < 0
          ? this.slides.length - 1
          : this.currentSlide - 1;
    }
    if (direction === "set") {
      this.currentSlide = index;
    }
    this.slides[this.currentSlide].classList.add(this.activeSlideClass);
    this.dots[this.currentSlide].classList.add(this.dotActiveClass);
  }
  autoSlide() {
    this.changeSlide("next");
  }
  startSlide() {
    this.interval = setInterval(this.autoSlide.bind(this), this.timeInterval);
  }
  stopSlide() {
    clearInterval(this.interval);
  }
  addDots() {
    const dot = document.createElement("li");
    dot.className = this.dotClass;
    this.slides.forEach((slide, index) => {
      if (index !== 0) {
        this.dotsBlock.append(dot.cloneNode());
      } else {
        const activeDot = dot.cloneNode();
        activeDot.classList.add(this.dotActiveClass);
        this.dotsBlock.append(activeDot);
      }
    });

    this.dots = this.dotsBlock.getElementsByClassName(this.dotClass);
  }

  setEventListeners() {
    this.sliderBlock.addEventListener("click", (e) => {
      e.preventDefault();
      const { target } = e;
      if (!target.matches(`.${this.slideBtnClass}, .${this.dotClass}`)) {
        return;
      }
      if (target.matches("#arrow-left")) {
        this.changeSlide("prev");
      } else if (target.matches("#arrow-right")) {
        this.changeSlide("next");
      } else if (target.classList.contains(this.dotClass)) {
        this.changeSlide("set", [...this.dots].indexOf(target));
      }
    });

    this.sliderBlock.addEventListener(
      "mouseenter",
      (e) => {
        if (e.target.matches(`.${this.slideBtnClass}, .${this.dotClass}`)) {
          this.stopSlide();
        }
      },
      true
    );
    this.sliderBlock.addEventListener(
      "mouseleave",
      (e) => {
        if (e.target.matches(`.${this.slideBtnClass}, .${this.dotClass}`)) {
          this.startSlide();
        }
      },
      true
    );
  }
}
