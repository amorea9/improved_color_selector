"use strict";

//global variables here
let userInput;
let rgbToHexValue;
let rgbToHslValue;
let hexToRgbValue;

document.addEventListener("DOMContentLoaded", init);

function init() {
  document.querySelector("#color_selector").addEventListener("input", getUserInput);
}

//MODEL
function getUserInput() {
  //reads the value
  userInput = document.querySelector("#color_selector").value;
  rgbToHexValue = userInput; //input value is in hex
  rgbToHslValue = rgbToHsl(userInput);
  hexToRgbValue = hexToRgb(userInput);
  //call function to display colors in the view
  showSelectedColor();
}

//VIEW

function showSelectedColor() {
  //display the colors
  displayColor(hexToRgbValue);
  displayHex(rgbToHexValue);
  displayHsl(rgbToHslValue);
}

function displayColor(hexToRgbValue) {
  //display the color as background and rgb
  document.querySelector(".color").style.backgroundColor = hexToRgbValue;
  document.querySelector(".rgb").textContent = hexToRgbValue;
}
function displayHex(rgbToHexValue) {
  //hex value but uppercase
  document.querySelector(".hex").textContent = rgbToHexValue.toUpperCase();
}

function displayHsl(rgbToHslValue) {
  //hsl value
  document.querySelector(".hsl").textContent = rgbToHslValue;
}

//CONTROLLER

//conversion to RGB
function hexToRgb(userInput) {
  let r = parseInt(userInput.substring(1, 3), 16);
  let g = parseInt(userInput.substring(3, 5), 16);
  let b = parseInt(userInput.substring(5, 7), 16);
  return `Rgb( ${r}, ${g}, ${b})`;
}

//conversion to hex -- not needed as the input value comes in hex
// function rgbToHex(r, g, b) {
//   r = userInput.substring(1, 3).toString(16);
//   //only two digits of r
//   g = userInput.substring(3, 5).toString(16);

//   b = userInput.substring(5, 7).toString(16);

//   if (r.length <= 1) {
//     r = "0" + r;
//   }

//   if (g.length <= 1) {
//     g = "0" + g;
//   }
//   if (b.length <= 1) {
//     b = "0" + b;
//   }
//   return `#${r}${g}${b}`;
// }

//conversion to HSL
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
