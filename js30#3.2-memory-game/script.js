const fieldCell = document.querySelectorAll('.field__cell');
const cellPicture = document.querySelectorAll('.hidden-picture');
const timer = document.querySelector('.timer');
const timerSeconds = document.querySelector('.timer__seconds');
const timerMinutes = document.querySelector('.timer__minutes');
const gameMenu = document.querySelector('.game-menu');
const gameWindow = document.querySelector('.game-window');
const startButton = document.querySelector('.game-menu__start-button');
const resultButton = document.querySelector('.game-menu__top-results');
const resultWindow = document.querySelector('.top-results');
const resultList = document.querySelector('.result-list');
const noResultsNotification = document.querySelector('.no-results-window');
const backFromResultsButton = document.querySelector('.top__results-back');
const backFromGameFieldButton = document.querySelector('.game-window__back');


// toggle hide class

const hideToggle = (parent) => {
  parent.classList.toggle('hide');
  gameMenu.classList.toggle('hide');
};

// game menu implement 

startButton.addEventListener('click', () => {
  hideToggle(gameWindow);
});

resultButton.addEventListener('click', () => {
  hideToggle(resultWindow);
});

// result window implement 

const setStorageToResultWindow = () => {
  for (let i = 1; i <= localStorage.length; i++) {
    const element = document.createElement('li');
    const number = document.createElement('span');
    const time = document.createElement('span');
    number.innerHTML = `${i}.`;
    time.innerHTML = `${localStorage[i]}`;
    element.classList.add("result-item");
    time.classList.add("result-time");
    element.appendChild(number);
    element.appendChild(time);
    resultList.appendChild(element);
  }
};

setStorageToResultWindow();

if (localStorage.length === 0) {
  noResultsNotification.classList.toggle('hide')
}

//// game field implement

const pictures = ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10'];
const cellsIndex = [...fieldCell].map((_, i) => i);

let pictureCheck = [];
let maxSizeOfClickedPictures = false;


// add card flip animation and event listener on click for it

fieldCell.forEach(x => {
  x.classList.add('hui')
  x.addEventListener('click', () => {
    if (maxSizeOfClickedPictures === false) {
      x.classList.add('cardRotate');
    }
    if (activeInterval === false) {
      runTimer();
    }
  });
});


//randomize pictures and cells order

const randomize = arr => {
  for (let i = arr.length - 1; i > 0; i--) {
    const randInd = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[randInd]] = [arr[randInd], arr[i]];
  }
  return arr;
};

// pictures set into cells

const setPictureIntoCells = () => {
  const randomPictures = randomize(pictures);
  const randomCellsIndex = randomize(cellsIndex);

  for (let i = 0, j = 0; i < randomPictures.length; i += 1, j += 2) {
    cellPicture[randomCellsIndex[j]].src = `./img/${randomPictures[i]}.png`;
    cellPicture[randomCellsIndex[j + 1]].src = `./img/${randomPictures[i]}.png`;
  }
};

setPictureIntoCells();

// prevent picture drag

window.ondragstart = function() { return false; } 

// set succes state for equal pictures

const setSuccesState = (name) => {
  fieldCell.forEach(x => {
    if (x.childNodes[0].src.includes(name)) {
      x.classList.add('succes');
    }
  });
};

// reset functions

const clearClickedState = () => {
  fieldCell.forEach(x => x.classList.remove('clicked'));
};

const clearWrongCombination = () => {
  fieldCell.forEach(x => {
    if (!x.classList.contains('succes')) {
      x.classList.remove('cardRotate');
    }
  });
};

const variablesCheckerReset = () => {
  maxSizeOfClickedPictures = false;
  pictureCheck = [];
};

const clearResultList = () => {
  while (resultList.firstChild) {
    resultList.removeChild(resultList.firstChild);
  }
};

// picture combination checker

const PictureCheckOnSecondReveal = () => {
  if (pictureCheck.length === 2) {
    maxSizeOfClickedPictures = true;
    if (pictureCheck[0] !== pictureCheck[1]) {
      setTimeout(() => {
        clearWrongCombination();
        variablesCheckerReset();
        clearClickedState();
      }, 1000);
    } else {
      setSuccesState(pictureCheck[0]);
      variablesCheckerReset();
    }
  }
};


// main card event listener

fieldCell.forEach(x => {
  x.addEventListener('click', () => {
    if (!x.classList.contains('clicked')) {
      pictureCheck.push(x.childNodes[0].src.slice(-5));
      x.classList.add('clicked');
      PictureCheckOnSecondReveal();
    }
  });
});


// timer and local storage implement

let timeInterval;
let activeInterval = false;

const getZero = x => x < 10 ? `0${x}` : x;

const completeChecker = () => {
  for (let i = 0; i < fieldCell.length; i++) {
    if (!fieldCell[i].classList.contains('succes')) {
      return false;
    }
  }
  return true;
};

const sortLocalStorage = () => {
  const getMinutes = x => +x.slice(0, 2);
  const getSeconds = x => +x.slice(-2);
  const storageValues = Object.values(localStorage);
  const sortedStorageValues = storageValues.sort((a, b) => getMinutes(a) - getMinutes(b)).sort((a, b) => {
    if (getMinutes(a) === getMinutes(b)) {
      return getSeconds(a) - getSeconds(b);
    }
  });
  for (let i = 0; i < localStorage.length; i++) {
    localStorage[i + 1] = sortedStorageValues[i];
  }
};

const setTimeToLocalStorage = () => {
  let localStorageKeys = Object.keys(localStorage);
  if (+`${localStorageKeys.length + 1}` !== 11) {
    localStorage.setItem(`${localStorageKeys.length + 1}`, `${timerMinutes.innerHTML}:${timerSeconds.innerHTML}`);
  } else {
    localStorage.setItem(`10`, `${timerMinutes.innerHTML}:${timerSeconds.innerHTML}`);
  }
};

const timerTick = () => {
  timerSeconds.innerHTML = getZero(+timerSeconds.innerHTML + 1);
  if (+timerSeconds.innerHTML === 60) {
    timerMinutes.innerHTML = getZero(+timerMinutes.innerHTML + 1);
    timerSeconds.innerHTML = "00";
  }
  if (completeChecker()) {
    setTimeToLocalStorage();
    clearInterval(timeInterval);
    sortLocalStorage();
    clearResultList();
    setStorageToResultWindow();
  }
};

const runTimer = () => {
  activeInterval = true;
  timeInterval = setInterval(timerTick, 1000);
};

// full reset

const fullReset = () => {
  clearInterval(timeInterval);
  clearClickedState();
  fieldCell.forEach(x => {
      x.classList.remove('cardRotate');
      x.classList.remove('succes');
  });
  cellPicture.forEach(x => x.src = '');
  setPictureIntoCells();
  variablesCheckerReset();
  timerSeconds.innerHTML = '00';
  timerMinutes.innerHTML = '00';
  activeInterval = false;
};

// back to menu listeners

backFromGameFieldButton.addEventListener('click', () => {
  hideToggle(gameWindow);
  gameWindow.classList.remove('opacityToggle');
  fullReset();
});

backFromResultsButton.addEventListener('click', () => {
  hideToggle(resultWindow);
  resultWindow.classList.remove('opacityToggle');
});
