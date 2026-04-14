document.addEventListener("DOMContentLoaded", () => {
  const navLinks = document.querySelectorAll(".section-nav a[href^='#']");
  const sections = [...navLinks]
    .map(link => document.querySelector(link.getAttribute("href")))
    .filter(Boolean);

  const observer = new IntersectionObserver(
    entries => {
      entries.forEach(entry => {
        const id = entry.target.getAttribute("id");
        const activeLink = document.querySelector(`.section-nav a[href="#${id}"]`);
        if (entry.isIntersecting) {
          navLinks.forEach(link => link.classList.remove("active"));
          if (activeLink) activeLink.classList.add("active");
        }
      });
    },
    {
      rootMargin: "-35% 0px -50% 0px",
      threshold: 0.1
    }
  );

  sections.forEach(section => observer.observe(section));

  const lightbox = document.getElementById("lightbox");
  const lightboxImage = document.getElementById("lightboxImage");
  const lightboxCaption = document.getElementById("lightboxCaption");
  const lightboxClose = document.getElementById("lightboxClose");
  const triggers = document.querySelectorAll(".lightbox-trigger");

  function closeLightbox() {
    lightbox.classList.remove("open");
    lightbox.setAttribute("aria-hidden", "true");
    lightboxImage.src = "";
    lightboxImage.alt = "";
    lightboxCaption.textContent = "";
    document.body.style.overflow = "";
  }

  triggers.forEach(trigger => {
    trigger.addEventListener("click", event => {
      event.preventDefault();
      const href = trigger.getAttribute("href");
      const caption = trigger.dataset.caption || "";
      const img = trigger.querySelector("img");
      const alt = img ? img.alt : caption;

      lightboxImage.src = href;
      lightboxImage.alt = alt;
      lightboxCaption.textContent = caption;
      lightbox.classList.add("open");
      lightbox.setAttribute("aria-hidden", "false");
      document.body.style.overflow = "hidden";
    });
  });

  if (lightboxClose) {
    lightboxClose.addEventListener("click", closeLightbox);
  }

  if (lightbox) {
    lightbox.addEventListener("click", event => {
      if (event.target === lightbox) closeLightbox();
    });
  }

  document.addEventListener("keydown", event => {
    if (event.key === "Escape") closeLightbox();
  });
});