(()=>{"use strict";function t({timing:t,draw:e,duration:s,completed:i=function(){}}){let o=performance.now();requestAnimationFrame((function a(l){let r=(l-o)/s;r>1&&(r=1);let n=t(r);e(n),r<1?requestAnimationFrame(a):i()}))}new class{constructor({deadLine:t="2021-12-27T18:35:00",timerSelector:e,format:s={},doubleZero:i=!0,separator:o=":"}){this.timerSelector=e,this.formatSelectors=s,this.separator=o,this.deadLine=t,this.doubleZero=i,this.init()}init(){this.timer=document.querySelector(this.timerSelector),this.format={},this.timer&&Object.keys(this.formatSelectors).forEach((t=>{let e=t.replace("Selector","");this.format[e]=this.timer.querySelector(this.formatSelectors[t])}))}start(){this.isDateHasCome()?this.render({days:"0",hours:"0",minutes:"0",seconds:"0"}):(this.handle(),this.updateClock=setInterval(this.handle.bind(this),1e3))}stop(){clearInterval(this.updateClock)}render(t){Object.keys(this.format).forEach((e=>{this.format[e].textContent=this.doubleZero?this.getTwoDigitNumber(t[e]):t[e],this.format[e].nextElementSibling.textContent=this.setSeparator(t[e],e)}))}handle(){if(this.isDateHasCome())this.stop();else{let t=new Date(this.deadLine).getTime(),e=(new Date).getTime();const s=this.getTimeRemaining(t,e);this.render(s)}}getTimeRemaining(t,e){let s=(t-e)/1e3;return{days:Math.floor(s/60/60/24),hours:Math.floor(s/60/60%24),minutes:Math.floor(s/60%60),seconds:Math.floor(s%60)}}getTwoDigitNumber(t){return 1===String(t).length?`0${t}`:`${t}`}isDateHasCome(){return new Date(this.deadLine).getTime()<=(new Date).getTime()}setSeparator(t=null,e=""){let s="";return"name"===this.separator?s=this.getNameSeparator(t,e):"seconds"!==e&&(s=this.separator),s}getNameSeparator(t,e){return((t,e)=>1===t||t>20&&1==+String(t)[1]?e[0]:t>1&&t<5||t>21&&+String(t)[1]>1&&+String(t)[1]<5?e[1]:0===t||t>4&&t<21||t>21&&+String(t)[1]>4||0==+String(t)[1]?e[2]:void 0)(+t,{days:["день","дня","дней"],hours:["час","часа","часов"],minutes:["минута","минуты","минут"],seconds:["секунда","секунды","секунд"]}[e])}}({timerSelector:"#timer",format:{daysSelector:"#timer-days",hoursSelector:"#timer-hours",minutesSelector:"#timer-minutes",secondsSelector:"#timer-seconds"},doubleZero:!0,separator:"name"}).start(),new class{constructor({toggleClass:t="active-menu",...e}){this.toggleClass=t,this.init({...e})}init({menuBtnSelector:t=".menu",menuSelector:e="menu",closeBtnSelector:s=".close-btn"}){this.menuBtnSelector=t,this.menu=document.querySelector(e),this.closeBtn=this.menu.querySelector(s),this.setEventListener()}handleTarget(){this.menu.classList.toggle(this.toggleClass)}setEventListener(){document.addEventListener("click",(t=>{const{target:e}=t,s=this.menu.classList.contains(this.toggleClass);e.closest("menu")?("a"===e.localName&&e.closest("li")||e===this.closeBtn)&&this.handleTarget():s?this.menu.classList.remove(this.toggleClass):e.closest(this.menuBtnSelector)&&this.handleTarget()}))}}({menuBtnSelector:".menu",menuSelector:"menu",closeBtnSelector:".close-btn",toggleClass:"active-menu"}),new class{constructor({buttonsClassName:t,...e}){this.buttonsClassName=t,this.animationIsOn=!1,this.init({...e})}init({triggerAreaSelector:t,modalSelector:e,closeBtnSelector:s,modalContentSelector:i}){this.triggerAreaSelector=document.querySelector(t),this.modal=document.querySelector(e),this.closeBtn=this.modal.querySelector(s),this.modalContentSelector=i,this.setEventListener(),this.animationInit()}setEventListener(){this.triggerAreaSelector.addEventListener("click",(t=>{const{target:e}=t;[...e.classList].includes(this.buttonsClassName)&&(this.modal.style.display="block",this.toggleModal(!0))})),this.modal.addEventListener("click",(t=>{const{target:e}=t;e===this.closeBtn?this.toggleModal(!1):e.closest(this.modalContentSelector)||this.toggleModal(!1)}))}animationInit(){window.innerWidth>768?(this.animationIsOn=!0,this.modal.style.opacity=0):(this.animationIsOn=!1,this.modal.style.opacity=1)}toggleModal(e){const s=this.modal,i=e?t=>t:t=>1-+t,o=e?()=>{}:()=>{s.style.display="none"};this.animationIsOn&&t({duration:600,timing:t=>t,draw(t){s.style.opacity=i(t)},completed:o})}}({buttonsClassName:"popup-btn",triggerAreaSelector:"#service-block",modalSelector:".popup",modalContentSelector:".popup-content",closeBtnSelector:".popup-close"}),new class{constructor(){this.setEventListener()}setEventListener(){document.addEventListener("input",(t=>{this.validation(t)})),document.addEventListener("blur",(t=>{this.validation(t)}),!0)}calcValidation(t){"text"===t.type&&(t.value=t.value.replace(/[^\d]/g,""))}formFieldsValidation(t,e){const{name:s,value:i,type:o}=t;"text"===o||"user_message"===s?"blur"===e?t.value=this.blurValidation(i):"input"===e&&(t.value=this.inputValidation(i)):"email"===o?t.value=i.replace(/[^a-z0-9@\-_.!~*']/gi,""):"tel"===o&&(t.value=i.replace(/[^0-9()\-]/g,""))}inputValidation(t){return t.replace(/[^а-я -]/gi,"")}blurValidation(t){return t=t.replace(/[^а-я -]/gi,"").replace(/[ ]+/g," ").replace(/[-]+/g,"-").replace(/^[- ]+|[ -]+$/g,""),[...t].map(((t,e)=>0===e?t.toUpperCase():t.toLowerCase())).join("")}validation(t){const{target:e}=t,s=e.closest("#calc"),i=e.closest("form");s&&this.calcValidation(e),i&&this.formFieldsValidation(e,t.type)}},new class{constructor({tabPanelSelector:t,tabPanelItemSelectors:e}){this.tabPanelSelector=t,this.tabPanelItemSelectors=e,this.init()}init(){this.tabPanel=document.querySelector(this.tabPanelSelector),this.navItems=this.tabPanel.querySelectorAll(this.tabPanelItemSelectors.navItemSelector),this.tabItems=this.tabPanel.querySelectorAll(this.tabPanelItemSelectors.tabItemSelector),this.setEvents()}setEvents(){this.tabPanel.addEventListener("click",(t=>{const{target:e}=t,s=e.closest(this.tabPanelItemSelectors.navItemSelector);s&&this.navItems.forEach(((t,e)=>{t===s?(t.classList.add("active"),this.tabItems[e].classList.remove("d-none")):(t.classList.remove("active"),this.tabItems[e].classList.add("d-none"))}))}))}}({tabPanelSelector:"#service-block",tabPanelItemSelectors:{navSelector:".service-header",navItemSelector:".service-header-tab",tabItemSelector:".service-tab"}}),new class{constructor({sliderBlockSelector:t,slideSelector:e,activeSlideClass:s="portfolio-item-active",slideBtnClass:i,dotsBlockSelector:o,dotClass:a,dotActiveClass:l="dot-active"}){this.sliderBlockSelector=t,this.slideSelector=e,this.activeSlideClass=s,this.slideBtnClass=i,this.dotsBlockSelector=o,this.dotClass=a,this.dotActiveClass=l,this.init()}init(){this.sliderBlock=document.querySelector(this.sliderBlockSelector),this.sliderBlock?(this.slides=document.querySelectorAll(this.slideSelector),this.slides?(this.currentSlide=0,this.timeInterval=1500,this.dotsBlock=this.sliderBlock.querySelector(this.dotsBlockSelector),this.addDots(),this.startSlide(),this.setEventListeners()):console.error(`Элементы с селектором ${this.slideSelector} не найдены`)):console.error(`Элемент с селектором ${this.sliderBlockSelector} не найден`)}changeSlide(t,e){this.slides[this.currentSlide].classList.remove(this.activeSlideClass),this.dots[this.currentSlide].classList.remove(this.dotActiveClass),"next"===t&&(this.currentSlide=this.currentSlide+1>=this.slides.length?0:this.currentSlide+1),"prev"===t&&(this.currentSlide=this.currentSlide-1<0?this.slides.length-1:this.currentSlide-1),"set"===t&&(this.currentSlide=e),this.slides[this.currentSlide].classList.add(this.activeSlideClass),this.dots[this.currentSlide].classList.add(this.dotActiveClass)}autoSlide(){this.changeSlide("next")}startSlide(){this.interval=setInterval(this.autoSlide.bind(this),this.timeInterval)}stopSlide(){clearInterval(this.interval)}addDots(){const t=document.createElement("li");t.className=this.dotClass,this.slides.forEach(((e,s)=>{if(0!==s)this.dotsBlock.append(t.cloneNode());else{const e=t.cloneNode();e.classList.add(this.dotActiveClass),this.dotsBlock.append(e)}})),this.dots=this.dotsBlock.getElementsByClassName(this.dotClass)}setEventListeners(){this.sliderBlock.addEventListener("click",(t=>{t.preventDefault();const{target:e}=t;e.matches(`.${this.slideBtnClass}, .${this.dotClass}`)&&(e.matches("#arrow-left")?this.changeSlide("prev"):e.matches("#arrow-right")?this.changeSlide("next"):e.classList.contains(this.dotClass)&&this.changeSlide("set",[...this.dots].indexOf(e)))})),this.sliderBlock.addEventListener("mouseenter",(t=>{t.target.matches(`.${this.slideBtnClass}, .${this.dotClass}`)&&this.stopSlide()}),!0),this.sliderBlock.addEventListener("mouseleave",(t=>{t.target.matches(`.${this.slideBtnClass}, .${this.dotClass}`)&&this.startSlide()}),!0)}}({sliderBlockSelector:".portfolio-content",slideSelector:".portfolio-item",slideBtnClass:"portfolio-btn",dotsBlockSelector:".portfolio-dots",dotClass:"dot"}),new class{constructor({price:t=100,selectors:e}){this.price=t,this.selectors=e,this.totalValue=0,this.init({...e}),this.setEventListener()}init({calcBlock:t,fields:e}){this.calcBlock=document.querySelector(t),this.fields={},Object.keys(e).forEach((t=>{this.fields[t]=this.calcBlock.querySelector(e[t])}))}count(){const e=+this.fields.type.value,s=+this.fields.square.value;let i=+this.fields.count.value,o=+this.fields.day.value;i?i>1&&(i=1+i/10):i=1,o=o?o<5?2:o<10?1.5:1:1;const a=this.fields.total;let l=0;e&&s?(l=this.price*e*s*i*o,t({duration:500,timing:t=>t,draw(t){a.textContent=Math.trunc(t*l)}})):(l=0,a.textContent=0)}setEventListener(){this.calcBlock.addEventListener("input",function(t,e){let s,i,o;return function(...e){s=i,i=Date.now(),s&&i-s<=300&&clearTimeout(o),o=setTimeout((()=>t(...e)),300)}}(this.count.bind(this)))}}({price:100,selectors:{calcBlock:".calc-block",fields:{type:".calc-type",square:".calc-square",count:".calc-count",day:".calc-day",total:"#total"}}}),new class{constructor({formId:t=null,someElem:e=[]}){this.id=t,t&&this.init(e),this.statusMessages={load:'<i class="fas fa-lg fa-spinner fa-pulse"></i>',error:"Ошибка!",success:"Спасибо! Наш менеджер с вами свяжется!"}}init(t){this.form=document.getElementById(this.id),this.btn=this.form.querySelector("*[type=submit]"),this.btnText=this.btn.textContent,this.statusBlock=document.createElement("div"),this.form.append(this.statusBlock),this.setValidatePattern(),this.setTestData(),this.form.addEventListener("submit",(e=>{e.preventDefault();const s=new FormData(e.target),i={};this.btn.innerHTML=this.statusMessages.load,s.forEach(((t,e)=>{i[e]=t})),t.forEach((t=>{const e=document.getElementById(t.id);"block"===t?.type?i[t.id]=e.textContent:"input"===t?.type&&(i[t.id]=e.value)})),this.sendData(i).then((({ok:t,responseData:e})=>{t?(s.forEach(((t,e)=>{this.form.querySelector(`*[name=${e}]`).value=""})),this.statusBlock.textContent=this.statusMessages.success,console.log(e)):this.statusBlock.textContent=this.statusMessages.error,this.btn.textContent=this.btnText}))}))}async sendData(t){try{const e=await fetch("https://jsonplaceholder.typicode.com/posts",{method:"POST",body:JSON.stringify(t),headers:{"Content-Type":"application/json"}});if(!e.ok)throw e;return{ok:!0,responseData:await e.json()}}catch(t){const e=`[SendForm.sendData()]status: ${t.status}`+(t.statusText?", statusText:"+t.statusText:"");return console.error(e),{ok:!1}}}setValidatePattern(){const t=new FormData(this.form),e={user_name:"[а-яА-Я ]+",user_email:"[a-z0-9@\\-_.!~*']+",user_phone:"[0-9()\\-+]+",user_message:"[а-яА-Я 0-9.,;:\\-]"};t.forEach(((t,s)=>{this.form.querySelector(`*[name=${s}]`).pattern=e[s]}))}setTestData(){const t=new FormData(this.form),e=[{user_name:"Вася",user_email:"vasya@mail.ru",user_phone:"+7(903)755-00-55"},{user_name:"Вася",user_email:"vasya~-'*@mail.ru",user_phone:"+7(903)755-00-55"},{user_name:"Vasya",user_email:"vasya~-'$%#*@mail.ru",user_phone:"+7 903 755-00-55"}];t.forEach(((t,s)=>{this.form.querySelector(`*[name=${s}]`).value=e[2][s]}))}}({formId:"form1",someElem:[{type:"block",id:"total"}]})})();