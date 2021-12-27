const fieldCell = document.querySelectorAll('.field__cell');
const cellPicture = document.querySelectorAll('.hidden-picture');
const timer = document.querySelector('.timer');
const timerSeconds = document.querySelector('.timer__seconds');
const timerMinutes = document.querySelector('.timer__minutes');


const pictures = ['01'];
const cellsIndex = [...fieldCell].map((c, i) => i);

let pictureCheck = [];
let maxSizeOfClickedPictures = false;

// add card flip animation and event listener on click for it

fieldCell.forEach(x => {
  x.style.transition = "transform 1.3s";
  x.addEventListener('click', () => {
    if (maxSizeOfClickedPictures === false) {
      x.style.transform = 'rotateY(360deg)'
    }
    if (activeInterval === false) {
      runTimer()
    }
  });
})


//randomize pictures and cells order

const randomize = arr => {
  for (let i = arr.length - 1; i > 0; i--) {
    const randInd = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[randInd]] = [arr[randInd], arr[i]];
  }
  return arr
}

// pictures set into cells

const setPictureIntoCells = () => {
  const randomPictures = randomize(pictures);
  const randomCellsIndex = randomize(cellsIndex);

  for (let i = 0, j = 0; i < randomPictures.length; i += 1, j += 2) {
    cellPicture[randomCellsIndex[j]].src = `./img/${randomPictures[i]}.png`;
    cellPicture[randomCellsIndex[j + 1]].src = `./img/${randomPictures[i]}.png`;
  }
}

setPictureIntoCells()

// set succes state for equal pictures

const setSuccesState = (name) => {
  fieldCell.forEach(x => {
    if (x.childNodes[0].src.includes(name)) {
      x.classList.add('succes')
    }
  })
}

// reset functions

const clearClickedState = () => {
  fieldCell.forEach(x => x.classList.remove('clicked'))
}

const clearWrongCombination = () => {
  fieldCell.forEach(x => {
    if (!x.classList.contains('succes')) {
      x.style.transform = "rotateY(180deg)"
    }
  })
}

const VariablesCheckerReset = () => {
  maxSizeOfClickedPictures = false;
  pictureCheck = [];
}

// picture combination checker

const PictureCheckOnSecondReveal = () => {
  if (pictureCheck.length === 2) {
    maxSizeOfClickedPictures = true
    if (pictureCheck[0] !== pictureCheck[1]) {
      setTimeout(() => {
        clearWrongCombination()
        VariablesCheckerReset()
        clearClickedState();
      }, 1000)
    } else {
      setSuccesState(pictureCheck[0])
      VariablesCheckerReset()
    }
  }
}


// main card event listener

fieldCell.forEach(x => {
  x.addEventListener('click', () => {
    if (!x.classList.contains('clicked')) {
      pictureCheck.push(x.childNodes[0].src.slice(-5))
      x.classList.add('clicked')
      PictureCheckOnSecondReveal()
    }
  })
})


// timer and local storage implement

let timeInterval;
let activeInterval = false;

const getZero = x => x < 10 ? `0${x}` : x;

const completeChecker = () => {
  for (let i = 0; i < fieldCell.length; i++) {
    if (!fieldCell[i].classList.contains('succes')) {
      return false
    }
  }
  return true
}

const sortLocalStorage = () => {
  const getMinutes = x => +x.slice(0, 2);
  const getSeconds = x => +x.slice(-2);
  const storageValues = Object.values(localStorage);
  const sortedStorageValues = storageValues.sort((a, b) => getMinutes(a) - getMinutes(b)).sort((a, b) => {
    if (getMinutes(a) === getMinutes(b)) {
      return getSeconds(a) - getSeconds(b)
    }
  })
  for (let i = 0; i < localStorage.length; i++) {
    localStorage[i + 1] = sortedStorageValues[i]
  }
}

const setTimeToLocalStorage = () => {
  let localStorageKeys = Object.keys(localStorage)
  if (+`${localStorageKeys.length + 1}` !== 11) {
    localStorage.setItem(`${localStorageKeys.length + 1}`, `${timerMinutes.innerHTML}:${timerSeconds.innerHTML}`)
  } else {
    localStorage.setItem(`10`, `${timerMinutes.innerHTML}:${timerSeconds.innerHTML}`)
  }
}

const timerTick = () => {
  timerSeconds.innerHTML = getZero(+timerSeconds.innerHTML + 1)
  if (+timerSeconds.innerHTML === 60) {
    timerMinutes.innerHTML = getZero(+timerMinutes.innerHTML + 1)
    timerSeconds.innerHTML = "00"
  }
  if (completeChecker()) {
    setTimeToLocalStorage()
    clearInterval(timeInterval)
    sortLocalStorage()
  }
}

const runTimer = () => {
  activeInterval = true;
  timeInterval = setInterval(timerTick, 1000)
}

console.log(Object.keys(localStorage))