class PortfolioApp {
  constructor() {
    this.sky = document.getElementById('sky');
    this.moon = document.getElementById('moon');
    this.content = document.getElementById('content');
    this.modeBtn = document.getElementById('modeBtn');
    this.modeMenu = document.getElementById('modeMenu');
    this.horrorCheckbox = document.getElementById('mode-horror');
    this.scandiCheckbox = document.getElementById('mode-scandi');

    this.projects = [];
    this.filtered = [];
    this.currentIndex = 0;

    this.loadData().then(() => {
      this.initEvents();
      this.updateView();
    });
  }

  async loadData() {
    const res = await fetch('data/projects.json');
    this.projects = await res.json();
    this.filtered = [...this.projects];
  }

  initEvents() {
    // Навигация по проектам
    window.addEventListener('keydown', e => {
      if (e.key === 'ArrowRight') this.next();
      if (e.key === 'ArrowLeft') this.prev();
    });

    // Меню режимов
    this.modeBtn.addEventListener('click', () => {
      this.modeMenu.hidden = !this.modeMenu.hidden;
    });
    this.horrorCheckbox.addEventListener('change', () => this.applyModes());
    this.scandiCheckbox.addEventListener('change', () => this.applyModes());
  }

  updateView() {
    // Отобразить проект
    const proj = this.filtered[this.currentIndex];
    this.content.innerHTML = `
      <a href="${proj.url}" target="_blank" title="${proj.title}">
        <img src="${proj.thumbnail}" alt="${proj.description}">
      </a>`;
  }

  next() {
    if (this.filtered.length === 0) return;
    this.currentIndex = (this.currentIndex + 1) % this.filtered.length;
    this.updateView();
  }
  prev() {
    if (this.filtered.length === 0) return;
    this.currentIndex = (this.currentIndex - 1 + this.filtered.length) % this.filtered.length;
    this.updateView();
  }

  applyModes() {
    const horror = this.horrorCheckbox.checked;
    const scandi = this.scandiCheckbox.checked;

    // Фон и луна
    if (horror) {
      this.sky.src = 'assets/sky-night.jpg';
      this.moon.hidden = false;
      this.moon.src = scandi ? 'assets/moon-scandi.png' : 'assets/moon-horror.png';
      this.moon.style.opacity = 1;
    } else {
      this.sky.src = 'assets/sky-day.jpg';
      if (!scandi) {
        this.moon.hidden = true;
      } else {
        this.moon.hidden = false;
        this.moon.src = 'assets/moon-scandi.png';
        this.moon.style.opacity = 1;
      }
    }

    // Фильтрация проектов
    const modes = [];
    if (horror) modes.push('horror');
    if (scandi) modes.push('scandinavian');
    if (modes.length === 0) this.filtered = [...this.projects];
    else this.filtered = this.projects.filter(p => modes.includes(p.category));

    this.currentIndex = 0;
    this.updateView();
  }
}

// Инициализация приложения
window.addEventListener('DOMContentLoaded', () => new PortfolioApp());