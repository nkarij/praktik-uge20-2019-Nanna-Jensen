document.addEventListener('DOMContentLoaded', function(){

// opret administrator
let institutionManager = new InstitutionAdmin("Admin");
// console.log(institutionManager);

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

// VARIABLER TIL NAV MANAGER
let classHidePage = "hide-page-content";
let classShowPage = "show-page-content";

// VARIABLER TIL PAGE EDIT DATA
let editDataCssSelector = "#edit-data-container";
let editDataContainer = document.querySelector(editDataCssSelector);

let indexArray = [];

let institutionIndex;
let educationIndex;
let schoolClassIndex;
let studentIndex;

let selectedInstitution;
let selectedEducation;
let selectedSchoolClass;
let selectedStudent;

let editDataLinksArray;

let testButtonWriteToDOM = document.querySelector(".test-button2");
let cssSelector = "#list-container";

// INITIALISE DEPENDENT CONSTRUCTORS
let statsManager = new StatsManager(institutionManager);
let navManager = new NavManager(classHidePage, classShowPage);
let showDataManager = new PageShowData(institutionManager);
let editDataManager = new PageEditData(institutionManager, editDataCssSelector);

// INIT STATSMANAGER FUNCTION

// INIT NAVMANAGER FUNCTIONS

// INIT SHOWDATAMANAGER FUNCTIONS

// INIT EDITDATAMANAGER FUNCTIONS
// init skriv alle institutioner til dom
editDataManager.writeSelectedInstitutionsToDOM();
// init prepare page, som gør siden klar til at blive redigeret.
preparePageEdit(institutionManager.institutions);

// ---------------------- EDIT DATA PAGE ------------------------------ 

// addDatasetIndex();
// TILFØJER DATASET TIL ALLE LIST-ITEMS SOM EKSISTERER NU I DOM'EN
function addDatasetIndex(){
    editDataLinksArray = queryArray(`${editDataCssSelector} li`);
    editDataLinksArray.forEach((link, index) => {
        link.dataset.index = index;
        // console.log("har tilføjet dataset.index");
    })
}

// addClickEvent();
function addClickEvent(){
    editDataLinksArray = queryArray(`${editDataCssSelector} li`);
    editDataLinksArray.forEach((link) => {
        // console.log("har tilføjet click event");
        link.addEventListener('click' , (event) => {
            if(event.target == event.currentTarget){
                // noget mere
                getCurrentLinkIndex(event);
                updateSelectedPath(indexArray);
                selectedByIndex();
            }
        });
    })
}

// tilhører addClickEvent
function getCurrentLinkIndex(event) {
    // console.log("kører getCurrentLinkIndex");
    let linkElement;
    let linkIndex;
    if(event.target == event.currentTarget) {
        linkElement = event.target;
        linkIndex = linkElement.dataset.index;
        // console.log(linkIndex);
        indexArray.push(linkIndex);
        // console.log(indexArray);
        return indexArray;
    } 
}

// tilhører addClickEvent
function updateSelectedPath(indexarray){
    // console.log("kører updateSelectedPath");
    institutionIndex = indexarray[0];
    // console.log("institutionindex =" + institutionIndex);
    educationIndex = indexarray[1];
    schoolClassIndex = indexarray[2];
    studentIndex = indexarray[3];
}

// tilhører addClickEvent
function selectedByIndex(){
    if(indexArray.length > 0) {
        clearDataContainer();
        if(institutionIndex != undefined) {
            // console.log("its a hit");
            selectedInstitution = institutionManager.institutions[institutionIndex];
            // HER SKAL MAN SÅ SKRIVE SELECTEDINSTITUTIONS.EDUCATIONS TIL DOM'EN....
            editDataManager.writeSelectedEducationsToDOM(selectedInstitution);
            // console.log(selectedInstitution);
            // preparePageEdit samler alle understående functions.
            preparePageEdit(selectedInstitution.educations);
            // addDatasetIndex();
            // addClickEvent();
            // removeDataButtonEvent(selectedInstitution.educations);
            // editDataButtonEvent(selectedInstitution.educations);

            if(educationIndex != undefined) {
                clearDataContainer();
                selectedEducation = selectedInstitution.educations[educationIndex];
                editDataManager.writeSelectedSchoolClassesToDOM(selectedEducation);
                // console.log(selectedEducation);
                preparePageEdit(selectedEducation.schoolclasses);

                if(schoolClassIndex != undefined) {
                    clearDataContainer();
                    selectedSchoolClass = selectedEducation.schoolclasses[schoolClassIndex];
                    // console.log(selectedSchoolClass);
                    editDataManager.writeSelectedStudentsToDOM(selectedSchoolClass);
                    preparePageEdit(selectedSchoolClass.students);

                    if(studentIndex != undefined) {
                        clearDataContainer();
                        selectedStudent = selectedSchoolClass.students[studentIndex];
                        // console.log(selectedStudent);
                        addDatasetIndex();
                        // addClickEvent();
                        // editDataButtonEvent(selectedStudent.student);
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


function preparePageEdit(array) {
    // NB KØRER DISSE 4 FUNCTIONER SAMLET, FLERE GANGE, SKAL LÆGGES IND I FUNCTION
    console.log(array);
    addDatasetIndex();
    addClickEvent();
    removeDataButtonEvent(array);
    editDataButtonEvent(array);
}

// tilhører selectByIndex
// removeDataButtonEvent, som fjerner punkter på listen
function removeDataButtonEvent(array){
    // console.log("initial" + array.length)
    let buttonElementsArray = document.querySelectorAll("#page-3 .remove-data-button");
    // console.log(buttonElementsArray);
    buttonElementsArray.forEach(buttonelement => {
   
        buttonelement.addEventListener('click', (event) => {
            event.preventDefault();
            if(event.target == event.currentTarget){                
                let linkIndex = getParentNodeIndex(buttonelement);
                // console.log(linkIndex);
                // // fjerne item med linkIndex;
                if(array.length >= 2) {
                    array.splice(linkIndex, 1);
                    // console.log("array length " + array.length);
                    // console.log(array);
                    array.forEach(item => {
                        editDataContainer.innerHTML = "";
                        StaticClasses.createEditedData(item, editDataCssSelector);
                        addClickEvent();
                        removeDataButtonEvent(array);
                    })
                } else if(array.length == 1){
                    // console.log("array length " + array.lenght);
                    array = [];
                    editDataContainer.innerHTML = "";
                }
            } 
        });
    })
}

let formTemplate = document.formtemplate;
let clonedForm = formTemplate.cloneNode(true);
// let selectedExistingName = clonedForm.querySelector(".form-template__existing-name").innerHTML;

// tilhører selectByIndex
function editDataButtonEvent(array){

    let buttonElementArray = document.querySelectorAll("#page-3 .edit-data-button");
    console.log(buttonElementArray);

    buttonElementArray.forEach(button => {
            button.addEventListener('click', (event) => {
                event.preventDefault();            
                if(event.target == event.currentTarget) {
                    console.log("currentTarget = edit-data-button");
                    let linkElementIndex = getParentNodeIndex(button);
                    console.log(linkElementIndex);
                    let selectThisObjectToEdit = array[linkElementIndex];

                    updateFormUI(selectThisObjectToEdit);
                    console.log(array);
                    updatePageUI(array, selectThisObjectToEdit);
                }
        });
    }) 
}


// tilhører remove & edit button-events
// skaffer et parent-elements dataset.index
function getParentNodeIndex(element) {
    let parentNode = element.parentNode;
    let parentNodeIndex = parentNode.dataset.index;
    return parentNodeIndex;
}

// hjælpefunction, i bund og grund en queryselectAll
// kan evt komme i staticclasses.
function queryArray(cssSelector) {
    let array = document.querySelectorAll(cssSelector);
    return array;
}

// ---------------------- EDIT DATA PAGE - UPDATE UI ------------------------------ 



function updateFormUI(selectedobject) {
    clonedForm.children[1].innerHTML = selectedobject.name;
    clearDataContainer();
    editDataContainer.appendChild(clonedForm);
}

function updatePageUI(array, selecttoedit) {
    console.log(array);
    let buttonSubmitEditedData = clonedForm.querySelector(".form-template__submit-form");
    // console.log(buttonSubmitEditedData);

    buttonSubmitEditedData.addEventListener('click', (event) => {
        event.preventDefault();
        let formInput = clonedForm.editname.value;
        selecttoedit.name = formInput;
        clearDataContainer();
        console.log(array);
        array.forEach(item => {
            StaticClasses.createEditedData(item, editDataCssSelector);
        });
        preparePageEdit(array);
    });
}



// function som tømmer min data-container, så der kan indsættes en ny liste
function clearDataContainer() {
    document.querySelector(editDataCssSelector).innerHTML = "";
}


}); // fetch slutter

}); // DOMContentLoaded slutter


