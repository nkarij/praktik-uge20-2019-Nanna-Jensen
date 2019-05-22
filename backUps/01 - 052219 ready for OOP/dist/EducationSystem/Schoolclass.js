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

    // denne virkede dengang jeg havde mine objecter...
    // måske kan jeg flytte den til institution manager?
    writeStudentToDom(studentindex, cssSelector){
        if(this.students.length == 0){
            console.log("der er ingen skoleklasser i denne uddannelse");
        } else {
            let listElement = document.createElement("ul");
            listElement.innerHTML = "";
    
            for (let index = 0; index < this.students.length; index++) {
                const student = this.students[index];
                // console.log(schoolclass);
                const studentIndex = this.students.indexOf(student);
                // console.log(schoolclassIndex);
                if(studentIndex == studentindex) {
                        let selectedStudent = this.students[studentIndex];
                        let listItem = document.createElement("li");
                        listItem.innerHTML = selectedStudent.name;
                        listElement.appendChild(listItem);
                } 
            }
            document.querySelector(cssSelector).appendChild(listElement);
        }   
    }

}