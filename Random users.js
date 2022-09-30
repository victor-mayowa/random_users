//SELECTORS
const addUser = document.querySelector(".add-user");
const double = document.querySelector(".double");
const showMill = document.querySelector(".show-millionaires");
const sort = document.querySelector(".sort");
const main = document.querySelector(".main");
const calWealth = document.querySelector(".calculate-wealth");

//ARRAY THAT STORES THE USERS OBJECT
let data = [];

addUser.addEventListener("click", getRandomUser);

//FUNCTION THAT GETS RANDOM USERS FROM AN API
async function getRandomUser() {
  const res = await fetch("https://randomuser.me/api/");
  const data = await res.json();
  const user = data.results[0];

  const users = {
    name: `${user.name.first} ${user.name.last}`,
    money: Math.floor(Math.random() * 1000000),
  };

  pushData(users);
}

//FUNCTION THAT PUSHES THE USERS OBJECTS INTO THE DATA ARRAY CREATED ABOVE
function pushData(obj) {
  data.push(obj);

  updateDOM();
}
//SHOWS THE UI( UPDATE THE DOM)
//default parameter//-- not necessary though
function updateDOM(providedData = data) {
  main.innerHTML = "<h2><strong>Person</strong> Wealth</h2>";

  providedData.forEach((data) => {
    const div = document.createElement("div");
    div.classList.add("person");
    div.innerHTML = `<strong> ${data.name}</strong> ${formatMoney(data.money)}`;
    main.appendChild(div);
  });
}

//FUNCTION THAT FORMATS THE NUMBERS TO MONEY
function formatMoney(number) {
  return "$" + number.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, "$&,");
}

//DOUBLE MONEY
double.addEventListener("click", doubleMoney);

function doubleMoney() {
  data = data.map((user) => {
    const me =  { ...user, money: user.money * 2 }
    console.log(me)
    return me
  });

  updateDOM();
}

//SHOW ONLY MILLIONAIRES
showMill.addEventListener("click", showMillionaires);

function showMillionaires() {
  //   data = data.filter(user=>
  //       user.money > 1000000
  //   )
  data = data.filter(function (user) {
    if (user.money > 1000000) {
      return true;
    }
  });

  updateDOM();
}

//   SORT BY RICHES
sort.addEventListener("click", sortByRichest);

function sortByRichest() {
  data.sort((a, b) => b.money - a.money);

  updateDOM();
}

//   CALCULATE WEALTH
calWealth.addEventListener("click", calculateWealth);

function calculateWealth() {
  const wealth = data.reduce((acc, user) => (acc += user.money), 0);

  const wealthEl = document.createElement("div");
  wealthEl.innerHTML = `<h3>Total wealth: <strong>${formatMoney(
    wealth
  )}<strong></h3>`;
  main.appendChild(wealthEl);
}

// function victor(a, b = 2) {
//   return a * b;
// }
// console.log(victor(2));

// function test(num= 1){
//   console.log(typeof num)
// }
// test()
// const newArray = [1, 2, 3, 4];
// const oldArray = [4, 6, 7, 8, 9];
// const array = [...newArray, newArray[2] * 4, ...oldArray, oldArray[1] * 2];
// console.log(array);
// // console.log(...array)

// const obj = [
//   {
//     name: "victor",
//     age: 21,
//     id: 1,
//   },

//   {
//     name: "mayowa",
//     age: 22,
//     id: 1,
//   },
// ];

// console.log(obj[Object.keys(obj)[0]]);
// console.log(obj[Object.keys(obj)[0]].name);

// const newObj = obj.map((data) => {
//   return { ...data, age: data.age * 2 };
// });
// console.log(newObj);

// window.onload = function(){
//   function shoutOut(name = "you"){
//     console.log("shoutOut to "+ name );
//   }
//   // shoutOut("Victor")
//   shoutOut()
// }