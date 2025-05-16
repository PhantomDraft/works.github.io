// scripts/portfolioApp.js
let projects = [];
let currentIndex = 0;
const screenshotEl = document.getElementById('screenshot');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');

function showScreenshot() {
  if (!projects.length) return;
  const project = projects[currentIndex];
  screenshotEl.src = project.thumbnail;
}

// Загружаем список проектов из JSON
fetch('data/projects.json')
  .then(response => response.json())
  .then(data => {
    projects = Array.isArray(data) ? data : data.projects;
    showScreenshot();
  })
  .catch(err => console.error('Ошибка загрузки JSON:', err));

prevBtn.addEventListener('click', () => {
  if (!projects.length) return;
  currentIndex = (currentIndex - 1 + projects.length) % projects.length;
  showScreenshot();
});
nextBtn.addEventListener('click', () => {
  if (!projects.length) return;
  currentIndex = (currentIndex + 1) % projects.length;
  showScreenshot();
});