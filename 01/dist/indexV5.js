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


// når data indsættes første gang, skal der tilføjes et dataset-index.
// til dette array skal hentes index-tal fra data-set hver gang der trykkes på et nyt objekt
let indexArray = [];

// arrayets data skal fordeles til nedenstående variabler i rækkefølge via array metode.
// NB DETTE VIRKER IKKE HVIS MAN TRYKKER PÅ FØRST 1 INSTITUTION OG SÅ FORTRYDER,
// OG VÆLGER EN ANDEN. MEN DET BØR MAN HELLER IKKE KUNNE, UDEN AT BEVÆGE SIG TILBAGE IGEN.



let institutionIndex;
let educationIndex;
let schoolClassIndex;
let studentIndex;

let selectedInstitution;
let selectedEducation;
let selectedSchoolClass;
let selectedStudent;

function updateSelectedPath(indexarray){
    institutionIndex = indexarray[0];
    educationIndex = indexarray[1];
    schoolClassIndex = indexarray[2];
    studentIndex = indexarray[3];
}

// KALDER MIN PAGEEDITDATA
let editDataCssSelector = "#edit-data-container";
let editDataContainer = document.querySelector(editDataCssSelector);
let editDataManager = new PageEditData(institutionManager, editDataCssSelector);
editDataManager.writeSelectedInstitutionsToDOM();
// tilføjer dataset.index
let editDataLinksArray;

addDatasetIndex();
// TILFØJER DATASET TIL ALLE LIST-ITEMS SOM EKSISTERER NU I DOM'EN
function addDatasetIndex(){
    editDataLinksArray = document.querySelectorAll(`${editDataCssSelector} li`);
    editDataLinksArray.forEach((link, index) => {
        link.dataset.index = index;
        console.log("har tilføjet dataset.index");
    })
}

addClickEvent();
function addClickEvent(){
    editDataLinksArray = document.querySelectorAll(`${editDataCssSelector} li`);
    editDataLinksArray.forEach((link) => {
        console.log("har tilføjet click event");
        link.addEventListener('click' , (event) => {
            // noget mere
            getCurrentLinkIndex(event);
            updateSelectedPath(indexArray);
            selectedByIndex();
        });
    })
}



function getCurrentLinkIndex(event) {
    console.log("kører getCurrentLinkIndex");
    let linkElement;
    let linkIndex;
    if(event.target == event.currentTarget) {
        linkElement = event.target;
        linkIndex = linkElement.dataset.index;
        console.log(linkIndex);
        indexArray.push(linkIndex);
        return indexArray;
    } 
}

function selectedByIndex(){
    if(indexArray.length > 0) {
        clearDataContainer();
        // det kan godt være jeg skal lave min 2. betingelse om, hvis input bliver en string
        if(institutionIndex != undefined) {
            // console.log("its a hit");
            selectedInstitution = institutionManager.institutions[institutionIndex];
            // HER SKAL MAN SÅ SKRIVE SELECTEDINSTITUTIONS.EDUCATIONS TIL DOM'EN....
            editDataManager.writeSelectedEducationsToDOM(selectedInstitution);
            // console.log(selectedInstitution);
            addDatasetIndex();
            addClickEvent();

            if(educationIndex != undefined) {
                clearDataContainer();
                selectedEducation = selectedInstitution.educations[educationIndex];
                editDataManager.writeSelectedSchoolClassesToDOM(selectedEducation);
                // console.log(selectedEducation);
                addDatasetIndex();
                addClickEvent();

                if(schoolClassIndex != undefined) {
                    clearDataContainer();
                    selectedSchoolClass = selectedEducation.schoolclasses[schoolClassIndex];
                    // console.log(selectedSchoolClass);
                    editDataManager.writeSelectedStudentsToDOM(selectedSchoolClass);
                    addDatasetIndex();
                    addClickEvent();

                    if(studentIndex != undefined) {
                        clearDataContainer();
                        selectedStudent = selectedSchoolClass.students[studentIndex];
                        // console.log(selectedStudent);
                        addDatasetIndex();
                        // addClickEvent();
                    } else {
                        console.log("eleven findes ikke");
                    }
                } else {
                    console.log("klassen findes ikke");
                }
            } else {
                console.log("uddannelsen eksisterer ikke");
            }
        } else {
            console.log("institutionen eksisterer ikke");
        }
    } else {
        console.log("dit indexarray er tomt");
    }
}


// function getSelectedObject() {
//     if(studentIndex == undefined) {
//         // der er ikke valgt en studerende
//         if(schoolClassIndex == undefined) {
//             // der er ikke valgt en klasse
//             if(educationIndex == undefined) {
//                 // der er ikke valgt en uddannelse
//                 if(institutionIndex == undefined) {
//                     // der er ikke vlagt en institution
//                     console.log("der er ikke valgt en institution");
//                 }
//             } 
//         } 
//     } else if (studentIndex == undefined) {
//         // der er ikke valgt en studerende
//         if(schoolClassIndex == undefined) {
//             // der er ikke valgt en klasse
//             if(educationIndex == undefined) {
//                 // der er ikke valgt en uddannelse
//                 if(institutionIndex !== undefined) {
//                     // der er valgt en institution
//                     console.log("der er valgt en institution");
//                     selectedInstitution = institutionManager.institutions[institutionIndex];
//                 }
//             } 
//         }
//     } else if (studentIndex == undefined) {
//         // der er ikke valgt en studerende
//         if(schoolClassIndex == undefined) {
//             // der er ikke valgt en klasse
//             if(educationIndex !== undefined) {
//                 // der er valgt en uddannelse
//                 console.log("der er valgt en uddannelse");
//                 selectedEducation = selectedInstitution.educations[educationIndex];
//                 if(institutionIndex !== undefined ) {
//                     console.log("udskriv breadcrumb institution");
//                     selectedInstitution = institutionManager.institutions[institutionIndex];
//                 }
//             } 
//         }
//     } else if (studentIndex == undefined) {
//         // der er ikke valgt en studerende
//         if(schoolClassIndex !== undefined) {
//             // der er valgt en klasse
//             console.log("der er valgt en klasse");
//             selectedSchoolClass = selectedEducation.schoolclasses[schoolClassIndex];
//             if(educationIndex !== undefined) {
//                 // der er valgt en uddannelse
//                 selectedEducation = selectedInstitution.educations[educationIndex];
//                 console.log("der er valgt en uddannelse");
//                 if(institutionIndex !== undefined ) {
//                     console.log("udskriv breadcrumb institution");
//                     selectedInstitution = institutionManager.institutions[institutionIndex];
//                 }
//             } 
//         }
//     } else if (studentIndex !== undefined) {
//         // der er ikke valgt en studerende
//         console.log("der er valgt en student");
//         selectedStudent = selectedSchoolClass.students[studentIndex];
//         if(schoolClassIndex !== undefined) {
//             // der er valgt en klasse
//             console.log("der er valgt en klasse");
//             selectedSchoolClass = selectedEducation.schoolclasses[schoolClassIndex];
//             if(educationIndex !== undefined) {
//                 // der er valgt en uddannelse
//                 console.log("der er valgt en uddannelse");
//                 selectedEducation = selectedInstitution.educations[educationIndex];
//                 if(institutionIndex !== undefined ) {
//                     console.log("udskriv breadcrumb institution");
//                     selectedInstitution = institutionManager.institutions[institutionIndex];
//                 }
//             } 
//         }
//     }
// }





// clickEvent();
// // removeButtonEvent();
// removeButtonEvent(institutionManager.institutions);
// // removeButtonEvent();

function removeButtonEvent(array){
    console.log("initial" + array.length)
    let buttonElementsArray = document.querySelectorAll("#page-3 .remove-data-button");
    buttonElementsArray.forEach(buttonelement => {
   
        buttonelement.addEventListener('click', () => {
            console.log(buttonelement);
            // let getDatasetIndex = buttonelement.parentNode.dataset.index;
            // console.log(getDatasetIndex);
            console.log("fjern er trykket");
            // // let institution = institutionManager.institutions[getDatasetIndex];
            // // console.log(institution);
            // editDataManager.removeInstitution(getDatasetIndex);

            let parentNode = buttonelement.parentNode;
            let parentNodeIndex = parentNode.dataset.index;
            console.log("parentNodeIndex " + parentNodeIndex);
            console.log("array length " + array.length);
            // // fjerne item med parentNodeIndex;
            if(array.length >= 2) {
                array.splice(parentNodeIndex, 1);
                console.log("array length " + array.length);
                // console.log(array);
                array.forEach(item => {
                    editDataContainer.innerHTML = "";
                    StaticClasses.createEditedData(item, editDataCssSelector);
                    clickEvent();
                    removeButtonEvent(array);
                })
            } else if(array.length == 1){
                console.log("array length " + array.lenght);
                array = [];
                editDataContainer.innerHTML = "";
            } 
        });
    })
}


function clickEvent() {
    // hver gang der klikkes på en ny institution, skal dataset-index hentes.
    let dataLinksArray = document.querySelectorAll(`${editDataCssSelector} li`);
    // console.log(dataLinksArray);

    // jeg skal på en eller anden måde tilføje eventlistener hver gang #data-container" overskrives med nyt indhold. ellers skal jeg oprette dataset alligevel.
    dataLinksArray.forEach((datalink, index) => {
        // tilføjer et index til dataset
        datalink.dataset.index = index;

        datalink.addEventListener('click', (event) => {
            if(event.target == event.currentTarget) {
                event.preventDefault();
                // indexArray.push(datalink.dataset.index);
                indexArray.push(index);
                // og så skal der indsættes indholdet af indexArray i (flyttes til function)
                // console.log(institutionManager.institutions[index]);
                // men hvad gør jeg når den hele tiden skal udbygges?
                console.log(indexArray);
                createIndexVariables(indexArray);
                selectedByIndex();
            }
        });
    });
}


function createIndexVariables(indexArray){
    // indexArrayets data skal fordeles til nedenstående variabler i rækkefølge via array metode.
    institutionIndex = indexArray[0];
    educationIndex = indexArray[1];
    schoolClassIndex = indexArray[2];
    studentIndex = indexArray[3];
}



function clearDataContainer() {
    document.querySelector(editDataCssSelector).innerHTML = "";
}



// function editButtonEvent(selectedobject){
//     // kan man få fat i parent til event?
//     let buttonElement = document.querySelector("#page-3 .edit-data-button");
//     buttonElement.addEventListener('click', () => {
//         let parentElement = buttonElement.parentNode;
//         console.log(parentElement);
//         // her skal jeg så kunne redigere object.name og skrive det nye til DOMen.
//     });
// }


// let selectedStudent = institutionManager.institutions[institutionIndex].educations[educationIndex].schoolclasses[schoolClassIndex].students[studentIndex];













}); // fetch slutter

}); // DOMContentLoaded slutter


