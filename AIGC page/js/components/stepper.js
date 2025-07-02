function renderStepper(containerId, steps, currentStep) {
  const container = document.getElementById(containerId);
  if (!container) return;

  container.innerHTML = '';

  for (let i = 1; i <= steps; i++) {
    const wrapper = document.createElement('div');
    wrapper.className = 'step-wrapper ' + (i < currentStep ? 'prev' : i === currentStep ? 'current' : 'next');

    if (i !== 1) {
      const line = document.createElement('div');
      line.className = 'line';
      wrapper.appendChild(line);
    }

    const circle = document.createElement('div');
    circle.className = 'circle';
    circle.textContent = i;
    wrapper.appendChild(circle);

    container.appendChild(wrapper);
  }
}
