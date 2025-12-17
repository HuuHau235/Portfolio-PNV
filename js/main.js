document.addEventListener("DOMContentLoaded", () => {

  const themeBtn = document.querySelector(".theme-toggle");
  const savedTheme = localStorage.getItem("theme");

  if (savedTheme) document.body.classList.add(savedTheme);

  themeBtn.onclick = () => {
    document.body.classList.toggle("dark");
    localStorage.setItem(
      "theme",
      document.body.classList.contains("dark") ? "dark" : ""
    );
  };

  const progress = document.querySelector(".scroll-progress");

  window.addEventListener("scroll", () => {
    const scrollTop = window.scrollY;
    const height =
      document.documentElement.scrollHeight - window.innerHeight;
    progress.style.width = `${(scrollTop / height) * 100}%`;
  });

  const backToTop = document.querySelector(".back-to-top");

  window.addEventListener("scroll", () => {
    backToTop.style.display = window.scrollY > 500 ? "block" : "none";
  });

  backToTop.onclick = () =>
    window.scrollTo({ top: 0, behavior: "smooth" });

  const typingEl = document.querySelector(".typing");
  const roles = [
    "React Developer",
    "Laravel Developer",
    "Full-Stack Engineer",
    "AI Enthusiast"
  ];
  let roleIndex = 0;
  let charIndex = 0;
  let deleting = false;

  function typeEffect() {
    const text = roles[roleIndex];
    typingEl.textContent = deleting
      ? text.slice(0, --charIndex)
      : text.slice(0, ++charIndex);

    if (!deleting && charIndex === text.length) {
      setTimeout(() => (deleting = true), 1000);
    }

    if (deleting && charIndex === 0) {
      deleting = false;
      roleIndex = (roleIndex + 1) % roles.length;
    }

    setTimeout(typeEffect, deleting ? 50 : 100);
  }
  typeEffect();

  const revealEls = document.querySelectorAll(
    "section, .project-card, .skill-card"
  );

  const observer = new IntersectionObserver(
    entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add("show");
        }
      });
    },
    { threshold: 0.2 }
  );

  revealEls.forEach(el => observer.observe(el));

  document.querySelectorAll("[data-skill]").forEach(skill => {
    const target = +skill.dataset.skill;
    let count = 0;

    const counter = setInterval(() => {
      skill.textContent = skill.textContent.replace(/\d+%?$/, "") + ` ${count}%`;
      if (count >= target) clearInterval(counter);
      count++;
    }, 20);
  });

  const email = document.querySelector(".contact-info strong");
  email.style.cursor = "pointer";

  email.onclick = () => {
    navigator.clipboard.writeText(email.textContent);
    showToast("📋 Email copied!");
  };

  const toast = document.getElementById("toast");

  function showToast(msg) {
    toast.textContent = msg;
    toast.classList.add("show");
    setTimeout(() => toast.classList.remove("show"), 2000);
  }

  document.addEventListener("keydown", e => {
    if (e.ctrlKey && e.key === "k") {
      alert("🚀 Command Palette\n1. Go Projects\n2. Contact\n3. GitHub");
    }
  });

  let konami = [];
  const code = [
    "ArrowUp","ArrowUp","ArrowDown","ArrowDown",
    "ArrowLeft","ArrowRight","ArrowLeft","ArrowRight","b","a"
  ];

  window.addEventListener("keydown", e => {
    konami.push(e.key);
    konami.splice(-code.length - 1, konami.length - code.length);

    if (code.every((v, i) => v === konami[i])) {
      document.body.style.filter = "hue-rotate(180deg)";
      showToast("🎮 Konami Mode Activated!");
    }
  });
});
