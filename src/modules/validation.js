export default class Validation {
  constructor() {
    this.setEventListener();
  }
  setEventListener() {
    document.addEventListener("input", (e) => {
      this.validation(e);
    });
  }
  calcValidation(target) {
    target.value = target.value.replace(/[^\d]/g, "");
  }
  formFieldsValidation(target) {
    const { name, value, type } = target;
    if (type === "text" || name === "user_message") {
      target.value = value.replace(/[^а-я -]/gi, "");
    } else if (type === "email") {
      target.value = value.replace(/[^a-z0-9@\-_.!~*']/gi, "");
    } else if (type === "tel") {
      target.value = value.replace(/[^0-9()\-]/g, "");
    }
  }
  validation(e) {
    const { target } = e;
    const calcBlock = target.closest("#calc");
    const form = target.closest("form");
    if (calcBlock) {
      this.calcValidation(target);
    }
    if (form) {
      this.formFieldsValidation(target);
    }
  }
}
