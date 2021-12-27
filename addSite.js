
const urlGetCategories = 'https://aa1cliente.azurewebsites.net/Category'
const urlGetPasswords = "https://aa1cliente.azurewebsites.net/Password" 


//Activando Get categories
renderCat() 


function renderCat(){
    fetch(urlGetCategories)
    .then(response => response.json())
    .then(data => {
        showCategories(data)

    })
 
    .catch(err => console.log('Error'))
}

function showCategories(data){
    
    let optionsCategories=  document.getElementById('inputCategorySite')
    
    data.forEach(category => {
        //console.log(category.category)

        let categoryOption = document.createElement('option')

        categoryOption.innerText =  category.category.replace("++"," ")

        optionsCategories.add(categoryOption)   
    })

}

//Random 8 characters string, numeros incluidos
function passwordGenerator(){ 

    let pwdChars = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz!@$";
    let pwdLen = 14;
    let newPassword = Array(pwdLen).fill(pwdChars).map(function(x) { return x[Math.floor(Math.random() * x.length)] }).join('');

    let passwordGenerated =  document.getElementById('passwordSite')
    passwordGenerated.value = newPassword
}


//Function that create a random numeric Id
function randomId(){
    let newId = Math.floor(100000000 + Math.random() * 900000000);
    return newId
    
}

//Function that assigns the current date to Date
function newDate(){
    var newdate= new Date().toLocaleDateString("en-GB");
    return newdate

}


function addSite(){

    let addSiteForm = document.querySelector('.formNewSite')

    let userSiteValue = document.getElementById('userSite')
    let inputCategorySiteValue = document.getElementById('inputCategorySite')
    let urlSiteValue = document.getElementById('urlSite')
    let tagSiteValue = document.getElementById('tagSite')
    let passwordSiteValue = document.getElementById('passwordSite')
    let descriptionSiteValue = document.getElementById('descriptionSite')

    addSiteForm.addEventListener('submit', (e) => {  
        e.preventDefault()
    
        fetch(urlGetPasswords,{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
    
            },
            body: JSON.stringify({

                id: randomId(),
                category: inputCategorySiteValue.value.replace(" ","++"),
                user: userSiteValue.value,
                date: newDate(),
                url: urlSiteValue.value,
                tagName: tagSiteValue.value,
                pass: passwordSiteValue.value,
                description: descriptionSiteValue.value,
                
            })
        })
        .then(res => res.json())
        // Reset fields form form
        .then(document.forms['addSiteForm'].reset())
        .then(changeButton())
     })

    formMessage()
    //changeButton()
}

function renderSite(){
    let localStorageId = localStorage.getItem("idSiteCheck")

    fetch(`${urlGetPasswords}/${localStorageId}/Password`)
     .then(response => response.json())
     .then(data => {
         getSiteId(data)
         

     })

    .catch(err => console.log('Error'))
    
}
/// Ver site

//getSiteId()
if(localStorage.getItem("idSiteCheck") != null){
    renderSite()
}

function getSiteId(data){

    let dataUser = data.user
    let dataSite = data.tagName
    let dataUrl = data.url
    let dataPass = data.pass
    let dataDescription = data.description
    
    if(localStorage.getItem("idSiteCheck") != null){

    console.log(localStorage.getItem("idSiteCheck"))

    let formRemade = document.getElementById('addSiteForm')
    formRemade.innerHTML = ""

    formRemade.innerHTML = `<ul class="list-group"><li class="list-group-item">User: ${dataUser}</li><li class="list-group-item">Site: ${dataSite}</li><li class="list-group-item">URL: ${dataUrl}</li><li class="list-group-item">Password: ${dataPass}</li><li class="list-group-item">Description: ${dataDescription}</li></ul>
    <div class="form-group row">
    <div class="col-sm-10">
    <a href="index.html" class="saveSiteBtn btn btn-dark">Go back</a>
    </div>`

    localStorage.clear()
    }

}

if(localStorage.getItem("idSiteUpdate") != null){
    
    let buttonUpdate = document.getElementById("savePass")
    buttonUpdate.innerTextr = ""
    buttonUpdate.innerText = "Update"
    buttonUpdate.onclick = updateSite()
}

function updateSite(){
    

    let localStorageId = localStorage.getItem("idSiteUpdate")
    //console.log(localStorageId)

    let addSiteForm = document.querySelector('.formNewSite')
    let userSiteValue = document.getElementById('userSite')
    let inputCategorySiteValue = document.getElementById('inputCategorySite')
    let urlSiteValue = document.getElementById('urlSite')
    let tagSiteValue = document.getElementById('tagSite')
    let passwordSiteValue = document.getElementById('passwordSite')
    let descriptionSiteValue = document.getElementById('descriptionSite')

    addSiteForm.addEventListener('submit', (e) => {  
        e.preventDefault()
    
        fetch(urlGetPasswords,{
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
    
            },
            body: JSON.stringify({

                id: localStorageId,
                category: inputCategorySiteValue.value.replace(" ","++"),
                user: userSiteValue.value,
                date: newDate(),
                url: urlSiteValue.value,
                tagName: tagSiteValue.value,
                pass: passwordSiteValue.value,
                description: descriptionSiteValue.value,
                
            })
        })
        .then(res => res.json())
        // Reset fields form form
        .then(document.forms['addSiteForm'].reset())
        .then(formMessage())
        .then(changeButton())
       
     })

    localStorage.clear()

}

// Form validation + html require

function formMessage(){
    let message = document.getElementById('success')
    message.style.display = 'block'

    setTimeout(() => {
        success.style.display = 'none';
    }, 3000)
}

function changeButton(){
    let button = document.getElementById('savePass')
    button.innerHTML = 'Go back'
    button.setAttribute('onClick', "location.href='index.html'")
    button.setAttribute('type', 'button')

}