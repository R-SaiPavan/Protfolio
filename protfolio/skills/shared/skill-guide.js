const guideSteps = [...document.querySelectorAll('[data-guide-step]')];
const guideProgress = document.querySelector('[data-guide-progress]');
const guideCount = document.querySelector('[data-guide-count]');
const guideStorageKey = `skill-guide-progress:${document.body.dataset.guide}`;

const updateGuideProgress = () => {
  const completedSteps = guideSteps.filter((step) => step.checked).length;
  guideProgress.value = completedSteps;
  guideCount.textContent = `${completedSteps} / ${guideSteps.length} complete`;
};

try {
  const savedSteps = JSON.parse(localStorage.getItem(guideStorageKey) || '[]');
  guideSteps.forEach((step, index) => { step.checked = savedSteps[index] === true; });
} catch {}

updateGuideProgress();
guideSteps.forEach((step) => {
  step.addEventListener('change', () => {
    updateGuideProgress();
    try {
      localStorage.setItem(guideStorageKey, JSON.stringify(guideSteps.map((item) => item.checked)));
    } catch {}
  });
});
