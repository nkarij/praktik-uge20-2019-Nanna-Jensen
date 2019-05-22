class StatsManager {
    constructor(institutionmanager) {
        this.institutionManager = institutionmanager;
        // man kunne evt lave this.educations, this.educations heroppe osv.
        // det ville gøre det meget nemmere.
    }

    // tæller alle institutionerne
    countAllInstitutions(cssSelectorInstitutionCount) {
        let institutions = this.institutionManager.institutions;
        let sum = institutions.length;
        // er det bedre bare at hente resultatet fra index? Eller lave en statisk klasse?
        this.attachToHTML(sum, cssSelectorInstitutionCount);
        return sum;
    }

    countAllEducations(cssSelectorEducationCount) {
        let institutions = this.institutionManager.institutions;
        let sum = 0;
        institutions.forEach(institutionitem => {
            sum += institutionitem.educations.length;
        })
        // console.log(sum);
        this.attachToHTML(sum, cssSelectorEducationCount);
        return sum;
    }

    countAllSchoolClasses(cssSelectorSchoolClassCount) {
        let institutions = this.institutionManager.institutions;
        let sum = 0;
        institutions.forEach(institutionitem => {
            institutionitem.educations.forEach(educationitem => {
                sum += educationitem.schoolclasses.length;
            })
        })
        // console.log(sum);
        this.attachToHTML(sum, cssSelectorSchoolClassCount);
        return sum;
    }

    countAllSchoolStudents(cssSelectorStudentsCount) {
        let institutions = this.institutionManager.institutions;
        let sum = 0;
        institutions.forEach(institutionitem => {
            institutionitem.educations.forEach(educationitem => {
                educationitem.schoolclasses.forEach(schoolclassitem => {
                    sum += schoolclassitem.students.length;
                })
            })
        })
        // console.log(sum);
        this.attachToHTML(sum, cssSelectorStudentsCount);
        return sum;
    }

    attachToHTML(sum, cssSelector) {
        let outPutlement = document.querySelector(cssSelector);
        // console.log(outPutlement);
        outPutlement.innerHTML = sum;
    }

}