document.addEventListener('DOMContentLoaded', () => {
  /* ==========================================================================
     PRELOADER
     ========================================================================== */
  const preloader = document.getElementById('preloader');
  if (preloader) {
    setTimeout(() => {
      preloader.classList.add('hidden');
    }, 2000); // Wait 2s to show off the cool preloader
  }

  /* ==========================================================================
     MOBILE NAVIGATION TOGGLE
     ========================================================================== */
  const mobileToggle = document.getElementById('mobile-toggle');
  const navLinks = document.getElementById('nav-links');
  const header = document.getElementById('navbar');

  if (mobileToggle && navLinks) {
    mobileToggle.addEventListener('click', () => {
      mobileToggle.classList.toggle('active');
      navLinks.classList.toggle('active');
      document.body.style.overflow = navLinks.classList.contains('active') ? 'hidden' : '';
    });

    const links = navLinks.querySelectorAll('.nav-link');
    links.forEach(link => {
      link.addEventListener('click', () => {
        mobileToggle.classList.remove('active');
        navLinks.classList.remove('active');
        document.body.style.overflow = '';
      });
    });
  }

  /* ==========================================================================
     SCROLL EFFECTS (Sticky Header, Scroll Progress, Back to Top)
     ========================================================================== */
  const scrollProgress = document.getElementById('scroll-progress');
  const backToTopBtn = document.getElementById('back-to-top');

  window.addEventListener('scroll', () => {
    // Sticky header
    if (window.scrollY > 50) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }

    // Scroll progress bar
    const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
    const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const scrolled = (winScroll / height) * 100;
    if(scrollProgress) scrollProgress.style.width = scrolled + '%';

    // Back to top button visibility
    if(backToTopBtn) {
      if (winScroll > 300) {
        backToTopBtn.classList.add('show');
      } else {
        backToTopBtn.classList.remove('show');
      }
    }
  });

  if(backToTopBtn) {
    backToTopBtn.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  /* ==========================================================================
     SCROLL REVEAL ANIMATION
     ========================================================================== */
  const revealElements = document.querySelectorAll('.reveal');
  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('active');
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.15,
    rootMargin: "0px 0px -50px 0px"
  });

  revealElements.forEach(el => {
    revealObserver.observe(el);
  });

  /* ==========================================================================
     SMOOTH SCROLLING
     ========================================================================== */
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      const targetId = this.getAttribute('href');
      if (targetId === '#') return;
      
      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        e.preventDefault();
        const headerOffset = 80;
        const elementPosition = targetElement.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
        window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
      }
    });
  });

  /* ==========================================================================
     STATS COUNTER ANIMATION
     ========================================================================== */
  const statNumbers = document.querySelectorAll('.stat-num');
  const animateCounters = () => {
    statNumbers.forEach(el => {
      const target = parseInt(el.getAttribute('data-target'));
      let current = 0;
      const step = Math.ceil(target / 40);
      const timer = setInterval(() => {
        current += step;
        if (current >= target) {
          current = target;
          clearInterval(timer);
        }
        el.textContent = current + (target >= 100 ? '+' : (el.hasAttribute('data-percent') ? '%' : '+'));
      }, 40);
    });
  };

  const statsSection = document.getElementById('stats');
  if (statsSection) {
    const statsObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          animateCounters();
          statsObserver.disconnect();
        }
      });
    }, { threshold: 0.3 });
    statsObserver.observe(statsSection);
  }

  /* ==========================================================================
     COUNTDOWN TIMER
     ========================================================================== */
  // Setting a target date e.g. 1st of next month
  const now = new Date();
  const targetDate = new Date(now.getFullYear(), now.getMonth() + 1, 1).getTime();

  function updateCountdown() {
    const currentTime = new Date().getTime();
    const distance = targetDate - currentTime;

    if (distance < 0) return; // Expired

    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);

    const dEl = document.getElementById("cd-days");
    const hEl = document.getElementById("cd-hours");
    const mEl = document.getElementById("cd-mins");
    const sEl = document.getElementById("cd-secs");

    if(dEl) dEl.innerText = days.toString().padStart(2, '0');
    if(hEl) hEl.innerText = hours.toString().padStart(2, '0');
    if(mEl) mEl.innerText = minutes.toString().padStart(2, '0');
    if(sEl) sEl.innerText = seconds.toString().padStart(2, '0');
  }
  
  if (document.getElementById("cd-days")) {
    setInterval(updateCountdown, 1000);
    updateCountdown();
  }

  /* ==========================================================================
     TESTIMONIAL SLIDER
     ========================================================================== */
  const tTrack = document.getElementById('tTrack');
  const tDots = document.querySelectorAll('.t-dot');
  if (tTrack && tDots.length > 0) {
    let currentSlide = 0;
    const totalSlides = tDots.length;

    function goToSlide(n) {
      currentSlide = n;
      tTrack.style.transform = `translateX(-${n * 100}%)`;
      tDots.forEach((d, i) => d.classList.toggle('active', i === n));
    }

    tDots.forEach((dot, idx) => {
      dot.addEventListener('click', () => goToSlide(idx));
    });

    setInterval(() => {
      goToSlide((currentSlide + 1) % totalSlides);
    }, 5000);
  }

  /* ==========================================================================
     FAQ ACCORDION
     ========================================================================== */
  const faqItems = document.querySelectorAll('.faq-item');
  faqItems.forEach(item => {
    const question = item.querySelector('.faq-question');
    if (question) {
      question.addEventListener('click', () => {
        const isOpen = item.classList.contains('open');
        faqItems.forEach(i => i.classList.remove('open'));
        if (!isOpen) item.classList.add('open');
      });
    }
  });

  /* ==========================================================================
     NOTICE BOARD POPUP
     ========================================================================== */
  const noticeModal = document.getElementById('noticeModal');
  const noticeClose = document.getElementById('noticeClose');
  const noticeTrigger = document.getElementById('noticeTrigger');

  if (noticeModal) {
    // Show modal organically after a short delay
    setTimeout(() => {
      // Check session storage so it doesn't annoy users on every refresh (disabled for demo)
      // if(!sessionStorage.getItem('noticeShown')) {
        noticeModal.classList.add('active');
        // sessionStorage.setItem('noticeShown', 'true');
      // }
    }, 1500);

    if (noticeClose) {
      noticeClose.addEventListener('click', () => {
        noticeModal.classList.remove('active');
      });
    }

    if (noticeTrigger) {
      noticeTrigger.addEventListener('click', (e) => {
        e.preventDefault();
        noticeModal.classList.add('active');
      });
    }

    // Close on outside click
    noticeModal.addEventListener('click', (e) => {
      if (e.target === noticeModal) {
        noticeModal.classList.remove('active');
      }
    });
  }

  /* ==========================================================================
     COOKIE BANNER
     ========================================================================== */
  const cookieBanner = document.getElementById('cookieBanner');
  const cookieAccept = document.getElementById('cookieAccept');

  if (cookieBanner && cookieAccept) {
    if (!localStorage.getItem('gg_cookie_accepted')) {
      setTimeout(() => {
        cookieBanner.classList.add('show');
      }, 2000);
    }

    cookieAccept.addEventListener('click', () => {
      localStorage.setItem('gg_cookie_accepted', 'true');
      cookieBanner.classList.remove('show');
    });
  }

  /* ==========================================================================
     ENQUIRY FORM VALIDATION (Mock)
     ========================================================================== */
  const form = document.getElementById('enquiryForm');
  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const btn = form.querySelector('button[type="submit"]');
      const originalText = btn.innerHTML;
      btn.innerHTML = '⏳ Sending...';
      btn.disabled = true;

      // Simulate API call
      setTimeout(() => {
        alert("Enquiry submitted successfully! We will contact you soon.");
        btn.innerHTML = originalText;
        btn.disabled = false;
        form.reset();
      }, 1500);
    });
  }

  /* ==========================================================================
     SET CURRENT YEAR IN FOOTER
     ========================================================================== */
  const yearElement = document.getElementById('year');
  if (yearElement) {
    yearElement.textContent = new Date().getFullYear();
  }

  /* ==========================================================================
     TEST PORTAL LOGIC (PW Inspired)
     ========================================================================== */
  const MOCK_DATA = {
    neet: {
      title: "NEET Mock Test",
      duration: 3 * 60 * 60, // 3 hours
      subjects: ["Physics", "Chemistry", "Biology"],
      qPerSub: 25
    },
    jee: {
      title: "JEE Mock Test",
      duration: 3 * 60 * 60,
      subjects: ["Physics", "Chemistry", "Mathematics"],
      qPerSub: 25
    },
    ssc: {
      title: "Std 10th (SSC) Mock Test",
      duration: 2 * 60 * 60,
      subjects: ["Science", "Mathematics"],
      qPerSub: 25
    }
  };

  const hardQuestions = {
    "Physics": [
      { q: "A particle is moving in a circle of radius R with constant speed v. What is the magnitude of average velocity after half a revolution?", o: ["v", "2v/π", "v/2", "0"], a: 1 },
      { q: "A body is projected vertically upwards. At half its maximum height, its velocity is 10 m/s. What is the maximum height reached? (g = 10 m/s²)", o: ["10 m", "15 m", "20 m", "5 m"], a: 0 },
      { q: "Two spheres of same material have radii 1m and 4m and temperatures 4000K and 2000K respectively. The ratio of energy radiated per second by them is:", o: ["1:1", "1:16", "4:1", "1:4"], a: 0 },
      { q: "A car accelerates from rest at a constant rate α for some time, after which it decelerates at a constant rate β to come to rest. If total time t elapses, maximum velocity is:", o: ["αβt / (α + β)", "½ αβt / (α + β)", "α²t / (α + β)", "β²t / (α + β)"], a: 0 },
      { q: "An electric dipole is placed in a uniform electric field. The net electric force on the dipole is:", o: ["Always zero", "Depends on orientation", "Can never be zero", "Depends on dipole moment", "None of these"], a: 0 }
    ],
    "Chemistry": [
      { q: "The maximum number of electrons in a subshell is given by the expression:", o: ["4l + 2", "4l - 2", "2l + 1", "2n²"], a: 0 },
      { q: "Which of the following has the highest dipole moment?", o: ["CH3Cl", "CH2Cl2", "CHCl3", "CCl4"], a: 0 },
      { q: "An azeotropic mixture of two liquids has a boiling point higher than either of them when it:", o: ["Shows positive deviation from Raoult's law", "Shows negative deviation from Raoult's law", "Shows ideal behavior", "Is saturated"], a: 1 },
      { q: "The rate constant for a first-order reaction is 4.606 × 10^-3 s^-1. The time required to reduce 2.0g of the reactant to 0.2g is:", o: ["200 s", "500 s", "1000 s", "50 s"], a: 1 },
      { q: "Among the following, the most stable carbocation is:", o: ["Triphenylmethyl cation", "Allyl cation", "Tert-butyl cation", "Benzyl cation"], a: 0 }
    ],
    "Biology": [
      { q: "Which of the following statements about the lac operon is incorrect?", o: ["In the absence of lactose, the repressor binds to the operator.", "Allolactose acts as an inducer.", "The lac z gene codes for beta-galactosidase.", "It is an example of an anabolic pathway."], a: 3 },
      { q: "The primary acceptor of carbon dioxide in C4 plants is:", o: ["Phosphoenolpyruvate (PEP)", "Ribulose-1,5-bisphosphate (RuBP)", "Oxaloacetic acid (OAA)", "Phosphoglyceric acid (PGA)"], a: 0 },
      { q: "Fluid mosaic model of plasma membrane was proposed by:", o: ["Singer and Nicolson", "Danielli and Davson", "Robertson", "Schleiden and Schwann"], a: 0 },
      { q: "Which of the following restricts the replication of bacteriophages in bacteria?", o: ["Endonucleases", "Ligases", "Helicases", "Polymerases"], a: 0 },
      { q: "The first stable product of nitrogen fixation in leguminous plants is:", o: ["Ammonia", "Nitrate", "Nitrite", "Glutamate"], a: 0 }
    ],
    "Mathematics": [
      { q: "The number of real roots of the equation x^7 + 14x^5 + 16x^3 + 30x - 560 = 0 is:", o: ["1", "3", "5", "7"], a: 0 },
      { q: "If A is a square matrix such that A² = I, then (A - I)³ + (A + I)³ - 7A is equal to:", o: ["A", "I-A", "I+A", "3A"], a: 0 },
      { q: "The value of integral from -1 to 1 of (|x| + |x-1|) dx is:", o: ["2", "3", "5/2", "3/2"], a: 2 },
      { q: "The probability that a non-leap year selected at random will contain 53 Sundays is:", o: ["1/7", "2/7", "3/7", "5/7"], a: 0 },
      { q: "If the sum of n terms of an AP is 3n² + 5n, then which of its terms is 164?", o: ["26th", "27th", "28th", "29th"], a: 1 }
    ],
    "Science": [
      { q: "Which of the following aqueous solutions will have the highest boiling point?", o: ["1.0 M NaCl", "1.0 M Glucose", "1.0 M CaCl2", "1.0 M AlCl3"], a: 3 },
      { q: "When a ray of light enters a glass slab, its wavelength:", o: ["Decreases", "Increases", "Remains same", "Data is insufficient"], a: 0 },
      { q: "In a concave mirror, if the image is virtual, erect and magnified, the object must be located:", o: ["Between Pole and Focus", "At Focus", "Between Focus and Center of Curvature", "Beyond Center of Curvature"], a: 0 },
      { q: "Which blood vessel carries oxygenated blood from lungs to heart?", o: ["Pulmonary Vein", "Pulmonary Artery", "Aorta", "Vena Cava"], a: 0 },
      { q: "The functional group -CHO is present in:", o: ["Aldehydes", "Ketones", "Alcohols", "Carboxylic acids"], a: 0 }
    ]
  };

  let currentExam = null;
  let testState = {}; // holds state of each question
  let currentSubIdx = 0;
  let currentQIdx = 0;
  let timerInterval = null;

  const tpOverlay = document.getElementById('testPortal');
  const tpExamTitle = document.getElementById('tpExamTitle');
  const tpTimer = document.getElementById('tpTimer');
  const tpClose = document.getElementById('tpClose');
  const tpSubjects = document.getElementById('tpSubjects');
  const tpQNum = document.getElementById('tpQNum');
  const tpQuestionText = document.getElementById('tpQuestionText');
  const tpOptions = document.getElementById('tpOptions');
  const tpPaletteGrid = document.getElementById('tpPaletteGrid');
  const tpResultModal = document.getElementById('testResultModal');
  const tpSidebar = document.querySelector('.tp-sidebar');
  const tpTogglePaletteBtn = document.getElementById('tpTogglePalette');

  if (tpTogglePaletteBtn) {
    tpTogglePaletteBtn.addEventListener('click', () => {
      tpSidebar.classList.toggle('open');
    });
  }

  // Trigger buttons
  document.querySelectorAll('.start-test-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      const examId = e.target.getAttribute('data-exam');
      startMockTest(examId);
    });
  });

  if (tpClose) {
    tpClose.addEventListener('click', () => confirmExitTest());
  }
  
  if (document.getElementById('testResultClose')) {
    document.getElementById('testResultClose').addEventListener('click', () => {
      tpResultModal.classList.remove('active');
    });
  }

  function generateQuestions(examInfo) {
    let state = { subjects: [] };
    examInfo.subjects.forEach((sub, sIdx) => {
      let qList = [];
      let pool = hardQuestions[sub] || hardQuestions["Science"];
      for(let i=0; i<examInfo.qPerSub; i++) {
        let sample = pool[i % pool.length];
        
        let text = sample.q;
        let options = [...sample.o];
        let correct = sample.a;

        if (i >= pool.length) {
            text = `[Level ${Math.floor(i/pool.length) + 1} Variant] ` + sample.q;
            let shift = i % options.length;
            let temp = options[correct];
            options[correct] = options[shift];
            options[shift] = temp;
            correct = shift;
        }

        qList.push({
          id: `${sIdx}-${i}`,
          subName: sub,
          qNum: i + 1,
          text: text,
          options: options,
          correct: correct,
          selected: null,
          status: 'notvis'
        });
      }
      state.subjects.push(qList);
    });
    return state;
  }

  function startMockTest(examId) {
    currentExam = MOCK_DATA[examId];
    testState = generateQuestions(currentExam);
    currentSubIdx = 0;
    currentQIdx = 0;
    
    tpExamTitle.innerText = currentExam.title;
    tpOverlay.classList.add('active');
    document.body.style.overflow = 'hidden';

    renderSubjects();
    renderPalette();
    loadQuestion(currentSubIdx, currentQIdx);

    // Initial status for first q
    if (testState.subjects[currentSubIdx][currentQIdx].status === 'notvis') {
      testState.subjects[currentSubIdx][currentQIdx].status = 'unans';
    }

    startTimer(currentExam.duration);
  }

  function renderSubjects() {
    tpSubjects.innerHTML = '';
    currentExam.subjects.forEach((sub, idx) => {
      let div = document.createElement('div');
      div.className = `tp-sub-tab ${idx === currentSubIdx ? 'active' : ''}`;
      div.innerText = sub;
      div.onclick = () => {
        currentSubIdx = idx;
        currentQIdx = 0;
        renderSubjects();
        renderPalette();
        loadQuestion(currentSubIdx, currentQIdx);
      };
      tpSubjects.appendChild(div);
    });
  }

  function renderPalette() {
    tpPaletteGrid.innerHTML = '';
    let questions = testState.subjects[currentSubIdx];
    questions.forEach((q, idx) => {
      let div = document.createElement('div');
      div.className = `tp-bub ${q.status}`;
      div.innerText = q.qNum;
      
      // Highlight current
      if(idx === currentQIdx) {
        div.style.boxShadow = "0 0 0 2px var(--color-text-main)";
      }

      div.onclick = () => {
        currentQIdx = idx;
        loadQuestion(currentSubIdx, currentQIdx);
        if (window.innerWidth <= 768) {
          tpSidebar.classList.remove('open');
        }
      };
      tpPaletteGrid.appendChild(div);
    });
  }

  function loadQuestion(sIdx, qIdx) {
    let q = testState.subjects[sIdx][qIdx];
    if (q.status === 'notvis') q.status = 'unans';

    tpQNum.innerText = `Question ${q.qNum}`;
    tpQuestionText.innerText = q.text;
    
    tpOptions.innerHTML = '';
    q.options.forEach((opt, idx) => {
      let lbl = document.createElement('label');
      lbl.className = `tp-option-label ${q.selected === idx ? 'selected' : ''}`;
      
      let inp = document.createElement('input');
      inp.type = 'radio';
      inp.name = `q_${q.id}`;
      inp.className = 'tp-option-input';
      inp.checked = (q.selected === idx);
      inp.onchange = () => {
        q.selected = idx;
        loadQuestion(sIdx, qIdx); // re-render to update selected class
      };
      
      let txt = document.createElement('span');
      txt.className = 'tp-option-text';
      txt.innerText = opt;

      lbl.appendChild(inp);
      lbl.appendChild(txt);
      tpOptions.appendChild(lbl);
    });

    renderPalette();
  }

  function startTimer(durationSeconds) {
    clearInterval(timerInterval);
    let timeRemaining = durationSeconds;
    
    const update = () => {
      let h = Math.floor(timeRemaining / 3600);
      let m = Math.floor((timeRemaining % 3600) / 60);
      let s = timeRemaining % 60;
      tpTimer.innerText = `${h.toString().padStart(2,'0')}:${m.toString().padStart(2,'0')}:${s.toString().padStart(2,'0')}`;
      if(timeRemaining <= 0) {
        submitTest();
      }
      timeRemaining--;
    };
    update();
    timerInterval = setInterval(update, 1000);
  }

  // Footer Actions
  document.getElementById('btnSaveNext')?.addEventListener('click', () => {
    let q = testState.subjects[currentSubIdx][currentQIdx];
    if (q.selected !== null) q.status = 'ans';
    else q.status = 'unans';
    goToNextQuestion();
  });

  document.getElementById('btnMarkReview')?.addEventListener('click', () => {
    let q = testState.subjects[currentSubIdx][currentQIdx];
    q.status = 'rev';
    goToNextQuestion();
  });

  document.getElementById('btnClearResponse')?.addEventListener('click', () => {
    let q = testState.subjects[currentSubIdx][currentQIdx];
    q.selected = null;
    q.status = 'unans';
    loadQuestion(currentSubIdx, currentQIdx);
  });

  document.getElementById('btnSubmitTest')?.addEventListener('click', () => {
    if(confirm("Are you sure you want to submit the test section?")) {
       submitTest();
    }
  });

  function goToNextQuestion() {
    let questions = testState.subjects[currentSubIdx];
    if(currentQIdx < questions.length - 1) {
      currentQIdx++;
      loadQuestion(currentSubIdx, currentQIdx);
    } else {
      // reached end of subject
      if (currentSubIdx < currentExam.subjects.length - 1) {
        if(confirm("You have reached the end of this subject. Switch to next subject?")) {
          currentSubIdx++;
          currentQIdx = 0;
          renderSubjects();
          loadQuestion(currentSubIdx, currentQIdx);
        }
      } else {
        alert("You have reached the last question of the test.");
      }
    }
  }

  function confirmExitTest() {
    if(confirm("Are you sure you want to exit? Your progress will be lost.")) {
      teardownTest();
    }
  }

  function teardownTest() {
    clearInterval(timerInterval);
    tpOverlay.classList.remove('active');
    document.body.style.overflow = '';
  }

  function submitTest() {
    teardownTest();
    
    // Calculate simple score
    let totalQs = 0;
    let correct = 0;
    let wrong = 0;
    
    testState.subjects.forEach(sub => {
      sub.forEach(q => {
        totalQs++;
        if(q.selected !== null) {
          if(q.selected === q.correct) correct++;
          else wrong++;
        }
      });
    });

    const score = (correct * 4) - (wrong * 1); // standard +4/-1
    
    document.getElementById('resScore').innerText = `Score: ${score}`;
    document.getElementById('resCorrect').innerText = `${correct} Correct`;
    document.getElementById('resWrong').innerText = `${wrong} Incorrect`;
    
    tpResultModal.classList.add('active');
  }

});
