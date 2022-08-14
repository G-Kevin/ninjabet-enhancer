function renameOrbitDomain(orbitLandingDomain) {
    // replace Orbit domain with configured url
    Array.from(document.getElementsByClassName("betfair-bet-url")).forEach(
        function(element) {
            element.setAttribute("href", element.getAttribute("href").replace(/(www\.orbitexch\.com)/g, orbitLandingDomain));
        }
    );
}