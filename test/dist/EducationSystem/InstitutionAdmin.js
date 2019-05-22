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

    // testet, denne virker kun hvis data er oprettet som constructor
    // brug istedet metoden i pageEditData...
    removeInstitution(institutionobject) {
        // loop array
        // hvis institutions-objekt = array[index]:
        // splice(indexOf(array[index]), 1)
        this.institutions.forEach(inst => {
            if(inst == institutionobject || inst.name == institutionobject.name) {
                this.institutions.splice(this.institutions.indexOf(inst), 1);
                // skulle jeg egentlig ikke returnere de andre remove-methods?
                StaticClasses.createEditedData(this.institutions, "#edit-data-container")
                return this.institutions;
            }
        })
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