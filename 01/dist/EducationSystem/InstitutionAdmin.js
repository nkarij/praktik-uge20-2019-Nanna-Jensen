class InstitutionAdmin {
    constructor(name) {
        // bruger man navn her? Der er jo kun 1...
        this.name = name;
        this.institutions = [];
        // man skal vel også have en admin, som Institution kan referere til?
    }

    addInstitution(newinstitution) {
        let newInstitution = newinstitution;
        this.institutions.push(newInstitution);
        return this.institutions;
    }

    removeInstitution(institutionobject) {
        // loop array
        // hvis institutions-objekt = array[index]:
        // splice(indexOf(array[index]), 1)
        this.institutions.forEach(inst => {
            if(inst == institutionobject || inst.name == institutionobject.name) {
                this.institutions.splice(this.institutions.indexOf(inst), 1);
                // skulle jeg egentlig ikke returnere de andre remove-methods?
                return this.institutions;
            }
        })
    }

    writeAllEducationsToDOM(cssSelector) {
        
        let listElement = document.createElement("ul");
        listElement.innerHTML = "";

        this.educations.forEach(education => {
            let listItem = document.createElement("li");
            listItem.innerHTML = education.name;
            listElement.appendChild(listItem);
        })
        document.querySelector(cssSelector).appendChild(listElement);
    }


    // HJÆLPE FUNCTIONER

    // creates HTML
    createHTML(innerhtml, cssSelector){
        let listElement = document.createElement("ul");
        listElement.innerHTML = "";

        let listItem = document.createElement("li");
        listItem.innerHTML = innerhtml;
        listElement.appendChild(listItem);
        appendHTML(listElement, cssSelector);
    }

    // hjælpefunction til createHTML:
    appendHTML(listelement) {
        document.querySelector(cssSelector).appendChild(listelement);
    }







}