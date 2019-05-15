// console.log("Nanna");
class InstitutionAdmin {
    constructor(name) {
        // bruger man navn her? Der er jo kun 1...
        this.name = name;
        this.institutions = [];
        // man skal vel også have en admin, som Institution kan referere til?
    }

    // testet
    addInstitution(newinstitution) {
        let newInstitution = newinstitution;
        this.institutions.push(newInstitution);
        return this.institutions;
    }

    // testet
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

    // NB DENNE FUNCTION ER LIDT SPECIEL, FORDI DEN MODTAGER 2 CSS-SELECTORER.
    // SPØRG ADY HVORDAN MAN DYNAMISK TILFØJER CLASSES
    writeAllDataToDOM(cssSelector1, cssSelector2){
        // sender en class med til createHTML
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
    writeAllInstitutionsToDOM(cssSelector) {
        this.institutions.forEach(institutionitem => {
            StaticClasses.createHTML(institutionitem, cssSelector);
        })
    }

    // testet
    writeAllEducationsToDOM(cssSelector) {
        this.institutions.forEach(institutionitem => {
            // indsæt if-sætning, "hvis .educations er tom..."
            institutionitem.educations.forEach(educationitem => {
                // createHTML modtager object + cssSelector
                StaticClasses.createHTML(educationitem, cssSelector);
            })
        });
    }

    // testet
    writeAllSchoolClassesToDOM(cssSelector) {
        this.institutions.forEach(institutionitem => {
            institutionitem.educations.forEach(educationitem => {
                educationitem.schoolclasses.forEach(schoolclassitem => {
                    StaticClasses.createHTML(schoolclassitem, cssSelector);
                });
            });
        });
    }

    // testet
    writeAllStudentsToDOM(cssSelector) {
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


// testet
// her skal if-sætningerne omfatte .name, så det kan komme fra input hvis jeg får tid.
    writeSelectedSingleInputToDOM(input, cssSelector) {
        this.institutions.forEach(institutionitem => {
            if(institutionitem == input) {
                // kør til DOM
                StaticClasses.createHTML(institutionitem, cssSelector);
                // console.log("matcher institution");
                return;
            } else {
                institutionitem.educations.forEach(educationitem => {
                    if(educationitem == input) {
                        StaticClasses.createHTML(educationitem, cssSelector);
                        // console.log("matcher education");
                        return;
                    } else {
                        educationitem.schoolclasses.forEach(schoolclassitem => {
                            if(schoolclassitem == input){
                                StaticClasses.createHTML(schoolclassitem, cssSelector);
                                // console.log("matcher schoolclass");
                                return;
                            } else {
                                schoolclassitem.students.forEach(studentitem => {
                                    if(studentitem == input) {
                                        // console.log("matcher student");
                                        StaticClasses.createHTML(studentitem, cssSelector);
                                        return;
                                    } 
                                    // else {
                                    //     console.log("input matcher ikke");
                                    // }
                                });
                            }
                        });
                    }
                });
            }
        });
    } // writeSelectedSingleInputToDOM slutter

    // testet på arrays
    writeSelectedArrayToDOM(arrayinput, cssSelector) {
        // loop input
        arrayinput.forEach(arrayitem => {
            this.institutions.forEach(institutionitem => {
                if(arrayitem == institutionitem) {
                    StaticClasses.createHTML(institutionitem, cssSelector);
                    return;
                } else {
                    institutionitem.educations.forEach(educationitem => {
                        if(arrayitem == educationitem) {
                            StaticClasses.createHTML(educationitem, cssSelector);
                            return;                        
                        } else {
                            educationitem.schoolclasses.forEach(schoolclassitem => {
                                if(schoolclassitem == arrayitem) {
                                    StaticClasses.createHTML(arrayitem, cssSelector);
                                } else {
                                    schoolclassitem.students.forEach(studentitem => {
                                        if(studentitem == arrayitem) {
                                            StaticClasses.createHTML(arrayitem, cssSelector);
                                        }
                                    });
                                }
                            })
                        }
                    })
                }
            });
        })
    } // writeSelectedArraysToDOM



};