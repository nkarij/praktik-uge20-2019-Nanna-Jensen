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
        // console.log("har tilføjet dataset.index");
    })
}

addClickEvent();
function addClickEvent(){
    editDataLinksArray = document.querySelectorAll(`${editDataCssSelector} li`);
    editDataLinksArray.forEach((link) => {
        // console.log("har tilføjet click event");
        link.addEventListener('click' , (event) => {
            // noget mere
            getCurrentLinkIndex(event);
            updateSelectedPath(indexArray);
            selectedByIndex();
        });
    })
}

function getCurrentLinkIndex(event) {
    // console.log("kører getCurrentLinkIndex");
    let linkElement;
    let linkIndex;
    if(event.target == event.currentTarget) {
        linkElement = event.target;
        linkIndex = linkElement.dataset.index;
        // console.log(linkIndex);
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
            removeButtonEvent(selectedInstitution.educations);
            if(educationIndex != undefined) {
                clearDataContainer();
                selectedEducation = selectedInstitution.educations[educationIndex];
                editDataManager.writeSelectedSchoolClassesToDOM(selectedEducation);
                // console.log(selectedEducation);
                addDatasetIndex();
                addClickEvent();
                removeButtonEvent(selectedEducation.schoolclasses);

                if(schoolClassIndex != undefined) {
                    clearDataContainer();
                    selectedSchoolClass = selectedEducation.schoolclasses[schoolClassIndex];
                    // console.log(selectedSchoolClass);
                    editDataManager.writeSelectedStudentsToDOM(selectedSchoolClass);
                    addDatasetIndex();
                    addClickEvent();
                    removeButtonEvent(selectedSchoolClass.students);

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

// initialiserer removeButtonEventet på institutions
removeButtonEvent(institutionManager.institutions);

// removeButtonEvent, som fjerner punkter på listen
function removeButtonEvent(array){
    // console.log("initial" + array.length)
    let buttonElementsArray = document.querySelectorAll("#page-3 .remove-data-button");
    buttonElementsArray.forEach(buttonelement => {
   
        buttonelement.addEventListener('click', (event) => {

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
                    removeButtonEvent(array);
                })
            } else if(array.length == 1){
                // console.log("array length " + array.lenght);
                array = [];
                editDataContainer.innerHTML = "";
            } 
        });
    })
}



let formTemplate = document.formtemplate;
let clonedForm = formTemplate.cloneNode(true);
// let selectedExistingName = clonedForm.querySelector(".form-template__existing-name").innerHTML;


openFormEvent(institutionManager.institutions);
function openFormEvent(array){
    // kan laves om til if(event.target == event.currentTarget) > parentNode.dataset.index
    // let buttonElement = document.querySelector("#page-3 .edit-data-button");
    let buttonElementArray = getArray("#page-3 .edit-data-button");

    buttonElementArray.forEach(button => {
            button.addEventListener('click', (event) => {
                event.preventDefault();            
            if(event.target == event.currentTarget) {
                let linkElementIndex = getParentNodeIndex(button);
                // console.log(linkElementIndex);
                let selectThisObjectToEdit = array[linkElementIndex];

                updateOpenFormUI(selectThisObjectToEdit);

                submitEditedData(array, selectThisObjectToEdit);
            }
        });
    }) 
}


function submitEditedData(array, selecttoedit) {

    let buttonSubmitEditedData = clonedForm.querySelector(".form-template__submit-form");
    // console.log(buttonSubmitEditedData);

    buttonSubmitEditedData.addEventListener('click', (event) => {
        event.preventDefault();
        let formInput = clonedForm.editname.value;
        // console.log(formInput);
        // ER NÅET HER TIL, SKAL TIL AT OPDATERE UI
        updateSubmitFormUI();
        selecttoedit.name = formInput;
        clearDataContainer();
        array.forEach(item => {
            StaticClasses.createEditedData(item, editDataCssSelector);
        });
    });
}

// skaffer linkElementets dataset.index
function getParentNodeIndex(element) {
    let parentNode = element.parentNode;
    let parentNodeIndex = parentNode.dataset.index;
    return parentNodeIndex;
}


function getArray(cssSelector) {
    let array = document.querySelectorAll(cssSelector);
    return array;
}

function updateOpenFormUI(selectedobject) {
    clonedForm.children[1].innerHTML = selectedobject.name;
    clearDataContainer();
    editDataContainer.appendChild(clonedForm);
}

// function som tømmer min data-container, så der kan indsættes en ny liste
function clearDataContainer() {
    document.querySelector(editDataCssSelector).innerHTML = "";
}


}); // fetch slutter

}); // DOMContentLoaded slutter


