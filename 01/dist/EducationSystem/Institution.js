class Institution {
    constructor(name, institutionadmin) {
        this.name = name;
        this.institutionAdmin = institutionadmin;
        this.educations = [];
    }

    allocateToInstitutionAdmin(admin){
        this.institutionAdmin = admin;
    }

    addEducation(neweducation) {
        let newEducation = neweducation;
        neweducation.institution = this;
        this.educations.push(newEducation);
    }

    removeEducation(education) {
        // tag fat i educationarray
        // loop educationarray
        // fjern den education som matcher parameteret
        // console.log(this.educations.length);
        this.educations.forEach(educationobject => {
            if(educationobject == education) {
                this.educations.splice(this.educations.indexOf(educationobject), 1);
                // Find the index position of edu.name, then remove one element from that position
            } else {
                // hvordan kan jeg få console til at skrive kun 1 gang
                console.log("uddannelsen findes ikke");
                return;
            }
        })
        // console.log(this.educations.length);
    }

    writeEducationToDOM(education, cssSelector) {
        this.educations.forEach(item => {
            if(item == education || item.name == education.name) {
                console.log("match");
                StaticClasses.createHTML(education,cssSelector);
            }
        });
    }
    
    writeAllSchoolClassesToDom(cssSelector){
        if(this.educations.length == 0){
            console.log("der er ingen skoleklasser i denne uddannelse");
        } else {
            let listElement = document.createElement("ul");
            listElement.innerHTML = "";
            // jeg vil gerne loope alle educations
            // og hvis this.educations.indexOf(education) = arrayindex
            // så vil jeg gerne skrive alle uddannelsens schoolclasses til DOM
            for (let index = 0; index < this.educations.length; index++) {
                const education = this.educations[index];
                // console.log(education);
                const educationIndex = this.educations.indexOf(education);
                // console.log(educationIndex);
                if(educationIndex == controlledindex) {
                    education.schoolclasses.forEach(schoolclass => {
                        let listItem = document.createElement("li");
                        listItem.innerHTML = schoolclass.name;
                        listElement.appendChild(listItem);
                    })
                }
            }  
            
            document.querySelector(cssSelector).appendChild(listElement);
        }   
    }

    writeAllStudentsToDOM(cssSelector) {
        // console.log(this.educations);
        
        let listElement = document.createElement("ul");
        listElement.innerHTML = "";
        
        this.educations.forEach(education => {
            // console.log(education);
            // skaffer mig den enkelte uddannelses array af schoolclasses
            let schoolClassArray = education.schoolclasses;
            // console.log(schoolClassArray);
            // looper hver skoleklasse:
            schoolClassArray.forEach(schoolclass => {
                // skaffer mig hver enkelt schoolclass' array af students
                let studentsArray = schoolclass.students;
                console.log(studentsArray);
                // looper students og udskriver hvert enkelt student (navn)
                studentsArray.forEach(student => {
                    let listItem = document.createElement("li");
                    listItem.innerHTML = student.name;
                    listElement.appendChild(listItem);
                })
            });
        })
        document.querySelector(cssSelector).appendChild(listElement);
    } // writetodom end

}

