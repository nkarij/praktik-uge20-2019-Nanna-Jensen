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

    writeSchoolClassToDom(schoolclassindex, cssSelector){
        if(this.schoolclasses.length == 0){
            console.log("der er ingen skoleklasser i denne uddannelse");
        } else {
            let listElement = document.createElement("ul");
            listElement.innerHTML = "";
    
            for (let index = 0; index < this.schoolclasses.length; index++) {

                const schoolclass = this.schoolclasses[index];
                // console.log(schoolclass);
                const schoolclassIndex = this.schoolclasses.indexOf(schoolclass);
                // console.log(schoolclassIndex);
                if(schoolclassIndex == schoolclassindex) {
                        let selectedSchoolClass = this.schoolclasses[schoolclassIndex];
                        console.log(selectedSchoolClass);
                        let listItem = document.createElement("li");
                        listItem.innerHTML = selectedSchoolClass.name;
                        listElement.appendChild(listItem);
                } 
            }
            document.querySelector(cssSelector).appendChild(listElement);
        }   
    }

    // // her henter jeg index fra 
    // getClassIndexByReference(schoolclass){
    //     let schoolClassIndex = this.schoolclasses.indexOf(schoolclass);
    //     console.log(schoolclass);
    // }
 
}
