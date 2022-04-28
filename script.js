const searchbtn = document.getElementById('searchbtn');

searchbtn.addEventListener('click', getFetch);


function getFetch() {
    let pokemon = document.getElementById('pokename').value
    let url = `https://pokeapi.co/api/v2/pokemon/${pokemon}/`

    fetch(url)
    .then(data => {
        console.log(data)
    })
}