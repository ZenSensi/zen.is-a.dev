    // BASIC DATA
    const NAME = 'Arnabh Kushwaha';
    const nameContainer = document.getElementById('name-letters');
    const yearEl = document.getElementById('year');
    yearEl.textContent = new Date().getFullYear();

    // SPLIT NAME INTO LETTERS
    function prepareNameLetters(text){
      // wrap letters in <span> for per-letter animation
      return text.split('').map(ch => {
        if(ch === ' ') return '<span class="letter" style="margin:0 6px">&nbsp;</span>'
        return `<span class="letter">${ch}</span>`
      }).join('')
    }
    nameContainer.innerHTML = prepareNameLetters(NAME);

    // Small helper to animate elements with anime.js
    function animateIntro(){
      // animate SVG logo stroke draw
      const logoPath = document.querySelector('#logo-path');
      const pathLength = logoPath.getTotalLength();
      logoPath.setAttribute('stroke-dasharray', pathLength);
      logoPath.setAttribute('stroke-dashoffset', pathLength);

      anime.timeline({
        easing: 'easeOutExpo'
      })
      .add({
        targets: '#logo-path',
        strokeDashoffset: [pathLength,0],
        duration: 900,
        delay: 120
      })
      .add({
        targets: '.letter',
        translateY: [40,0],
        opacity: [0,1],
        rotateX: [-20,0],
        duration: 900,
        delay: anime.stagger(40)
      }, '-=450')
      .add({
        targets: '#tagline',
        translateY: [20,0],
        opacity: [0,1],
        duration: 700
      }, '-=450')
      .add({
        targets: '.accent-line',
        scaleX: [0,1],
        opacity: [0.2,1],
        duration: 600
      }, '-=400')
      .add({
        targets: '.cta-row .btn',
        translateY: [20,0],
        opacity: [0,1],
        duration: 600,
        delay: anime.stagger(120)
      }, '-=400')
    }

    // Start intro once DOM is ready
    document.addEventListener('DOMContentLoaded', ()=>{
      // remove pre-animate class progressively
      document.querySelectorAll('.pre-animate').forEach(el=>{
        el.style.opacity = '0';
      })
      animateIntro();

      // floating subtle loop on logo after drawing
      setTimeout(()=>{
        anime({
          targets: '.logo svg',
          translateY: [0,6,0],
          duration: 3000,
          loop: true,
          easing: 'easeInOutSine'
        })
      },1200)
    })

    // INTERSECTION OBSERVER for section reveals
    const observer = new IntersectionObserver((entries)=>{
      entries.forEach(entry=>{
        if(entry.isIntersecting){
          const el = entry.target;
          el.classList.remove('pre-animate')
          anime({
            targets: el,
            translateY: [18,0],
            opacity: [0,1],
            duration: 800,
            easing: 'easeOutCubic'
          })
          observer.unobserve(el)
        }
      })
    },{threshold:0.12})

    // observe a bunch of elements
    document.querySelectorAll('.pre-animate').forEach(el => observer.observe(el))

    // PROJECT CARD HOVER micro-interactions
    document.querySelectorAll('.project').forEach(card =>{
      card.addEventListener('mouseenter', ()=>{
        anime.remove(card)
        anime({targets: card, scale:1.02, translateY:-6, duration:350, easing:'easeOutCubic'})
      })
      card.addEventListener('mouseleave', ()=>{
        anime.remove(card)
        anime({targets: card, scale:1, translateY:0, duration:350, easing:'easeOutCubic'})
      })
    })

    // Smooth scroll for nav links
    document.querySelectorAll('a[href^="#"]').forEach(a=>{
      a.addEventListener('click', e=>{
        e.preventDefault();
        const tgt = document.querySelector(a.getAttribute('href'));
        if(!tgt) return;
        tgt.scrollIntoView({behavior:'smooth',block:'start'});
      })
    })

    // Small CTA click animation
    document.getElementById('hire-btn').addEventListener('click', ()=>{
      anime.timeline({})
        .add({
          targets:'#hire-btn',
          scale:[1,0.96,1],
          duration:450,
          easing:'easeOutQuad'
        })
        .add({
          targets:'#hire-btn',
          background: ['rgba(255,255,255,0.03)','linear-gradient(90deg,var(--accent), rgba(139,233,253,0.15))'],
          duration:400,
          easing:'linear'
        },'-=350')
      // In real usage you might open a modal or mailto here
      window.location.href = 'mailto:you@example.com?subject=Hi%20Zen%20—%20Let%27s%20build'
    })

    // Accessibility: reduce motion respect (prefers-reduced-motion)
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)')
    if(mq.matches){
      // disable looping and shorten animations
      anime.running.forEach(a=>a.pause && a.pause())
    }