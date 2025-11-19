// ===== GLOBAL VARIABLES =====
let currentSlide = 0;
let currentTestimonial = 0;
let currentLightboxIndex = 0;

// ===== DOM CONTENT LOADED =====
document.addEventListener('DOMContentLoaded', function() {
    initializeNavigation();
    initializeHomePage();
    initializeAboutPage();
    initializeServicesPage();
    initializeContactPage();
    initializeReviewsPage();
    initializeCommonFeatures();
});

// ===== NAVIGATION FUNCTIONS =====
function initializeNavigation() {
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    
    if (hamburger && navMenu) {
        hamburger.addEventListener('click', function() {
            hamburger.classList.toggle('active');
            navMenu.classList.toggle('active');
            document.body.style.overflow = navMenu.classList.contains('active') ? 'hidden' : '';
        });
        
        // Close menu when clicking on a link
        document.querySelectorAll('.nav-menu a').forEach(link => {
            link.addEventListener('click', () => {
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
                document.body.style.overflow = '';
            });
        });
        
        // Close menu when clicking outside
        document.addEventListener('click', function(e) {
            if (!hamburger.contains(e.target) && !navMenu.contains(e.target)) {
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
                document.body.style.overflow = '';
            }
        });
    }
}

// ===== HOME PAGE FUNCTIONS =====
function initializeHomePage() {
    initializeHeroSlider();
    initializeQuickBooking();
    initializeTestimonialsCarousel();
    initializeScrollAnimations();
}

function initializeHeroSlider() {
    const slides = document.querySelectorAll('.slide');
    const prevBtn = document.querySelector('.slider-prev');
    const nextBtn = document.querySelector('.slider-next');
    
    if (slides.length > 0) {
        let currentSlide = 0;
        
        function showSlide(n) {
            slides.forEach(slide => slide.classList.remove('active'));
            currentSlide = (n + slides.length) % slides.length;
            slides[currentSlide].classList.add('active');
        }
        
        if (prevBtn && nextBtn) {
            prevBtn.addEventListener('click', () => showSlide(currentSlide - 1));
            nextBtn.addEventListener('click', () => showSlide(currentSlide + 1));
            
            // Auto slide every 5 seconds
            setInterval(() => showSlide(currentSlide + 1), 5000);
        }
        
        // Show first slide
        showSlide(0);
    }
}

function initializeQuickBooking() {
    const quickBookBtn = document.getElementById('quick-book-btn');
    
    if (quickBookBtn) {
        quickBookBtn.addEventListener('click', function() {
            const pickup = document.getElementById('pickup-location')?.value;
            const destination = document.getElementById('destination')?.value;
            const date = document.getElementById('booking-date')?.value;
            const time = document.getElementById('booking-time')?.value;
            
            if (pickup && destination) {
                // Simulate price calculation
                const basePrice = 150;
                const distanceMultiplier = 12;
                const timeMultiplier = date && time ? 1.2 : 1;
                const quote = Math.floor((basePrice + (Math.random() * 100)) * timeMultiplier);
                
                const quoteElement = document.getElementById('booking-quote');
                if (quoteElement) {
                    quoteElement.innerHTML = `
                        <div class="quote-details">
                            <h4>Booking Estimate</h4>
                            <p><strong>From:</strong> ${pickup}</p>
                            <p><strong>To:</strong> ${destination}</p>
                            ${date ? `<p><strong>Date:</strong> ${new Date(date).toLocaleDateString()}</p>` : ''}
                            ${time ? `<p><strong>Time:</strong> ${time}</p>` : ''}
                            <p class="quote-price">Estimated Price: R${quote}</p>
                        </div>
                        <button onclick="window.location.href='services.html'" class="cta-button">Book Now</button>
                    `;
                    quoteElement.style.display = 'block';
                    
                    // Add animation
                    quoteElement.style.animation = 'slideDown 0.5s ease';
                }
            } else {
                showNotification('Please enter both pickup and destination locations', 'error');
            }
        });
    }
}

function initializeTestimonialsCarousel() {
    const testimonials = document.querySelectorAll('.testimonial');
    const carouselPrev = document.querySelector('.carousel-prev');
    const carouselNext = document.querySelector('.carousel-next');
    
    if (testimonials.length > 0) {
        let currentTestimonial = 0;
        
        function showTestimonial(n) {
            testimonials.forEach(testimonial => testimonial.classList.remove('active'));
            currentTestimonial = (n + testimonials.length) % testimonials.length;
            testimonials[currentTestimonial].classList.add('active');
        }
        
        if (carouselPrev && carouselNext) {
            carouselPrev.addEventListener('click', () => showTestimonial(currentTestimonial - 1));
            carouselNext.addEventListener('click', () => showTestimonial(currentTestimonial + 1));
            
            // Auto rotate every 7 seconds
            setInterval(() => showTestimonial(currentTestimonial + 1), 7000);
        }
        
        // Show first testimonial
        showTestimonial(0);
    }
}

// ===== ABOUT PAGE FUNCTIONS =====
function initializeAboutPage() {
    initializeAccordion();
    initializeTabs();
    initializeLightbox();
    initializeStatistics();
}

function initializeAccordion() {
    const accordionHeaders = document.querySelectorAll('.accordion-header');
    
    accordionHeaders.forEach(header => {
        header.addEventListener('click', function() {
            const accordionItem = this.parentElement;
            const accordionContent = this.nextElementSibling;
            const accordionIcon = this.querySelector('.accordion-icon');
            
            // Close all other accordion items
            document.querySelectorAll('.accordion-item').forEach(item => {
                if (item !== accordionItem) {
                    item.classList.remove('active');
                    item.querySelector('.accordion-content').style.maxHeight = null;
                    const icon = item.querySelector('.accordion-icon');
                    if (icon) icon.textContent = '+';
                }
            });
            
            // Toggle current accordion item
            const isActive = accordionItem.classList.toggle('active');
            
            if (isActive) {
                accordionContent.style.maxHeight = accordionContent.scrollHeight + 'px';
                if (accordionIcon) accordionIcon.textContent = '-';
            } else {
                accordionContent.style.maxHeight = null;
                if (accordionIcon) accordionIcon.textContent = '+';
            }
        });
    });
}

function initializeTabs() {
    const tabButtons = document.querySelectorAll('.tab-button');
    const tabContents = document.querySelectorAll('.tab-content');
    
    tabButtons.forEach(button => {
        button.addEventListener('click', function() {
            const tabId = this.getAttribute('data-tab');
            
            // Remove active class from all buttons and contents
            tabButtons.forEach(btn => btn.classList.remove('active'));
            tabContents.forEach(content => content.classList.remove('active'));
            
            // Add active class to current button and corresponding content
            this.classList.add('active');
            const targetContent = document.getElementById(tabId);
            if (targetContent) {
                targetContent.classList.add('active');
            }
        });
    });
}

function initializeLightbox() {
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightbox-img');
    const lightboxCaption = document.getElementById('lightbox-caption');
    const closeBtn = document.querySelector('.lightbox .close');
    const prevBtn = document.querySelector('.lightbox .prev');
    const nextBtn = document.querySelector('.lightbox .next');
    const galleryItems = document.querySelectorAll('.gallery-item img');
    
    if (lightbox && galleryItems.length > 0) {
        let currentIndex = 0;
        
        // Open lightbox when clicking on gallery image
        galleryItems.forEach((item, index) => {
            item.addEventListener('click', function() {
                currentIndex = index;
                openLightbox(this);
            });
        });
        
        // Close lightbox
        if (closeBtn) {
            closeBtn.addEventListener('click', closeLightbox);
        }
        
        // Previous image
        if (prevBtn) {
            prevBtn.addEventListener('click', showPrevImage);
        }
        
        // Next image
        if (nextBtn) {
            nextBtn.addEventListener('click', showNextImage);
        }
        
        // Keyboard navigation
        document.addEventListener('keydown', function(e) {
            if (lightbox.style.display === 'block') {
                if (e.key === 'Escape') closeLightbox();
                if (e.key === 'ArrowLeft') showPrevImage();
                if (e.key === 'ArrowRight') showNextImage();
            }
        });
        
        function openLightbox(element) {
            if (lightboxImg) {
                lightboxImg.src = element.getAttribute('data-large') || element.src;
            }
            if (lightboxCaption && element.nextElementSibling) {
                lightboxCaption.textContent = element.nextElementSibling.textContent;
            }
            lightbox.style.display = 'block';
            document.body.style.overflow = 'hidden';
        }
        
        function closeLightbox() {
            lightbox.style.display = 'none';
            document.body.style.overflow = '';
        }
        
        function showPrevImage() {
            currentIndex = (currentIndex - 1 + galleryItems.length) % galleryItems.length;
            updateLightboxImage();
        }
        
        function showNextImage() {
            currentIndex = (currentIndex