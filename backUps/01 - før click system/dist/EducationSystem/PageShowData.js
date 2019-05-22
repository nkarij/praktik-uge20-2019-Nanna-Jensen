class PageShowData {
    constructor(institutionmanager) {
        // jeg bruger ikke navnet, skal jeg så 
        this.name = "";
        this.institutionManager = institutionmanager;
        this.institutions = institutionmanager.institutions;
    }

    // NB DENNE FUNCTION ER LIDT SPECIEL, FORDI DEN MODTAGER 2 CSS-SELECTORs.
    // SPØRG ADY HVORDAN MAN DYNAMISK TILFØJER CLASSES I OOP
    writeAllDataToDOM(cssSelector1, cssSelector2){
        // sender en ekstra class med til createHTML
        StaticClasses.class = cssSelector2;
        this.institutions.forEach(institutionitem => {
            // skriv institutions til DOM
            StaticClasses.createHTML(institutionitem, cssSelector1);
            // loop educations
            institutionitem.educations.forEach(educationitem => {
                // createHTML modtager object + cssSelector
                // her sender jeg object + cssSelector med, som burde være institutionitem.name
                StaticClasses.createHTML(educationitem, "." + institutionitem.name);
                // loop schoolclasses
                educationitem.schoolclasses.forEach(schoolclassitem => {
                    StaticClasses.createHTML(schoolclassitem, "." + educationitem.name);
                    // loop students
                    schoolclassitem.students.forEach(student => {
                        StaticClasses.createHTML(student, "." + schoolclassitem.name);
                    })
                });
            })
        });
    }
    
    // testet
    writeAllInstitutionsToDOM(cssSelector, addClass) {
        // document.querySelector(cssSelector).innerHTML = "";
        StaticClasses.class = addClass;
        this.institutions.forEach(institutionitem => {
            StaticClasses.createHTML(institutionitem, cssSelector);
        })
    }

    // testet
    writeAllEducationsToDOM(cssSelector, addClass) {
        StaticClasses.class = addClass;
        document.querySelector(cssSelector).innerHTML = "";
        this.institutions.forEach(institutionitem => {
            // indsæt if-sætning, "hvis .educations er tom..."
            institutionitem.educations.forEach(educationitem => {
                // createHTML modtager object + cssSelector
                StaticClasses.createHTML(educationitem, cssSelector);
            })
        });
    }

    // testet
    writeAllSchoolClassesToDOM(cssSelector, addClass) {
        StaticClasses.class = addClass;
        document.querySelector(cssSelector).innerHTML = "";
        this.institutions.forEach(institutionitem => {
            institutionitem.educations.forEach(educationitem => {
                educationitem.schoolclasses.forEach(schoolclassitem => {
                    StaticClasses.createHTML(schoolclassitem, cssSelector);
                });
            });
        });
    }

    // testet
    writeAllStudentsToDOM(cssSelector, addClass) {
        StaticClasses.class = addClass;
        document.querySelector(cssSelector).innerHTML = "";
        this.institutions.forEach(institutionitem => {
            institutionitem.educations.forEach(educationitem => {
                educationitem.schoolclasses.forEach(schoolclassitem => {
                    schoolclassitem.students.forEach(student => {
                        StaticClasses.createHTML(student, cssSelector);
                    })
                });
            });
        });
    }


}