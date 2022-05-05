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
function createTypeList() {
  let adouble = document.createElement("div");
  adouble.id = "adouble";
  let ahalf = document.createElement("div");
  ahalf.id = "ahalf";
  let anone = document.createElement("div");
  anone.id = "anone";
  let dquadruple = document.createElement("div");
  dquadruple.id = 'dquadruple';
  let ddouble = document.createElement("div");
  ddouble.id = "ddouble";
  let dhalf = document.createElement("div");
  dhalf.id = "dhalf";
  let dquarter = document.createElement("div");
  dquarter.id = "dquarter";
  let dnone = document.createElement("div");
  dnone.id = "dnone";
  attacking.appendChild(adouble);
  attacking.appendChild(ahalf);
  attacking.appendChild(anone);
  defending.appendChild(dquadruple);
  defending.appendChild(ddouble);
  defending.appendChild(dhalf);
  defending.appendChild(dquarter);
  defending.appendChild(dnone);
}

async function getFetch() {
  let pokemon = document.getElementById("pokename").value.toLowerCase();
  let res = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}/`);
  let json = await res.json();
  let typeurl1 = await fetch(json.types[0].type.url);

  let typejson1 = await typeurl1.json();

  poketype.innerText = "";
  if (json.types.length === 1) {
    poketype.innerText = json.types[0].type.name;
    createTypeList();
    let adoublestring = typejson1.damage_relations.double_damage_to
      .map((type) => type.name)
      .join(" ");
    adouble.innerText = `Double Damage to \n ${adoublestring}`;
    let ahalfstring = typejson1.damage_relations.half_damage_to
      .map((type) => type.name)
      .join(" ");
    ahalf.innerText = `Half Damage to \n ${ahalfstring}`;
    let anonestring = typejson1.damage_relations.no_damage_to
      .map((type) => type.name)
      .join(" ");
    anone.innerText = `No Damage to \n ${anonestring}`;
    let ddoublestring = typejson1.damage_relations.double_damage_from
      .map((type) => type.name)
      .join(" ");
    ddouble.innerText = `Double Damage from \n ${ddoublestring}`;
    let dhalfstring = typejson1.damage_relations.half_damage_from
      .map((type) => type.name)
      .join(" ");
    dhalf.innerText = `Half Damage from \n ${dhalfstring}`;
    let dnonestring = typejson1.damage_relations.no_damage_from
      .map((type) => type.name)
      .join(" ");
    dnone.innerText = `No Damage from \n ${dnonestring}`;
  } else {
    let typeurl2 = await fetch(json.types[1].type.url);
    let typejson2 = await typeurl2.json();
    poketype.innerText = `${json.types[0].type.name} & ${json.types[1].type.name}`;
    console.log(typejson1.damage_relations);
    console.log(typejson2.damage_relations);
    attacking.innerText = "";
    defending.innerText = "";
    createTypeList();
    const darray1 = typejson1.damage_relations.double_damage_from.map(
      (type) => type.name
    );
    const darray2 = typejson2.damage_relations.double_damage_from.map(
      (type) => type.name
    );
    const fourxarray = darray1.filter((type) => darray2.includes(type));
    let fourxstring = fourxarray.join(" ");
    dquadruple.innerText = `Quadruple Damage from \n ${fourxstring}`;
    const harray1 = typejson1.damage_relations.half_damage_from.map(
      (type) => type.name
    );
    const harray2 = typejson2.damage_relations.half_damage_from.map(
      (type) => type.name
    );
    const narray1 = typejson1.damage_relations.no_damage_from.map(
      (type) => type.name
    );
    const narray2 = typejson2.damage_relations.no_damage_from.map(
      (type) => type.name
    );
    const quarterxarray = harray1.filter((type) => harray2.includes(type));
    let quarterxstring = quarterxarray.join(" ");
    dquarter.innerText = `Quarter Damage from \n ${quarterxstring}`;
    const halfxarray1 = harray1
      .filter((type) => !harray2.includes(type))
      .concat(harray2.filter((type) => !harray1.includes(type)));
    const doublexarray1 = darray1
      .filter((type) => !darray2.includes(type))
      .concat(darray2.filter((type) => !darray1.includes(type)));
    console.log(halfxarray1);
    console.log(doublexarray1);
    const halfxarray2 = halfxarray1
        .filter((type) => !doublexarray1.includes(type));
    const doublexarray2 = doublexarray1
        .filter((type) => !halfxarray1.includes(type));
    
            
    console.log(halfxarray2);
    let halfxstring = halfxarray2.join(' ');
    dhalf.innerText = `Half Damage from \n ${halfxstring}`;
    let doublexstring = doublexarray2.join(' ');
    ddouble.innerText = `Double Damage from \n ${doublexstring}`;

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
