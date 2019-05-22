class StaticClasses {
    // creates HTML
    static createHTML(innerhtml, cssSelector){
        let listElement = document.createElement("ul");
        listElement.innerHTML = "";

        let listItem = document.createElement("li");
        listItem.innerHTML = innerhtml.name;
        listElement.appendChild(listItem);
        this.appendHTML(listElement, cssSelector);
    }

    // hjælpefunction til createHTML:
    static appendHTML(listelement, cssSelector) {
        document.querySelector(cssSelector).appendChild(listelement);
    }
}