// scripts/portfolioApp.js
let projects = [];
let currentIndex = 0;

const screenshotEl = document.getElementById('screenshot');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');

function showScreenshot() {
  if (!projects.length) return;
  screenshotEl.src = projects[currentIndex];
}

fetch('data/projects.json')
  .then(res => res.json())
  .then(data => {
    projects = Array.isArray(data) ? data : data.projects;
    showScreenshot();
  })
  .catch(console.error);

prevBtn.addEventListener('click', () => {
  currentIndex = (currentIndex - 1 + projects.length) % projects.length;
  showScreenshot();
});
nextBtn.addEventListener('click', () => {
  currentIndex = (currentIndex + 1) % projects.length;
  showScreenshot();
});