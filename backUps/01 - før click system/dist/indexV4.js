document.addEventListener('DOMContentLoaded', function(){

// opret administrator
let institutionManager = new InstitutionAdmin("Admin");
// console.log(institutionManager);
let statsManager = new StatsManager(institutionManager);
let classHidePage = "hide-page-content";
let classShowPage = "show-page-content"
let navManager = new NavManager(classHidePage, classShowPage);
let showDataManager = new PageShowData(institutionManager);

// REFERENCER TIL HTML
let testButtonWriteToDOM = document.querySelector(".test-button2");
let cssSelector = "#list-container";


// HENTER DATA
fetch("data/data.json")
// mellem-then() skal altid skrives på denne/samme måde
.then((response)=>{
    // console.log(response);
    return response.json();
})
.then((systemdata)=>{

let data = systemdata;
// console.log(data);

// første array
let jsonInstitutions = data.institutions;
// console.log(jsonInstitutions);

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

// MÅSKE SKULLE JEG LAVE NOGLE GLOBALE INDEXVARIABLER VARIABLER:
// måske skal jeg returnere inde i min class, så der ikke er gentagelser herunder.

let institutionIndex = 1;
let educationIndex = 0;
let schoolClassIndex = 0;

let institution = institutionManager.institutions[institutionIndex];
let education = institution.educations[educationIndex];
let schoolClass = education.schoolclasses[schoolClassIndex];

// NB TJEK ALLE METODE-TESTS I INDEXV2.JS - DE ER SLETTET HER FOR OVERSKUELIGHED.

pageLoadFrontPage();
pageLoadAllData();
pageLoadAllStats();

// WRITE ALL DATA (AUTO);
function pageLoadAllData() {
    showDataManager.writeAllDataToDOM("#page-2 .data-container", "data-list");
    showDataManager.writeAllInstitutionsToDOM("#page-3 .data-container", "ul");
}


// write all stats to page
function pageLoadAllStats() {
    statsManager.countAllInstitutions(".institution-stats span");
    statsManager.countAllEducations(".education-stats span");
    statsManager.countAllSchoolClasses(".schoolclass-stats span");
    statsManager.countAllSchoolStudents(".student-stats span"); 
}

function pageLoadFrontPage(){
    navManager.hidePages(".page");
    navManager.showCurrentPage("#page-1")
}


//  SHOW AND HIDE PAGES ON CLICK
let menuTabsArray = document.querySelectorAll(".menu-list__link");
// console.log(menuTabsArray);

menuTabsArray.forEach(menutab => {
    menutab.addEventListener('click', function(event) {
        event.preventDefault();
        let currentMenuTab = event.target;
        if(currentMenuTab.dataset.state == "off"){
            navManager.hidePages(".page");
            currentMenuTab.dataset.state == "on";
            let href = currentMenuTab.href;
            // NB dette virker kun hvis der er under 10 sider....
            // ville være bedre at bruge dataset, men der står at vi skal bruge links..
            let cssSelector = "#" + href.substring(href.length - 6);
            navManager.showCurrentPage(cssSelector);
        } 
    });
});

// EDIT DATA PAGE:
// 1) EN MENU SOM VISER ALLE SUB-MENUER. 
let editMenuTabArray = document.querySelectorAll("#page-3 .edit-menu__tab");
// omdøb til cssSelector
let editDataDisplayElement = "#page-3 .data-container";
console.log(editDataDisplayElement);

let testVariable = institutionManager.institutions[0].educations[0];
let selectedInstitution;
let selectedEducation;
let selectedSchoolclass;
let selectedStudent;
let schoolClassManager = new Schoolclass("Navn", selectedEducation);

testButtonWriteToDOM.addEventListener('click', function(){
    testVariable.writeSchoolClassToDom(0, editDataDisplayElement);
})
















// MENU TAB BAR:

// editMenuTabArray.forEach(menutab => {
//     menutab.addEventListener('click', function(event) {
//         event.preventDefault();
//         let currentDataPool = event.currentTarget.dataset.datapool;
//         if(currentDataPool == "0") {
//             // console.log(currentDataPool)
//             showDataManager.writeAllInstitutionsToDOM(editDataDisplayElement, "ul");
//         }
//         if(currentDataPool == "1") {
//             showDataManager.writeAllEducationsToDOM(editDataDisplayElement, "ul");
//         }
//         if(currentDataPool == "2") {
//             showDataManager.writeAllSchoolClassesToDOM(editDataDisplayElement, "ul");
//         }
//         if(currentDataPool == "3") {
//             showDataManager.writeAllStudentsToDOM(editDataDisplayElement, "ul");
//         }
//     });
// });

// CLICK ON DATA TO END UP WITH STUDENT;
// ADD SCHOOL CLASS TO EDUCATION
//  ER NÅET HER TIL, SKAL TIL AT TILFØJE NY KLASSE.
// husk at institution index + educationindex er defineret længere oppe.

let inputFromDom = "Roskilde";
let instutionsDataArray = document.querySelectorAll("#page-3 .data-container li");
// console.log(instutionsDataArray);















}); // fetch slutter

}); // DOMContentLoaded slutter


