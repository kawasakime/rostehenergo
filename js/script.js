import { REVIEWS } from "./reviews.js";
import { VACANCIES } from "./vacancies.js";

const reviews = document.querySelector(".reviews-container"),
  vacancies = document.querySelector(".vacancies-container"),
  arrows = document.querySelector(".arrows"),
  arrowLeft = document.querySelector('.left'),
  arrowRight = document.querySelector('.right'),
  inpName = document.querySelector('input[name="name"]'),
  inpRevText = document.querySelector('.reviews form textarea'),
  sendDataBtn = document.querySelector('.reviews form button');

let leftPos = 0;

reviews.innerHTML = "";
vacancies.innerHTML = "";

function createReview(e) {
  const img = e.hasOwnProperty("img") ? e.img : "none.png",
    name = e.hasOwnProperty("name") ? e.name : "Неизвестный отправитель",
    post = e.hasOwnProperty("post") ? e.post : "&nbsp",
    text = e.text;

  return `
    <div class="review">
      <img src="img/reviews_logos/${img}" alt="" />
      <div class="info">
        <h2 class="name">${name}</h2>
        <p class="post">${post}</p>
        <p class="text-review">${text}</p>
      </div>
    </div>
  `;
}

function createVacancie(e) {
  return `
  <div class="vacancie">
    <h1 class="title">${e.title}</h1>
    <p class="salary">от ${e.salary} ₽</p>
    <p class="desc">${e.text}</p>
  </div>`;
}

function getLeftPositionVacanciesContainer() {
  return +window.getComputedStyle(vacancies).left.replace("px", "");
}

function offArrows(e) {
  arrowLeft.classList.add('not-active')
  arrowRight.classList.add('not-active')
}

function onArrows(e) {
  arrowLeft.classList.remove('not-active')
  arrowRight.classList.remove('not-active')
}

arrows.addEventListener("click", (e) => {
  const left = getLeftPositionVacanciesContainer();
  const cardWidth = document.querySelector('.vacancie').clientWidth
  const arrow = e.target
  if (arrow.classList.contains("left") || arrow.parentElement === arrowLeft) {
    vacancies.style.left = left + cardWidth + 16 + 2 + "px";
    leftPos = left + cardWidth + 16 + 2
    offArrows()
  } else if (arrow.classList.contains("right") || arrow.parentElement === arrowRight) {
    vacancies.style.left = left - cardWidth - 16 - 2 + "px";
    leftPos = left - cardWidth - 16 - 2
    offArrows()
  }
  setTimeout(() => {
    onArrows()
    if (leftPos != 0) {
      arrowLeft.classList.remove("not-active");
    } else {
      arrowLeft.classList.add("not-active");
    }
    if ((((cardWidth + 16) * VACANCIES.length) - vacancies.clientWidth + leftPos) > cardWidth) {
      arrowRight.classList.remove("not-active");
    } else {
      arrowRight.classList.add("not-active");
    }
  }, 500);
});

sendDataBtn.addEventListener('click', () => {
  if (inpName.value !== '' && inpRevText.value !== '') {
    inpName.value = ''
    inpRevText.value = ''
    document.querySelector('.send-text').style.opacity = '1';
    setTimeout(() => {
      document.querySelector('.send-text').style.opacity = '0';
    }, 2000)
  }
})

VACANCIES.map((e) => {
  vacancies.innerHTML += createVacancie(e);
});

REVIEWS.map((e) => {
  reviews.innerHTML += createReview(e);
});
