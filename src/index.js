let addToy = false;

document.addEventListener("DOMContentLoaded", () => {
  const addBtn = document.querySelector("#new-toy-btn");
  const toyForm = document.querySelector(".container");
  addBtn.addEventListener("click", () => {
    // hide & seek with the form
    addToy = !addToy;
    if (addToy) {
      toyForm.style.display = "block";
      addToyFromForm();
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
    div.className = 'card'
    div.id = `toy-card-${toy.id}`
    div['data-id'] = toy.id
    div['data-likes'] = toy.likes
    let h2 = document.createElement('h2')
    h2.innerText = toy.name
    let img = document.createElement('img')
    img.src = toy.image
    img.className ='toy-avatar'
    let p = document.createElement('p')
    p.className = 'likes-p'
    if(!toy.likes){
      toy.likes = 0;
    }
    p.innerText = `${toy.likes} Likes`
    let button = document.createElement('button')
    button.className = 'like-btn'
    button.innerText = 'Like <3'
    div.appendChild(h2)
    div.appendChild(img)
    div.appendChild(p)
    div.appendChild(button)
    document.getElementById('toy-collection').appendChild(div)
    addLikeBtnEventListener(button);
  }

  function addToyFromForm(){
    let form = document.getElementsByClassName('add-toy-form')[0]
    let submit = form.getElementsByClassName('submit')[0]
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
            Accept: "application/json"
        },
        body: JSON.stringify(formData)
      };

      fetch('http://localhost:3000/toys', configObj)
      .then(function(response){
        return response.json();
      })
      .then(function(object){
        toyData = object
        makeToyCard(object);
      })
      event.preventDefault();
    })
  }

  function updateLikes(id, likes){
    let div = document.getElementById(`toy-card-${id}`)
    let p = div.getElementsByClassName('likes-p')[0]
    p.innerText = `${likes} Likes`
  }

  const likeBtns = document.getElementsByClassName('like-btn')
  function addLikeBtnEventListener(btn){
    btn.addEventListener('click', function(){
      const id = parseInt(btn.parentElement['data-id'], 10);
      let likes = parseInt(btn.parentElement['data-likes'], 10)
      if(!likes){
        likes = 0
      }
      likes++;
      let configObj = {
        method: "PATCH",
        headers:
        {
          "Content-Type": "application/json",
          Accept: "application/json"
        },
        body: JSON.stringify({
          "likes": likes
        })
      };
      fetch(`http://localhost:3000/toys/${id}`, configObj)
        .then(function(response) {
          return response.json();
        })
        .then(function(object) {
          updateLikes(object.id, object.likes)
        });
    })
  }

});
