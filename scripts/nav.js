function toggleMenu() {
  const menuItems = document.querySelectorAll(".pageLink");
  for (let i = 0; i < menuItems.length; i++) {
    menuItems[i].classList.toggle("hidden");
  }
}

if (window.innerWidth < 575) {
  toggleMenu();
}
