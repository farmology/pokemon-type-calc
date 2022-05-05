const searchbutton = document.getElementById("searchbtn");
const poketype = document.getElementById("poketype");
const pokepic = document.getElementById("pokepic");
const attacking = document.getElementById("attacking");
const defending = document.getElementById("defending");

searchbutton.addEventListener("click", function (event) {
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
async function createTypeList() {
  let double = document.createElement("div");
  double.id = "double";
  let half = document.createElement("div");
  half.id = "half";
  let none = document.createElement("div");
  none.id = "none";
  attacking.appendChild(double);
  attacking.appendChild(half);
  attacking.appendChild(none);
}

async function getFetch() {
  let pokemon = document.getElementById("pokename").value.toLowerCase();
  let res = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}/`);
  let json = await res.json();
  let typeurl = await fetch(json.types[0].type.url);
  let typejson = await typeurl.json();
  console.log(typejson.damage_relations);
  console.log(json.types);

  poketype.innerText = "";
  if (json.types.length === 1) {
    poketype.innerText = json.types[0].type.name;
    createTypeList();
    let doublestring = typejson.damage_relations.double_damage_to
      .map((type) => type.name)
      .join(" ");
    double.innerText = `Double Damage \n ${doublestring}`;
    let halfstring = typejson.damage_relations.half_damage_to
      .map((type) => type.name)
      .join(" ");
    half.innerText = `Half Damage \n ${halfstring}`;

  } else {
    poketype.innerText = `${json.types[0].type.name} & ${json.types[1].type.name}`;
    let typeurl = await fetch(json.types[0].type.url);
    let typejson = await typeurl.json();
    console.log(typejson.damage_relations);
  }

  console.log(json.sprites.front_default);
  pokepic.innerHTML = "";
  let img = document.createElement("img");
  img.src = json.sprites.front_default;
  document.getElementById("pokepic").appendChild(img);
}

// json.types.forEach(element => {
//     console.log(element.type.name);
//     poketype.innerText += element.type.name;
// });
