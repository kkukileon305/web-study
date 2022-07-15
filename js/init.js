import Ghost from './ghost.js';
import Hero from './hero.js';
import { timerP, startBtn, upSideDiv, resultDiv, lifeList, FULLTIME, GOAL } from './setting.js';

export let time = FULLTIME;
export let hero = new Hero();

const endGame = () => {
  startBtn.classList.remove('hidden');
  startBtn.classList.remove('none');
  upSideDiv.classList.add('hidden');
  resultDiv.classList.remove('hidden');
  resultDiv.classList.remove('none');
  resultDiv.innerHTML = `<h2>Result : ${time === 0 ? 'fail' : `걸린시간 ${(FULLTIME - time) / 10}s`}</h2>`;
};

const init = () => {
  resultDiv.classList.add('none');
  startBtn.classList.add('none');
  upSideDiv.classList.remove('hidden');
  lifeList.forEach((e) => e.classList.remove('dead'));
  Ghost.initScore();
  time = FULLTIME;
  timerP.innerHTML = time;

  hero.showHero();
  hero.lifeInit();

  const timerId = setInterval(() => {
    time -= 1;
    timerP.innerHTML = (time / 10).toFixed(1);

    time > 2 && time % 10 === 0 && new Ghost().showGhost();

    if (time === 0 || Ghost.score === GOAL) {
      clearInterval(timerId);
      hero.hideHero();
      Ghost.removeAllGhost();
      endGame();
    }
  }, 100);
};

const startGame = () => {
  startBtn.classList.add('hidden');
  resultDiv.classList.add('hidden');
  setTimeout(init, 500);
};

export const setTimeFail = () => {
  time = 1;
};
startBtn.addEventListener('click', startGame);
