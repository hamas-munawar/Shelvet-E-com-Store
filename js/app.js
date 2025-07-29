gsap.registerPlugin(ScrollTrigger);

// gsap.to('#header', {
//     duration : 2,
//     scrollTrigger : {
//         trigger : '#header',
//         start : '250% 10%',
//         scrub : 2,
//         end : ()=> `+=${document.querySelector('html').offsetHeight}`,
//         markers : true,
//         toggleClass : 'header-when-scroll'
//     }
// })

window.addEventListener("scroll", () => {
  if (window.pageYOffset <= 100) {
    document.querySelector("#header").classList.remove("header-when-scroll");
    return;
  } else {
    document.querySelector("#header").classList.add("header-when-scroll");
  }
});

if (window.innerWidth >= 1024) {
  gsap.from("#hero .right", {
    x: "150%",
    duration: 1,
    delay: 0.5,
  });
  gsap.from("#hero .left", {
    x: "-150%",
    duration: 1,
    delay: 0.5,
  });

  gsap.from("#trending-collection", {
    y: "100%",
    opacity: 0,
    duration: 3,
    scrollTrigger: {
      trigger: "#hero",
      start: "bottom 80%",
      end: "center top",
      scrub: 2,
    },
  });
  gsap.from("#trending-collection .trending-collection-cards .card1", {
    x: "-150%",
    duration: 1.5,
    delay: 0.5,
    scrollTrigger: {
      trigger: "#hero",
      start: "bottom 80%",
      end: "center top",
      scrub: 2,
    },
  });
  gsap.from("#trending-collection .trending-collection-cards .card2", {
    y: "100%",
    duration: 1.5,
    delay: 0.5,
    scrollTrigger: {
      trigger: "#hero",
      start: "bottom 80%",
      end: "center top",
      scrub: 2,
    },
  });
  gsap.from("#trending-collection .trending-collection-cards .card3", {
    x: "150%",
    duration: 1.5,
    delay: 0.5,
    scrollTrigger: {
      trigger: "#hero",
      start: "bottom 80%",
      end: "center top",
      scrub: 2,
    },
  });

  gsap.from("#summer-collection", {
    y: "100%",
    opacity: 0,
    duration: 3,
    scrollTrigger: {
      trigger: "#summer-collection",
      start: "top 230%",
      end: "top 170%",
      scrub: 2,
    },
  });
  gsap.from("#summer-collection .right", {
    x: "150%",
    duration: 1.5,
    delay: 0.5,
    scrollTrigger: {
      trigger: "#summer-collection",
      start: "top 200%",
      end: "top 100%",
      scrub: 2,
    },
  });
  gsap.from("#summer-collection .left", {
    x: "-150%",
    duration: 1.5,
    delay: 0.5,
    scrollTrigger: {
      trigger: "#summer-collection",
      start: "top 200%",
      end: "top 100%",
      scrub: 2,
    },
  });

  gsap.from("#winter-collection", {
    y: "100%",
    opacity: 0,
    duration: 3,
    scrollTrigger: {
      trigger: "#winter-collection",
      start: "top 230%",
      end: "top 170%",
      scrub: 2,
    },
  });
  gsap.from("#winter-collection .winter-collection-content .right", {
    x: "150%",
    duration: 1.5,
    delay: 0.5,
    scrollTrigger: {
      trigger: "#winter-collection",
      start: "top 200%",
      end: "top 100%",
      scrub: 2,
    },
  });
  gsap.from("#winter-collection .winter-collection-content .left", {
    x: "-150%",
    duration: 1.5,
    delay: 0.5,
    scrollTrigger: {
      trigger: "#winter-collection",
      start: "top 200%",
      end: "top 100%",
      scrub: 2,
    },
  });

  gsap.from("#what-our-customers-says", {
    y: "100%",
    opacity: 0,
    duration: 3,
    scrollTrigger: {
      trigger: "#what-our-customers-says",
      start: "top 200%",
      end: "top 150%",
      scrub: 2,
    },
  });
}
