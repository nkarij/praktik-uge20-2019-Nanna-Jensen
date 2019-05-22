class StaticClasses {

    static init() {
        this.class = "";
        this.index = 0;
    }

    // creates HTML
    static createHTML(innerhtml, cssSelector){
        let parentElement = document.querySelector(cssSelector);
        let listElement = document.createElement("ul");
        listElement.classList.add(this.class);
        listElement.innerHTML = "";
        let listItem = document.createElement("li");
        listItem.classList.add(innerhtml.name);
        listItem.innerHTML = innerhtml.name;
        listElement.appendChild(listItem);
        parentElement.appendChild(listElement);
    }

    // creates the HTM for the Edit Page
    static createEditedData(innerhtml, cssSelector){
        let parentElement = document.querySelector(cssSelector);
        // console.log(parentElement);
        if(innerhtml == null) {
            console.log("der er ikke noget data i createEditedData");
            parentElement.innerHTML = "";
        } else {
            // parentElement.innerHTML = "";
            let listElement = document.createElement("ul");
            // listElement.classList.add(this.class);
            // listElement.innerHTML = "";
            let listItem = document.createElement("li");
            listItem.classList.add(innerhtml.name);
            listItem.innerHTML = innerhtml.name;
            let editButton = document.createElement("button");
            editButton.innerHTML = "Rediger";
            editButton.classList.add("edit-data-button");
            let removeButton = document.createElement("button");
            removeButton.innerHTML = "Fjern";
            removeButton.classList.add("remove-data-button");
            listItem.insertAdjacentElement('beforeend', editButton);
            listItem.insertAdjacentElement('beforeend', removeButton);
            listElement.appendChild(listItem);
            parentElement.appendChild(listElement);
        }
    }
}

StaticClasses.init();