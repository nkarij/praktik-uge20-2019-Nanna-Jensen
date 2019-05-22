document.addEventListener('DOMContentLoaded', function(){

// VARIABLER TIL NAV MANAGER
let classHidePage = "hide-page-content";
let classShowPage = "show-page-content";

// opret administrator
let institutionManager = new InstitutionAdmin("Admin");
// console.log(institutionManager);
let statsManager = new StatsManager(institutionManager);
let navManager = new NavManager(classHidePage, classShowPage);
let showDataManager = new PageShowData(institutionManager);

// REFERENCER TIL HTML
// let testButtonWriteToDOM = document.querySelector(".test-button2");
// let cssSelector = "#list-container";


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

loadFrontPage();
loadShowDataPage();
loadStatistics();

// WRITE ALL DATA (AUTO);
function loadShowDataPage() {
    showDataManager.writeAllDataToDOM("#page-2 .data-container", "data-list");
}


// write all stats to page
function loadStatistics() {
    statsManager.countAllInstitutions(".institution-stats span");
    statsManager.countAllEducations(".education-stats span");
    statsManager.countAllSchoolClasses(".schoolclass-stats span");
    statsManager.countAllSchoolStudents(".student-stats span"); 
}

function loadFrontPage(){
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


}); // fetch slutter

}); // DOMContentLoaded slutter


