/**
 * Comparison Slider - Before/After Image Comparison
 * Initialize with: new ComparisonSlider('.comparison-slider') or new ComparisonSlider(domElement)
 */
class ComparisonSlider {
  constructor(elementOrSelector) {
    // Accept either a CSS selector string or an actual DOM element
    this.container =
      typeof elementOrSelector === "string"
        ? document.querySelector(elementOrSelector)
        : elementOrSelector;

    if (!this.container) return;

    this.afterDiv = this.container.querySelector(".comparison-after");
    this.handle = this.container.querySelector(".comparison-handle");
    this.isActive = false;

    if (!this.afterDiv || !this.handle) return;

    this.init();
  }

  init() {
    this.handle.addEventListener("mousedown", () => this.startDrag());
    this.handle.addEventListener("touchstart", () => this.startDrag());
    document.addEventListener("mousemove", (e) => this.drag(e));
    document.addEventListener("touchmove", (e) => this.drag(e));
    document.addEventListener("mouseup", () => this.stopDrag());
    document.addEventListener("touchend", () => this.stopDrag());

    // Optional: Click anywhere on the slider to move the handle
    this.container.addEventListener("click", (e) => this.moveHandleToClick(e));
  }

  startDrag() {
    this.isActive = true;
    this.handle.style.opacity = "1";
  }

  stopDrag() {
    this.isActive = false;
  }

  drag(e) {
    if (!this.isActive) return;

    const event = e.touches ? e.touches[0] : e;
    this.updateSliderPosition(event.clientX);
  }

  moveHandleToClick(e) {
    // Don't move if clicking on the handle itself
    if (e.target === this.handle || this.handle.contains(e.target)) return;

    this.updateSliderPosition(e.clientX);
  }

  updateSliderPosition(clientX) {
    const rect = this.container.getBoundingClientRect();
    const x = clientX - rect.left;

    // Clamp between 0 and container width
    const clampedX = Math.max(0, Math.min(x, rect.width));
    const percentage = (clampedX / rect.width) * 100;

    // Clip the "after" image instead of resizing it, so it never repositions
    this.afterDiv.style.clipPath = `inset(0 0 0 ${percentage}%)`;
    this.handle.style.left = percentage + "%";
  }
}

// Initialize all comparison sliders when DOM is loaded
document.addEventListener("DOMContentLoaded", () => {
  document.querySelectorAll(".comparison-slider").forEach((slider) => {
    new ComparisonSlider(slider);
  });
});
