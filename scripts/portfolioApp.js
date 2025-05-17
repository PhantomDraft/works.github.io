class Carousel {
  constructor({ images, imgEl, linkEl, leftEl, rightEl }) {
    this.images  = images;
    this.imgEl    = imgEl;
    this.linkEl   = linkEl;
    this.leftEl   = leftEl;
    this.rightEl  = rightEl;
    this.current  = 0;
  }

  init() {
    if (!this.images.length) return;
    this.show();
    this.leftEl .addEventListener('click', () => this.prev());
    this.rightEl.addEventListener('click', () => this.next());
    window.addEventListener('keydown', ({ key }) => {
      if (key === 'ArrowLeft')  this.prev();
      if (key === 'ArrowRight') this.next();
    });
    this.initTouch();
  }

  show() {
    const { thumbnail, url } = this.images[this.current];
    // Вариант B: через .href.baseVal
    this.imgEl .href.baseVal = thumbnail;
    this.linkEl.href.baseVal = url;
  }

  next() {
    this.current = (this.current + 1) % this.images.length;
    this.show();
  }

  prev() {
    this.current = (this.current - 1 + this.images.length) % this.images.length;
    this.show();
  }

  initTouch() {
    let startX = null;
    const threshold = 50;

    this.imgEl.addEventListener('touchstart', e => {
      startX = e.touches[0].clientX;
    });

    this.imgEl.addEventListener('touchend', e => {
      if (startX === null) return;
      const diff = e.changedTouches[0].clientX - startX;
      if      (diff >  threshold) this.prev();
      else if (diff < -threshold) this.next();
      startX = null;
    });
  }
}

// загрузка JSON и запуск
document.addEventListener('DOMContentLoaded', async () => {
  try {
    const res    = await fetch('data/projects.json');
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const images = await res.json();

    const svgDoc = document; // inline SVG
    const carousel = new Carousel({
      images,
      imgEl:   svgDoc.getElementById('carouselImage'),
      linkEl:  svgDoc.getElementById('carouselLink'),
      leftEl:  svgDoc.getElementById('arrowLeft'),
      rightEl: svgDoc.getElementById('arrowRight')
    });
    carousel.init();
  } catch (err) {
    console.error('Не удалось загрузить массив изображений:', err);
  }
});