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

    // denne skal laves om til 1 skole, eller til et array af skoler?
    // writeSchoolClassToDom(cssSelector){
    //     // jeg vil gerne loope alle educations
    //     // og hvis this.educations.indexOf(education) = arrayindex
    //     // så vil jeg gerne skrive alle uddannelsens schoolclasses til DOM
    //     for (let index = 0; index < this.educations.length; index++) {
    //         const education = this.educations[index];
    //         // console.log(education);
    //         const educationIndex = this.educations.indexOf(education);
    //         // console.log(educationIndex);
    //         if(educationIndex == controlledindex) {
    //             education.schoolclasses.forEach(schoolclass => {
    //                 let listItem = document.createElement("li");
    //                 listItem.innerHTML = schoolclass.name;
    //                 listElement.appendChild(listItem);
    //             })
    //         }
    //     }  
    //     document.querySelector(cssSelector).appendChild(listElement);
    // } 
}
