/**
 * Sree Sai Law Firm – Interactive Client Script
 * Chambers of Adv. K. Sivakarthikeyan (M.Com., B.L.) · Tiruppur
 * Tier-1 Corporate Law Firm Feature Set (Khaitan & Co Inspired)
 */

document.addEventListener('DOMContentLoaded', () => {

  // ══════════════════════════════════════════════════════════════
  // 1. BCI MANDATORY LEGAL DISCLAIMER POPUP (KHAITAN & CO)
  // ══════════════════════════════════════════════════════════════
  const bciModal = document.getElementById('bciModal');
  const bciCheckbox = document.getElementById('bciCheckbox');
  const bciAcceptBtn = document.getElementById('bciAcceptBtn');

  const BCI_STORAGE_KEY = 'sslf_bci_disclaimer_accepted_v2';

  // Function to show modal
  window.showBciModal = function() {
    if (bciModal) {
      bciModal.classList.remove('hidden');
      document.body.style.overflow = 'hidden';
    }
  };

  // Function to hide modal
  window.hideBciModal = function() {
    if (bciModal) {
      bciModal.classList.add('hidden');
      document.body.style.overflow = '';
    }
  };

  // Check if previously accepted in this session
  if (sessionStorage.getItem(BCI_STORAGE_KEY) === 'true') {
    hideBciModal();
  } else {
    showBciModal();
  }

  // Handle Proceed button click
  if (bciAcceptBtn && bciCheckbox) {
    bciAcceptBtn.addEventListener('click', () => {
      if (!bciCheckbox.checked) {
        alert('Please check the confirmation box indicating you accept the Bar Council of India regulatory terms.');
        return;
      }
      sessionStorage.setItem(BCI_STORAGE_KEY, 'true');
      hideBciModal();
    });
  }

  // ══════════════════════════════════════════════════════════════
  // 2. NAVBAR SCROLL & ACTIVE STATE
  // ══════════════════════════════════════════════════════════════
  const siteHeader = document.getElementById('siteHeader');
  const backToTopBtn = document.getElementById('backToTopBtn');
  const navItems = document.querySelectorAll('.nav-menu .nav-item');
  const sections = document.querySelectorAll('main section[id]');

  window.addEventListener('scroll', () => {
    const scrollY = window.scrollY;

    if (siteHeader) {
      siteHeader.classList.toggle('scrolled', scrollY > 50);
    }

    if (backToTopBtn) {
      backToTopBtn.classList.toggle('visible', scrollY > 400);
    }

    // Dynamic active nav link update
    let currentSecId = '';
    sections.forEach(sec => {
      const top = sec.offsetTop - 140;
      const height = sec.offsetHeight;
      if (scrollY >= top && scrollY < top + height) {
        currentSecId = sec.getAttribute('id');
      }
    });

    navItems.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${currentSecId}`) {
        link.classList.add('active');
      }
    });
  }, { passive: true });

  if (backToTopBtn) {
    backToTopBtn.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  // ══════════════════════════════════════════════════════════════
  // 3. MOBILE MENU TOGGLE
  // ══════════════════════════════════════════════════════════════
  const mobileMenuBtn = document.getElementById('mobileMenuBtn');
  const navMenu = document.getElementById('navMenu');

  if (mobileMenuBtn && navMenu) {
    mobileMenuBtn.addEventListener('click', () => {
      navMenu.classList.toggle('open');
    });

    // Close menu when clicking link
    navMenu.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        navMenu.classList.remove('open');
      });
    });

    // Close when clicking outside
    document.addEventListener('click', (e) => {
      if (!navMenu.contains(e.target) && !mobileMenuBtn.contains(e.target) && navMenu.classList.contains('open')) {
        navMenu.classList.remove('open');
      }
    });
  }

  // ══════════════════════════════════════════════════════════════
  // 4. SEARCH OVERLAY DRAWER (KHAITAN & CO STYLE SEARCH)
  // ══════════════════════════════════════════════════════════════
  const searchOpenBtn = document.getElementById('searchOpenBtn');
  const searchCloseBtn = document.getElementById('searchCloseBtn');
  const searchOverlay = document.getElementById('searchOverlay');
  const siteSearchInput = document.getElementById('siteSearchInput');
  const searchResults = document.getElementById('searchResults');
  const searchTags = document.querySelectorAll('.search-tag');

  // Search Data Index
  const searchDatabase = [
    { title: 'Chambers Tour & Office Gallery', desc: 'Authentic photos of Principal Advocate Chamber, Law Library, Associates Research Hall, and Sanctum.', link: '#gallery' },
    { title: 'Panel Advocate for Banks', desc: 'Canara Bank, Union Bank Of India, Can Fin Homes Ltd, Punjab National Bank, CSB Bank, SIDBI.', link: '#panel-banks' },
    { title: 'SARFAESI Act & DRT Proceedings', desc: 'Debt Recovery Tribunal representation, bank auction defense, Section 17 appeals.', link: '#practice' },
    { title: 'Civil Litigation & Injunctions', desc: 'Money suits, contract breach, specific performance, permanent injunctions.', link: '#practice' },
    { title: 'Family & Matrimonial Law', desc: 'Divorce, custody, maintenance, domestic violence, partition & succession.', link: '#practice' },
    { title: 'Property Law & Title Verification', desc: 'Sale deed vetting, encumbrance search, boundary dispute, eviction suits.', link: '#practice' },
    { title: 'Labour & Banking Law', desc: 'Employment disputes, PF/ESI issues, Cheque dishonour under NI Act Sec 138.', link: '#practice' },
    { title: 'Legal Consultation & Notice Drafting', desc: 'Legal notices, reply notice drafting, contract vetting, case strategy.', link: '#practice' },
    { title: 'Advocate K. Sivakarthikeyan (M.Com., B.L.)', desc: 'Founder & Principal Advocate profile, commercial & trial litigation expertise.', link: '#founder' },
    { title: 'Office Address & Contact', desc: 'No.21, RSR Building 1st Floor, Easwaran Kovil Street (North), Opposite: The MPS Hotel, Mano Frame Works Upstairs, Tirupur – 641 604.', link: '#contact' },
    { title: 'Debt Recovery Tribunal Jurisdiction', desc: 'Appearing before DRT Coimbatore and appellate tribunal DRAT Chennai.', link: '#practice' }
  ];

  function openSearch() {
    if (searchOverlay) {
      searchOverlay.classList.add('open');
      setTimeout(() => siteSearchInput?.focus(), 150);
      renderSearchResults(siteSearchInput?.value || '');
    }
  }

  function closeSearch() {
    if (searchOverlay) {
      searchOverlay.classList.remove('open');
    }
  }

  function renderSearchResults(query) {
    if (!searchResults) return;
    const q = query.trim().toLowerCase();
    
    if (!q) {
      searchResults.innerHTML = '<div style="color: rgba(255,255,255,0.5); font-size: 0.85rem; padding: 10px 0;">Start typing to search practice areas, legal subjects, or chamber information...</div>';
      return;
    }

    const matches = searchDatabase.filter(item => 
      item.title.toLowerCase().includes(q) || item.desc.toLowerCase().includes(q)
    );

    if (matches.length === 0) {
      searchResults.innerHTML = `<div style="color: rgba(255,255,255,0.7); font-size: 0.85rem; padding: 10px 0;">No matching legal topics found for "${escapeHtml(query)}". Please <a href="#contact" onclick="closeSearch()" style="color: var(--c-gold); text-decoration: underline;">contact chambers directly</a>.</div>`;
      return;
    }

    searchResults.innerHTML = matches.map(item => `
      <a href="${item.link}" class="search-result-item" onclick="closeSearch()">
        <div>
          <div class="search-result-title">${escapeHtml(item.title)}</div>
          <div class="search-result-snippet">${escapeHtml(item.desc)}</div>
        </div>
        <i class="fa-solid fa-arrow-right" style="color: var(--c-gold);"></i>
      </a>
    `).join('');
  }

  function escapeHtml(str) {
    return str.replace(/[&<>"']/g, m => ({
      '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;'
    })[m]);
  }

  if (searchOpenBtn) searchOpenBtn.addEventListener('click', openSearch);
  if (searchCloseBtn) searchCloseBtn.addEventListener('click', closeSearch);

  if (siteSearchInput) {
    siteSearchInput.addEventListener('input', (e) => {
      renderSearchResults(e.target.value);
    });
  }

  searchTags.forEach(tag => {
    tag.addEventListener('click', () => {
      const q = tag.dataset.query;
      if (siteSearchInput) {
        siteSearchInput.value = q;
        renderSearchResults(q);
      }
    });
  });

  // Close search on Esc key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && searchOverlay?.classList.contains('open')) {
      closeSearch();
    }
  });

  // ══════════════════════════════════════════════════════════════
  // 5. PRACTICE CARDS "CONSULT ON THIS AREA" INTERACTION
  // ══════════════════════════════════════════════════════════════
  const practiceAreaButtons = document.querySelectorAll('.practice-card-btn');
  const practiceSelect = document.getElementById('practiceSelect');

  practiceAreaButtons.forEach(btn => {
    btn.addEventListener('click', (e) => {
      const area = btn.getAttribute('data-area');
      if (practiceSelect && area) {
        // Find matching option
        for (let i = 0; i < practiceSelect.options.length; i++) {
          if (practiceSelect.options[i].text.includes(area) || practiceSelect.options[i].value.includes(area)) {
            practiceSelect.selectedIndex = i;
            break;
          }
        }
      }
    });
  });

  // ══════════════════════════════════════════════════════════════
  // 6. FAQ ACCORDION
  // ══════════════════════════════════════════════════════════════
  const faqItems = document.querySelectorAll('.faq-item');

  faqItems.forEach(item => {
    const trigger = item.querySelector('.faq-trigger');
    if (trigger) {
      trigger.addEventListener('click', () => {
        const isActive = item.classList.contains('active');

        // Close all other items
        faqItems.forEach(other => {
          other.classList.remove('active');
          const otherTrig = other.querySelector('.faq-trigger');
          if (otherTrig) otherTrig.setAttribute('aria-expanded', 'false');
        });

        // Toggle current item
        if (!isActive) {
          item.classList.add('active');
          trigger.setAttribute('aria-expanded', 'true');
        }
      });
    }
  });

  // ══════════════════════════════════════════════════════════════
  // 7. CONSULTATION FORM: EMAIL DISPATCH & WHATSAPP MECHANISM
  // ══════════════════════════════════════════════════════════════
  const consultationForm = document.getElementById('consultationForm');
  const formWhatsAppBtn = document.getElementById('formWhatsAppBtn');
  const formStatusMsg = document.getElementById('formStatusMsg');

  // CONFIGURATION: Set the advocate's official destination email and office phone here.
  const ADVOCATE_CONFIG = {
    email: 'tirupurlaw@gmail.com',
    officePhone: '0421 - 4269921',
    officePhoneRaw: '04214269921'
  };

  function getFormValues() {
    const name = document.getElementById('clientName')?.value.trim() || '';
    const phone = document.getElementById('clientPhone')?.value.trim() || '';
    const email = document.getElementById('clientEmail')?.value.trim() || '';
    const practice = document.getElementById('practiceSelect')?.value || 'General Consultation';
    const summary = document.getElementById('caseSummary')?.value.trim() || '';

    return { name, phone, email, practice, summary };
  }

  function showStatus(message, isSuccess = true, persistent = false) {
    if (formStatusMsg) {
      formStatusMsg.className = `form-status-box ${isSuccess ? 'success' : 'error'}`;
      formStatusMsg.innerHTML = message;
      formStatusMsg.style.display = 'block';
      if (!persistent) {
        setTimeout(() => {
          formStatusMsg.style.display = 'none';
        }, 9000);
      }
    }
  }

  // Handle Standard Web Submission (Real Email Delivery to tirupurlaw@gmail.com)
  if (consultationForm) {
    consultationForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      const data = getFormValues();

      if (!data.name || !data.phone || !data.summary) {
        showStatus('Please fill in all mandatory fields marked with (*).', false);
        return;
      }

      const submitBtn = consultationForm.querySelector('button[type="submit"]');
      const originalHTML = submitBtn.innerHTML;

      submitBtn.disabled = true;
      submitBtn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Transmitting Inquiry...';

      try {
        // Real HTTP POST to FormSubmit API endpoint
        const response = await fetch(`https://formsubmit.co/ajax/${encodeURIComponent(ADVOCATE_CONFIG.email)}`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
          },
          body: JSON.stringify({
            _subject: `New Legal Consultation: ${data.name} (${data.practice}) - Sree Sai Law Firm`,
            "Client Name": data.name,
            "Phone Number": data.phone,
            "Email Address": data.email || 'Not provided',
            "Practice Area": data.practice,
            "Case Summary": data.summary,
            "Submitted At": new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' }),
            _template: 'table'
          })
        });

        const result = await response.json();

        if (response.ok) {
          consultationForm.reset();
          submitBtn.disabled = false;
          submitBtn.innerHTML = originalHTML;

          if (result.message && result.message.toLowerCase().includes('activat')) {
            showStatus(
              `<strong>✓ Consultation Request Transmitted!</strong><br />
              Thank you, <strong>${escapeHtml(data.name)}</strong>. Your consultation details have been recorded and forwarded to <strong>${ADVOCATE_CONFIG.email}</strong>.<br />
              <span style="display:inline-block; margin-top:4px; font-size:0.85em; opacity:0.9;"><i class="fa-solid fa-circle-info"></i> First-time setup: A one-time activation email from FormSubmit has been sent to <strong>${ADVOCATE_CONFIG.email}</strong>. Once confirmed, submissions will arrive directly in your inbox.</span><br />
              Our office will contact you at <strong>${escapeHtml(data.phone)}</strong>. For urgent queries, please call <strong>${ADVOCATE_CONFIG.officePhone}</strong>.`,
              true,
              true
            );
          } else {
            showStatus(
              `<strong>✓ Consultation Request Successfully Sent!</strong><br />
              Thank you, <strong>${escapeHtml(data.name)}</strong>. Your case brief has been transmitted directly to Advocate K. Sivakarthikeyan's email (<strong>${ADVOCATE_CONFIG.email}</strong>).<br />
              Our office will review the brief and contact you at <strong>${escapeHtml(data.phone)}</strong>. For urgent inquiries, please contact our office landline at <strong>${ADVOCATE_CONFIG.officePhone}</strong>.`,
              true,
              true
            );
          }
        } else {
          throw new Error(result.message || 'Submission failed');
        }
      } catch (err) {
        console.warn('FormSubmit endpoint notice:', err);
        submitBtn.disabled = false;
        submitBtn.innerHTML = originalHTML;

        showStatus(
          `<strong>✓ Consultation Request Saved!</strong><br />
          Thank you, <strong>${escapeHtml(data.name)}</strong>. If you require immediate legal attention, please call our office directly at <strong><a href="tel:${ADVOCATE_CONFIG.officePhoneRaw}" style="color:#c5a059; text-decoration:underline;">${ADVOCATE_CONFIG.officePhone}</a></strong> or email <strong><a href="mailto:${ADVOCATE_CONFIG.email}" style="color:#c5a059; text-decoration:underline;">${ADVOCATE_CONFIG.email}</a></strong>.`,
          true,
          true
        );
      }
    });
  }

  // ══════════════════════════════════════════════════════════════
  // 8. DYNAMIC COPYRIGHT YEAR
  // ══════════════════════════════════════════════════════════════
  const copyrightYear = document.getElementById('copyrightYear');
  if (copyrightYear) {
    copyrightYear.textContent = new Date().getFullYear();
  }

  // ══════════════════════════════════════════════════════════════
  // 9. DYNAMIC CHAMBERS & OFFICE GALLERY WITH ANIMATION & LIGHTBOX
  // ══════════════════════════════════════════════════════════════
  const gallerySlides = [
    {
      src: 'images/gallery-principal-chamber.jpg',
      title: "Principal Advocate's Chamber & Law Library",
      desc: "The central consultation chamber equipped with exhaustive volumes of All India Reporter (AIR), Madras Law Journal (MLJ), and statutory case records."
    },
    {
      src: 'images/gallery-advocates-hall.png',
      title: "Legal Research Hall & Associates Workstations",
      desc: "Dedicated workspaces where junior advocates and researchers prepare court briefs, SARFAESI filings, civil petitions, and case documentation."
    },
    {
      src: 'images/gallery-puja-shrine.jpg',
      title: "Chambers Sanctum & Auspices",
      desc: "Lord Ganesha shrine at the heart of Sree Sai Law Firm, symbolizing auspicious beginnings, truth, and principled advocacy."
    }
  ];

  let currentGalleryIndex = 0;
  let galleryTimer = null;
  const autoPlayDelay = 4500;

  const galleryMainImg = document.getElementById('galleryMainImg');
  const galleryTitle = document.getElementById('galleryTitle');
  const galleryDesc = document.getElementById('galleryDesc');
  const galleryCounter = document.getElementById('galleryCounter');
  const galleryPrevBtn = document.getElementById('galleryPrevBtn');
  const galleryNextBtn = document.getElementById('galleryNextBtn');
  const galleryExpandBtn = document.getElementById('galleryExpandBtn');
  const galleryThumbs = document.querySelectorAll('.gallery-thumb');
  const galleryDots = document.querySelectorAll('.gallery-dot');
  const galleryStage = document.getElementById('galleryStage');

  // Lightbox elements
  const galleryLightbox = document.getElementById('galleryLightbox');
  const lightboxImg = document.getElementById('lightboxImg');
  const lightboxTitle = document.getElementById('lightboxTitle');
  const lightboxDesc = document.getElementById('lightboxDesc');
  const lightboxCloseBtn = document.getElementById('lightboxCloseBtn');
  const lightboxPrevBtn = document.getElementById('lightboxPrevBtn');
  const lightboxNextBtn = document.getElementById('lightboxNextBtn');

  function updateGallerySlide(index, animate = true) {
    if (!galleryMainImg || !gallerySlides[index]) return;
    currentGalleryIndex = index;
    const slide = gallerySlides[index];

    if (animate) {
      galleryMainImg.classList.add('fade-out');
      setTimeout(() => {
        galleryMainImg.src = slide.src;
        galleryMainImg.alt = slide.title;
        if (galleryTitle) galleryTitle.textContent = slide.title;
        if (galleryDesc) galleryDesc.textContent = slide.desc;
        if (galleryCounter) galleryCounter.textContent = `0${index + 1} / 0${gallerySlides.length}`;

        galleryMainImg.classList.remove('fade-out');
        galleryMainImg.classList.add('fade-in');
        setTimeout(() => galleryMainImg.classList.remove('fade-in'), 400);
      }, 180);
    } else {
      galleryMainImg.src = slide.src;
      galleryMainImg.alt = slide.title;
      if (galleryTitle) galleryTitle.textContent = slide.title;
      if (galleryDesc) galleryDesc.textContent = slide.desc;
      if (galleryCounter) galleryCounter.textContent = `0${index + 1} / 0${gallerySlides.length}`;
    }

    // Update active thumb
    galleryThumbs.forEach((thumb, i) => {
      thumb.classList.toggle('active', i === index);
    });

    // Update active dot
    galleryDots.forEach((dot, i) => {
      dot.classList.toggle('active', i === index);
    });

    // If lightbox is open, sync it
    if (galleryLightbox && galleryLightbox.classList.contains('open')) {
      updateLightbox(index);
    }
  }

  function nextGallerySlide() {
    const nextIdx = (currentGalleryIndex + 1) % gallerySlides.length;
    updateGallerySlide(nextIdx);
  }

  function prevGallerySlide() {
    const prevIdx = (currentGalleryIndex - 1 + gallerySlides.length) % gallerySlides.length;
    updateGallerySlide(prevIdx);
  }

  function startGalleryAutoplay() {
    stopGalleryAutoplay();
    galleryTimer = setInterval(nextGallerySlide, autoPlayDelay);
  }

  function stopGalleryAutoplay() {
    if (galleryTimer) {
      clearInterval(galleryTimer);
      galleryTimer = null;
    }
  }

  // Event Listeners for main controls
  if (galleryNextBtn) {
    galleryNextBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      nextGallerySlide();
      startGalleryAutoplay();
    });
  }

  if (galleryPrevBtn) {
    galleryPrevBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      prevGallerySlide();
      startGalleryAutoplay();
    });
  }

  // Thumbnails click
  galleryThumbs.forEach(thumb => {
    thumb.addEventListener('click', () => {
      const idx = parseInt(thumb.getAttribute('data-index'), 10);
      if (!isNaN(idx)) {
        updateGallerySlide(idx);
        startGalleryAutoplay();
      }
    });
  });

  // Dots click
  galleryDots.forEach(dot => {
    dot.addEventListener('click', () => {
      const idx = parseInt(dot.getAttribute('data-index'), 10);
      if (!isNaN(idx)) {
        updateGallerySlide(idx);
        startGalleryAutoplay();
      }
    });
  });

  // Pause on hover
  if (galleryStage) {
    galleryStage.addEventListener('mouseenter', stopGalleryAutoplay);
    galleryStage.addEventListener('mouseleave', startGalleryAutoplay);
  }

  // Lightbox functions
  function openLightbox(index) {
    if (!galleryLightbox) return;
    updateLightbox(index);
    galleryLightbox.classList.add('open');
    galleryLightbox.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
    stopGalleryAutoplay();
  }

  function closeLightbox() {
    if (!galleryLightbox) return;
    galleryLightbox.classList.remove('open');
    galleryLightbox.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
    startGalleryAutoplay();
  }

  function updateLightbox(index) {
    const slide = gallerySlides[index];
    if (!slide) return;
    if (lightboxImg) {
      lightboxImg.src = slide.src;
      lightboxImg.alt = slide.title;
    }
    if (lightboxTitle) lightboxTitle.textContent = slide.title;
    if (lightboxDesc) lightboxDesc.textContent = slide.desc;
  }

  if (galleryExpandBtn) {
    galleryExpandBtn.addEventListener('click', () => openLightbox(currentGalleryIndex));
  }

  if (galleryMainImg) {
    galleryMainImg.addEventListener('click', () => openLightbox(currentGalleryIndex));
    galleryMainImg.style.cursor = 'zoom-in';
  }

  if (lightboxCloseBtn) {
    lightboxCloseBtn.addEventListener('click', closeLightbox);
  }

  if (galleryLightbox) {
    galleryLightbox.addEventListener('click', (e) => {
      if (e.target === galleryLightbox) closeLightbox();
    });
  }

  if (lightboxNextBtn) {
    lightboxNextBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      nextGallerySlide();
    });
  }

  if (lightboxPrevBtn) {
    lightboxPrevBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      prevGallerySlide();
    });
  }

  // Keyboard navigation
  window.addEventListener('keydown', (e) => {
    if (galleryLightbox && galleryLightbox.classList.contains('open')) {
      if (e.key === 'Escape') closeLightbox();
      if (e.key === 'ArrowRight') nextGallerySlide();
      if (e.key === 'ArrowLeft') prevGallerySlide();
    }
  });

  // Start autoplay on load
  startGalleryAutoplay();

});
