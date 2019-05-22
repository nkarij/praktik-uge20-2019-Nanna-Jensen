class StaticClasses {

    constructor() {
        this.class = "";
        this.index = 0;
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

    createID(){
        this.index +=1;
        console.log(this.index);
        return this.index;
    }

}