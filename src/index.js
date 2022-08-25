let addToy = false;

document.addEventListener("DOMContentLoaded", () => {
  const paragraphBtn = document.querySelector("#new-toy-btn");
  const toyFormContainerDiv = document.querySelector(".container");
  paragraphBtn.addEventListener("click", () => {
    // hide & seek with the form
    addToy = !addToy;
    if (addToy) {
      toyFormContainerDiv.style.display = "block";
    } else {
      toyFormContainerDiv.style.display = "none";
    }
  });
});

// Add Toy Info to the Card
function gettingCard (toyData){
  let card = document.createElement('div')
  card.className = `card`
  card.innerHTML = `
  <h2>${toyData.name}</h2>
  <img src="${toyData.image}" class="toy-avatar" />
  <p>${toyData.likes} likes</p>
  <button class="like-btn" id="[toy_id]">Like ❤️</button>
  `
  document.querySelector('#toy-collection').appendChild(card)
}

// fetch / GET
function getAllToys (){
  fetch('http://localhost:3000/toys')
  .then (response => response.json())
  .then (toyData => toyData.forEach(toy => gettingCard(toy)))
}
getAllToys()


// Add a New Toy POST
function addingToyPost (toyObj){
  fetch('http://localhost:3000/toys', {
    method : 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: "application/json"
    },
    body: JSON.stringify(toyObj)
  })
  .then(res => res.json())
}
addingToyPost()

//Increase a Toy's Likes
function likes(event){
  event.preventDefault()
  let more = parseInt(event.target.previousElementSibling.innerText) + 1
  fetch(`http://localhost:3000/toys/${event.target.id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json"
    },
    body: JSON.stringify({
      "likes": more
    })
  })
  .then(res => res.json())
  .then(((event) => {
    event.target.previousElementSibling.innerText = `${more} likes`;
  }))
}
// button of likes
let btn = document.querySelector('.like-btn')
btn.addEventListener('click', event => likes(event))







