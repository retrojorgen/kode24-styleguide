// Sets top navigation and header cloak to sticky when user scrolls
if (window.location.pathname !== "/") {
  var headerNavigation = document.getElementById("top-navigation");
  var headerCloack = document.getElementById("header-cloak");
  window.onscroll = function() {
    if (window.pageYOffset > 0) {
      headerNavigation.classList.add("sticky");
      headerCloack.classList.add("sticky");
    } else {
      headerNavigation.classList.remove("sticky");
      headerCloack.classList.remove("sticky");
    }
  };
}
