      if (this.classList.contains('active')) {
        this.querySelector('span:nth-child(1)').style.transform = 'rotate(45deg) translate(6px, 6px)';
        this.querySelector('span:nth-child(2)').style.opacity = '0';
        this.querySelector('span:nth-child(3)').style.transform = 'rotate(-45deg) translate(6px, -6px)';
      } else {
        this.querySelector('span:nth-child(1)').style.transform = 'none';
        this.querySelector('span:nth-child(2)').style.opacity = '1';
        this.querySelector('span:nth-child(3)').style.transform = 'none';
      }
    });
  }
  
  // Close mobile menu when clicking outside
  document.addEventListener('click', function(e) {
    if (navMenu && navMenu.classList.contains('active')) {
      if (!navMenu.contains(e.target) && !mobileToggle.contains(e.target)) {
        navMenu.classList.remove('active');
        
        if (mobileToggle) {
          mobileToggle.classList.remove('active');
          mobileToggle.querySelector('span:nth-child(1)').style.transform = 'none';
          mobileToggle.querySelector('span:nth-child(2)').style.opacity = '1';
          mobileToggle.querySelector('span:nth-child(3)').style.transform = 'none';
        }
      }
    }
  });
  
  // Nav Link Active State
  if (navLinks.length > 0) {
    navLinks.forEach(navLink => {
      navLink.addEventListener('click', function() {
        // Remove active class from all links
        navLinks.forEach(link => link.classList.remove('active'));
        
        // Add active class to clicked link
        this.classList.add('active');
        
        // Close mobile menu if open
        if (navMenu && navMenu.classList.contains('active')) {
          navMenu.classList.remove('active');
          
          if (mobileToggle) {
            mobileToggle.classList.remove('active');
            mobileToggle.querySelector('span:nth-child(1)').style.transform = 'none';
            mobileToggle.querySelector('span:nth-child(2)').style.opacity = '1';
            mobileToggle.querySelector('span:nth-child(3)').style.transform = 'none';
          }
        }
      });
    });
    
    // Set active link based on current scroll position
    window.addEventListener('scroll', function() {
      let current = '';
      
      const sections = document.querySelectorAll('section');
      
      sections.forEach(section => {
        const sectionTop = section.offsetTop - 100;
        const sectionHeight = section.clientHeight;
        
        if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
          current = section.getAttribute('id');
        }
      });
      
      navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
          link.classList.add('active');
        }
      });
    });
  }
  
  // Back to Top Button Click
  if (backToTop) {
    backToTop.addEventListener('click', function(e) {
      e.preventDefault();
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });
  }
  
  // Smooth Scroll for Anchor Links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      e.preventDefault();
      
      const targetId = this.getAttribute('href');
      
      // Skip if it's just "#"
      if (targetId === '#') return;
      
      const targetElement = document.querySelector(targetId);
      
      if (targetElement) {
        window.scrollTo({
          top: targetElement.offsetTop - 80,
          behavior: 'smooth'
        });
      }
    });
  });
  
  // Counter Animation
  function startCounter(counter) {
    // Check if counter has already been started
    if (counter.classList.contains('counted')) return;
    
    counter.classList.add('counted');
    
    const target = +counter.getAttribute('data-count');
    const speed = 200; // Lower is faster
    const inc = target / speed;
    let currentCount = 0;
    
    const updateCount = () => {
      if (currentCount < target) {
        currentCount += inc;
        counter.innerText = Math.ceil(currentCount);
        setTimeout(updateCount, 1);
      } else {
        counter.innerText = target;
      }
    };
    
    updateCount();
  }
  
  // Form Validation
  const forms = document.querySelectorAll('form');
  
  if (forms.length > 0) {
    forms.forEach(form => {
      // Skip forms that are already handled by Netlify
      if (form.hasAttribute('data-netlify')) return;
      
      form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        let isValid = true;
        const requiredFields = form.querySelectorAll('[required]');
        
        requiredFields.forEach(field => {
          if (!field.value.trim()) {
            isValid = false;
            field.classList.add('error');
            
            // Add error message if not exists
            if (!field.nextElementSibling || !field.nextElementSibling.classList.contains('error-message')) {
              const errorMessage = document.createElement('div');
              errorMessage.classList.add('error-message');
              errorMessage.textContent = 'This field is required';
              field.parentNode.insertBefore(errorMessage, field.nextElementSibling);
            }
          } else {
            field.classList.remove('error');
            
            // Remove error message if exists
            if (field.nextElementSibling && field.nextElementSibling.classList.contains('error-message')) {
              field.parentNode.removeChild(field.nextElementSibling);
            }
            
            // Email validation
            if (field.type === 'email' && !isValidEmail(field.value)) {
              isValid = false;
              field.classList.add('error');
              
              if (!field.nextElementSibling || !field.nextElementSibling.classList.contains('error-message')) {
                const errorMessage = document.createElement('div');
                errorMessage.classList.add('error-message');
                errorMessage.textContent = 'Please enter a valid email address';
                field.parentNode.insertBefore(errorMessage, field.nextElementSibling);
              }
            }
          }
        });
        
        if (isValid) {
          // Form submission success
          alert('Form submitted successfully!');
          form.reset();
        }
      });
      
      // Live validation on input
      const requiredFields = form.querySelectorAll('[required]');
      
      requiredFields.forEach(field => {
        field.addEventListener('input', function() {
          if (field.value.trim()) {
            field.classList.remove('error');
            
            // Remove error message if exists
            if (field.nextElementSibling && field.nextElementSibling.classList.contains('error-message')) {
              field.parentNode.removeChild(field.nextElementSibling);
            }
            
            // Email validation
            if (field.type === 'email') {
              if (!isValidEmail(field.value)) {
                field.classList.add('error');
                
                if (!field.nextElementSibling || !field.nextElementSibling.classList.contains('error-message')) {
                  const errorMessage = document.createElement('div');
                  errorMessage.classList.add('error-message');
                  errorMessage.textContent = 'Please enter a valid email address';
                  field.parentNode.insertBefore(errorMessage, field.nextElementSibling);
                }
              }
            }
          }
        });
      });
    });
  }
  
  // Email validation helper
  function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }
  
  // Netlify Form Handling
  const netlifyForms = document.querySelectorAll('form[data-netlify="true"]');
  
  if (netlifyForms.length > 0) {
    netlifyForms.forEach(form => {
      // Ensure hidden input is present for Netlify
      if (!form.querySelector('input[name="form-name"]')) {
        const hiddenInput = document.createElement('input');
        hiddenInput.type = 'hidden';
        hiddenInput.name = 'form-name';
        hiddenInput.value = form.getAttribute('name');
        form.appendChild(hiddenInput);
      }
    });
  }
  
})();/*-------------------------------------------
  MAIN JAVASCRIPT
-------------------------------------------*/
(function() {
  'use strict';
  
  // DOM Elements
  const preloader = document.querySelector('.preloader');
  const header = document.querySelector('.header');
  const mobileToggle = document.querySelector('.mobile-toggle');
  const navMenu = document.querySelector('.nav-menu');
  const navLinks = document.querySelectorAll('.nav-link');
  const backToTop = document.querySelector('.back-to-top');
  const counters = document.querySelectorAll('.counter');
  
  // Preloader
  window.addEventListener('load', function() {
    if (preloader) {
      preloader.classList.add('loaded');
      setTimeout(function() {
        preloader.style.display = 'none';
      }, 500);
    }
    
    // Initialize AOS
    AOS.init({
      duration: 800,
      easing: 'ease-in-out',
      once: true,
      mirror: false
    });
  });
  
  // Sticky Header
  window.addEventListener('scroll', function() {
    if (header) {
      if (window.scrollY > 100) {
        header.classList.add('sticky');
      } else {
        header.classList.remove('sticky');
      }
    }
    
    // Back to Top Button
    if (backToTop) {
      if (window.scrollY > 300) {
        backToTop.classList.add('active');
      } else {
        backToTop.classList.remove('active');
      }
    }
    
    // Counter Animation
    if (counters.length > 0) {
      counters.forEach(counter => {
        const counterPosition = counter.getBoundingClientRect().top;
        const screenPosition = window.innerHeight / 1.2;
        
        if (counterPosition < screenPosition) {
          startCounter(counter);
        }
      });
    }
  });
  
  // Mobile Navigation
  if (mobileToggle) {
    mobileToggle.addEventListener('click', function() {
      this.classList.toggle('active');
      navMenu.classList.toggle('active');
      
      // Toggle hamburger animation
      if (this.classList.contains('active')) {
        this.querySelector('span:nth-child(1)').style.transform = 'rotate(45deg) translate(6px, 6px)';
        this.querySelector('span:nth-child(2)').style.