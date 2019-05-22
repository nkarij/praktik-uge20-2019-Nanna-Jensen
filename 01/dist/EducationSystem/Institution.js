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



}