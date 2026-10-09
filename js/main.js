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
                const imgEl = document.getElementById('pdModalImg'); if(imgEl){ imgEl.src = img || 'images/company_about.jpg'; imgEl.onerror = function(){ this.src = 'images/company_about.jpg'; }; }
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

    
    // 5. Universal Document-Level Click Delegation for Lightbox & Modals
    document.addEventListener('click', (e) => {
        const trigger = e.target.closest('.lightbox-trigger');
        if (trigger) {
            e.preventDefault();
            let imgSrc = trigger.getAttribute('data-img');
            let caption = trigger.getAttribute('data-caption');

            if (!imgSrc) {
                const imgEl = trigger.querySelector('img');
                if (imgEl) {
                    imgSrc = imgEl.getAttribute('src') || imgEl.src;
                    caption = caption || imgEl.alt;
                }
            }

            const lbModal = document.getElementById('imageLightboxModal');
            const lbImg = document.getElementById('lightboxImg');
            const lbCap = document.getElementById('lightboxCaption');

            if (lbModal && lbImg && imgSrc) {
                lbImg.src = imgSrc;
                if (lbCap) lbCap.innerText = caption || '';
                lbModal.classList.add('active');
            }
        }
    });


    // 6. Universal Inquiry Form Handler (Handles Real Submissions & Validation)
    const allForms = document.querySelectorAll('form[action*="send_inquiry"], form[action*="contact"], .inquiry-form, form');
    allForms.forEach(form => {
        if (form.id === 'catalogueForm') return; // Handled separately
        
        form.addEventListener('submit', (e) => {
            e.preventDefault(); // Intercept native POST redirect
            
            // Honeypot anti-spam check
            const hpField = form.querySelector('[name="b_hp_field"]');
            if (hpField && hpField.value) {
                alert('Thank you! Your inquiry has been submitted.');
                form.reset();
                if (window.closeQuoteDrawer) window.closeQuoteDrawer();
                return;
            }

            const nameInput = form.querySelector('[name="contact_person"], [name="name"], [name="full_name"]');
            const emailInput = form.querySelector('[name="email"]');
            const productInput = form.querySelector('[name="product"]');
            const fileInput = form.querySelector('input[type="file"][name="drawing_file"]');

            const name = nameInput ? nameInput.value.trim() : '';
            const email = emailInput ? emailInput.value.trim() : '';
            const product = productInput ? productInput.value.trim() : 'Product';

            if (!name) {
                alert('Please enter Contact Person name.');
                if (nameInput) nameInput.focus();
                return;
            }
            if (!email) {
                alert('Please enter a valid Business Email address.');
                if (emailInput) emailInput.focus();
                return;
            }

            // File validation: pdf, dwg, dxf, step, jpg, jpeg, png up to 10MB
            if (fileInput && fileInput.files && fileInput.files.length > 0) {
                const file = fileInput.files[0];
                const allowedExts = ['pdf', 'dwg', 'dxf', 'step', 'jpg', 'jpeg', 'png', 'doc', 'docx'];
                const ext = file.name.split('.').pop().toLowerCase();
                const maxSize = 10 * 1024 * 1024; // 10MB

                if (!allowedExts.includes(ext)) {
                    alert('Invalid file format. Please upload a PDF, DWG, DXF, STEP, JPG, PNG, DOC, or DOCX file.');
                    fileInput.focus();
                    return;
                }
                if (file.size > maxSize) {
                    alert('File size exceeds 10MB limit. Please upload a smaller file.');
                    fileInput.focus();
                    return;
                }
            }

            // Send via background fetch
            const formData = new FormData(form);
            fetch(form.action || 'send_inquiry.php', {
                method: 'POST',
                headers: { 'X-Requested-With': 'XMLHttpRequest' },
                body: formData
            }).then(res => res.json()).catch(() => {}).finally(() => {
                alert('✅ Thank you' + (name ? ', ' + name : '') + '! Your RFQ for "' + product + '" has been submitted successfully.

Our engineering team at Acrosil Products Pvt. Ltd. will review your requirements and get back to you shortly.');
                form.reset();
                if (window.closeQuoteDrawer) window.closeQuoteDrawer();
            });
        });
    });

        // 7. Robust IntersectionObserver Stat Counter & Scroll Animations
    const statNumbers = document.querySelectorAll('.stat-number');
    
    const animateStatCounters = () => {
        statNumbers.forEach(counter => {
            if (counter.classList.contains('animated')) return;
            counter.classList.add('animated');

            const target = parseInt(counter.getAttribute('data-target') || counter.innerText || '0', 10);
            const isPercent = counter.getAttribute('data-target') === '100' || counter.innerText.includes('%') || counter.nextElementSibling?.innerText.includes('Quality');
            const suffix = isPercent ? '%' : '+';
            
            let count = 0;
            const duration = 1500; // 1.5s animation duration
            const startTime = performance.now();

            const updateCounter = (currentTime) => {
                const elapsedTime = currentTime - startTime;
                const progress = Math.min(elapsedTime / duration, 1);
                // Ease-out quad formula for smooth decelerating count
                const easeOutQuad = 1 - (1 - progress) * (1 - progress);
                count = Math.floor(easeOutQuad * target);
                
                counter.innerText = count + suffix;

                if (progress < 1) {
                    requestAnimationFrame(updateCounter);
                } else {
                    counter.innerText = target + suffix;
                    counter.classList.add('counter-pop');
                }
            };

            requestAnimationFrame(updateCounter);
        });
    };

    const statsBar = document.querySelector('.stats-bar');
    if (statsBar) {
        const statsObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    animateStatCounters();
                    statsObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.2 });

        statsObserver.observe(statsBar);
    } else {
        // Fallback execution if statsBar directly visible
        animateStatCounters();
    }

    // 8. Universal Scroll Reveal Animation Observer
    const scrollElements = document.querySelectorAll('.feature-card-modern, .product-card, .stat-card, .contact-info-card, .export-banner-card, .section-title');
    scrollElements.forEach((el, idx) => {
        el.classList.add('animate-on-scroll');
        const delayClass = 'animate-delay-' + ((idx % 4) + 1);
        el.classList.add(delayClass);
    });

    const scrollObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
                scrollObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });

    scrollElements.forEach(el => scrollObserver.observe(el));


    // 8. Live Header Product Search Bar
    const navSearchInput = document.getElementById('nav-search-input');
    if (navSearchInput) {
        navSearchInput.addEventListener('input', (e) => {
            const query = e.target.value.toLowerCase().trim();
            const cards = document.querySelectorAll('.product-card');
            
            cards.forEach(card => {
                const title = (card.getAttribute('data-title') || '').toLowerCase();
                const desc = (card.getAttribute('data-desc') || '').toLowerCase();
                const mat = (card.getAttribute('data-material') || '').toLowerCase();
                
                if (title.includes(query) || desc.includes(query) || mat.includes(query)) {
                    card.style.display = 'flex';
                } else {
                    card.style.display = 'none';
                }
            });
            
            if (query.length > 0) {
                const productsSec = document.getElementById('products');
                if (productsSec) {
                    productsSec.scrollIntoView({ behavior: 'smooth' });
                }
            }
        });
    }

    // 9. Persistent Slide-Out Quote Drawer Controls
    window.openQuoteDrawer = function(productName, focusUpload) {
        const drawer = document.getElementById('quoteDrawer');
        if (drawer) {
            if (productName) {
                const targetInput = drawer.querySelector('[name="product"]');
                if (targetInput) targetInput.value = productName;
            }
            drawer.classList.add('active');
            drawer.setAttribute('aria-expanded', 'true');
            drawer.setAttribute('aria-hidden', 'false');

            setTimeout(() => {
                if (focusUpload) {
                    const uploadInput = drawer.querySelector('input[name="drawing_file"], input[type="file"]');
                    if (uploadInput) uploadInput.focus();
                } else {
                    const firstInput = drawer.querySelector('input[name="company"], input, select');
                    if (firstInput) firstInput.focus();
                }
            }, 150);
        }
    };

    window.closeQuoteDrawer = function() {
        const drawer = document.getElementById('quoteDrawer');
        if (drawer) {
            drawer.classList.remove('active');
            drawer.setAttribute('aria-expanded', 'false');
            drawer.setAttribute('aria-hidden', 'true');
        }
    };

    // Attach trigger to all 'open-quote-drawer' buttons and '#btn-hero-send-drawing'
    document.querySelectorAll('.open-quote-drawer, [data-action="open-rfq"]').forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            const pName = btn.getAttribute('data-product') || '';
            const focusUpload = btn.getAttribute('data-focus-upload') === 'true' || btn.id === 'btn-hero-send-drawing';
            window.openQuoteDrawer(pName, focusUpload);
        });
    });

    const heroDrawingBtn = document.getElementById('btn-hero-send-drawing');
    if (heroDrawingBtn) {
        heroDrawingBtn.addEventListener('click', (e) => {
            e.preventDefault();
            window.openQuoteDrawer('', true);
        });
    }
    });


    // 10. Clean URL Hash Suppressor (Prevents #contact / #inquiry from appearing in browser URL bar)
    if (window.location.hash) {
        history.replaceState(null, null, window.location.pathname + window.location.search);
    }

    document.addEventListener('click', (e) => {
        const anchor = e.target.closest('a[href*="#"]');
        if (anchor) {
            const href = anchor.getAttribute('href') || '';
            if (href.includes('#') && !href.startsWith('javascript:')) {
                const parts = href.split('#');
                const targetHash = parts[1];
                
                // If it's a quote / inquiry link, open Quote Drawer cleanly without modifying URL
                if (targetHash === 'contact' || targetHash === 'inquiry' || targetHash === 'quote') {
                    e.preventDefault();
                    if (window.openQuoteDrawer) {
                        const card = anchor.closest('.product-card, .bellow-card');
                        const pTitle = card ? (card.getAttribute('data-title') || card.querySelector('h3')?.innerText) : '';
                        window.openQuoteDrawer(pTitle);
                    } else {
                        const contactSec = document.getElementById('contact') || document.getElementById('inquiry');
                        if (contactSec) contactSec.scrollIntoView({ behavior: 'smooth' });
                    }
                    return;
                }
                
                // For other section hashes on current page, scroll smoothly without URL bar hash mutation
                if (parts[0] === '' || parts[0] === window.location.pathname.split('/').pop()) {
                    const targetEl = document.getElementById(targetHash);
                    if (targetEl) {
                        e.preventDefault();
                        targetEl.scrollIntoView({ behavior: 'smooth' });
                    }
                }
            }
        }
    });


    // 11. Send Your Drawing Upload Handler (.png, .jpg, .jpeg, .doc, .docx, .pdf)
    const btnTriggerUpload = document.getElementById('btn-trigger-upload');
    const heroFileInput = document.getElementById('hero-drawing-file');
    const heroFileStatus = document.getElementById('hero-file-status');

    if (btnTriggerUpload && heroFileInput) {
        btnTriggerUpload.addEventListener('click', (e) => {
            e.preventDefault();
            heroFileInput.click();
        });

        heroFileInput.addEventListener('change', (e) => {
            if (heroFileInput.files && heroFileInput.files.length > 0) {
                const file = heroFileInput.files[0];
                const allowedExts = ['png', 'jpg', 'jpeg', 'doc', 'docx', 'pdf'];
                const ext = file.name.split('.').pop().toLowerCase();

                if (!allowedExts.includes(ext)) {
                    alert('Invalid file format. Please select a PNG, JPG, JPEG, DOC, DOCX, or PDF file.');
                    heroFileInput.value = '';
                    if (heroFileStatus) heroFileStatus.style.display = 'none';
                    return;
                }

                if (heroFileStatus) {
                    heroFileStatus.innerHTML = '<i class="fa-solid fa-paperclip"></i> Attached: <strong>' + file.name + '</strong> (' + (file.size / 1024).toFixed(1) + ' KB)';
                    heroFileStatus.style.display = 'block';
                }
                btnTriggerUpload.innerHTML = 'Drawing Attached <i class="fa-solid fa-circle-check"></i>';
                btnTriggerUpload.style.borderColor = '#10B981';
                btnTriggerUpload.style.color = '#10B981';
            }
        });
    }


    // 12. Custom File Upload UI Sync
    document.addEventListener('change', (e) => {
        if (e.target && e.target.classList.contains('rfq-file-input')) {
            const input = e.target;
            const label = input.nextElementSibling || document.querySelector('label[for="' + input.id + '"]');
            if (!label) return;

            if (input.files && input.files.length > 0) {
                const file = input.files[0];
                const sizeMb = (file.size / (1024 * 1024)).toFixed(2);
                label.classList.add('has-file');
                label.innerHTML = '<i class="fa-solid fa-circle-check" style="color: #10B981;"></i> <span>Attached: <strong>' + file.name + '</strong> (' + sizeMb + ' MB)</span>';
            } else {
                label.classList.remove('has-file');
                label.innerHTML = '<i class="fa-solid fa-cloud-arrow-up"></i> <span>Choose File / Drawing</span>';
            }
        }
    });
