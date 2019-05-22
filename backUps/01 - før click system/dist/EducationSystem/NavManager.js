// DENNE SKAL STYRE DE CLASSES SOM SKJULER OG VISER HTML-DELENE

class NavManager {
    // KAN KLASSERNE STÅ ET BEDRE STED?
    constructor(cssHide, cssShow) {
        // JEG BRUGER IKKE NOGET NAVN HER, SKAL DER ALLIGEVEL VÆRE ET?
        this.name = "";
        // BURDE JEG BRUGE LET PAGES I STEDET? 
        this.pages = [];
        this.classHide = cssHide;
        this.classShow = cssShow;
    }

    hidePages(cssSelector) {
        this.pages = document.querySelectorAll(cssSelector);
        this.pages.forEach(page => {
            page.dataset.state = "off";
            page.classList.add(this.classHide);
        });
    }

    // JEG FORSTÅR IKKE HELT HVORNÅR JEG SKAL BRUGE THIS.PROPERTIES ELLER LET??
    // HER BRUGER JEG LET, DET VILLE JEG NOK OGSÅ GØRE OVENFOR..
    showCurrentPage(cssSelector) {
        let currenttarget = document.querySelector(cssSelector);
        currenttarget.classList.remove(this.classHide);
        currenttarget.classList.add(this.classShow);
    }
}

