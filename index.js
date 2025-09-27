
        class CircularMenu {
            constructor() {
                this.container = document.querySelector(".nav-container");
                this.navItems = [...document.querySelectorAll(".nav-item")];
                
                this.currentIndex = this.navItems.findIndex((item) =>
                    item.classList.contains("active")
                );
                if (this.currentIndex < 0) this.currentIndex = 0;
                
                // Adjusted for elliptical shape (more vertical)
                this.radiusX = 70;  // Horizontal radius
                this.radiusY = 220; // Vertical radius (larger for more vertical ellipse)
                this.centerX = 105;
                this.centerY = 300;
                this.total = this.navItems.length;
                this.angleStep = (2 * Math.PI) / this.total;
                this.rotation = -this.currentIndex * this.angleStep;
                
                this.data = {
                    mapping: {
                        title: "Exclusive Drone Category",
                        description: "Mapping Solutions",
                        cards: [
                            { 
                                src: "https://via.placeholder.com/100x100/f9fbfd/0d3b66?text=C", 
                                name: "Professional Cameras",
                                desc: "High-resolution mapping cameras for detailed aerial surveys"
                            },
                            { 
                                src: "https://via.placeholder.com/100x100/f9fbfd/0d3b66?text=B", 
                                name: "Extended Batteries",
                                desc: "Long-flight battery systems for extended operation time"
                            },
                            { 
                                src: "https://via.placeholder.com/100x100/f9fbfd/0d3b66?text=G", 
                                name: "GPS Systems",
                                desc: "Precision navigation electronics for accurate mapping"
                            },
                        ],
                    },
                    agriculture: {
                        title: "Exclusive Drone Category",
                        description: "Agriculture Technology",
                        cards: [
                            { 
                                src: "https://via.placeholder.com/100x100/f9fbfd/0d3b66?text=C", 
                                name: "Crop Monitoring",
                                desc: "Multi-spectral imaging systems for crop health analysis"
                            },
                            { 
                                src: "https://via.placeholder.com/100x100/f9fbfd/0d3b66?text=S", 
                                name: "Spray Systems",
                                desc: "Precision spraying equipment for targeted application"
                            },
                            { 
                                src: "https://via.placeholder.com/100x100/f9fbfd/0d3b66?text=D", 
                                name: "Data Analytics",
                                desc: "Farm management software for data-driven decisions"
                            },
                        ],
                    },
                    fpv: {
                        title: "Exclusive Drone Category",
                        description: "FPV Racing",
                        cards: [
                            { 
                                src: "https://via.placeholder.com/100x100/f9fbfd/0d3b66?text=F", 
                                name: "Racing Frames",
                                desc: "Lightweight carbon fiber frames for maximum speed"
                            },
                            { 
                                src: "https://via.placeholder.com/100x100/f9fbfd/0d3b66?text=V", 
                                name: "Video Transmitters",
                                desc: "High-power FPV transmission for clear video feed"
                            },
                            { 
                                src: "https://via.placeholder.com/100x100/f9fbfd/0d3b66?text=P", 
                                name: "Racing Props",
                                desc: "Performance propeller sets for optimal aerodynamics"
                            },
                        ],
                    },
                };
                
                // Check if mobile
                this.isMobile = window.innerWidth <= 768;
                
                if (!this.isMobile) {
                    this.positionItems();
                }
                this.bindEvents();
                this.updateContent(this.navItems[this.currentIndex].dataset.category);
            }
            
            positionItems() {
                if (this.isMobile) return;
                
                this.navItems.forEach((item, i) => {
                    const angle = i * this.angleStep + this.rotation;
                    // Use elliptical positioning with different X and Y radii
                    const x = this.centerX + Math.cos(angle) * this.radiusX - 60;
                    const y = this.centerY + Math.sin(angle) * this.radiusY - 60;
                    
                    if (i === this.currentIndex) {
                        item.style.left = `${x - 10}px`;
                        item.style.top = `${y - 10}px`;
                        item.style.transform = "scale(1.1)";
                        item.style.opacity = 1;
                    } else {
                        item.style.left = `${x}px`;
                        item.style.top = `${y}px`;
                        const factor = (y - (this.centerY - this.radiusY)) / (this.radiusY * 2);
                        const scale = 0.8 + factor * 0.2;
                        const opacity = 0.7 + factor * 0.3;
                        item.style.transform = `scale(${scale})`;
                        item.style.opacity = opacity;
                    }
                });
            }
            
            bindEvents() {
                if (!this.isMobile) {
                    this.container.addEventListener("wheel", (e) => {
                        e.preventDefault();
                        this.rotate(e.deltaY > 0 ? 1 : -1);
                    });
                    
                    document.addEventListener("keydown", (e) => {
                        if (e.key === "ArrowUp") this.rotate(-1);
                        if (e.key === "ArrowDown") this.rotate(1);
                    });
                }
                
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
                if (!this.isMobile) {
                    this.positionItems();
                }
            }
            
            updateContent(category) {
                const categoryData = this.data[category] || {};
                const { title, description, cards } = categoryData;
                
                // Update title and description
                const titleElement = document.querySelector(".content h1");
                const descElement = document.querySelector(".content p");
                const cardsContainer = document.querySelector(".cards-container");
                
                if (titleElement) titleElement.textContent = title || "Exclusive Drone Category";
                if (descElement) descElement.textContent = description || "Discover professional-grade drone solutions";
                
                if (cardsContainer && cards) {
                    cardsContainer.innerHTML = cards
                        .map(
                            (c) => `
                            <div class="card">
                                <img src="${c.src}" alt="${c.name}" />
                                <h3>${c.name}</h3>
                                <p>${c.desc || ''}</p>
                            </div>
                        `
                        )
                        .join("");
                }
            }
        }
        
        // Additional event listeners for the rest of the site
        document.addEventListener("DOMContentLoaded", () => {
            new CircularMenu();

            // Add smooth scrolling to navigation links
            document.querySelectorAll('a[href^="#"]').forEach(anchor => {
                anchor.addEventListener('click', function (e) {
                    e.preventDefault();
                    const target = document.querySelector(this.getAttribute('href'));
                    if (target) {
                        target.scrollIntoView({
                            behavior: 'smooth'
                        });
                    }
                });
            });

            // Add hover effects to product cards
            document.querySelectorAll('.product-card').forEach(card => {
                card.addEventListener('mouseenter', function() {
                    this.style.transform = 'translateY(-10px)';
                });
                
                card.addEventListener('mouseleave', function() {
                    this.style.transform = 'translateY(-5px)';
                });
            });

            // Newsletter form submission
            const newsletterForm = document.querySelector('.newsletter-form');
            if (newsletterForm) {
                newsletterForm.addEventListener('submit', function(e) {
                    e.preventDefault();
                    const email = this.querySelector('input[type="email"]').value;
                    if (email) {
                        alert('Thank you for subscribing!');
                        this.querySelector('input[type="email"]').value = '';
                    }
                });
            }

            // Add click handlers for CTA buttons
            document.querySelectorAll('.cta-button').forEach(button => {
                button.addEventListener('click', function() {
                    alert('Redirecting to shop...');
                });
            });
        });
        
        // Handle resize
        window.addEventListener('resize', () => {
            location.reload(); // Simple solution for demo
        });
    
