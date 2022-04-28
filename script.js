const searchbutton = document.getElementById('searchbtn');
const poketype = document.getElementById('poketype');

searchbutton.addEventListener('click', function(event) {
    getFetch();
    event.preventDefault();
});

// function getFetch() {
//     let pokemon = document.getElementById('pokename').value;
//     console.log(pokemon);
//     let url = `https://pokeapi.co/api/v2/pokemon/${pokemon}/`;

//     fetch(url)
//         .then(res => res.json())
//         .then(data => {
//             console.log(data)
//         .catch(err => {
//             console.log('error ${err}')
//         });   
        
//     }

async function getFetch() {
    let pokemon = document.getElementById('pokename').value;
    let res = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}/`);
    let json = await res.json();
    console.log(json.types);
    json.types.forEach(element => {
        console.log(element.type.name);
        poketype.innerText += element.type.name;
    });
}