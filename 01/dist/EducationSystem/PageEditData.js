class PageEditData {
    constructor(institutionmanager, cssSelector) {
        // this.name = "";
        this.institutionManager = institutionmanager;
        this.cssSelector = cssSelector;
        // console.log(this.cssSelector);
    }

 
    // testet
    writeSelectedInstitutionsToDOM() {
        this.institutionManager.institutions.forEach(institutionitem => {
            StaticClasses.createEditedData(institutionitem, this.cssSelector);
        })
    }

    writeSelectedEducationsToDOM(institution) {
        institution.educations.forEach(educationitem => {
            // createHTML modtager object + cssSelector
            StaticClasses.createEditedData(educationitem, this.cssSelector);
        });
    }

    
    writeSelectedSchoolClassesToDOM(education) {
        education.schoolclasses.forEach(schoolclassitem => {
            StaticClasses.createEditedData(schoolclassitem, this.cssSelector);
        });
    }
    
    writeSelectedStudentsToDOM(schoolclass) {
        schoolclass.students.forEach(student => {
            StaticClasses.createEditedData(student, this.cssSelector);
        });
    }

    


}
