
//window.onload = function() {

    const urlGetCategories = 'https://aa1cliente.azurewebsites.net/Category'
    const urlGetPasswords = "https://aa1cliente.azurewebsites.net/Password/" 
  
    
    //console.log(urlGetPasswords)



function renderCat(){
    fetch(urlGetCategories)
    .then(response => response.json())
    .then(data => {
        showCategories(data)

    })
 
    .catch(err => console.log('Error'))

}

renderCat()

function renderSites(e){

    let tbody=  document.getElementsByTagName('tbody')[1]
     tbody.innerHTML = "";

    let siteCat = e.id
    // Mostrar Passwords
     fetch(`${urlGetPasswords}${siteCat}`)
     .then(response => response.json())
     .then(data => {
         showPasswords(data)

     })

    .catch(err => console.log('Error'))
    


}

function showCategories(data){

    let tbody=  document.getElementsByTagName('tbody')[0]
    
    data.forEach(category => {
        console.log(category.category)

        let tr = document.createElement('tr')
        let categoryTd = document.createElement('td')
        categoryTd.innerHTML = `<button id = ${category.category} onclick="renderSites(this)" type="button" class="categoryBtn btn btn-light">${category.category.replace("++"," ")}</button>` + `<button id = ${category.category} onclick="deleteCategory(this);" class=deleteBtn><i class="fas fa-trash"></i></button>`
        
        //Se podria add una clase para que salga un pointer y se cambie de color cuando pasamos el raton
        categoryTd.setAttribute('id',category.category)
        categoryTd.classList.add('tdclass')

        tr.appendChild(categoryTd)
        tbody.appendChild(tr)

    })

}

function showPasswords(data){

    let tbody=  document.getElementsByTagName('tbody')[1]
    
    data.forEach(password => {

        //console.log(`${password.id} + ${password.category} + ${password.user} ` )

        let tr = document.createElement('tr')
        tr.setAttribute('id', password.category)
        let siteTd = document.createElement('td')
        siteTd.innerText = password.tagName
        let userTd = document.createElement('td')
        userTd.innerText = password.user
        let dateTd = document.createElement('td')
        dateTd.innerText = password.date
        let actionsPassword = document.createElement('td')
        actionsPassword.setAttribute('id', password.category)
        actionsPassword.innerHTML = `<button type="button" onclick="saveIdCheck(this); location.href='addSite.html';" class= accessBtnSite id=${password.id}><i class="far fa-eye"></i></button>
        <button type="button" onclick="saveIdUpdate(this); location.href='addSite.html';"  class= updateBtnSite id=${password.id}><i class="fas fa-wrench"></i></button>
        <button type="button" onclick="deleteSite(this)" class=deleteBtnSite id=${password.id}><i class="fas fa-trash"></i></button>` 

        tr.appendChild(siteTd)
        tr.appendChild(userTd)
        tr.appendChild(dateTd)
        tr.appendChild(actionsPassword)
        tbody.appendChild(tr)

    })

}

// Displaying Add category form

function toggleForm(){
  
  var x = document.getElementById("myForm");
  if (x.style.display === "none") {
    x.style.display = "block";
  } else {
    x.style.display = "none";
  }
}

// Create a new category Post

function getInputCategory(event){
    
    const addCategoriesForm = document.querySelector('.categoryForm')
    const categoryValue = document.getElementById('valueCategory')
    // To reset form
    //const inputs = document.querySelectorAll('input[name="lname"]');


    if (!categoryValue.value.replace(/\s/g, '').length) {
        event.preventDefault()
        alert('Input only contains whitespaces!')
        return false
        
    } else{ addCategoriesForm.addEventListener('submit', (e) => {
        e.preventDefault()

    
        fetch(urlGetCategories,{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
    
            },
            body: JSON.stringify({
                category: categoryValue.value.replace(" ","++")
    
            })
        })
        .then(res => res.json())
        .then(data => 
             {
             const dataArr = []
             dataArr.push(data)
            showCategories(dataArr)
        })
        // Reset fields from form
        //inputs.forEach(input =>  input.value = '12') ///////////////////////////////SIGUE CREANDO UN ESPACIO
     })
    }
}

 
// Delete a category DELETE

function deleteCategory(e){

    //Primero borramos todos los elementos de la tabla categoria y despues cargamos la lista actualizada
    let tbody=  document.getElementsByTagName('tbody')[0]
     tbody.innerHTML = "";

    let deletedCatName = e.id
    
    fetch(`${urlGetCategories}/${deletedCatName}`,{
        method:'DELETE',
        
    })
    .then(data => 
        {
        const dataArr = []
        dataArr.push(data)
        renderCat()
   })
    
}



// Delete site DELETE

function deleteSite(e){
 
    //Primero borramos todos los elementos de la tabla categoria y despues cargamos la lista actualizada
    let tbody=  document.getElementsByTagName('tbody')[1]
    tbody.innerHTML = "";

    //Accedemos a los valos de categoria y al Id de lo que queremos borrar
    let deletedSiteId = e.id
    let deletesiteCat = e.parentElement

    //console.log(deletesiteCat)
    
    fetch(`${urlGetPasswords}${deletedSiteId}`,{
         method:'DELETE',
        
    })
    .then(data => 
        {
        const dataArr = []
        dataArr.push(data)
        renderSites(deletesiteCat)
        
   })
       
}


// Using localStorage to save id and use in other website

function saveIdCheck(e){

    let seeSiteId = e.id

    localStorage.setItem("idSiteCheck", seeSiteId)
    console.log(localStorage.getItem("idSiteCheck"))

}

function saveIdUpdate(e){

    let seeSiteId = e.id

    localStorage.setItem("idSiteUpdate", seeSiteId)
    console.log(localStorage.getItem("idSiteUpdate"))

}
