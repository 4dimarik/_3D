export default class Validation {
  static patterns = {
    user_name: { input: "[^а-яА-Я \\-]", submit: "[а-яА-Я \\-]{2,}" },
    user_email: {
      input: "[^a-zA-Z0-9@\\-_.!~*']",
      submit: "[a-zA-Z0-9@\\-_.!~*']+",
    },
    user_phone: { input: "[^0-9()\\-+]", submit: "[0-9()\\-+]{6,}" },
    user_message: {
      input: "[^а-яА-Я 0-9.,;:!?\\-]",
      submit: "[а-яА-Я 0-9.,;:!?\\-]+",
    },
    calc: { input: "[^\\d]" },
  };
  constructor() {
    this.setEventListener();
  }
  setEventListener() {
    document.addEventListener("input", (e) => {
      this.validation(e);
    });
    document.addEventListener(
      "blur",
      (e) => {
        this.validation(e);
      },
      true
    );
  }
  validation(e) {
    const { target } = e;
    const calcBlock = target.closest("#calc");
    const form = target.closest("form");
    if (calcBlock) {
      if (target.type === "text") {
        const pattern = new RegExp(Validation.patterns["calc"].input, "g");
        target.value = target.value.replace(pattern, "");
      }
    }
    if (form) {
      this.formFieldsValidation(target, e.type);
    }
  }
  formFieldsValidation(target, eventType) {
    const { name, value, type, tagName } = target;
    if (tagName === "INPUT") {
      if (eventType === "blur") {
        target.value = this.blurValidation(
          value,
          Validation.patterns[name].input,
          name
        );
      } else if (eventType === "input") {
        const pattern = new RegExp(Validation.patterns[name].input, "g");
        target.value = value.replace(pattern, "");
      }
    }
  }
  blurValidation(value, patternStr, name) {
    const pattern = new RegExp(patternStr, "g");
    value = value
      .replace(pattern, "")
      .replace(/[ ]+/g, " ")
      .replace(/[-]+/g, "-")
      .replace(/^[- ]+|[ -]+$/g, "");
    value = name === "user_name" ? Validation.userNameConvert(value) : value;
    return value;
  }
  static userNameConvert(string) {
    console.log("userNameConvert");
    return string.replace(/[а-я]{2,}/gi, (str) =>
      [...str]
        .map((char, index) =>
          index === 0 ? char.toUpperCase() : char.toLowerCase()
        )
        .join("")
    );
  }
}
