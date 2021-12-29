export default class Validation {
  constructor() {
    this.setEventListener();
    console.log("va");
  }
  setEventListener() {
    document.addEventListener("input", (e) => {
      this.validation(e);
    });
    document.addEventListener(
      "blur",
      (e) => {
        console.log(e);
        this.validation(e);
      },
      true
    );
  }
  calcValidation(target) {
    target.value = target.value.replace(/[^\d]/g, "");
  }
  formFieldsValidation(target, eventType) {
    const { name, value, type } = target;
    if (type === "text" || name === "user_message") {
      if (eventType === "blur") {
        target.value = this.blurValidation(value);
      } else if (eventType === "input") {
        target.value = this.inputValidation(value);
      }
    } else if (type === "email") {
      target.value = value.replace(/[^a-z0-9@\-_.!~*']/gi, "");
    } else if (type === "tel") {
      target.value = value.replace(/[^0-9()\-]/g, "");
    }
  }
  inputValidation(value) {
    return value.replace(/[^а-я -]/gi, "");
  }
  blurValidation(value) {
    value = value
      .replace(/[^а-я -]/gi, "")
      .replace(/[ ]+/g, " ")
      .replace(/[-]+/g, "-")
      .replace(/^[- ]+|[ -]+$/g, "");
    return [...value]
      .map((char, index) =>
        index === 0 ? char.toUpperCase() : char.toLowerCase()
      )
      .join("");
  }
  validation(e) {
    const { target } = e;
    const calcBlock = target.closest("#calc");
    const form = target.closest("form");
    if (calcBlock) {
      this.calcValidation(target);
    }
    if (form) {
      this.formFieldsValidation(target, e.type);
    }
  }
}
