const sections = document.querySelectorAll("section");
    const options = {
      threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.style.opacity = 1;
          entry.target.style.transform = "translateY(0)";
        }
      });
    }, options);

    sections.forEach(section => {
      section.style.opacity = 0;
      section.style.transform = "translateY(40px)";
      section.style.transition = "all 1s ease";
      observer.observe(section);
    });