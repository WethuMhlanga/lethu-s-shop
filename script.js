/* Fade-In Effect on Scroll */
document.addEventListener("scroll", function () {
    const sections = document.querySelectorAll(".fade-section");
    sections.forEach((section) => {
      const rect = section.getBoundingClientRect();
      const fadePoint = window.innerHeight * 0.75;
      if (rect.top < fadePoint) {
        const opacity = (fadePoint - rect.top) / fadePoint;
        section.style.opacity = Math.min(opacity, 1);
      }
    });
  });
  
  /* Navbar Background Change on Scroll */
  let lastScrollTop = 0;
  const navbar = document.getElementById("navbar");
  window.addEventListener("scroll", function () {
    let currentScroll = window.scrollY;
    if (currentScroll > lastScrollTop) {
      navbar.classList.add("scrolled");
    } else {
      navbar.classList.remove("scrolled");
    }
    lastScrollTop = currentScroll;
  });
  
  /* Hamburger Menu Toggle */
  document.getElementById("hamburger-toggle").addEventListener("click", function() {
    const menu = document.querySelector(".menu");
    if (menu.style.display === "block") {
      menu.style.display = "none";
    } else {
      menu.style.display = "block";
    }
  });
  