const fieldCell = document.querySelectorAll('.field__cell');

// add card flip animation and event listener on click for it

fieldCell.forEach(x => {
  x.style.transition = "transform 1.3s";
  x.addEventListener('click', () => x.style.transform = 'rotateY(360deg)')
})






// let arr = [11, 22, 33, 44, 55, 66, 77, 88 ,99]

// function shuffleArray(array) {
//     for (let i = array.length - 1; i > 0; i--) {
//         const j = Math.floor(Math.random() * (i + 1));
//         [array[i], array[j]] = [array[j], array[i]];
//     }
//     return array
// }

// console.log(shuffleArray(arr))