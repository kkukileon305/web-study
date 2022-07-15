import { SPEED, LEFT, UP, RIGHT, DOWN, bgWidth, bgHeight, lifeList } from './setting.js';
import { setTimeFail } from './init.js';

export default class Hero {
  constructor() {
    this.life = 3;
    this.speed = SPEED;
    this.element = document.querySelector('span.hero');
    this.x = (bgWidth - 35) / 2;
    this.y = bgHeight / 2;
    this.keyDownHandler = (ev) => {
      switch (ev.keyCode) {
        case LEFT:
          this.element.classList.remove('up', 'right', 'down');
          this.element.classList.add('left');
          this.x > 10 && (this.x -= this.speed);
          this.element.style.transform = `translate(${this.x}px, ${this.y}px)`;
          break;
        case UP:
          this.element.classList.remove('left', 'right', 'down');
          this.element.classList.add('up');
          this.y -= this.speed;
          this.element.style.transform = `translate(${this.x}px, ${this.y}px)`;
          break;
        case RIGHT:
          this.element.classList.remove('up', 'left', 'down');
          this.element.classList.add('right');
          this.x < bgWidth - 40 && (this.x += this.speed);
          this.element.style.transform = `translate(${this.x}px, ${this.y}px)`;
          break;
        case DOWN:
          this.element.classList.remove('up', 'right', 'left');
          this.element.classList.add('down');
          this.y += this.speed;
          this.element.style.transform = `translate(${this.x}px, ${this.y}px)`;
          break;
      }
    };
  }

  showHero() {
    this.element.classList.remove('hidden');
    this.element.style.transform = `translate(${this.x}px, ${this.y}px)`;
    window.addEventListener('keydown', this.keyDownHandler);
  }

  hideHero() {
    this.element.classList.add('hidden');
    window.removeEventListener('keydown', this.keyDownHandler);
  }

  lifeInit() {
    this.life = 3;
  }

  lifeReduce() {
    this.life--;
    this.life >= 0 && lifeList[this.life].classList.add('dead');
    this.life === -1 && setTimeFail();
  }
}
