const $circle = document.querySelector('#circle');
const $score = document.querySelector('#score');
const $inviteButton = document.querySelector('#invite');

function start() {
  setScore(getScore());
  setImage();
}

function setScore(score) {
  localStorage.setItem('score', score);
  $score.textContent = score;
}

function inviteFriends() {
  // Ссылка на ваш Telegram Web App
  const inviteLink = 'https://t.me/FenyaCoin_bot/FenyaClicker'; // Ваш Web App
  const message = 'Привет! Присоединяйся к моему приложению: ' + inviteLink;

  // Создаем ссылку для отправки через Telegram
  const telegramLink = `https://t.me/share/url?url=${encodeURIComponent(inviteLink)}&text=${encodeURIComponent(message)}`;

  // Открываем ссылку в новой вкладке
  window.open(telegramLink, '_blank');
}

//function setImage() {
  //if (getScore() >= 1000) {
    //$circle.setAttribute('src', './assets/lizzard.png');
  //}
//}

function getScore() {
  return Number(localStorage.getItem('score')) ?? 0;
}

function addOne() {
  setScore(getScore() + 1);
  setImage();
}

$circle.addEventListener('click', (event) => {
  const rect = $circle.getBoundingClientRect();

  const offfsetX = event.clientX - rect.left - rect.width / 2;
  const offfsetY = event.clientY - rect.top - rect.height / 2;

  const DEG = 40;

  const tiltX = (offfsetY / rect.height) * DEG;
  const tiltY = (offfsetX / rect.width) * -DEG;

  $circle.style.setProperty('--tiltX', `${tiltX}deg`);
  $circle.style.setProperty('--tiltY', `${tiltY}deg`);

  setTimeout(() => {
    $circle.style.setProperty('--tiltX', `0deg`);
    $circle.style.setProperty('--tiltY', `0deg`);
  }, 300);

  const plusOne = document.createElement('div');
  plusOne.classList.add('plus-one');
  plusOne.textContent = '+1';
  plusOne.style.left = `${event.clientX - rect.left}px`;
  plusOne.style.top = `${event.clientY - rect.top}px`;

  $circle.parentElement.appendChild(plusOne);

  addOne();

  setTimeout(() => {
    plusOne.remove();
  }, 2000);
});

$inviteButton.addEventListener('click', inviteFriends);

start();
