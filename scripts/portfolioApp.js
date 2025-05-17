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
    this.leftEl.addEventListener('click', () => this.prev());
    this.rightEl.addEventListener('click', () => this.next());
    window.addEventListener('keydown', ({ key }) => {
      if (key === 'ArrowLeft')  this.prev();
      if (key === 'ArrowRight') this.next();
    });
    this.initTouch();
  }

  show() {
    const { thumbnail, url } = this.images[this.current];
    this.imgEl.setAttribute('href', thumbnail);
    this.linkEl.setAttributeNS(
      'http://www.w3.org/1999/xlink',
      'xlink:href',
      url
    );
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
      if (diff > threshold)       this.prev();
      else if (diff < -threshold) this.next();
      startX = null;
    });
  }
}

// Загрузка массива из data/images.json и инициализация карусели
document.addEventListener('DOMContentLoaded', async () => {
  try {
    const response = await fetch('data/projects.json');
    if (!response.ok) throw new Error(`HTTP ${response.status}`);
    const images = await response.json();

    const svgDoc = document; // если SVG встроен прямо в HTML
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