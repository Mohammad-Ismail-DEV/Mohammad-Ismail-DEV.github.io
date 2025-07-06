window.onload = () => {
  const toggleButton = document.getElementById("theme-toggle");
  const themeIcon = document.getElementById("theme-icon");

  /* To start in dark mode (my preference :P) */
  localStorage.setItem("theme", "dark");

  // Icons URLs
  const sunIcon = "https://img.icons8.com/ios-glyphs/30/000000/sun--v1.png";
  const moonIcon =
    "https://img.icons8.com/ios-glyphs/30/ffffff/moon-symbol.png";
  // Check saved preference in localStorage
  if (localStorage.getItem("theme") === "dark") {
    document.body.classList.add("dark-mode");
    themeIcon.src = moonIcon;
  }

  toggleButton.addEventListener("click", () => {
    const isDark = document.body.classList.toggle("dark-mode");
    if (isDark) {
      themeIcon.src = moonIcon;
      localStorage.setItem("theme", "dark");
    } else {
      themeIcon.src = sunIcon;
      localStorage.setItem("theme", "light");
    }
  });
};
