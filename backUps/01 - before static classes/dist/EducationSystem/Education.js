class Education {
    constructor(name, institution) {
        this.name = name;
        this.institution = institution;
        this.schoolclasses = [];
    }

    allocateToInstitution(newinstitution){
        this.institution = newinstitution;
        newinstitution.educations.push(this);
        return this.institution;
    }

    addSchoolClass(newschoolclass) {
        let schoolClass = newschoolclass;
        this.schoolclasses.push(schoolClass);
        newschoolclass.education = this;
        return this.schoolclasses;
    }

    removeSchoolClass(schoolclass) {
        this.schoolclasses.forEach(schoolc => {
            if(schoolc == schoolclass) {
                this.schoolclasses.splice(this.schoolclasses.indexOf(schoolc), 1);
                return this.schoolclasses;
            } else {
                console.log("skoleklassen findes ikke");
                return;
            }
        })
    }

    // HJÆLPEFUNCTIONER:

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