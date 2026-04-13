// Wait for DOM
document.addEventListener("DOMContentLoaded", () => {

// --- 0. Preloader Sequence ---
const preloader = document.getElementById('preloader');
const countElement = document.getElementById('loader-count');
let count = 0;
const loaderInterval = setInterval(() => {
  count += Math.floor(Math.random() * 10) + 1;
  if(count >= 100) {
    count = 100;
    countElement.innerText = count;
    clearInterval(loaderInterval);
    setTimeout(() => {
      preloader.style.transform = 'translateY(-100%)';
      initGSAP(); // Trigger GSAP animations only after preloader lifts
    }, 500);
  } else {
    countElement.innerText = count;
  }
}, 50);

// --- 0.1 Lenis Smooth Scroll ---
const lenis = new Lenis({
  autoRaf: true,
  duration: 1.2,
  easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t))
});
lenis.on('scroll', ScrollTrigger.update);
gsap.ticker.add((time)=>{
  lenis.raf(time * 1000);
});
gsap.ticker.lagSmoothing(0);

// --- 0.2 Custom Magnetic Cursor ---
if (window.matchMedia("(pointer: fine)").matches) {
  const cursor = document.getElementById('custom-cursor');
  const follower = document.getElementById('cursor-follower');
  
  let targetX = window.innerWidth / 2;
  let targetY = window.innerHeight / 2;
  let cursorX = targetX;
  let cursorY = targetY;

  window.addEventListener('mousemove', (e) => {
    targetX = e.clientX;
    targetY = e.clientY;
    cursor.style.transform = `translate(calc(${e.clientX}px - 50%), calc(${e.clientY}px - 50%))`;
  });

  // Smooth Follower Animation
  function animateFollower() {
    cursorX += (targetX - cursorX) * 0.15;
    cursorY += (targetY - cursorY) * 0.15;
    follower.style.transform = `translate(calc(${cursorX}px - 50%), calc(${cursorY}px - 50%))`;
    requestAnimationFrame(animateFollower);
  }
  animateFollower();

  // Hover states
  document.querySelectorAll('a, button, .parallax-box').forEach(el => {
    el.addEventListener('mouseenter', () => follower.classList.add('hovering'));
    el.addEventListener('mouseleave', () => follower.classList.remove('hovering'));
  });
}

// --- 0.3 Dark Mode Toggle ---
const toggleBtn = document.getElementById('toggle-dark-mode');
const sunIcon = document.querySelector('.sun-icon');
const moonIcon = document.querySelector('.moon-icon');

const theme = localStorage.getItem('theme') || 'light';
if (theme === 'dark') setDarkMode(true);

toggleBtn.addEventListener('click', () => {
  const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
  setDarkMode(!isDark);
});

function setDarkMode(isDark) {
  if(isDark) {
    document.documentElement.setAttribute('data-theme', 'dark');
    localStorage.setItem('theme', 'dark');
    moonIcon.style.display = 'none';
    sunIcon.style.display = 'block';
  } else {
    document.documentElement.removeAttribute('data-theme');
    localStorage.setItem('theme', 'light');
    sunIcon.style.display = 'none';
    moonIcon.style.display = 'block';
  }
}

// --- 1. Header scroll effect ---
const header = document.getElementById("header");
window.addEventListener("scroll", () => {
  if(window.scrollY > 50) header.classList.add("scrolled");
  else header.classList.remove("scrolled");
});

// --- 2. GSAP Animations ---
function initGSAP() {
  if (typeof gsap !== 'undefined') {
    gsap.registerPlugin(ScrollTrigger);

    const tl = gsap.timeline();
    tl.from(".hero-bg-layer", {opacity: 0, scaleY: 0, transformOrigin: "top center", duration: 1.5, ease: "power3.inOut"})
      .from(".hero-img-box", {y: 100, opacity: 0, duration: 1.2, ease: "power3.out"}, "-=0.8")
      .from(".hero-anim-wrapper", {scale: 1.2, duration: 1.5, ease: "power2.out"}, "-=1.2")
      .from(".title-top", {y: 50, opacity: 0, duration: 1, ease: "power2.out"}, "-=1")
      .from(".title-bottom", {y: -50, opacity: 0, duration: 1, ease: "power2.out"}, "-=0.8")
      .from(".hero-detail-left", {x: -30, opacity: 0, duration: 0.8, ease: "power2.out"}, "-=0.5")
      .from(".hero-detail-right", {x: 30, opacity: 0, duration: 0.8, ease: "power2.out"}, "-=0.5");

    gsap.utils.toArray('.section-header, .features-grid, .lb-text-box').forEach(el => {
      gsap.fromTo(el, 
        { y: 50, opacity: 0 },
        {
          y: 0, opacity: 1, duration: 1.2, ease: "power2.out",
          scrollTrigger: { trigger: el, start: "top 85%" }
        }
      );
    });

    gsap.utils.toArray('.parallax-box img').forEach(img => {
      gsap.to(img, {
        yPercent: 20,
        ease: "none",
        scrollTrigger: { trigger: img.parentElement, start: "top bottom", end: "bottom top", scrub: true }
      });
    });
  }
}

// --- 3. Filtering Logic ---
const pills = document.querySelectorAll('.pill');
const products = document.querySelectorAll('.product-card');

pills.forEach(pill => {
  pill.addEventListener('click', () => {
    pills.forEach(p => p.classList.remove('active'));
    pill.classList.add('active');
    const filter = pill.getAttribute('data-filter');

    products.forEach(prod => {
      if (filter === 'all' || prod.getAttribute('data-category') === filter) {
        prod.style.display = 'block';
        gsap.fromTo(prod, {opacity: 0, y: 20}, {opacity: 1, y: 0, duration: 0.5});
      } else {
        prod.style.display = 'none';
      }
    });
  });
});

// --- 4. Sliders (Testimonials) ---
const slides = document.querySelectorAll('.slide');
const dots = document.querySelectorAll('#testi-dots .dot');
let currentSlide = 0;

function goToSlide(index) {
  slides.forEach((s, i) => {
    s.classList.remove('active');
    dots[i].classList.remove('active');
    if (i === index) {
      s.classList.add('active');
      dots[i].classList.add('active');
    }
  });
  currentSlide = index;
}

document.getElementById('prev-slide')?.addEventListener('click', () => {
  let newIndex = currentSlide === 0 ? slides.length - 1 : currentSlide - 1;
  goToSlide(newIndex);
});
document.getElementById('next-slide')?.addEventListener('click', () => {
  let newIndex = currentSlide === slides.length - 1 ? 0 : currentSlide + 1;
  goToSlide(newIndex);
});
dots.forEach((dot, i) => {
  dot.addEventListener('click', () => goToSlide(i));
});

// --- 5. Modal & Overlay logic ---
const cartDrawer = document.getElementById('cart-drawer');
const cartOverlay = document.getElementById('cart-overlay');
const searchModal = document.getElementById('search-overlay');
const qvModal = document.getElementById('qv-modal');
const qvOverlay = document.getElementById('qv-overlay');

document.getElementById('open-cart').addEventListener('click', () => {
  cartDrawer.classList.add('active');
  cartOverlay.classList.add('active');
});
document.getElementById('open-search').addEventListener('click', () => {
  searchModal.classList.add('active');
});

function closeCart() { cartDrawer.classList.remove('active'); cartOverlay.classList.remove('active'); }
function closeSearch() { searchModal.classList.remove('active'); }
function closeQV() { qvModal.classList.remove('active'); qvOverlay.classList.remove('active'); }

document.getElementById('close-cart').addEventListener('click', closeCart);
cartOverlay.addEventListener('click', closeCart);
document.getElementById('close-search').addEventListener('click', closeSearch);
document.getElementById('close-qv').addEventListener('click', closeQV);
qvOverlay.addEventListener('click', closeQV);

// Size Guide Modals
const sizeGuidePane = document.getElementById('size-guide-pane');
document.getElementById('open-size-guide')?.addEventListener('click', () => {
  sizeGuidePane.classList.add('active');
});
document.getElementById('close-size-guide')?.addEventListener('click', () => {
  sizeGuidePane.classList.remove('active');
});

// Quick View Injector
window.openQuickView = function(title, price, img, desc) {
  document.getElementById('qv-title').innerText = title;
  document.getElementById('qv-price').innerText = price;
  document.getElementById('qv-image').src = img;
  document.getElementById('qv-desc').innerText = desc;

  const qvSizes = document.querySelectorAll('.size-btn');
  qvSizes.forEach(b => b.classList.remove('active'));
  qvSizes[1].classList.add('active');

  const qvAddBtn = document.getElementById('qv-add-btn');
  qvAddBtn.onclick = (e) => {
    const p = parseFloat(price.replace('$', ''));
    window.addToCart(title, p, img, e);
    closeQV();
  };

  qvModal.classList.add('active');
  qvOverlay.classList.add('active');
};

document.querySelectorAll('.size-btn').forEach(btn => {
  btn.addEventListener('click', (e) => {
    document.querySelectorAll('.size-btn').forEach(b => b.classList.remove('active'));
    e.target.classList.add('active');
  });
});

// --- 6. Cart Logic & Flying Item Animation ---
let cart = [];
const toast = document.getElementById('toast');
let toastTimeout;

window.addToCart = function(title, price, img, event) {
  cart.push({title, price, img});
  
  // 6.1 Fly To Cart Animation Segment
  if (event) {
    const btn = event.currentTarget || event.target;
    // Find nearest visual parent image
    const cardImg = btn.closest('.img-wrapper, .qv-content')?.querySelector('img');
    const cartIconNode = document.getElementById('open-cart');

    if (cardImg && cartIconNode) {
      const imgRect = cardImg.getBoundingClientRect();
      const cartRect = cartIconNode.getBoundingClientRect();

      const flyingNode = cardImg.cloneNode();
      flyingNode.classList.add('flying-cart-item');
      flyingNode.style.top = `${imgRect.top}px`;
      flyingNode.style.left = `${imgRect.left}px`;
      flyingNode.style.width = `${imgRect.width}px`;
      flyingNode.style.height = `${imgRect.height}px`;
      document.body.appendChild(flyingNode);

      gsap.to(flyingNode, {
        top: cartRect.top,
        left: cartRect.left,
        width: 20,
        height: 20,
        opacity: 0,
        duration: 0.8,
        ease: "power2.inOut",
        onComplete: () => {
          flyingNode.remove();
          updateCartUI();
          showToast(`${title} added to bag.`);
        }
      });
    } else {
      updateCartUI();
      showToast(`${title} added to bag.`);
    }
  } else {
    updateCartUI();
    showToast(`${title} added to bag.`);
  }
}

function updateCartUI() {
  const wrapper = document.getElementById('cart-items-wrapper');
  const badge = document.getElementById('cart-badge');
  const drawerCount = document.getElementById('drawer-count');
  const totalEl = document.getElementById('drawer-total');
  const checkoutBtn = document.getElementById('checkout-btn');

  gsap.fromTo(badge, {scale: 1.5}, {scale: 1, duration: 0.4, ease: "back.out(2)"});

  badge.innerText = cart.length;
  drawerCount.innerText = cart.length;

  if (cart.length === 0) {
    wrapper.innerHTML = '<div class="empty-cart-msg">Your bag is currently empty.</div>';
    checkoutBtn.disabled = true;
    totalEl.innerText = '$0.00';
  } else {
    wrapper.innerHTML = '';
    let total = 0;
    cart.forEach((item, index) => {
      total += item.price;
      wrapper.innerHTML += `
        <div style="display:flex; gap: 1rem; align-items:center; border-bottom: 1px solid var(--border); padding-bottom: 1rem; margin-bottom: 1rem;">
          <img src="${item.img}" style="width: 70px; height: 90px; object-fit: cover; border-radius: 4px;" alt="product"/>
          <div style="flex:1;">
            <h4 style="font-family: 'Inter', sans-serif; font-size: 1rem;">${item.title}</h4>
            <p style="color: var(--accent); font-weight: 600; margin-top: 5px;">$${item.price.toFixed(2)}</p>
          </div>
          <button onclick="removeFromCart(${index})" style="background: none; border: none; font-size: 1.2rem; cursor: pointer; color: #999;">✕</button>
        </div>
      `;
    });
    totalEl.innerText = `$${total.toFixed(2)}`;
    checkoutBtn.disabled = false;
  }
}

window.removeFromCart = function(index) {
  cart.splice(index, 1);
  updateCartUI();
};

document.getElementById('checkout-btn').addEventListener('click', () => {
  cart = [];
  updateCartUI();
  closeCart();
  showToast("Checkout complete! Thank you for testing.");
});

function showToast(msg) {
  toast.innerText = msg;
  toast.classList.add('active');
  clearTimeout(toastTimeout);
  toastTimeout = setTimeout(() => {
    toast.classList.remove('active');
  }, 3000);
}

// --- Search Functionality ---
const searchInput = document.getElementById('search-input-field');
searchInput.addEventListener('keyup', (e) => {
  const term = e.target.value.toLowerCase();
  const products = document.querySelectorAll('.product-card');
  let count = 0;
  
  if (e.key === 'Enter') {
    if (term.trim() === '') return;
    products.forEach(prod => {
      const title = prod.querySelector('.product-title')?.innerText.toLowerCase() || '';
      if (title.includes(term)) {
        prod.style.display = 'block';
        count++;
      } else {
        prod.style.display = 'none';
      }
    });
    
    closeSearch();
    
    if (count > 0) {
      document.getElementById('trending')?.scrollIntoView({behavior: 'smooth'});
      showToast(`Found ${count} products for "${term}".`);
    } else {
      showToast(`No products matched "${term}".`);
      // reset grid if nothing found
      products.forEach(p => p.style.display = 'block');
    }
  }
});

// ESC key to close Modals
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') {
    closeSearch();
    closeCart();
    closeQV();
  }
});

// Update standard addToCart bounds to pass events up properly
document.querySelectorAll('.add-cart-btn').forEach(btn => {
  const oldOnClick = btn.getAttribute('onclick');
  if (oldOnClick) {
    const rawCall = oldOnClick.replace('addToCart(', '').replace(')', '');
    const args = rawCall.split(',').map(s => s.trim().replace(/['"]/g, ''));
    btn.removeAttribute('onclick');
    btn.addEventListener('click', (e) => {
      window.addToCart(args[0], parseFloat(args[1]), args[2], e);
    });
  }
});

});
