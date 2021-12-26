import { debounce } from "../utils";

export default () => {
  const input = document.querySelector("#input");
  const text = document.querySelector("#text");

  const print = (e) => {
    const { value } = e.target;
    console.log(value);
    text.innerHTML = value;
  };

  input.addEventListener("input", debounce(print, 300));
};
