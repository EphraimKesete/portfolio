// script.js
document.addEventListener('DOMContentLoaded', function() {
    // DOM Elements
    const bookCover = document.getElementById('cover');
    const bookPages = document.getElementById('bookPages');
    const pages = document.querySelectorAll('.page');
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    const currentPageEl = document.getElementById('currentPage');
    const emailContact = document.getElementById('emailContact');
    const projectCards = document.querySelectorAll('.project-card');
    const projectModal = document.getElementById('projectModal');
    const modalClose = document.getElementById('modalClose');
    const modalTitle = document.getElementById('modalTitle');
    const modalDescription = document.getElementById('modalDescription');
    const modalTech = document.getElementById('modalTech');
    const modalLink = document.getElementById('modalLink');
    const skillProgressBars = document.querySelectorAll('.skill-progress');
    const skillValues = document.querySelectorAll('.skill-value');
    
    // State Variables
    let currentPage = 1;
    let totalPages = 4;
    let isAnimating = false;
    let touchStartX = 0;
    let touchEndX = 0;
    
    // Open Book Cover
    function openBook() {
        if (bookCover.classList.contains('open')) return;
        
        bookCover.classList.add('open');
        
        // Show first page after book opens
        setTimeout(() => {
            document.querySelector('.page-1').classList.add('active');
            updatePageIndicator();
            animatePageContent(1);
        }, 600);
    }
    
    // Navigate to specific page
    function goToPage(pageNumber) {
        if (isAnimating || pageNumber < 1 || pageNumber > totalPages) return;
        
        // Don't do anything if already on this page
        if (pageNumber === currentPage) return;
        
        isAnimating = true;
        
        // Determine direction
        const direction = pageNumber > currentPage ? 'next' : 'prev';
        
        // Get current and target pages
        const currentPageEl = document.querySelector(`.page-${currentPage}`);
        const targetPageEl = document.querySelector(`.page-${pageNumber}`);
        
        // Animation for page flip
        if (direction === 'next') {
            // Move current page to left
            currentPageEl.classList.add('previous');
            
            // Show and animate new page from right
            targetPageEl.classList.remove('previous');
            targetPageEl.classList.add('active', 'flipping');
            
            setTimeout(() => {
                currentPageEl.classList.remove('active', 'flipping');
                targetPageEl.classList.remove('flipping');
                currentPage = pageNumber;
                updatePageIndicator();
                animatePageContent(pageNumber);
                isAnimating = false;
            }, 800);
        } else {
            // For previous page, we need to handle differently
            targetPageEl.classList.add('active', 'flipping');
            currentPageEl.classList.add('flipping');
            
            setTimeout(() => {
                currentPageEl.classList.remove('active');
                targetPageEl.classList.remove('previous', 'flipping');
                currentPageEl.classList.remove('flipping');
                currentPage = pageNumber;
                updatePageIndicator();
                animatePageContent(pageNumber);
                isAnimating = false;
            }, 800);
        }
    }
    
    // Update page indicator
    function updatePageIndicator() {
        currentPageEl.textContent = currentPage;
        
        // Update button states
        prevBtn.disabled = currentPage === 1;
        nextBtn.disabled = currentPage === totalPages;
        
        // Visual feedback for disabled buttons
        if (prevBtn.disabled) {
            prevBtn.style.opacity = '0.5';
            prevBtn.style.cursor = 'not-allowed';
        } else {
            prevBtn.style.opacity = '1';
            prevBtn.style.cursor = 'pointer';
        }
        
        if (nextBtn.disabled) {
            nextBtn.style.opacity = '0.5';
            nextBtn.style.cursor = 'not-allowed';
        } else {
            nextBtn.style.opacity = '1';
            nextBtn.style.cursor = 'pointer';
        }
    }
    
    // Animate content on page load
    function animatePageContent(pageNumber) {
        const page = document.querySelector(`.page-${pageNumber}`);
        
        // Reset animations for all elements
        const animatableElements = page.querySelectorAll('.intro-text, .skills-list li, .passion-section, .skills-section, .tech-section, .education-section, .project-card, .contact-container, .project-instruction');
        
        animatableElements.forEach(el => {
            el.style.animation = 'none';
            void el.offsetWidth; // Trigger reflow
        });
        
        // Different animations based on page
        switch(pageNumber) {
            case 1:
                // Animate intro text
                const introTexts = page.querySelectorAll('.intro-text');
                const skillItems = page.querySelectorAll('.skills-list li');
                const passionSection = page.querySelector('.passion-section');
                
                introTexts.forEach((text, index) => {
                    text.style.animation = `fadeInUp 0.8s forwards ${0.3 + index * 0.2}s`;
                });
                
                skillItems.forEach((item, index) => {
                    item.style.animation = `fadeInLeft 0.6s forwards ${0.5 + index * 0.2}s`;
                });
                
                if (passionSection) {
                    passionSection.style.animation = 'fadeInUp 0.8s forwards 1.1s';
                }
                break;
                
            case 2:
                // Animate skill bars
                animateSkillBars();
                
                // Animate sections
                const sections = page.querySelectorAll('.skills-section, .tech-section, .education-section');
                sections.forEach((section, index) => {
                    section.style.animation = `fadeInUp 0.8s forwards ${0.3 + index * 0.2}s`;
                });
                
                // Add hover effects to tech items
                const techItems = page.querySelectorAll('.tech-item');
                techItems.forEach(item => {
                    item.addEventListener('mouseenter', function() {
                        const tech = this.getAttribute('data-tech');
                        const icon = this.querySelector('i');
                        
                        // Add a subtle pulse effect
                        icon.style.transform = 'scale(1.2)';
                        setTimeout(() => {
                            icon.style.transform = 'scale(1)';
                        }, 300);
                    });
                });
                break;
                
            case 3:
                // Animate project cards
                const projectCards = page.querySelectorAll('.project-card');
                projectCards.forEach((card, index) => {
                    card.style.animation = `fadeInUp 0.8s forwards ${0.3 + index * 0.2}s`;
                });
                
                const instruction = page.querySelector('.project-instruction');
                if (instruction) {
                    instruction.style.animation = 'fadeIn 1s forwards 1s';
                }
                break;
                
            case 4:
                // Animate contact items
                const contactContainer = page.querySelector('.contact-container');
                if (contactContainer) {
                    contactContainer.style.animation = 'fadeInUp 0.8s forwards 0.3s';
                }
                break;
        }
    }
    
    // Animate skill bars with counting effect
    function animateSkillBars() {
        skillProgressBars.forEach((bar, index) => {
            const width = bar.getAttribute('data-width');
            bar.style.width = '0%';
            
            // Start animation with delay
            setTimeout(() => {
                bar.style.transition = 'width 1.5s ease-out';
                bar.style.width = `${width}%`;
            }, 300 + index * 200);
        });
        
        // Animate skill values counting up
        skillValues.forEach((valueEl, index) => {
            const targetValue = parseInt(valueEl.getAttribute('data-value'));
            let currentValue = 0;
            const increment = targetValue / 50; // 50 steps
            const duration = 1500; // 1.5 seconds
            
            // Start counting with delay
            setTimeout(() => {
                const timer = setInterval(() => {
                    currentValue += increment;
                    if (currentValue >= targetValue) {
                        currentValue = targetValue;
                        clearInterval(timer);
                    }
                    valueEl.textContent = Math.round(currentValue) + '%';
                }, duration / 50);
            }, 300 + index * 200);
        });
    }
    
    // Copy email to clipboard
    function copyEmailToClipboard() {
        const email = 'contact@gebeyayie.com';
        
        navigator.clipboard.writeText(email).then(() => {
            // Show success feedback
            const emailText = emailContact.querySelector('.email-text');
            const originalText = emailText.textContent;
            
            emailText.textContent = 'Copied to clipboard!';
            emailText.style.color = 'var(--success-color)';
            
            setTimeout(() => {
                emailText.textContent = originalText;
                emailText.style.color = '';
            }, 2000);
        }).catch(err => {
            console.error('Failed to copy email: ', err);
            alert('Failed to copy email. Please copy it manually: ' + email);
        });
    }
    
    // Show project modal
    function showProjectModal(projectCard) {
        const note = projectCard.querySelector('.sticky-note');
        const title = note.querySelector('h3').textContent;
        const description = note.querySelector('p').textContent;
        const techTags = note.querySelectorAll('.tech-tags span');
        const button = note.querySelector('.view-project-btn');
        const url = button.getAttribute('data-url');
        
        // Set modal content
        modalTitle.textContent = title;
        modalDescription.textContent = description;
        
        // Clear and add tech tags
        modalTech.innerHTML = '';
        techTags.forEach(tag => {
            const span = document.createElement('span');
            span.textContent = tag.textContent;
            modalTech.appendChild(span);
        });
        
        // Set link
        if (url === '#') {
            modalLink.style.display = 'none';
        } else {
            modalLink.href = url;
            modalLink.style.display = 'inline-flex';
        }
        
        // Show modal
        projectModal.classList.add('active');
        document.body.style.overflow = 'hidden';
    }
    
    // Close project modal
    function closeProjectModal() {
        projectModal.classList.remove('active');
        document.body.style.overflow = '';
    }
    
    // Handle touch gestures for mobile
    function handleTouchStart(e) {
        touchStartX = e.changedTouches[0].screenX;
    }
    
    function handleTouchEnd(e) {
        if (isAnimating) return;
        
        touchEndX = e.changedTouches[0].screenX;
        const diff = touchStartX - touchEndX;
        const minSwipeDistance = 50;
        
        // Right to left swipe (next)
        if (diff > minSwipeDistance && currentPage < totalPages) {
            goToPage(currentPage + 1);
        }
        // Left to right swipe (previous)
        else if (diff < -minSwipeDistance && currentPage > 1) {
            goToPage(currentPage - 1);
        }
    }
    
    // Keyboard navigation
    function handleKeyDown(e) {
        if (isAnimating) return;
        
        switch(e.key) {
            case 'ArrowLeft':
                if (currentPage > 1) {
                    e.preventDefault();
                    goToPage(currentPage - 1);
                }
                break;
            case 'ArrowRight':
            case ' ':
                if (currentPage < totalPages) {
                    e.preventDefault();
                    goToPage(currentPage + 1);
                }
                break;
            case 'Home':
                e.preventDefault();
                goToPage(1);
                break;
            case 'End':
                e.preventDefault();
                goToPage(totalPages);
                break;
        }
    }
    
    // Initialize
    function init() {
        // Set initial state
        updatePageIndicator();
        
        // Open book on first interaction
        const openBookOnInteraction = () => {
            openBook();
            document.removeEventListener('click', openBookOnInteraction);
            document.removeEventListener('touchstart', openBookOnInteraction);
        };
        
        document.addEventListener('click', openBookOnInteraction);
        document.addEventListener('touchstart', openBookOnInteraction);
        
        // Navigation buttons
        prevBtn.addEventListener('click', () => {
            if (currentPage > 1 && !isAnimating) {
                goToPage(currentPage - 1);
            }
        });
        
        nextBtn.addEventListener('click', () => {
            if (currentPage < totalPages && !isAnimating) {
                goToPage(currentPage + 1);
            }
        });
        
        // Email copy functionality
        emailContact.addEventListener('click', copyEmailToClipboard);
        
        // Project cards
        projectCards.forEach(card => {
            card.addEventListener('click', () => {
                showProjectModal(card);
            });
        });
        
        // Modal close
        modalClose.addEventListener('click', closeProjectModal);
        
        // Close modal on outside click
        projectModal.addEventListener('click', (e) => {
            if (e.target === projectModal) {
                closeProjectModal();
            }
        });
        
        // Touch gestures
        bookPages.addEventListener('touchstart', handleTouchStart, false);
        bookPages.addEventListener('touchend', handleTouchEnd, false);
        
        // Keyboard navigation
        document.addEventListener('keydown', handleKeyDown);
        
        // Page indicator dots (optional enhancement)
        createPageIndicatorDots();
    }
    
    // Create page indicator dots (optional)
    function createPageIndicatorDots() {
        const dotsContainer = document.createElement('div');
        dotsContainer.className = 'page-dots';
        dotsContainer.style.cssText = `
            position: absolute;
            bottom: 5rem;
            left: 50%;
            transform: translateX(-50%);
            display: flex;
            gap: 0.8rem;
            z-index: 10;
        `;
        
        for (let i = 1; i <= totalPages; i++) {
            const dot = document.createElement('button');
            dot.className = 'page-dot';
            dot.setAttribute('aria-label', `Go to page ${i}`);
            dot.style.cssText = `
                width: 12px;
                height: 12px;
                border-radius: 50%;
                border: none;
                background: ${i === currentPage ? 'var(--accent-color)' : 'rgba(255, 255, 255, 0.5)'};
                cursor: pointer;
                transition: background 0.3s ease;
                padding: 0;
            `;
            
            dot.addEventListener('click', () => {
                if (!isAnimating) {
                    goToPage(i);
                }
            });
            
            dotsContainer.appendChild(dot);
        }
        
        document.querySelector('.book-container').appendChild(dotsContainer);
        
        // Update dots when page changes
        const updateDots = () => {
            const dots = document.querySelectorAll('.page-dot');
            dots.forEach((dot, index) => {
                dot.style.background = index + 1 === currentPage ? 
                    'var(--accent-color)' : 'rgba(255, 255, 255, 0.5)';
            });
        };
        
        // Override updatePageIndicator to also update dots
        const originalUpdatePageIndicator = updatePageIndicator;
        updatePageIndicator = () => {
            originalUpdatePageIndicator();
            updateDots();
        };
    }
    
    // Initialize the application
    init();
});