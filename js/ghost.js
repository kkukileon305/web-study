import { bgWidth, bgHeight, mainElement, heroElement, scoreP, GOAL } from './setting.js';
import { hero } from './init.js';
export default class Ghost {
  static score = 0;
  static ghosts = [];

  constructor() {
    this.randomX = Math.random() * (bgWidth - 40);
    this.dropY = 0;
    this.ghostElement = document.createElement('div');
    this.rainId;
    this.checkOverlapHandler = () => {
      const { left: ghostLeft, top: ghostTop, right: ghostRight, bottom: ghostBottom } = this.ghostElement.getBoundingClientRect();
      const { left: heroLeft, top: heroTop, right: heroRight, bottom: heroBottom } = heroElement.getBoundingClientRect();

      if (heroRight >= ghostLeft && heroLeft <= ghostRight && heroBottom >= ghostTop && heroTop <= ghostBottom) {
        this.removeGhost();
        Ghost.score++;
        scoreP.innerHTML = `${Ghost.score} / ${GOAL}`;
      }
    };
    Ghost.ghosts.push(this);
  }

  static initScore() {
    Ghost.score = 0;
    scoreP.innerHTML = `${Ghost.score} / ${GOAL}`;
  }

  showGhost() {
    this.ghostElement.classList.add('ghost');
    this.ghostElement.style.transform = `translate(${this.randomX}px, 0)`;
    mainElement.appendChild(this.ghostElement);

    window.addEventListener('keydown', this.checkOverlapHandler);
    this.rainId = setInterval(() => {
      this.dropY += 10;
      this.ghostElement.style.transform = `translate(${this.randomX}px, ${this.dropY}px)`;
      this.checkOverlapHandler();

      if (this.dropY >= bgHeight - 30) {
        this.removeGhost();
        hero.lifeReduce();
      }
    }, 100);
  }

  removeGhost() {
    window.removeEventListener('keydown', this.checkOverlapHandler);
    clearInterval(this.rainId);
    mainElement.contains(this.ghostElement) && mainElement.removeChild(this.ghostElement);
  }

  static removeAllGhost() {
    Ghost.ghosts.forEach((ghost) => {
      ghost.removeGhost();
    });
  }
}
