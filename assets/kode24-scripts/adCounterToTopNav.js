function adCounterToTopNav (numberOfAds) {
    console.log('adding counter');
    $("#nav-top ul li:first-child a").append(`<span class="nav-badge">${numberOfAds}</span>`)
}