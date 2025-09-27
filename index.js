class CircularMenu {
  constructor() {
    this.container = document.querySelector(".nav-container");
    this.navItems = [...document.querySelectorAll(".nav-item")];

    this.currentIndex = this.navItems.findIndex((item) =>
      item.classList.contains("active")
    );
    if (this.currentIndex < 0) this.currentIndex = 0;

    this.radius = 200;
    this.centerX = 150;
    this.centerY = 300;
    this.total = this.navItems.length;
    this.angleStep = (2 * Math.PI) / this.total;
    this.rotation = -this.currentIndex * this.angleStep;

    this.data = {
      mapping: {
        cards: [
          { src: "images/battery1.png", name: "CAMERA" },
          { src: "images/battery1.png", name: "Battery & charger" },
          { src: "images/battery1.png", name: "Electronics" },
        ],
      },
      agriculture: {
        cards: [
          { src: "images/Electronics (1).png", name: "Battery & charger" },
          { src: "images/Electronics (1).png", name: "CAMERA" },
          { src: "images/Electronics (1).png", name: "Electronics" },
        ],
      },
      fpv: {
        cards: [
          { src: "images/Camera.png", name: "Electronics" },
          { src: "images/Camera.png", name: "CAMERA" },
          { src: "images/Camera.png", name: "Battery & charger" },
        ],
      },
    };

    this.positionItems();
    this.bindEvents();
    this.updateContent(this.navItems[this.currentIndex].dataset.category);
  }

  positionItems() {
    this.navItems.forEach((item, i) => {
      const angle = i * this.angleStep + this.rotation;
      const x = this.centerX + Math.cos(angle) * this.radius - 70;
      const y = this.centerY + Math.sin(angle) * this.radius - 70;

      if (i === this.currentIndex) {
        item.style.left = `${x - 100}px`;
        item.style.top = `${y - 40}px`;
        item.style.transform = "scale(1)";
        item.style.opacity = 1;
      } else {
        item.style.left = `${x}px`;
        item.style.top = `${y}px`;
        const factor = (y - (this.centerY - this.radius)) / (this.radius * 2);
        const scale = 0.7 + factor * 0.3;
        const opacity = 0.5 + factor * 0.5;
        item.style.transform = `scale(${scale})`;
        item.style.opacity = opacity;
      }
    });
  }

  bindEvents() {
    this.container.addEventListener("wheel", (e) => {
      e.preventDefault();
      this.rotate(e.deltaY > 0 ? 1 : -1);
    });

    document.addEventListener("keydown", (e) => {
      if (e.key === "ArrowUp") this.rotate(-1);
      if (e.key === "ArrowDown") this.rotate(1);
    });

    this.navItems.forEach((item, i) => {
      item.addEventListener("click", () => {
        this.currentIndex = i;
        this.snap();
        this.updateContent(item.dataset.category);
      });
    });
  }

  rotate(dir) {
    this.currentIndex = (this.currentIndex + dir + this.total) % this.total;
    this.snap();
    this.updateContent(this.navItems[this.currentIndex].dataset.category);
  }

  snap() {
    this.rotation = -this.currentIndex * this.angleStep;
    this.navItems.forEach((item) => item.classList.remove("active"));
    this.navItems[this.currentIndex].classList.add("active");
    this.positionItems();
  }

  updateContent(category) {
    const { cards } = this.data[category] || {};

    const cardsGrid = document.querySelector(".cards-grid");

    if (cardsGrid && cards) {
      cardsGrid.innerHTML = cards
        .map(
          (c) => `
        <div class="card">
          <img src="${c.src}" alt="card image" />
          <h3>${c.name}</h3>
        </div>
      `
        )
        .join("");
    }
  }
}

document.addEventListener("DOMContentLoaded", () => {
  new CircularMenu();
});
