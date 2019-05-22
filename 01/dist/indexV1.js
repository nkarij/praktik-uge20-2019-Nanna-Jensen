document.addEventListener('DOMContentLoaded', function(){

// NB DET ER SINDSYGT VIGTIGT AT HOLDE STYR PÅ:
// HVAD DER ER JSONINPUT OG HVAD DER ER CLASS/CONSTRUCTOR

// MAN SKAL FORESTILLE SIG AT LET DATA ALLEREDE ER PARSED FRA FX DATABASE.

let data = {
    "institutions": 
    [
		{
			"name": "Roskilde",
            "educations": 
            [
				{
					"name": "Webudvikler",
                    "schoolclasses": 
                    [
						{
							"name": "WUHF01",
                            "students": 
                            [
								{
									"name": "Ole"
								},
								{
									"name": "Hans"
								}
							]
						}
					]
				}
			]
		},
		{
			"name": "København",
            "educations": 
            [
				{
					"name": "Mediegrafiker",
                    "schoolclasses": 
                    [
						{
							"name": "MEHF01",
                            "students": 
                            [
								{
									"name": "Mickey"
								},
								{
									"name": "Mouse"
								}
							]
						}
					]
				}
			]
		},
	]
}

// opret administrator
let institutionManager = new InstitutionAdmin("Admin");
// første array
let jsonInstitutions = data.institutions;
// console.log(institutions);

// looper institutions og skaber ny constructor for hver institution, sender navnet med
jsonInstitutions.forEach(jsoninstitution => {
    // console.log(institution);
    let name = jsoninstitution.name
    // NB DET ER VIGTIGT AT SENDE BÅDE NAVN OG PARENT MED, FORDI CLASS INSTITUTION
    // MODTAGER 2 PARAMETRE, NAVN OG INSTITUION (SÅ KNYTTES DET HELE SAMMEN)
    let institutionObject = new Institution(name, institutionManager);
    // console.log(institutionObject);
    institutionManager.institutions.push(institutionObject);

    // her looper jeg den individuelle uddannelse
    jsoninstitution.educations.forEach(jsoneducation => {
        // kortere skrevet
        let educationObject = new Education(jsoneducation.name, institutionObject);
        // console.log(educationObject);
        institutionObject.educations.push(educationObject);        

        jsoneducation.schoolclasses.forEach(jsonschoolclass => {
            let name = jsonschoolclass.name;
            // console.log(name);
            let schoolClassObject = new Schoolclass(name, educationObject);
            // console.log(shcoolClassObject);
            educationObject.schoolclasses.push(schoolClassObject);

            jsonschoolclass.students.forEach(jsonschoolclass => {
                let studentObject = new Student(jsonschoolclass.name, schoolClassObject);
                // console.log(studentObject);
                schoolClassObject.students.push(studentObject);
            });
        })
    });

});

// console.log(institutionManager);

// // NU LIGGER ALTING KNYTTET TIL INSTITUTIONMANAGER
// let student1 = institutionManager.institutions[0].educations[0].schoolclasses[0].students[0];
// console.log(student1);


// REFERENCER TIL HTML
let buttonAddInstituion = document.querySelector(".add-institution");
let buttonRemoveInstituion = document.querySelector(".remove-institution");
let buttonAddEducation = document.querySelector(".add-education-to-institution");
let buttonRemoveEducation = document.querySelector(".remove-education-from-institution");
let buttonAddSchoolClass = document.querySelector(".add-schoolclass-to-education");
let buttonRemoveSchoolClass = document.querySelector(".remove-schoolclass-from-education");
let buttonWriteSchoolClassesToDom = document.querySelector(".write-all-schoolclasses-to-dom");

// TROR IKKE RESTEN AT DENNE FIL VIRKER MED DET NYE JSON DATA-STRUKTUR.
// MÅSKE SKULLE JEG LAVE NOGLE GLOBALE INDEXVARIABLER VARIABLER:
// måske skal jeg returnere inde i min class, så der ikke er gentagelser herunder.

let institutionIndex = 1;
let educationIndex = 0;
let schoolClassIndex = 0;

// ADD INSTITUTION
let institutionName1 = "KEA"
buttonAddInstituion.addEventListener('click', function(event){
    event.preventDefault();
    // denser navn og institutionManager med
    institutionObject = new Institution(institutionName1, institutionManager);
    institutionManager.addInstitution(institutionObject);
    console.log("tilføjer ny institution med navn: " + institutionName1);
    // console.log(institutionManager);
    return institutionManager.institutions;
});

// REMOVE INSTITUION 
// let institutionIndex = 1;
buttonRemoveInstituion.addEventListener('click', function(){
    event.preventDefault();
    let removeThisInstitution = institutionManager.institutions[institutionIndex];
    console.log(removeThisInstitution);
    institutionManager.removeInstitution(removeThisInstitution);
    console.log("fjerner institution " + removeThisInstitution.name + " med index: " + institutionIndex);
    // console.log(institutionManager);
    return institutionManager;
});

// ADD EDUCATION TO INSTITUTION
let addEducationName = "Digital Media";
buttonAddEducation.addEventListener('click', function(event){
    event.preventDefault();
    let institution = institutionManager.institutions[institutionIndex];
    // sender navn og institution med (her er det bestemt af hardcoded index)
    let educationObject = new Education(addEducationName, institution);
    // console.log(educationObject);
    institution.addEducation(educationObject);
    // console.log(institutionObject.educations);
    console.log("tilføjer uddannelse " + educationObject.name + " til institution med index " + institutionIndex);
    // console.log(institutionManager);
    return educationObject;
})


// REMOVE EDUCATION FROM INSTITUTION
// let educationIndex = 0;
buttonRemoveEducation.addEventListener('click', function(){
    event.preventDefault();
    // NB find institutionIndex oppe v Remove Institutions
    let institution = institutionManager.institutions[institutionIndex];
    let removeThisEducation = institution.educations[educationIndex];
    // console.log(removeEducation);
    institution.removeEducation(removeThisEducation);
    // console.log(institutionManager);
    console.log("fjerner uddannelse " + removeThisEducation.name +  " med index: " + institutionIndex);
    return institution.educations;
})


// ADD SCHOOL CLASS TO EDUCATION
//  ER NÅET HER TIL, SKAL TIL AT TILFØJE NY KLASSE.
// husk at institution index + educationindex er defineret længere oppe.
let addSchoolClassName = "WUHF1";
buttonAddSchoolClass.addEventListener('click', function(event){
    event.preventDefault();
    // nb, sender altid navnet med i constructoren
    let educationObject = institutionManager.institutions[institutionIndex].educations[educationIndex];
    console.log(educationObject);
    let schoolClassObject = new Schoolclass(addSchoolClassName, educationObject);
    educationObject.addSchoolClass(schoolClassObject);
    console.log("tilføjer klasse " + schoolClassObject.name + " til education med index " + educationIndex);
    // console.log(institutionManager);
    return educationObject.schoolclasses;
})

// REMOVE SCHOOLCLASS FROM EDUCATION
// let schoolClassIndex = 0;
buttonRemoveSchoolClass.addEventListener('click', function(){
    // gentagelse > skal flyttes op, evt sammen med indexet
    let educationObject = institutionManager.institutions[institutionIndex].educations[educationIndex];
    let removeThisSchoolClass = educationObject.schoolclasses[schoolClassIndex];
    educationObject.removeSchoolClass(removeThisSchoolClass);
    console.log("fjerner Skoleklasse " + removeThisSchoolClass.name +  " fra udddannelsen med index: " + institutionIndex);
    // console.log(institutionManager);
    return educationObject.schoolclasses;
});


