// script.js - FIXED VERSION
document.addEventListener('DOMContentLoaded', function() {
    // Global Variables
    const sections = document.querySelectorAll('.section');
    const floatingProfile = document.getElementById('floatingProfile');
    const heroSection = document.getElementById('hero');
    const skillsGrid = document.querySelector('.skills-grid');
    const emailText = document.getElementById('emailText');
    const copyEmailBtn = document.getElementById('copyEmail');
    const phoneText = document.getElementById('phoneText');
    const copyPhoneBtn = document.getElementById('copyPhone');
    const certificateModal = document.getElementById('certificateModal');
    const modalClose = document.getElementById('modalClose');
    const modalBody = document.getElementById('modalBody');
    const soundToggle = document.getElementById('soundToggle');
    const audioControlPanel = document.getElementById('audioControlPanel');
    const audioClose = document.getElementById('audioClose');
    const previewQuestionnaireBtn = document.getElementById('previewQuestionnaire');
    const projectModal = document.getElementById('projectModal');
    const projectModalClose = document.getElementById('projectModalClose');
    const projectCloseBtn = document.getElementById('projectCloseBtn');
    const exploreBtn = document.getElementById('exploreBtn');
    const profileImageContainer = document.getElementById('profileImageContainer');
    const mainProfileImage = document.getElementById('mainProfileImage');
    const pdfModal = document.getElementById('pdfModal');
    const pdfModalClose = document.getElementById('pdfModalClose');
    const closePdfModalBtn = document.getElementById('closePdfModal');
    
    // Audio elements - Using base64 encoded short audio clips for reliability
    const bgMusic = document.getElementById('bgMusic');
    const ambience = document.getElementById('ambience');
    const hoverSound = document.getElementById('hoverSound');
    const clickSound = document.getElementById('clickSound');
    const cardSound = document.getElementById('cardSound');
    const techSound = document.getElementById('techSound');
    const highlightSound = document.getElementById('highlightSound');
    const modalOpenSound = document.getElementById('modalOpenSound');
    const modalCloseSound = document.getElementById('modalCloseSound');
    
    // Volume controls
    const bgMusicVolume = document.getElementById('bgMusicVolume');
    const sfxVolume = document.getElementById('sfxVolume');
    const ambienceVolume = document.getElementById('ambienceVolume');
    
    // Project data
    const projects = {
        gebeyayie: {
            title: "gebeyayie.com",
            description: "A secure online shopping platform with integrated delivery system and Google Maps integration. Built with modern e-commerce features including secure payments, user authentication, and real-time order tracking.",
            url: "https://gebeyayie.com",
            screenshot: "https://api.screenshotmachine.com?key=a533d8&url=https://gebeyayie.com/beta/&dimension=1024x768",
            features: [
                "Secure online payment integration",
                "Real-time Google Maps delivery tracking",
                "User authentication and profiles",
                "Product catalog with search and filters",
                "Order management system",
                "Responsive mobile-first design"
            ],
            tech: ["PHP", "MySQL", "JavaScript", "HTML5", "CSS3"],
            lines: "85000+",
            duration: "2 months",
            team: "Solo"
        },
        ekzones: {
            title: "ekzones.com",
            description: "A portfolio and technology hub showcasing modern web development techniques and projects. Features interactive demonstrations of coding skills and project showcases.",
            url: "https://ekzones.com",
            screenshot: "https://api.screenshotmachine.com?key=a533d8&url=https://ekzones.com&dimension=1024x768",
            features: [
                "Interactive portfolio showcase",
                "Live code demonstrations",
                "Project case studies",
                "Responsive design across all devices",
                "Performance optimized loading",
                "Modern UI/UX design"
            ],
            tech: ["JavaScript", "HTML5", "CSS3", "PHP"],
            lines: "5200+",
            duration: "1 week",
            team: "Solo"
        },
        gstrading: {
            title: "gstradingplcet.com",
            description: "Transport company website featuring a quotation system and integrated map functionality. Built to streamline client inquiries and service requests.",
            url: "https://gstradingplcet.com",
            screenshot: "https://api.screenshotmachine.com?key=a533d8&url=https://gstradingplcet.com&dimension=1024x768",
            features: [
                "Automated quotation system",
                "Map integration for route planning",
                "Service request management",
                "Client dashboard",
                "Real-time updates",
                "Multi-language support"
            ],
            tech: ["PHP", "MySQL", "JavaScript", "Google Maps API"],
            lines: "6800+",
            duration: "0.5 months",
            team: "Solo"
        },
        elearning: {
            title: "E-learning Platform",
            description: "Interactive learning platform with comprehensive course management and progress tracking. Built for delivering educational content with engagement features.",
            url: "ekzones.com/ai",
            screenshot: "https://api.screenshotmachine.com?key=a533d8&url=https://gebeyayie.com/ai/&dimension=1024x7680",
            features: [
                "Course management system",
                "Progress tracking and analytics",
                "Interactive quizzes and assessments",
                "Video lesson hosting",
                "Student discussion forums",
                "Certificate generation"
            ],
            tech: ["PHP", "MySQL", "JavaScript", "Video.js"],
            lines: "24,345+",
            duration: "1 months",
            team: "Solo"
        }
    };
    
    // Soft Skills Data for circular progress
    const softSkills = [
        { 
            name: 'Communication', 
            level: 90,
            description: 'Clear communication with both technical and non-technical teams.',
            color: '#6c63ff'
        },
        { 
            name: 'Problem Solving', 
            level: 95,
            description: 'Strong logical thinking and structured problem analysis.',
            color: '#ff6b9d'
        },
        { 
            name: 'Analytical Thinking', 
            level: 88,
            description: 'Breaking down complex problems into manageable components.',
            color: '#00d4ff'
        },
        { 
            name: 'Adaptability', 
            level: 92,
            description: 'Fast learner in new tools and environments.',
            color: '#00ff9d'
        }
    ];
    
    // Audio state
    let audioEnabled = false;
    let currentAudioPreset = 'epic';
    
    // Initialize the page
    init();
    
    function init() {
        // Set up scroll behavior (removed forced scrolling)
        setupScrollBehavior();
        
        // Create soft skills with circular progress
        createCircularSkills();
        
        // Set up event listeners
        setupEventListeners();
        
        // Set up Intersection Observer for animations
        setupIntersectionObserver();
        
        // Initialize audio system
        setupAudioSystem();
        
        // Add entrance animation
        setTimeout(playEntranceAnimation, 300);
    }
    
    function setupScrollBehavior() {
        // REMOVED forced scrolling behavior - let users scroll naturally
        
        // Update profile position on scroll
        window.addEventListener('scroll', updateProfilePosition);
        
        // Initial position update
        updateProfilePosition();
    }
    
    function updateProfilePosition() {
        const scrollPosition = window.scrollY || document.documentElement.scrollTop;
        const heroHeight = heroSection.offsetHeight;
        
        if (scrollPosition > heroHeight * 0.3) {
            profileImageContainer.classList.add('scrolled');
            floatingProfile.classList.add('active');
        } else {
            profileImageContainer.classList.remove('scrolled');
            floatingProfile.classList.remove('active');
        }
    }
    
    function createCircularSkills() {
        skillsGrid.innerHTML = '';
        
        softSkills.forEach(skill => {
            const skillElement = document.createElement('div');
            skillElement.className = 'skill-item fade-in';
            skillElement.innerHTML = `
                <div class="circular-progress" data-percent="${skill.level}" data-color="${skill.color}">
                    <svg class="progress-ring" width="120" height="120">
                        <circle class="progress-ring-circle" stroke="${skill.color}" stroke-width="10" fill="transparent" r="50" cx="60" cy="60"/>
                    </svg>
                    <div class="progress-value">${skill.level}%</div>
                </div>
                <div class="skill-info">
                    <h4>${skill.name}</h4>
                    <p>${skill.description}</p>
                </div>
            `;
            
            skillsGrid.appendChild(skillElement);
            
            // Add sound on hover
            skillElement.addEventListener('mouseenter', () => playSound(techSound, 0.3));
            
            // Animate progress circle
            setTimeout(() => {
                animateCircularProgress(skillElement);
            }, 500);
        });
    }
    
    function animateCircularProgress(element) {
        const circle = element.querySelector('.progress-ring-circle');
        const radius = circle.r.baseVal.value;
        const circumference = 2 * Math.PI * radius;
        const percent = parseInt(element.querySelector('.circular-progress').getAttribute('data-percent'));
        
        circle.style.strokeDasharray = `${circumference} ${circumference}`;
        circle.style.strokeDashoffset = circumference;
        
        const offset = circumference - (percent / 100) * circumference;
        
        setTimeout(() => {
            circle.style.transition = 'stroke-dashoffset 1.5s ease-in-out';
            circle.style.strokeDashoffset = offset;
        }, 100);
    }
    
    function setupEventListeners() {
        // Copy email to clipboard
        copyEmailBtn.addEventListener('click', function() {
            navigator.clipboard.writeText(emailText.textContent).then(() => {
                showCopyFeedback(this, 'Copied!');
                playSound(clickSound);
            }).catch(err => {
                console.error('Failed to copy email: ', err);
            });
        });
        
        // Copy phone to clipboard
        copyPhoneBtn.addEventListener('click', function() {
            navigator.clipboard.writeText(phoneText.textContent).then(() => {
                showCopyFeedback(this, 'Copied!');
                playSound(clickSound);
            }).catch(err => {
                console.error('Failed to copy phone: ', err);
            });
        });
        
        // Certificate modal - FIXED
        const certificateThumbnails = document.querySelectorAll('.certificate-thumbnail');
        certificateThumbnails.forEach(thumbnail => {
            thumbnail.addEventListener('click', function(e) {
                e.preventDefault();
                e.stopPropagation();
                const certificateType = this.getAttribute('data-certificate');
                openCertificateModal(certificateType);
                playSound(modalOpenSound);
            });
        });
        
        // Modal close
        modalClose.addEventListener('click', closeCertificateModal);
        certificateModal.addEventListener('click', function(e) {
            if (e.target === certificateModal) {
                closeCertificateModal();
                playSound(modalCloseSound);
            }
        });
        
        // Project modal - FIXED
        const projectLinks = document.querySelectorAll('.project-link');
        projectLinks.forEach(link => {
            link.addEventListener('click', function(e) {
                e.preventDefault();
                e.stopPropagation();
                const projectId = this.getAttribute('data-project');
                openProjectModal(projectId);
                playSound(modalOpenSound);
            });
        });
        
        const projectCards = document.querySelectorAll('.project-card');
        projectCards.forEach(card => {
            card.addEventListener('click', function(e) {
                if (!e.target.closest('.project-link') && !e.target.closest('.project-info')) {
                    const projectId = this.getAttribute('data-project');
                    openProjectModal(projectId);
                    playSound(modalOpenSound);
                }
            });
        });
        
        // Project modal close
        projectModalClose.addEventListener('click', closeProjectModal);
        projectCloseBtn.addEventListener('click', closeProjectModal);
        projectModal.addEventListener('click', function(e) {
            if (e.target === projectModal) {
                closeProjectModal();
                playSound(modalCloseSound);
            }
        });
        
        // PDF modal for questionnaire
        previewQuestionnaireBtn.addEventListener('click', function(e) {
            e.preventDefault();
            openPdfModal();
            playSound(modalOpenSound);
        });
        
        // PDF modal close
        pdfModalClose.addEventListener('click', closePdfModal);
        closePdfModalBtn.addEventListener('click', closePdfModal);
        pdfModal.addEventListener('click', function(e) {
            if (e.target === pdfModal) {
                closePdfModal();
                playSound(modalCloseSound);
            }
        });
        
        // Explore button
        exploreBtn.addEventListener('click', function() {
            playSound(clickSound, 0.7);
            
            // Scroll to next section smoothly
            const aboutSection = document.getElementById('about');
            aboutSection.scrollIntoView({ behavior: 'smooth' });
        });
        
        // Add sound effects to interactive elements
        addSoundEffects();
        
        // Add keyboard shortcuts for modals
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape') {
                if (certificateModal.classList.contains('active')) {
                    closeCertificateModal();
                } else if (projectModal.classList.contains('active')) {
                    closeProjectModal();
                } else if (pdfModal.classList.contains('active')) {
                    closePdfModal();
                }
            }
        });
    }
    
    function showCopyFeedback(button, message) {
        const originalText = button.innerHTML;
        button.innerHTML = `<i class="fas fa-check"></i> ${message}`;
        button.style.background = 'var(--success)';
        button.style.borderColor = 'var(--success)';
        
        setTimeout(() => {
            button.innerHTML = originalText;
            button.style.background = '';
            button.style.borderColor = '';
        }, 2000);
    }
    
    function addSoundEffects() {
        // Card hover sounds
        const cards = document.querySelectorAll('[data-sound="card"]');
        cards.forEach(card => {
            card.addEventListener('mouseenter', () => playSound(cardSound, 0.3));
            card.addEventListener('click', () => playSound(clickSound, 0.5));
        });
        
        // Tech item sounds
        const techItems = document.querySelectorAll('[data-sound="tech"]');
        techItems.forEach(item => {
            item.addEventListener('mouseenter', () => playSound(techSound, 0.3));
            item.addEventListener('click', () => playSound(clickSound, 0.5));
        });
        
        // Highlight sounds
        const highlights = document.querySelectorAll('[data-sound="highlight"]');
        highlights.forEach(highlight => {
            highlight.addEventListener('mouseenter', () => playSound(highlightSound, 0.4));
            highlight.addEventListener('click', () => playSound(highlightSound, 0.6));
        });
        
        // Button sounds
        const buttons = document.querySelectorAll('[data-sound="click"]');
        buttons.forEach(button => {
            button.addEventListener('click', () => playSound(clickSound, 0.5));
        });
        
        // General hover sounds
        const hoverElements = document.querySelectorAll('.skill-item, .tech-item, .project-link, .btn, .certificate-thumbnail, .project-card, .about-card');
        hoverElements.forEach(el => {
            el.addEventListener('mouseenter', () => playSound(hoverSound, 0.2));
        });
    }
    
    function setupIntersectionObserver() {
        // Fade-in animation for elements
        const fadeElements = document.querySelectorAll('.fade-in');
        
        const fadeObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                    
                    // Add a subtle sound when elements come into view
                    if (audioEnabled && entry.intersectionRatio > 0.5) {
                        playSound(cardSound, 0.1);
                    }
                }
            });
        }, {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        });
        
        fadeElements.forEach(element => {
            fadeObserver.observe(element);
        });
    }
    
    function openCertificateModal(certificateType) {
        let modalContent = '';
        let certificateImage = '';
        
        if (certificateType === 'earthlink') {
            certificateImage = './certificate-1.jpg';
            modalContent = `
                <h2>Front-End Development Certificate</h2>
                <p class="modal-subtitle">Earthlink Technologies</p>
                <img src="${certificateImage}" alt="Front-End Development Certificate" class="certificate-image" style="width:100%; border-radius:var(--radius-md); margin:20px 0;">
                <p style="color:var(--text-secondary); font-size:1.1rem; line-height:1.7;">
                    This certificate represents completion of a comprehensive front-end development course covering HTML5, CSS3, JavaScript, and modern web development practices.
                    The course included hands-on projects, responsive design techniques, and best practices for building user-friendly web applications.
                </p>
            `;
        } else if (certificateType === 'fleet') {
            certificateImage = './certificate-2.jpg';
            modalContent = `
                <h2>Fleet Management Course</h2>
                <p class="modal-subtitle">Professional Certification</p>
                <img src="${certificateImage}" alt="Fleet Management Certificate" class="certificate-image" style="width:100%; border-radius:var(--radius-md); margin:20px 0;">
                <p style="color:var(--text-secondary); font-size:1.1rem; line-height:1.7;">
                    This professional certification covers fleet operations, maintenance scheduling, cost management, and logistics optimization for transportation businesses.
                    The training included practical case studies and operational best practices for efficient fleet management.
                </p>
            `;
        }
        
        modalBody.innerHTML = modalContent;
        certificateModal.classList.add('active');
        document.body.style.overflow = 'hidden';
        document.body.style.paddingRight = `${getScrollbarWidth()}px`;
    }
    
    function openProjectModal(projectId) {
        const project = projects[projectId];
        if (!project) return;
        
        // Update modal content
        document.getElementById('projectModalTitle').textContent = project.title;
        document.getElementById('projectDescription').textContent = project.description;
        document.getElementById('projectUrl').textContent = project.url;
        document.getElementById('projectLines').textContent = project.lines;
        document.getElementById('projectDuration').textContent = project.duration;
        document.getElementById('projectTeam').textContent = project.team;
        
        // Update live link
        const liveLink = document.getElementById('projectLiveLink');
        liveLink.href = project.url;
        if (projectId === 'elearning') {
            liveLink.style.display = 'none';
        } else {
            liveLink.style.display = 'flex';
        }
        
        // Update tech tags
        const techContainer = document.querySelector('.project-modal-tech');
        techContainer.innerHTML = '';
        project.tech.forEach(tech => {
            const tag = document.createElement('span');
            tag.className = 'tech-tag';
            tag.textContent = tech;
            techContainer.appendChild(tag);
        });
        
        // Update features
        const featuresList = document.getElementById('projectFeatures');
        featuresList.innerHTML = '';
        project.features.forEach(feature => {
            const li = document.createElement('li');
            li.textContent = feature;
            featuresList.appendChild(li);
        });
        
        // Load screenshot
        const screenshot = document.getElementById('projectScreenshot');
        const loading = document.querySelector('.screenshot-loading');
        
        screenshot.style.display = 'none';
        loading.style.display = 'flex';
        
        screenshot.onload = function() {
            loading.style.display = 'none';
            screenshot.style.display = 'block';
            screenshot.style.opacity = '0';
            screenshot.style.transform = 'scale(0.95)';
            
            setTimeout(() => {
                screenshot.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
                screenshot.style.opacity = '1';
                screenshot.style.transform = 'scale(1)';
            }, 100);
        };
        
        screenshot.onerror = function() {
            loading.innerHTML = '<p>Unable to load screenshot. Please visit the live site.</p>';
            loading.style.display = 'flex';
        };
        
        screenshot.src = project.screenshot;
        
        // Show modal
        projectModal.classList.add('active');
        document.body.style.overflow = 'hidden';
        document.body.style.paddingRight = `${getScrollbarWidth()}px`;
        
        // Play sound
        playSound(modalOpenSound, 0.5);
    }
    
    function openPdfModal() {
        pdfModal.classList.add('active');
        document.body.style.overflow = 'hidden';
        document.body.style.paddingRight = `${getScrollbarWidth()}px`;
        
        // Load PDF in iframe
        const pdfFrame = document.getElementById('pdfFrame');
        const pdfLoading = document.querySelector('.pdf-loading');
        
        setTimeout(() => {
            pdfLoading.style.display = 'none';
            pdfFrame.style.display = 'block';
        }, 1000);
    }
    
    function closeCertificateModal() {
        certificateModal.classList.remove('active');
        document.body.style.overflow = '';
        document.body.style.paddingRight = '';
        playSound(modalCloseSound);
    }
    
    function closeProjectModal() {
        projectModal.classList.remove('active');
        document.body.style.overflow = '';
        document.body.style.paddingRight = '';
        playSound(modalCloseSound);
    }
    
    function closePdfModal() {
        pdfModal.classList.remove('active');
        document.body.style.overflow = '';
        document.body.style.paddingRight = '';
        playSound(modalCloseSound);
    }
    
    function getScrollbarWidth() {
        return window.innerWidth - document.documentElement.clientWidth;
    }
    
    function setupAudioSystem() {
        // Set initial volumes
        updateVolumes();
        
        // Setup volume controls
        bgMusicVolume.addEventListener('input', updateVolumes);
        sfxVolume.addEventListener('input', updateVolumes);
        ambienceVolume.addEventListener('input', updateVolumes);
        
        // Sound toggle
        soundToggle.addEventListener('click', function() {
            audioEnabled = !audioEnabled;
            
            if (audioEnabled) {
                enableAudio();
                playSound(clickSound);
                soundToggle.classList.add('active');
            } else {
                disableAudio();
                soundToggle.classList.remove('active');
            }
        });
        
        // Audio control panel
        soundToggle.addEventListener('dblclick', function() {
            audioControlPanel.classList.toggle('active');
            playSound(clickSound);
        });
        
        audioClose.addEventListener('click', function() {
            audioControlPanel.classList.remove('active');
            playSound(clickSound);
        });
        
        // Audio presets
        const presetButtons = document.querySelectorAll('.preset-btn');
        presetButtons.forEach(btn => {
            btn.addEventListener('click', function() {
                const preset = this.getAttribute('data-preset');
                applyAudioPreset(preset);
                playSound(clickSound);
                
                // Update active state
                presetButtons.forEach(b => b.classList.remove('active'));
                this.classList.add('active');
            });
        });
        
        // Set epic preset as active initially
        document.querySelector('.preset-btn[data-preset="epic"]').classList.add('active');
        
        // Auto-start audio after user interaction
        document.addEventListener('click', startAudioOnInteraction, { once: true });
        document.addEventListener('touchstart', startAudioOnInteraction, { once: true });
    }
    
    function startAudioOnInteraction() {
        if (!audioEnabled) {
            audioEnabled = true;
            enableAudio();
            soundToggle.classList.add('active');
        }
    }
    
    function enableAudio() {
        bgMusic.volume = bgMusicVolume.value / 100;
        ambience.volume = ambienceVolume.value / 100;
        
        // Play with a small delay to avoid autoplay restrictions
        setTimeout(() => {
            bgMusic.play().catch(e => console.log("Background music play failed:", e));
            ambience.play().catch(e => console.log("Ambience play failed:", e));
        }, 100);
        
        // Update UI
        soundToggle.querySelector('.sound-icon i').className = 'fas fa-volume-up';
    }
    
    function disableAudio() {
        bgMusic.pause();
        ambience.pause();
        
        // Update UI
        soundToggle.querySelector('.sound-icon i').className = 'fas fa-volume-mute';
    }
    
    function updateVolumes() {
        const bgVolume = bgMusicVolume.value / 100;
        const sfxVolumeValue = sfxVolume.value / 100;
        const ambienceVolumeValue = ambienceVolume.value / 100;
        
        bgMusic.volume = bgVolume;
        ambience.volume = ambienceVolumeValue;
        
        // Update all sound effects volumes
        [hoverSound, clickSound, cardSound, techSound, highlightSound, modalOpenSound, modalCloseSound]
         .forEach(sound => {
            sound.volume = sfxVolumeValue;
        });
        
        // Update display values
        document.querySelectorAll('.volume-value').forEach((el, index) => {
            const values = [bgMusicVolume.value, sfxVolume.value, ambienceVolume.value];
            el.textContent = `${values[index]}%`;
        });
    }
    
    function applyAudioPreset(preset) {
        currentAudioPreset = preset;
        
        switch(preset) {
            case 'epic':
                bgMusicVolume.value = 60;
                sfxVolume.value = 80;
                ambienceVolume.value = 40;
                break;
            case 'calm':
                bgMusicVolume.value = 40;
                sfxVolume.value = 50;
                ambienceVolume.value = 20;
                break;
            case 'cinematic':
                bgMusicVolume.value = 70;
                sfxVolume.value = 90;
                ambienceVolume.value = 50;
                break;
            case 'off':
                bgMusicVolume.value = 0;
                sfxVolume.value = 0;
                ambienceVolume.value = 0;
                break;
        }
        
        updateVolumes();
    }
    
    function playSound(soundElement, volumeMultiplier = 1) {
        if (!audioEnabled) return;
        
        try {
            soundElement.currentTime = 0;
            soundElement.volume = soundElement.volume * volumeMultiplier;
            soundElement.play().catch(e => console.log("Sound play failed:", e));
        } catch(e) {
            console.log("Sound error:", e);
        }
    }
    
    function playEntranceAnimation() {
        // Add visual effects
        document.querySelector('.hero-content').style.animation = 'fadeInUp 1s ease-out forwards';
    }
    
    // Initialize typewriter effect
    window.addEventListener('load', function() {
        const typewriter = document.querySelector('.typewriter');
        if (typewriter) {
            const text = typewriter.textContent;
            typewriter.textContent = '';
            typewriter.style.borderRight = '3px solid var(--accent)';
            
            let i = 0;
            function typeWriter() {
                if (i < text.length) {
                    typewriter.textContent += text.charAt(i);
                    i++;
                    setTimeout(typeWriter, 100);
                } else {
                    // Blinking cursor effect
                    setInterval(() => {
                        typewriter.style.borderRightColor = typewriter.style.borderRightColor === 'transparent' ? 'var(--accent)' : 'transparent';
                    }, 500);
                }
            }
            
            setTimeout(typeWriter, 1000);
        }
        
        // Initialize audio toggle state
        if (audioEnabled) {
            soundToggle.classList.add('active');
        }
    });
});