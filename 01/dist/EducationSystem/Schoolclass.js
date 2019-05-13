class Schoolclass {
    constructor(name, education) {
        this.name = name;
        this.education = education;
        this.students = [];
    }

    allocateToEducation(neweducation){
        this.education = neweducation;
        neweducation.schoolclasses.push(this);
    }

    addStudent(newstudent){
        let student = newstudent;
        this.students.push(student);
    }

    addStudents(newstudents) {
        let students = newstudents;
        this.students = students.concat(this.students);
    }

    writeSchoolClassToDom(schoolclassindex, cssSelector){
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

}