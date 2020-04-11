let addToy = false;

document.addEventListener("DOMContentLoaded", () => {
  const addBtn = document.querySelector("#new-toy-btn");
  const toyForm = document.querySelector(".container");
  addBtn.addEventListener("click", () => {
    // hide & seek with the form
    addToy = !addToy;
    if (addToy) {
      toyForm.style.display = "block";
    } else {
      toyForm.style.display = "none";
    }
  });
  
  fetch('http://localhost:3000/toys')
  .then(function(response){
    return response.json();
  })
  .then(function(json){
    for(const toy of json){
      makeToyCard(toy)
    }
  })
  
  function makeToyCard(toy){
    let div = document.createElement('div')
    div.className = 'card';
    div['data-id'] = toy.id
    div['data-likes'] = toy.likes
    let h2 = document.createElement('h2')
    h2.innerText = toy.name 
    let img = document.createElement('img')
    img.src = toy.image
    img.className ='toy-avatar'
    let p = document.createElement('p')
    p.innerText = `${toy.likes} Likes`
    let button = document.createElement('button')
    button.className = 'like-btn'
    div.appendChild(h2)
    div.appendChild(img)
    div.appendChild(p)
    div.appendChild(button)
  }
  
  let addNewToyButton = document.getElementById('new-toy-btn')
  addNewToyButton.addEventListener('click', function(){
    let form = document.getElementById('add-toy-form')
    let sumbit = form.getElementsByClassName('submit')[0]
    submit.addEventListener('click', function(event){
      const inputs = form.getElementsByClassName('input-text')
      let formData = {
        name: inputs[0].value,
        image: inputs[1].value
      };
      
      let configObj = {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json"
        },
        body: JSON.stringify(formData)
      };
      
      fetch('http://localhost:3000/toys', configObj)
      .then(function(response){
        return response.json();
      })
      .then(function(object){
        makeToyCard(object);
      })
      event.preventDefault();
    })  
  })
  
  const likeBtns = document.getElementsByClassName('like-btn')
  function addLikeBtnEventListener(btn){
    btn.addEventListener('click', function(){
      const id = parseInt(btn.parentElement['data-id'], 10);
      const likes = parseInt(btn.parentElement['data-likes'], 10)
      
      let formData = {
        id: id,
        likes: likes
      };
      
      let configObj = {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json"
        },
        body: JSON.stringify(formData)
      };
      fetch(`http://localhost:3000/toys/${id}`)
    })    
  }
  
});
