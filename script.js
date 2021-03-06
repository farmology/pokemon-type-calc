const searchbutton = document.getElementById("searchbtn");
const poketype = document.getElementById("poketype");
const pokepic = document.getElementById("pokepic");
const attacking = document.getElementById("attacking");

const type1 = document.getElementById('type1');
const type2 = document.getElementById('type2');
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
  let adouble2 = document.createElement("div");
  adouble2.id = "adouble2";
  let ahalf2 = document.createElement("div");
  ahalf2.id = "ahalf2";
  let anone2 = document.createElement("div");
  anone2.id = "anone2";
  let dquadruple = document.createElement("div");
  dquadruple.id = "dquadruple";
  let ddouble = document.createElement("div");
  ddouble.id = "ddouble";
  let dhalf = document.createElement("div");
  dhalf.id = "dhalf";
  let dquarter = document.createElement("div");
  dquarter.id = "dquarter";
  let dnone = document.createElement("div");
  dnone.id = "dnone";
  type1.appendChild(adouble);
  type1.appendChild(ahalf);
  type1.appendChild(anone);
  type2.appendChild(adouble2);
  type2.appendChild(ahalf2);
  type2.appendChild(anone2);
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
    type1.innerText = `Attacking with ${json.types[0].type.name}`;
    type2.innerText = '';
    defending.innerText = 'Defending';
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
    if (anonestring != '') {
      anone.innerText = `No Damage to \n ${anonestring}`;
    };
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
    if (dnonestring != '') {
    dnone.innerText = `Immune to \n ${dnonestring}`;
  };
  } else {
    let typeurl2 = await fetch(json.types[1].type.url);
    let typejson2 = await typeurl2.json();
    poketype.innerText = `${json.types[0].type.name} & ${json.types[1].type.name}`;
    console.log(typejson1.damage_relations);
    console.log(typejson2.damage_relations);
    type1.innerText = `Attacking with ${json.types[0].type.name}`;
    type2.innerText = `Attacking with ${json.types[1].type.name}`;
    defending.innerText = 'Defending';
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
    if (anonestring != '') {
    anone.innerText = `No Damage to \n ${anonestring}`;
    };
    let adoublestring2 = typejson2.damage_relations.double_damage_to
      .map((type) => type.name)
      .join(" ");
    adouble2.innerText = `Double Damage to \n ${adoublestring2}`;
    let ahalfstring2 = typejson2.damage_relations.half_damage_to
      .map((type) => type.name)
      .join(" ");
    ahalf2.innerText = `Half Damage to \n ${ahalfstring2}`;
    let anonestring2 = typejson2.damage_relations.no_damage_to
      .map((type) => type.name)
      .join(" ");
    if (anonestring2 != '') {
    anone2.innerText = `No Damage to \n ${anonestring2}`;
    };
    const darray1 = typejson1.damage_relations.double_damage_from.map(
      (type) => type.name
    );
    const darray2 = typejson2.damage_relations.double_damage_from.map(
      (type) => type.name
    );
    const fourxarray = darray1.filter((type) => darray2.includes(type));
    let fourxstring = fourxarray.join(" ");
    if (fourxstring != "") {
      dquadruple.innerText = `Quadruple Damage from \n ${fourxstring}`;
    }

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
    if (quarterxstring != "") {
      dquarter.innerText = `Quarter Damage from \n ${quarterxstring}`;
    }

    const halfxarray1 = harray1
      .filter((type) => !harray2.includes(type))
      .concat(harray2.filter((type) => !harray1.includes(type)));
    const doublexarray1 = darray1
      .filter((type) => !darray2.includes(type))
      .concat(darray2.filter((type) => !darray1.includes(type)));
    console.log(halfxarray1);
    console.log(doublexarray1);
    const halfxarray2 = halfxarray1.filter(
      (type) => !doublexarray1.includes(type)
    );
    const doublexarray2 = doublexarray1.filter(
      (type) => !halfxarray1.includes(type)
    );

    console.log(halfxarray2);
    let halfxstring = halfxarray2.join(" ");
    if (halfxstring != "") {
      dhalf.innerText = `Half Damage from \n ${halfxstring}`;
    }

    let doublexstring = doublexarray2.join(" ");
    if (doublexstring != "") {
      ddouble.innerText = `Double Damage from \n ${doublexstring}`;
    }

    const zeroarray = narray1.concat(narray2);
    let zerostring = zeroarray.join(" ");
    if (zerostring != "") {
      dnone.innerText = `Immune to \n ${zerostring}`;
    }
  }

  console.log(json.sprites.front_default);
  pokepic.innerHTML = "";
  let img = document.createElement("img");
  img.src = json.sprites.front_default;
  document.getElementById("pokepic").appendChild(img);
}
