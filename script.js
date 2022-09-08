"use strict";

let userInput;
let rgbToHexValue;
let rgbToHslValue;
let hexToRgbValue;

document.addEventListener("DOMContentLoaded", init);
//global variables here

function init() {
  document.querySelector("#color_selector").addEventListener("input", getUserInput);
}

//MODEL
function getUserInput() {
  userInput = document.querySelector("#color_selector").value;

  rgbToHexValue = rgbToHex(userInput);
  rgbToHslValue = rgbToHsl(userInput);
  hexToRgbValue = hexToRgb(userInput);
  //use event listener to know which color has been selected
  //userColorSelection.addEventListener("input", showSelectedColor);
  showSelectedColor();
}

//VIEW

function showSelectedColor() {
  //possibly a delegator for the following functions to display stuff
  //   console.log("hexTorgbvalue:", hexToRgbValue);

  displayColor(hexToRgbValue);

  displayRgb(hexToRgbValue);
  displayHex(rgbToHexValue);
  displayHsl(rgbToHslValue);
}

function displayColor(hexToRgbValue) {
  //display the color as background
  document.querySelector(".color").style.backgroundColor = hexToRgbValue;
}
function displayHex(rgbToHexValue) {
  //hex
  document.querySelector(".hex").textContent = rgbToHexValue.toUpperCase();
}
function displayRgb(hexToRgbValue) {
  //rgb
  document.querySelector(".rgb").textContent = hexToRgbValue;
}
function displayHsl(rgbToHslValue) {
  //hsl
  document.querySelector(".hsl").textContent = rgbToHslValue;
}

//CONTROLLER
function hexToRgb(userInput) {
  let r = userInput.substring(1, 3);

  r = parseInt(r, 16);

  let g = userInput.substring(3, 5);
  g = parseInt(g, 16);
  let b = userInput.substring(5, 7);
  b = parseInt(b, 16);

  //   //create object from template
  //   let rgb = Object.create(Rgb);
  //   rgb.r = r;
  //   rgb.g = g;
  //   rgb.b = b;

  return `Rgb( ${r}, ${g}, ${b})`;
}
// console.log("hexToRgb:", hexToRgb(userInput));

function rgbToHex(r, g, b) {
  r = userInput.substring(1, 3).toString(16);
  //only two digits of r
  g = userInput.substring(3, 5).toString(16);

  b = userInput.substring(5, 7).toString(16);

  if (r.length <= 1) {
    r = "0" + r;
  }

  if (g.length <= 1) {
    g = "0" + g;
  }
  if (b.length <= 1) {
    b = "0" + b;
  }
  return `#${r}${g}${b}`;
}

// console.log("rgbtoHEx:", rgbToHex(userInput)); it works

function rgbToHsl(r, g, b) {
  r = parseInt(userInput.substring(1, 3), 16) / 255;

  g = parseInt(userInput.substring(3, 5), 16) / 255;
  b = parseInt(userInput.substring(5, 7), 16) / 255;

  let h;
  let s;
  let l;

  const min = Math.min(r, g, b);
  const max = Math.max(r, g, b);

  if (max === min) {
    h = 0;
  } else if (max === r) {
    h = 60 * (0 + (g - b) / (max - min));
  } else if (max === g) {
    h = 60 * (2 + (b - r) / (max - min));
  } else if (max === b) {
    h = 60 * (4 + (r - g) / (max - min));
  }

  if (h < 0) {
    h = h + 360;
  }

  l = (min + max) / 2;

  if (max === 0 || min === 1) {
    s = 0;
  } else {
    s = (max - l) / Math.min(l, 1 - l);
  }
  // multiply s and l by 100 to get the value in percent, rather than [0,1]
  s *= 100;
  l *= 100;

  h = h.toFixed();
  s = s.toFixed();
  l = l.toFixed();

  return `${h}, ${s}%, ${l}%`;
}
//console.log("rgbtoHsl:", rgbToHsl(userInput));working
// function rgbToCSS(r, g, b) {
//   r = parseInt(userInput.substring(userInput.indexOf("(") + 1, userInput.indexOf(",")), 10);

//   g = parseInt(userInput.substring(userInput.indexOf(",") + 1, userInput.lastIndexOf(",")), 10);
//   b = parseInt(userInput.substring(userInput.lastIndexOf(",") + 1, userInput.indexOf(")")), 10);

//   return `rgb(${r}, ${g}, ${b})`;
// }
