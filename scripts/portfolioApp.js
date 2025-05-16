/* scripts/portfolioApp.js */
let projects = [];
let currentIndex = 0;

const screenEl = document.getElementById('screen');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');

function updateScreen() {
  if (!projects.length) return;
  const { thumbnail, link } = projects[currentIndex];
  screenEl.style.backgroundImage = `url('${thumbnail}')`;
  screenEl.href = link || '#';
}

fetch('data/projects.json')
  .then(res => res.json())
  .then(data => {
    projects = Array.isArray(data) ? data : data.projects;
    updateScreen();
  })
  .catch(err => console.error('Ошибка загрузки JSON:', err));

prevBtn.addEventListener('click', () => {
  if (!projects.length) return;
  currentIndex = (currentIndex - 1 + projects.length) % projects.length;
  updateScreen();
});
nextBtn.addEventListener('click', () => {
  if (!projects.length) return;
  currentIndex = (currentIndex + 1) % projects.length;
  updateScreen();
});