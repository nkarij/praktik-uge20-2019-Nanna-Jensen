// DENNE SKAL STYRE DE CLASSES SOM SKJULER OG VISER HTML-DELENE

class NavManager {
    constructor(cssHide, cssShow) {
        this.name = "";
        this.element = null;
        this.classHide = cssHide;
        this.classShow = cssShow;
    }

    togglePageDisplay(cssSelector) {
        this.element = document.querySelector(cssSelector);
        if(this.element.classList.contains(this.classHide)) {
            console.log("indeholder classHide");
            this.element.classList.remove(this.classHide);
            this.element.classList.add(this.classShow);
        } else {
            console.log("indeholder ikke classHide");
            this.element.classList.remove(this.classShow);
            this.element.classList.add(this.classHide);
        }
    }

    // hidePage() {
    //     this.element = document.querySelector(cssSelector);
    //     this.element.classList.remove(this.classShow);
    //     this.element.classList.add(this.classHide);        
    // }

    // showPage(cssSelector) {
    //     this.element = document.querySelector(cssSelector);
    //     this.element.classList.remove(this.classHide);
    //     this.element.classList.add(this.classShow);
    // }

}

