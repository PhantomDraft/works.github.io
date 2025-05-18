// scripts/carousel.js
export class Carousel {
  constructor({ images, imgEl, linkEl, leftEl, rightEl }) {
    this.images  = images;
    this.imgEl    = imgEl;
    this.linkEl   = linkEl;
    this.leftEl   = leftEl;
    this.rightEl  = rightEl;
    this.current  = 0;
  }

  init() {
    this.show();
    this.leftEl .addEventListener('click', () => this.prev());
    this.rightEl.addEventListener('click', () => this.next());
    window.addEventListener('keydown', e => {
      if (e.key === 'ArrowLeft')  this.prev();
      if (e.key === 'ArrowRight') this.next();
    });
    this.initTouch();
  }

  updateImages(arr) {
    this.images = arr;
    this.current = 0;
    this.show();
  }

  show() {
    const it = this.images[this.current];
    this.imgEl.href.baseVal  = it.thumbnail;
    this.linkEl.href.baseVal = it.url;
  }

  next() { this.current = (this.current + 1) % this.images.length; this.show(); }
  prev() { this.current = (this.current - 1 + this.images.length) % this.images.length; this.show(); }

  initTouch() {
    let startX = null;
    const threshold = 50;
    this.imgEl.addEventListener('touchstart', e => startX = e.touches[0].clientX);
    this.imgEl.addEventListener('touchend', e => {
      const diff = e.changedTouches[0].clientX - startX;
      if (diff > threshold)       this.prev();
      else if (diff < -threshold) this.next();
      startX = null;
    });
  }
}