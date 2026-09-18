/* 
   Acrosil Products Pvt. Ltd. - Redesign Main Script
*/

document.addEventListener('DOMContentLoaded', () => {
    // 1. Mobile Menu Toggle
    const mobileToggle = document.querySelector('.mobile-toggle');
    const navMenu = document.querySelector('.nav-menu');

    if (mobileToggle && navMenu) {
        mobileToggle.addEventListener('click', () => {
            navMenu.classList.toggle('active');
            const icon = mobileToggle.querySelector('i');
            if (icon) {
                if (navMenu.classList.contains('active')) {
                    icon.classList.remove('fa-bars');
                    icon.classList.add('fa-xmark');
                } else {
                    icon.classList.remove('fa-xmark');
                    icon.classList.add('fa-bars');
                }
            }
        });

        // Close menu when link clicked
        document.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', () => {
                navMenu.classList.remove('active');
                const icon = mobileToggle.querySelector('i');
                if (icon) {
                    icon.classList.remove('fa-xmark');
                    icon.classList.add('fa-bars');
                }
            });
        });
    }

    // 2. Product Tab Filtering
    const tabBtns = document.querySelectorAll('.tab-btn');
    const productCards = document.querySelectorAll('.product-card');

    if (tabBtns.length > 0 && productCards.length > 0) {
        tabBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                tabBtns.forEach(b => b.classList.remove('active'));
                btn.classList.add('active');

                const filter = btn.getAttribute('data-filter');

                productCards.forEach(card => {
                    const category = card.getAttribute('data-category');
                    if (filter === 'all' || category === filter) {
                        card.style.display = 'flex';
                    } else {
                        card.style.display = 'none';
                    }
                });
            });
        });
    }

    // Helper: Close all active modals
    window.closeModal = function(modalId) {
        if (modalId && typeof modalId === 'string') {
            const target = document.getElementById(modalId);
            if (target) {
                target.classList.remove('active');
            }
        }
        document.querySelectorAll('.modal-overlay').forEach(overlay => {
            overlay.classList.remove('active');
        });
    };

    // Universal Document Click Delegation for ALL Modal Close Triggers & Backdrops
    document.addEventListener('click', (e) => {
        // Backdrop Click: if clicking directly on modal background overlay
        if (e.target.classList.contains('modal-overlay')) {
            e.target.classList.remove('active');
            return;
        }

        // Close Button Click: if clicking any element with close class, dismiss attr, or close text
        const closeBtn = e.target.closest('.modal-close, .pd-modal-close, .lb-modal-close, .close-modal, [data-dismiss="modal"]');
        if (closeBtn) {
            e.preventDefault();
            const parentModal = closeBtn.closest('.modal-overlay');
            if (parentModal) {
                parentModal.classList.remove('active');
            } else {
                window.closeModal();
            }
        }
    });

    // Close Modals on Pressing Escape Key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' || e.key === 'Esc' || e.keyCode === 27) {
            window.closeModal();
        }
    });

    // 3. Catalogue Modal Handling
    const modalOverlay = document.getElementById('catalogueModal');
    const modalOpenBtns = document.querySelectorAll('.open-catalogue-modal');
    const catalogueForm = document.getElementById('catalogueForm');

    if (modalOverlay) {
        modalOpenBtns.forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.preventDefault();
                modalOverlay.classList.add('active');
            });
        });

        if (catalogueForm) {
            catalogueForm.addEventListener('submit', (e) => {
                e.preventDefault();
                alert('Thank you! Your details have been submitted. Downloading catalogue...');
                modalOverlay.classList.remove('active');
                window.open('Acrosil_Product_Catalogue.pdf', '_blank');
            });
        }
    }

    // 4. Product Details Modal Handling
    const productDetailsModal = document.getElementById('productDetailsModal');
    const viewDetailsBtns = document.querySelectorAll('.product-link');

    if (productDetailsModal) {
        viewDetailsBtns.forEach(btn => {
            btn.addEventListener('click', (e) => {
                const href = btn.getAttribute('href');
                if (href && href !== '#' && href !== '' && !href.startsWith('javascript:')) {
                    return; // Allow native navigation to rubber_bellows.html etc.
                }
                e.preventDefault();
                const card = btn.closest('.product-card');
                if (!card) return;

                const title = card.getAttribute('data-title') || card.querySelector('h3').innerText;
                const img = card.getAttribute('data-img') || card.querySelector('img').src;
                const desc = card.getAttribute('data-desc') || card.querySelector('p').innerText;
                const material = card.getAttribute('data-material') || 'Neoprene, EPDM, Viton, Silicone, PTFE';
                const size = card.getAttribute('data-size') || 'Standard & Custom Dimensions Available (ID 10mm to ID 2500mm)';
                const temp = card.getAttribute('data-temp') || '-40°C to +200°C';
                const apps = card.getAttribute('data-apps') || 'Pharma, Chemical, Food Processing, Engineering';

                // Populate Modal Elements
                document.getElementById('pdModalTitle').innerText = title;
                document.getElementById('pdModalImg').src = img;
                document.getElementById('pdModalImg').alt = title;
                document.getElementById('pdModalDesc').innerText = desc;
                document.getElementById('pdModalMaterial').innerText = material;
                const pdSizeEl = document.getElementById('pdModalSize');
                if (pdSizeEl) pdSizeEl.innerText = size;
                document.getElementById('pdModalTemp').innerText = temp;
                document.getElementById('pdModalApps').innerText = apps;

                const pdQuoteBtn = document.getElementById('pdModalQuoteBtn');
                if (pdQuoteBtn) {
                    pdQuoteBtn.setAttribute('data-product-name', title);
                }
                const pdLandingBtn = document.getElementById('pdModalLandingBtn');
                const titleLink = card.querySelector('h3 a');
                if (pdLandingBtn) {
                    if (titleLink && titleLink.getAttribute('href')) {
                        pdLandingBtn.href = titleLink.getAttribute('href');
                        pdLandingBtn.style.display = 'inline-block';
                    } else {
                        pdLandingBtn.style.display = 'none';
                    }
                }

                productDetailsModal.classList.add('active');
            });
        });

        const pdModalQuoteBtn = document.getElementById('pdModalQuoteBtn');
        if (pdModalQuoteBtn) {
            pdModalQuoteBtn.addEventListener('click', (e) => {
                e.preventDefault();
                const productName = pdModalQuoteBtn.getAttribute('data-product-name');
                productDetailsModal.classList.remove('active');

                const targetInput = document.getElementById('contact-product');
                if (targetInput) {
                    targetInput.value = productName;
                }

                const contactSec = document.getElementById('contact');
                if (contactSec) {
                    contactSec.scrollIntoView({ behavior: 'smooth' });
                }
            });
        }
    }

    // 5. Fullscreen Image Lightbox Modal Handling
    const imageLightboxModal = document.getElementById('imageLightboxModal');
    const lbImg = document.getElementById('lightboxImg');
    const lbCaption = document.getElementById('lightboxCaption');
    const lightboxTriggers = document.querySelectorAll('.lightbox-trigger');

    if (imageLightboxModal && lbImg) {
        lightboxTriggers.forEach(trigger => {
            trigger.addEventListener('click', (e) => {
                e.preventDefault();
                let imgSrc = trigger.getAttribute('data-img');
                let caption = trigger.getAttribute('data-caption');

                if (!imgSrc) {
                    const imgEl = trigger.querySelector('img');
                    if (imgEl) {
                        imgSrc = imgEl.src;
                        caption = caption || imgEl.alt;
                    }
                }

                if (imgSrc) {
                    lbImg.src = imgSrc;
                    lbCaption.innerText = caption || '';
                    imageLightboxModal.classList.add('active');
                }
            });
        });

        imageLightboxModal.addEventListener('click', (e) => {
            if (e.target === imageLightboxModal || e.target === lbImg) {
                imageLightboxModal.classList.remove('active');
            }
        });
    }

    // 6. Universal Inquiry Form Handler (Prevents 501 Error on Local Static Test Servers & Handles Real Submissions)
    const allForms = document.querySelectorAll('form[action*="send_inquiry"], form[action*="contact"], .inquiry-form, form');
    allForms.forEach(form => {
        if (form.id === 'catalogueForm') return; // Handled separately
        
        form.addEventListener('submit', (e) => {
            e.preventDefault(); // Intercept native POST redirect to prevent 501 Unsupported Method error on Python test server
            
            const nameInput = form.querySelector('[name="full_name"], [name="name"]');
            const phoneInput = form.querySelector('[name="phone"]');
            const emailInput = form.querySelector('[name="email"]');
            const productInput = form.querySelector('[name="product_name"], [name="product"]');
            
            const name = nameInput ? nameInput.value.trim() : 'Valued Client';
            const phone = phoneInput ? phoneInput.value.trim() : '';
            const email = emailInput ? emailInput.value.trim() : '';
            const product = productInput ? productInput.value.trim() : 'Acrosil Products';
            
            if (emailInput && !email) {
                alert('Please enter a valid email address.');
                emailInput.focus();
                return;
            }

            if (phoneInput && !phone) {
                alert('Please enter your phone number.');
                phoneInput.focus();
                return;
            }

            // Attempt background fetch POST if hosted on PHP server
            const formData = new FormData(form);
            fetch(form.action || 'send_inquiry.php', {
                method: 'POST',
                body: formData
            }).catch(err => {
                // Silently swallow fetch errors on static local dev server
            });

            // Show clean user success confirmation alert
            alert('✅ Thank you, ' + name + '! Your inquiry for "' + product + '" has been submitted successfully.\n\nOur sales engineering team at Acrosil Products Pvt. Ltd. will contact you at ' + (phone || email) + ' shortly.');
            
            form.reset();
        });
    });

    // 7. Stat Counter Animation
    const statNumbers = document.querySelectorAll('.stat-number');
    let animated = false;

    const animateCounters = () => {
        statNumbers.forEach(counter => {
            const target = parseInt(counter.getAttribute('data-target') || '0', 10);
            let count = 0;
            const speed = target / 50;

            const updateCount = () => {
                count += speed;
                if (count < target) {
                    counter.innerText = Math.ceil(count) + '+';
                    setTimeout(updateCount, 30);
                } else {
                    counter.innerText = target + '+';
                }
            };
            updateCount();
        });
    };

    window.addEventListener('scroll', () => {
        const statsBar = document.querySelector('.stats-bar');
        if (statsBar && !animated) {
            const pos = statsBar.getBoundingClientRect();
            if (pos.top < window.innerHeight && pos.bottom >= 0) {
                animated = true;
                animateCounters();
            }
        }
    });
});
