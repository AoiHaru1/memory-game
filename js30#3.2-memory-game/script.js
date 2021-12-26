const fieldCell = document.querySelectorAll('.field__cell');
const cellPicture = document.querySelectorAll('.hidden-picture');


const pictures = ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10'];
const cellsIndex = [...fieldCell].map((c, i) => i)


// add card flip animation and event listener on click for it

fieldCell.forEach(x => {
  x.style.transition = "transform 1.3s";
  x.addEventListener('click', () => x.style.transform = 'rotateY(360deg)')
})


//randomize pictures and cells order

const randomize = arr => {
    for (let i = arr.length - 1; i > 0; i--) {
        const randInd = Math.floor(Math.random() * (i + 1));
        [arr[i], arr[randInd]] = [arr[randInd], arr[i]];
    }
    return arr
}

const setPictureIntoCells = () => {
  const randomPictures = randomize(pictures);
  const randomCellsIndex = randomize(cellsIndex);

  for (let i = 0, j = 0; i < randomPictures.length; i+=1, j+=2) {
    cellPicture[randomCellsIndex[j]].src = `./img/${randomPictures[i]}.png`
    cellPicture[randomCellsIndex[j + 1]].src = `./img/${randomPictures[i]}.png`
  }
}

setPictureIntoCells()