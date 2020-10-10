const grid = document.querySelector('.grid')
const width = 18
let cells = []
// const wall = [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,26,27,35,36,38,39,40,41,42,44,45]
const path = [19,20,21,21,22,23,24,25,28,29,30,31,32,33,34,37,43,46,52,55,61,64,70,73,74,75,76,77,78,79,80,81,82,83,84,85,86,87,88,91,106,109,110,111,112,113,115,116,117,118,120,121,122,123,124,131,133,136,138,144,145,146,147,148,149,150,151,154,155,156,157,158,159,160,161,167,169,170,171,172,174,185,192,199,200,201,202,203,204,205,208,209,210,211,212,213,214,217,221,223,226,228,232,235,239,241,242,243,244,246,250,253,254,255,256,257,264,265,266,267,268,271,286,289,290,291,292,293,294,295,296,297,298,299,300,301,302,303,304]
const superfood = [55,70,235,250]
let pacmanPosition = 210
let blueGhostPostion = 203
// 116
let redGhostPosition = 117
let yellowGhostPosition = 170
let pinkGhostPostion = 171
let playerPoints = 0

//CREATING THE STARTING GRID
for (let i = 0; i < width ** 2; i++) {
  const div = document.createElement('div')
  div.classList.add('cell')
  grid.appendChild(div)
  cells.push(div)
  if (i === pacmanPosition) {
    div.classList.add('pacman')
  } else if (i === redGhostPosition) {
    div.classList.add('red-ghost')
  } else if (i === yellowGhostPosition) {
    div.classList.add('yellow-ghost')
  } else if (i === blueGhostPostion) {
    div.classList.add('blue-ghost')
  } else if (i === pinkGhostPostion) {
    div.classList.add('pink-ghost')
  } else if (superfood.indexOf(i) >= 0) {
    div.classList.add('superfood')
  } else if (path.indexOf(i) >= 0) {
  } else {
    div.classList.add('wall')
  }
  div.innerHTML = i
}

//CREATING MATRIX GRID
const pathArray = []
for (let i = 0; i < cells.length - 1; i++) {
  if (path.includes(i)) {
    pathArray[i] = 0
  } else {
    pathArray[i] = 1
  }
  pathArray.push(pathArray[i])
}
// console.log(pathArray)

//Cut into rows
const rowArray = []
let tempArray = []
for (let i = 0; i < pathArray.length; i += width) {
  tempArray = pathArray.slice(i, i + width - 1)
  rowArray.push(tempArray)
}
console.log(rowArray)

//PACMAN MOVEMENT
//Including tunnel
let pacMvmt = 0

document.addEventListener('keydown', (action) => {
  const key = action.key
  if (key === 'ArrowRight' && !(cells[pacmanPosition + 1].classList.contains('wall'))) {
    clearInterval(pacMvmt)
    pacMvmt = setInterval(() => {
      cells[pacmanPosition].classList.remove('pacman')
      cells[pacmanPosition].style.backgroundImage = 'none'
      if ((pacmanPosition + 1) === 162) { 
        pacmanPosition = 144
      } else {
        pacmanPosition += 1
      }
      cells[pacmanPosition].classList.add('pacman')
      if ((cells[pacmanPosition + 1].classList.contains('wall')) && pacmanPosition !== 161) {
        clearInterval(pacMvmt)
      }
    },350)
  } else if (key === 'ArrowDown' && !(cells[pacmanPosition + width].classList.contains('wall'))) {
    clearInterval(pacMvmt)
    pacMvmt = setInterval(() => {
      cells[pacmanPosition].classList.remove('pacman')
      cells[pacmanPosition].style.backgroundImage = 'none'
      pacmanPosition += width
      cells[pacmanPosition].classList.add('pacman')
      if (cells[pacmanPosition + width].classList.contains('wall')) {
        clearInterval(pacMvmt)
      }
    },350)
  } else if (key === 'ArrowLeft' && !(cells[pacmanPosition - 1].classList.contains('wall'))) {
    clearInterval(pacMvmt)
    pacMvmt = setInterval(() => {
      cells[pacmanPosition].classList.remove('pacman')
      cells[pacmanPosition].style.backgroundImage = 'none'
      if ((pacmanPosition - 1) === 143){
        pacmanPosition = 161
      } else {      
        pacmanPosition -= 1
      }
      cells[pacmanPosition].classList.add('pacman')
      if ((cells[pacmanPosition - 1].classList.contains('wall'))  && pacmanPosition !== 144) {
        clearInterval(pacMvmt)
      }
    },350)
  } else if (key === 'ArrowUp' && !(cells[pacmanPosition - width].classList.contains('wall'))) {
    clearInterval(pacMvmt)
    pacMvmt = setInterval(() => {
      cells[pacmanPosition].classList.remove('pacman')
      cells[pacmanPosition].style.backgroundImage = 'none'
      pacmanPosition -= width
      cells[pacmanPosition].classList.add('pacman')
      if (cells[pacmanPosition - width].classList.contains('wall')) {
        clearInterval(pacMvmt)
      }
    },350)
  }
})

//GHOST MOVEMENT

const up = ' - width'
const down = ' + width'
const left = ' - 1'
const right = ' + 1'
const ghostDirections = [up,left,down,right]
// let position1
// let position2
let rdmDireString = 0
let blueGhostMvmt = 0
// position1 = blueGhostPostion
function generateRdmDirect1(){
  rdmDireString = ghostDirections[Math.floor(Math.random() * 4)]
  console.log(rdmDireString)
  blueGhostMvmt = setInterval(() => {
    if (!cells[eval(blueGhostPostion + rdmDireString)].classList.contains('wall')) {
      cells[blueGhostPostion].classList.remove('blue-ghost')
      blueGhostPostion = eval(blueGhostPostion + rdmDireString)
      cells[blueGhostPostion].classList.add('blue-ghost')
    } else {
      generateRdmDirect2()
      clearInterval(blueGhostMvmt)
    }
  }, 350)
}
function generateRdmDirect2(){
  rdmDireString = ghostDirections[Math.floor(Math.random() * 4)]
  console.log(rdmDireString)
  blueGhostMvmt = setInterval(() => {
    if (!cells[eval(blueGhostPostion + rdmDireString)].classList.contains('wall')) {
      cells[blueGhostPostion].classList.remove('blue-ghost')
      blueGhostPostion = eval(blueGhostPostion + rdmDireString)
      cells[blueGhostPostion].classList.add('blue-ghost')
    } else {
      clearInterval(blueGhostMvmt)
      generateRdmDirect1()
    }
  }, 350)
}

// generateRdmDirect1()

// pathfinding
// A*
// ghosts don't use the tunnel


//PATHFINDING with EasystarJS
//115 -> 210
// var easystarjs = require('easystarjs')
// var easystar = new easystarjs.js()
// var easystar = new EasyStar.js()

easystar.setGrid(rowArray)
easystar.setAcceptableTiles([0])

easystar.findPath(7, 6, 12, 11, function( path ) {
  if (path === null) {
    alert('Path was not found.')
  } else {
    alert('Path was found. The first Point is ' + path[0].x + ' ' + path[0].y)
  }
})
easystar.calculate()