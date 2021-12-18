const mnToggler = $(".mobile-nav-toggler");
const navBar = $(".nav-bar");

mnToggler.on("click", function () { 
    navBar.toggleClass("show");
});