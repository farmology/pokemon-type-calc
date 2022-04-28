const searchbutton = document.getElementById('searchbtn');
const poketype = document.getElementById('poketype');
const pokepic = document.getElementById('pokepic');

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
    let pokemon = document.getElementById('pokename').value.toLowerCase();
    let res = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}/`);
    let json = await res.json();
    console.log(json.types);
    poketype.innerText = '';
    if (json.types.length === 1){
        poketype.innerText = json.types[0].type.name;
    } else {
        poketype.innerText = `${json.types[0].type.name} ${json.types[1].type.name}`
    };
    console.log(json.sprites.front_default);
    pokepic.innerHTML = '';
    let img = document.createElement('img');
    img.src = json.sprites.front_default;
    document.getElementById('pokepic').appendChild(img);

    // json.types.forEach(element => {
    //     console.log(element.type.name);
    //     poketype.innerText += element.type.name;
    // });
}