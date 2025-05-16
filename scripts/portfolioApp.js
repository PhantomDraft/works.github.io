/* scripts/portfolioApp.js */
let projects = [];
let currentIndex = 0;

const maskedScreen = document.getElementById('maskedScreen');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');

function updateScreen() {
  if (!projects.length) return;
  const thumb = projects[currentIndex].thumbnail;
  maskedScreen.style.backgroundImage = `url('${thumb}')`;
}

fetch('data/projects.json')
  .then(res => res.json())
  .then(data => {
    projects = Array.isArray(data) ? data : data.projects;
    updateScreen();
  })
  .catch(err => console.error('Не удалось загрузить проекты:', err));

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
