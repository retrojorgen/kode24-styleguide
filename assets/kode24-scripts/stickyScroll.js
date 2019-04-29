// Sets top navigation and header cloak to sticky when user scrolls
if (window.location.pathname !== "/") {
  var headerNavigation = document.getElementById("top-navigation");
  var headerCloack = document.getElementById("header-cloak");
  var alwaysSticky = false;

  if (!document.querySelector("article header .full-bleed")) {
    console.log("sticky");
    headerNavigation.classList.add("sticky");
    headerCloack.classList.add("sticky");
    alwaysSticky = true;
  }

  window.onscroll = function() {
    if (window.pageYOffset > 0) {
      headerNavigation.classList.add("sticky");
      headerCloack.classList.add("sticky");
    } else if (alwaysSticky) {
      headerNavigation.classList.remove("sticky");
      headerCloack.classList.remove("sticky");
    }
  };
}
