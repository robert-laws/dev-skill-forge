(() => {
  const STORAGE_KEY = 'dev-skill-forge-progress-v1';

  const readState = () => {
    try {
      const raw = window.localStorage.getItem(STORAGE_KEY);
      if (!raw) return {};
      const parsed = JSON.parse(raw);
      return parsed && typeof parsed === 'object' ? parsed : {};
    } catch {
      return {};
    }
  };

  const writeState = (state) => {
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    } catch {
      // Ignore storage write failures.
    }
  };

  const isCompleted = (state, slug) => Boolean(state[slug] && state[slug].completedAt);

  const getCompletedSlugs = (state) =>
    Object.keys(state).filter((slug) => slug && isCompleted(state, slug));

  const updateSummaryUI = (completedCount) => {
    document.querySelectorAll('[data-progress-summary]').forEach((summary) => {
      const total = Number(summary.getAttribute('data-progress-total') || '0');
      const clamped = Math.min(completedCount, total);
      const percent = total > 0 ? Math.round((clamped / total) * 100) : 0;
      const completedNode = summary.querySelector('[data-progress-completed]');
      const percentNode = summary.querySelector('[data-progress-percent]');
      const fillNode = summary.querySelector('[data-progress-fill]');
      const barNode = summary.querySelector('[data-progress-bar]');

      if (completedNode) completedNode.textContent = String(clamped);
      if (percentNode) percentNode.textContent = String(percent);
      if (fillNode) fillNode.style.width = `${percent}%`;
      if (barNode) barNode.setAttribute('aria-valuenow', String(percent));
    });
  };

  const updateModuleCardUI = (completedSlugs) => {
    const completedSet = new Set(completedSlugs);
    document.querySelectorAll('[data-module-status]').forEach((statusNode) => {
      const slug = statusNode.getAttribute('data-module-status');
      const complete = slug ? completedSet.has(slug) : false;
      statusNode.textContent = complete ? 'Completed' : 'Not started';
      statusNode.classList.toggle('is-complete', complete);
      const card = statusNode.closest('.card');
      if (card) card.classList.toggle('is-complete', complete);
    });
  };

  const updateToggleUI = (completedSlugs) => {
    const completedSet = new Set(completedSlugs);
    document.querySelectorAll('button[data-module-toggle]').forEach((button) => {
      const slug = button.getAttribute('data-module-toggle');
      const complete = slug ? completedSet.has(slug) : false;
      button.textContent = complete ? 'Mark as incomplete' : 'Mark as complete';
      button.setAttribute('aria-pressed', complete ? 'true' : 'false');
      button.classList.toggle('is-complete', complete);

      if (slug) {
        const statusNode = document.querySelector(`[data-module-toggle-status="${slug}"]`);
        if (statusNode) {
          statusNode.textContent = complete ? 'Status: Completed' : 'Status: Not started';
        }
      }
    });
  };

  const refreshUI = () => {
    const state = readState();
    const completedSlugs = getCompletedSlugs(state);
    updateSummaryUI(completedSlugs.length);
    updateModuleCardUI(completedSlugs);
    updateToggleUI(completedSlugs);
  };

  const setModuleCompleted = (slug, complete) => {
    if (!slug) return;
    const state = readState();
    if (complete) {
      state[slug] = { completedAt: new Date().toISOString() };
    } else {
      delete state[slug];
    }
    writeState(state);
    refreshUI();
  };

  const bindToggleHandlers = () => {
    document.querySelectorAll('button[data-module-toggle]').forEach((button) => {
      if (button.dataset.bound === 'true') return;
      button.dataset.bound = 'true';
      button.addEventListener('click', () => {
        const slug = button.getAttribute('data-module-toggle');
        const state = readState();
        const nextState = !(slug && isCompleted(state, slug));
        setModuleCompleted(slug, nextState);
      });
    });
  };

  const init = () => {
    refreshUI();
    bindToggleHandlers();
  };

  window.devSkillForgeProgress = {
    refreshUI,
    setModuleCompleted,
    isModuleCompleted: (slug) => isCompleted(readState(), slug)
  };

  window.addEventListener('storage', (event) => {
    if (event.key === STORAGE_KEY) refreshUI();
  });

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init, { once: true });
  } else {
    init();
  }
})();
