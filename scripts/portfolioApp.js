// scripts/portfolioApp.js
import { Carousel } from './carousel.js';

class App {
  constructor() {
    this.filter = this.getFilterFromURL();
    this.images = [];
    this.filtered = [];
    this.moon    = document.getElementById('moon');
    this.burger  = document.getElementById('burger');
    this.overlay = document.getElementById('overlay');
    this.scandi  = document.getElementById('scandiFilter');
    this.close   = document.getElementById('closeFilter');
    this.carousel = new Carousel({
      imgEl:   document.getElementById('carouselImage'),
      linkEl:  document.getElementById('carouselLink'),
      leftEl:  document.getElementById('arrowLeft'),
      rightEl: document.getElementById('arrowRight'),
      images:  []
    });
  }

  async init() {
    const resp = await fetch('data/projects.json');
    this.images = await resp.json();
    this.applyFilterFromParam();
    this.initUI();
    this.animateMoonIn();
    this.carousel.init();
  }

  initUI() {
    this.burger.addEventListener('click', () => {
      this.overlay.setAttribute('visibility','visible');
    });
    this.scandi.addEventListener('click', () => {
      this.setFilter('scandinavian');
      this.overlay.setAttribute('visibility','hidden');
    });
    this.close.addEventListener('click', () => {
      this.setFilter(null);
      this.overlay.setAttribute('visibility','hidden');
    });
  }

  applyFilterFromParam() {
    if (this.filter === 'scandinavian') {
      this.moon.setAttribute('href','assets/moon-scandi.png');
      this.filtered = this.images.filter(i => i.category==='scandinavian');
    } else {
      this.moon.setAttribute('href','assets/moon-default.png');
      this.filtered = [...this.images];
    }
    this.carousel.updateImages(this.filtered);
  }

  setFilter(value) {
    this.filter = value;
    const url = new URL(location);
    if (value) url.searchParams.set('filter', value);
    else       url.searchParams.delete('filter');
    history.replaceState(null,'',url);
    this.applyFilterFromParam();
  }

  getFilterFromURL() {
    const p = new URL(location).searchParams.get('filter');
    return p === 'scandinavian' ? p : null;
  }

  animateMoonIn() {
    requestAnimationFrame(() => {
      this.moon.setAttribute('transform','translate(0,1500)');
    });
  }
}

document.addEventListener('DOMContentLoaded', () => {
  new App().init();
});