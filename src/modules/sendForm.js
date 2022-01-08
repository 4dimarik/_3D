export default class SendForm {
  constructor({ formId = null, someElem = [] }) {
    this.id = formId;
    if (formId) this.init(someElem);
    this.statusMessages = {
      load: '<i class="fas fa-lg fa-spinner fa-pulse"></i>',
      error: "Ошибка!",
      success: "Спасибо! Наш менеджер с вами свяжется!",
    };
  }
  init(someElem) {
    this.form = document.getElementById(this.id);
    this.btn = this.form.querySelector("*[type=submit]");
    this.btnText = this.btn.textContent;

    this.statusBlock = document.createElement("div");
    this.form.append(this.statusBlock);

    this.setValidatePattern();
    //this.setTestData();

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
          this.statusBlock.textContent = this.statusMessages.success;
          console.log(responseData);
        } else {
          this.statusBlock.textContent = this.statusMessages.error;
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
  setValidatePattern() {
    const formData = new FormData(this.form);
    const patterns = {
      user_name: "[а-яА-Я ]+",
      user_email: "[a-z0-9@\\-_.!~*']+",
      user_phone: "[0-9()\\-+]+",
      user_message: "[а-яА-Я 0-9.,;:\\-]+",
    };

    formData.forEach((val, key) => {
      this.form.querySelector(`*[name=${key}]`).pattern = patterns[key];
    });
  }
  setTestData() {
    const formData = new FormData(this.form);
    const testData = [
      {
        user_name: "Вася",
        user_email: "vasya@mail.ru",
        user_phone: "+7(903)755-00-55",
      },
      {
        user_name: "Вася",
        user_email: "vasya~-'*@mail.ru",
        user_phone: "+7(903)755-00-55",
      },
      {
        user_name: "Vasya",
        user_email: "vasya~-'$%#*@mail.ru",
        user_phone: "+7 903 755-00-55",
        user_message: " Какой-то текст; 123",
      },
    ];
    formData.forEach((val, key) => {
      this.form.querySelector(`*[name=${key}]`).value = testData[2][key];
    });
  }
}
