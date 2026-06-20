export function cn(...classes) {
  return classes.filter(Boolean).join(' ')
}

export function smoothScrollTo(targetY, duration = 900) {
  const startY = window.scrollY
  const diff = targetY - startY
  if (Math.abs(diff) < 5) {
    window.scrollTo(0, targetY)
    return
  }
  const startTime = performance.now()

  function step(currentTime) {
    const elapsed = currentTime - startTime
    const progress = Math.min(elapsed / duration, 1)
    const ease = 1 - Math.pow(1 - progress, 3)
    window.scrollTo(0, startY + diff * ease)
    if (progress < 1) {
      requestAnimationFrame(step)
    }
  }

  requestAnimationFrame(step)
}
