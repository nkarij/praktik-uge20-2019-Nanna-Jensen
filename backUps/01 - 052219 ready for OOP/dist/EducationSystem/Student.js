class Student {
    constructor(name, schoolclass) {
        this.name = name;
        this.schoolclass = schoolclass;
    }

    allocateToSchoolClass(newschoolclass){
        this.schoolclass = newschoolclass;
        newschoolclass.students.push(this);
    }

}

