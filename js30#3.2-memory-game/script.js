const fieldCell = document.querySelectorAll('.field__cell');
const cellPicture = document.querySelectorAll('.hidden-picture');


const pictures = ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10'];
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

  for (let i = 0, j = 0; i < randomPictures.length; i+=1, j+=2) {
    cellPicture[randomCellsIndex[j]].src = `./img/${randomPictures[i]}.png`;
    cellPicture[randomCellsIndex[j + 1]].src = `./img/${randomPictures[i]}.png`;
  }
}

setPictureIntoCells()

// set succes state for equal pictures

const setSuccesState = (name) => {
  fieldCell.forEach(x => {
    if (x.childNodes[0].src.includes(name)) {
      console.log("OPPA")
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

const CheckerVariablesReset = () => {
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
        CheckerVariablesReset()
        clearClickedState();
      }, 1000)
    } else {
      setSuccesState(pictureCheck[0])
      CheckerVariablesReset()
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


