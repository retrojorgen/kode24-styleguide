function adCounterToTopNav (numberOfAds) {
    $("#nav-top ul li:first-child a").append(`<span class="nav-badge">${numberOfAds}</span>`)
}