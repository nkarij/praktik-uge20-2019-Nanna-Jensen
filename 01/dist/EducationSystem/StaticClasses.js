class StaticClasses {

    constructor() {
        this.class = "";
    }

    // creates HTML
    static createHTML(innerhtml, cssSelector){
        let listElement = document.createElement("ul");
        listElement.classList.add(this.class);
        listElement.innerHTML = "";
        let listItem = document.createElement("li");
        listItem.classList.add(innerhtml.name);
        listItem.innerHTML = innerhtml.name;
        listElement.appendChild(listItem);
        // this.appendHTML(listElement, cssSelector);
        document.querySelector(cssSelector).appendChild(listElement);
    }

    // hjælpefunction til createHTML:
    // static appendHTML(listelement, cssSelector) {
    //     document.querySelector(cssSelector).appendChild(listelement);
    // }
}