// переменные let & const
let name; // объявление переменной
console.log(name); // undefined

name = "Aleksa"; // инициализация переменной
console.log(name); // Aleksa

name = "Aleksandra"; // переприсвоение значения
console.log(name); // Aleksandra

// const lastName; - НЕЛЬЗЯ ОБЪЯВИТЬ БЕЗ ЗНАЧЕНИЯ
const lastName = "Hrevtsova"; // объявляем и инициализируем одновременно
console.log(lastName);

// lastName = "skgkdjfhgkjsdh"; - НЕЛЬЗЯ ПЕРЕНАЗНАЧИТЬ

// ТИПЫ ДАННЫХ

// ПРИМИТИВЫ
// 1 - String ('', "", ``)
let myName = `Aleksandra`;
console.log(myName); // Aleksandra
console.log(typeof myName); // string

let count = "30";
console.log(count);
console.log(typeof count); // string
let bool = "true";
console.log(typeof bool);

// 2 - Number
let age = 30;
console.log(age);
console.log(typeof age); // number

// 3 - Boolean (true, false)
let isOnline = true;
console.log(isOnline); // true
console.log(typeof isOnline); // boolean

isOnline = false;
console.log(isOnline); // false
console.log(typeof isOnline); // boolean

// 4 - Undefined
let products;
console.log(products); // undefined
console.log(typeof products); // undefined

// 5 - Null
let cart = null;
console.log(cart); // null
console.log(typeof cart); // object - специальная ошибка Js

// СЛОЖНЫЕ
// Object
const obj = {};
console.log(obj);

const sasha = {
  // properties - существительные и прилагательные - кто? что? какой/ая/ие?
  name: "Sasha",
  lastName: "Hrevtsova",
  age: 30,
  hairColor: "brown",
  married: false,
  children: true,
  // methods - глаголы - что делать? что сделать?
  toShowName() {
    console.log(this.name);
  },
};
console.log(sasha);
sasha.name = "Aleksandra";
console.log(sasha);

sasha.toShowName();

sasha.height = 172;
console.log(sasha);

// Array
const arr = [];
console.log(arr);

const productslist = [
  "apples",
  { meat: "chicken", eggs: 10, bread: "white" },
  null,
];

console.log(productslist);

console.log(productslist[0]); // apples
console.log(productslist[1]); // {meat: "chicken", eggs: 10, bread: "white"}
console.log(productslist[2]); // null

productslist[0] = "oranges";

console.log(productslist);

// многомерные массивы
const newArr = [
  [1, 2, 3], // index 0
  ["alpha", "beta", "gama"], // index 1
  [undefined, null], // index 2
];
console.log(newArr);

console.log(newArr[0][0]); // 1
console.log(newArr[0][1]); // 2
console.log(newArr[0][2]); // 3

console.log(newArr[1][0]); // alpha
console.log(newArr[1][1]); // beta
console.log(newArr[1][2]); // gama

console.log(newArr[2][0]); // undefined
console.log(newArr[2][1]); // null

// Function
// function expression - функциональное выражение
//                            параметры функции
const funcExpression = function (a, b, c) {
  // объявление функции
  console.log(a + b + c);
  console.log("Hello!");
  console.log("I`m a function Expression!");
};
//           аргументы = значения параметров при вызове
funcExpression(1, 2, 3);

// arrow function
const arrowFunc = (a, b, c) => console.log(a + b - c);
arrowFunc(19, 45, 25);

// function declaration
function funcDeclaration(a, b, c) {
  console.log(a * b * c);
}
funcDeclaration(2, 4, 5);

// операторы сравнения
console.log(5 > 7); // false
console.log(4 > 2); // true
console.log(3 >= 3); // true
console.log(3 >= 4); // false

// равенства
// строгое равенство
console.log(5 === "5"); // false
console.log(true === 1); // false

// не строгое равенство - происходит логическое приведение типов
console.log(5 == "5"); // true
console.log(5 == "4"); // false
console.log(true == 1); // true
console.log(false == 0); // true
console.log(undefined == 0); // false
console.log(undefined == 1); // false
console.log(null == 0); // false

// неравенства
// строгое
console.log(5 !== "5"); // true

// не строгое
console.log(5 != "5"); // false
console.log(5 != "4"); // true

// ! - знак отрицания/переворачивает данные
console.log(!true); // false
console.log(!false); // true

// Преобразование типов
// к строке
let num = 12;
console.log(num);
console.log(typeof num); // number

num = num + "";
console.log(num);
console.log(typeof num); // string

let newNum = true;
console.log(newNum);
console.log(typeof newNum); // boolean

newNum = String(newNum);
console.log(newNum);
console.log(typeof newNum); // string

// к числу
let stringNum = "34";
console.log(stringNum);
console.log(typeof stringNum); // string

stringNum = +stringNum;
console.log(stringNum);
console.log(typeof stringNum); // number

let boolNum = true;
console.log(boolNum);
console.log(typeof boolNum); // boolean

boolNum = Number(boolNum);
console.log(boolNum); // 1
console.log(typeof boolNum); // number

// к булю
let numValue = 1;
console.log(numValue);
console.log(typeof numValue); // number

numValue = Boolean(numValue);
console.log(numValue); // true
console.log(typeof numValue); //boolean

// falsy values in Javascript
console.log(Boolean(0)); // false
console.log(Boolean("")); // false
console.log(Boolean(null)); // false
console.log(Boolean(undefined)); // false
console.log(Boolean(NaN)); // false
console.log(Boolean(false)); // false

//  =====
console.log(Boolean(1)); // true
console.log(Boolean(" ")); // true
console.log(Boolean(" ")); // true
console.log(Boolean(` !`)); // true
console.log(Boolean(Infinity)); // true
console.log(Boolean(true)); // true

// логические операторы

// && - логическое и возвращает последнее
// трушное значение, если они все тру
console.log(1 && true && 100); // 100
//       true && true && true
console.log(1 && true); // true
//       true && true

// возвращает первое ложное значение, если оно есть
console.log(0 && true); // 0
//      false && true
console.log(false && true && true); // false
//          false && true

console.log(1 && 0 && true && false); // 0
//       true && false && true && false
console.log(1 && false && true && 0); // false
//        true && false && true && false

// || - логическое или
// вереет первое попавшееся трушное значение,
// если оно есть конечно же)
console.log(1 || true || 100); // 1
//       true || true || true
console.log(true || 1); // true
//       true || true

console.log(0 || true); // true
//      false || true
console.log(false || true || 1); // true
//          false || true || true

// или последнее ложное значение, если все они ложны
console.log("" || 0 || undefined || false); // false
//       false || false || false || false
console.log(NaN || false || null || 0); // 0
//        false || false || false || false

// ! - логическое не
console.log(!1); // false
console.log(!0); // true
console.log(!""); // true
console.log(!" "); // false
console.log(!NaN); // true
console.log(!undefined); //true
console.log(!null); // true

// двойное отрицание
console.log(!!1); // true
console.log(!!0); // false
console.log(!!""); // false
console.log(!!" "); // true
console.log(!!NaN); // false
console.log(!!undefined); //false
console.log(!!null); // false

// ВЗАИМОДЕЙСТВИЕ с пользователем

// let msg = confirm("Are you ready?");
// console.log(msg); // true - если пользователь нажал кнопку ok
// false - если пользователь нажал кнопку отмена (Cancel)

// let greet = alert("Welcome!");
// console.log(greet); // undefined

// let userData = prompt("Enter your name please");
// console.log(userData); // если пользователь внес какие-то данные в поле ввода под сообщением
// и нажал кнопку ok, то эти данные запишутся в переменную userData,
// если пользователь, нажал кнопку отмена (Cancel), то запишется null

// ВЕТВЛЕНИЯ
if (1 < 0) {
  console.log("Hello World!");
}

//
// let message = "Добро пожаловать!";
// let enteredData = prompt("Введите число от 1 до 5");
// console.log("enteredData: ", enteredData);

// if (enteredData >= 1 && enteredData <= 5) {
//   alert(`Спасибо, вы ввели подходящее число: ${enteredData}`);
// } else {
//   alert(`Вы ввели не подходящее значение: ${enteredData}`);
// }

// ЦИКЛЫ
// i = i + 1 || i += 1 || i++
for (let i = 0; i <= 10; i += 1) {
  console.log(`Итерация №${i + 1} - ${i}`);
}

// example
const results = [1, 11, 23, 45, 32, 78, 988, 45];
console.log(results);
console.log("длина массива", results.length);

for (let i = 0; i < results.length; i += 1) {
  if (results[i] >= 100) {
    console.log("трехзначный элемент ", results[i]);
  } else if (results[i] >= 10 && results[i] < 100) {
    console.log("двузначный элемент", results[i]);
  } else {
    console.log(`это число однозначное`);
  }
}

// DOM - Document Object Model

// доступ к DOM-элементам (тегам)

// получаем доступ к тегу по имени тега
const projectBody = document.querySelector("body");
console.log(projectBody);
console.dir(projectBody);

// получаем доступ как к объекту по значению атрибута class
const headerWrapper = document.querySelector(".header_wrapper");
console.log(headerWrapper);
console.dir(headerWrapper);

console.log(headerWrapper.title);
headerWrapper.title = "Hello!";
console.log(headerWrapper.title);

// const logo = document.querySelector(".logo");
// console.dir(logo);

// получаем доступ через идентификатор
// const logo = document.querySelector('#main-logo');
const logo = document.getElementById("main-logo");
console.log(logo);
console.dir(logo);
console.log(logo.textContent);

logo.textContent = "Photo diary";
logo.style.fontSize = "36px";
// font-size
logo.classList.add("example");

// получаем доступ как к массиву через значение класса
// const logo = document.getElementsByClassName('logo');
// console.dir(logo);
// console.log(logo[0].textContent);

// logo[0].textContent = "Photo diary";
// logo[0].style.fontSize = '36px';
// // font-size
// logo[0].classList.add('example');

// получаем дступ через дата-атрибут
const navMenu = document.querySelector('ul[data-action="action"]');
console.log(navMenu);
console.dir(navMenu);
navMenu.style.background = "black";
navMenu.style.padding = "30px";
