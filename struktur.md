
<!-- opgaver -->
<!-- udskriv alle educations -->
<!-- udskriv alle students til DOM, vha createElement -->
<!-- lav en function/method som fjerner 1 student -->
<!-- lav en function/method som retter 1 education -->
<!-- første education, udskriv alle schoolclasses -->

Institution.js
this.name
this.educations = [];
<!-- metoder -->
addEducation();
removeEducation();
writeListOfEducationsToDOM();
writeAllStudentsToDOM();
removeEducationFromArray();

    Education.js
    this.name
    this.institution = institution
    this.schoolclasses = [];
<!-- metoder -->
    addInstitution(newinstitution);
    addSchoolClass(newschoolclass);

        Schoolclass.js
        this.name
        this.institution = null;
        this.education = null;
        this.students = [];
<!-- metoder -->
        allocateToEducation(neweducation);
        addStudent(newstudent);
        addStudents(newstudents);

            Student.js
            this.name
            allocateToSchoolClass()
