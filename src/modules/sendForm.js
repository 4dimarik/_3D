import Modal from "./modal";
import Validation from "./validation";

export default class SendForm {
  constructor({ formId = null, someElem = [] }) {
    this.id = formId;
    if (formId) this.init(someElem);
    this.statusMessages = {
      load: '<i class="fas fa-lg fa-spinner fa-pulse"></i>',
      warning: "Ошибка отправки!",
      success: "Спасибо! Наш менеджер с вами свяжется!",
    };
  }
  init(someElem) {
    this.form = document.getElementById(this.id);
    this.btn = this.form.querySelector("*[type=submit]");
    this.btnText = this.btn.textContent;

    this.statusBlock = document.createElement("div");

    this.setValidateOptions();

    this.form.addEventListener("submit", (e) => {
      e.preventDefault();
      const formData = new FormData(e.target);
      const formBody = {};

      this.btn.innerHTML = this.statusMessages.load;

      formData.forEach((val, key) => {
        formBody[key] = val;
      });

      someElem.forEach((elem) => {
        const element = document.getElementById(elem.id);
        if (elem?.type === "block") {
          formBody[elem.id] = element.textContent;
        } else if (elem?.type === "input") {
          formBody[elem.id] = element.value;
        }
      });

      this.sendData(formBody).then(({ ok, responseData }) => {
        if (ok) {
          formData.forEach((val, key) => {
            this.form.querySelector(`*[name=${key}]`).value = "";
          });
          this.showStatus("success", e.target);
          console.log(responseData);
        } else {
          this.showStatus("warning", e.target);
        }
        this.btn.textContent = this.btnText;
      });
    });
  }
  async sendData(data) {
    try {
      const response = await fetch(
        "https://jsonplaceholder.typicode.com/posts",
        {
          method: "POST",
          body: JSON.stringify(data),
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (!response.ok) {
        throw response;
      }
      return { ok: true, responseData: await response.json() };
    } catch (response) {
      const errorMessage =
        `[SendForm.sendData()]status: ${response.status}` +
        `${response.statusText ? ", statusText:" + response.statusText : ""}`;
      console.error(errorMessage);
      return { ok: false };
    }
  }
  setValidateOptions() {
    const formData = new FormData(this.form);
    // const patterns = {
    //   user_name: "[а-яА-Я ]{2,}",
    //   user_email: "[a-z0-9@\\-_.!~*']+",
    //   user_phone: "[0-9()\\-+]{6,}",
    //   user_message: "[а-яА-Я 0-9.,;:\\-]+",
    // };
    const patterns = Validation.patterns;

    formData.forEach((val, key) => {
      const formField = this.form.querySelector(`*[name=${key}]`);
      formField.pattern = patterns[key].submit;
      formField.required = true;
    });
  }
  showStatus(status, target) {
    const alertClass = `alert-${status}`;
    this.statusBlock.classList.add(alertClass);
    this.form.append(this.statusBlock);
    this.statusBlock.textContent = this.statusMessages[status];
    setTimeout(() => {
      this.statusBlock.classList.remove(alertClass);
      this.statusBlock.remove();
      if (target.id === "form3") {
        const modal = new Modal({
          modalSelector: ".popup",
        });
        modal.toggleModal(false, target.closest(".popup"));
      }
    }, 5000);
  }
}
