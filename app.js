const grid = document.querySelector('.grid')
const width = 18
let cells = []
const wall = [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,26,27,35,36,38,39,40,41,42,44,45]
const path = [19,20,21,21,22,23,24,25,28,29,30,31,32,33,34,37,43,46,52,55,61,64,70,73,74,75,76,77,78,79,80,81,82,83,84,85,86,87,88,91,106,109,110,111,112,113,115,116,117,118,120,121,122,123,124,131,138,]

for (let i = 0; i < width ** 2; i++) {
  const div = document.createElement('div')
  div.classList.add('cell')
  grid.appendChild(div)
  cells.push(div)
  console.log(wall.indexOf(i))
  if (wall.indexOf(i) >= 0) {
    div.classList.add('wall')
  }
  div.innerHTML = i
}


