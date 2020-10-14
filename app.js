const grid = document.querySelector('.grid')
const width = 18
let cells = []
const path = [19,20,21,21,22,23,24,25,28,29,30,31,32,33,34,37,43,46,52,55,61,64,70,73,74,75,76,77,78,79,80,81,82,83,84,85,86,87,88,91,106,109,110,111,112,113,115,116,117,118,120,121,122,123,124,131,133,136,138,144,145,146,147,148,149,150,151,154,155,156,157,158,159,160,161,167,169,170,171,172,174,185,192,199,200,201,202,203,204,205,208,209,210,211,212,213,214,217,221,223,226,228,232,235,239,241,242,243,244,246,250,253,254,255,256,257,264,265,266,267,268,271,286,289,290,291,292,293,294,295,296,297,298,299,300,301,302,303,304]
const superfood = [55,70,235,250]
let pacmanPosition = 242
let blueGhostPostion = 116
let redGhostPosition = 117
let yellowGhostPosition = 170
let pinkGhostPostion = 171
let playerPoints = 0
let playerLives = 3
const speed = 350

document.querySelector('.player-lives').innerHTML = `Lives: ${playerLives}`


//CREATING THE STARTING GRID
function createGrid(){
  let pacmanPosition = 242
  let blueGhostPostion = 116
  let redGhostPosition = 117
  let yellowGhostPosition = 170
  let pinkGhostPostion = 171 
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
    // div.innerHTML = i
    // div.innerHTML = `${Math.floor(i / width)} ${(i % width)}`
    // 
  }
}
createGrid()

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
  tempArray = pathArray.slice(i, i + width)
  rowArray.push(tempArray)
}
// console.log(rowArray)


//COUNT POINTS
function countFoodPoints(){
  if (cells[pacmanPosition].classList.contains('no-background')) {
    playerPoints
  } else if (cells[pacmanPosition].classList.contains('superfood')) {
    playerPoints += 100
  } else {
    playerPoints += 5
  }
  return playerPoints
}


//SET LOCAL STORAGE
// if (localStorage) {
//   playerPoints = JSON.parse(localStorage.getItem('scores'))
//   // orderAndDisplayScores()
// }
// document.addEventListener('keydown', () => {
//   if (localStorage) {
//     localStorage.setItem('scores', JSON.stringify(playerPoints))
//   }
// })



//PACMAN MOVEMENT (Including tunnel)
//Start moving at beginning
let pacMvmt = 0

function pAutoMov(){

  let firstKey = false
  if (!firstKey) {
    firstKey = true
    pacMvmt = setInterval(() => {
      countFoodPoints()
      cells[pacmanPosition].classList.remove('pacman')
      cells[pacmanPosition].classList.add('no-background')
      pacmanPosition += 1
      cells[pacmanPosition].classList.add('pacman')
      document.querySelector('.player-points').innerHTML = `Points: ${playerPoints}`
      if ((cells[pacmanPosition + 1].classList.contains('wall')) && pacmanPosition !== 161) {
        clearInterval(pacMvmt)
      }
    },350)
  }
}
pAutoMov()

//Key stroke instructions
document.addEventListener('keydown', (action) => {
  const key = action.key
  if (key === 'ArrowRight' && !(cells[pacmanPosition + 1].classList.contains('wall'))) {
    clearInterval(pacMvmt)
    pacMvmt = setInterval(() => {
      countFoodPoints()
      cells[pacmanPosition].classList.remove('pacman')
      cells[pacmanPosition].classList.add('no-background')
      if ((pacmanPosition + 1) === 162) { 
        pacmanPosition = 144
      } else {
        pacmanPosition += 1
      }
      cells[pacmanPosition].classList.add('pacman')
      document.querySelector('.player-points').innerHTML = `Points: ${playerPoints}`
      if ((cells[pacmanPosition + 1].classList.contains('wall')) && pacmanPosition !== 161) {
        clearInterval(pacMvmt)
      }
    },350)
  } else if (key === 'ArrowDown' && !(cells[pacmanPosition + width].classList.contains('wall'))) {
    clearInterval(pacMvmt)
    pacMvmt = setInterval(() => {
      countFoodPoints()
      cells[pacmanPosition].classList.remove('pacman')
      cells[pacmanPosition].classList.add('no-background')
      pacmanPosition += width
      cells[pacmanPosition].classList.add('pacman')
      document.querySelector('.player-points').innerHTML = `Points: ${playerPoints}`
      if (cells[pacmanPosition + width].classList.contains('wall')) {
        clearInterval(pacMvmt)
      }
    },350)
  } else if (key === 'ArrowLeft' && !(cells[pacmanPosition - 1].classList.contains('wall'))) {
    clearInterval(pacMvmt)
    pacMvmt = setInterval(() => {
      countFoodPoints()
      cells[pacmanPosition].classList.remove('pacman')
      cells[pacmanPosition].classList.add('no-background')
      if ((pacmanPosition - 1) === 143){
        pacmanPosition = 161
      } else {      
        pacmanPosition -= 1
      }
      cells[pacmanPosition].classList.add('pacman')
      document.querySelector('.player-points').innerHTML = `Points: ${playerPoints}`
      if ((cells[pacmanPosition - 1].classList.contains('wall'))  && pacmanPosition !== 144) {
        clearInterval(pacMvmt)
      }
    },350)
  } else if (key === 'ArrowUp' && !(cells[pacmanPosition - width].classList.contains('wall'))) {
    clearInterval(pacMvmt)
    pacMvmt = setInterval(() => {
      countFoodPoints()
      cells[pacmanPosition].classList.remove('pacman')
      cells[pacmanPosition].classList.add('no-background')
      pacmanPosition -= width
      cells[pacmanPosition].classList.add('pacman')
      document.querySelector('.player-points').innerHTML = `Points: ${playerPoints}`
      if (cells[pacmanPosition - width].classList.contains('wall')) {
        clearInterval(pacMvmt)
      }
    }, speed)
  } else if (key === 'e') {
    clearInterval(ghostsInterval)
  }
})


//****PATHFINDING with Breadth-First (http://www.gregtrowbridge.com/a-basic-pathfinding-algorithm/

// Start location will be in the following format:
// [distanceFromTop, distanceFromLeft]
function findShortestPath(startCoordinates, rowArray) {
  const distanceFromTop = startCoordinates[0]
  const distanceFromLeft = startCoordinates[1]


  // Each "location" will store its coordinates
  // and the shortest path required to arrive there
  const location = {
    distanceFromTop: distanceFromTop,
    distanceFromLeft: distanceFromLeft,
    path: [],
    status: 'Start'
  }

  // Initialize the queue with the start location already inside
  const queue = [location]

  // Loop through the grid searching for the goal
  while (queue.length > 0) {
    // Take the first location off the queue
    const currentLocation = queue.shift()

    // Explore North
    let newLocation = exploreInDirection(currentLocation, 'North', rowArray)
    if (newLocation.status === 'Goal') {
      return newLocation.path
    } else if (newLocation.status === 'Valid') {
      queue.push(newLocation)
    }

    // Explore East
    newLocation = exploreInDirection(currentLocation, 'East', rowArray)
    if (newLocation.status === 'Goal') {
      return newLocation.path
    } else if (newLocation.status === 'Valid') {
      queue.push(newLocation)
    }

    // Explore South
    newLocation = exploreInDirection(currentLocation, 'South', rowArray)
    if (newLocation.status === 'Goal') {
      return newLocation.path
    } else if (newLocation.status === 'Valid') {
      queue.push(newLocation)
    }

    // Explore West
    newLocation = exploreInDirection(currentLocation, 'West', rowArray)
    if (newLocation.status === 'Goal') {
      return newLocation.path
    } else if (newLocation.status === 'Valid') {
      queue.push(newLocation)
    }
  }

  // No valid path found
  return false

}

// This function will check a location's status
// (a location is "valid" if it is on the grid, is not an "obstacle",
// and has not yet been visited by our algorithm)
// Returns "Valid", "Invalid", "Blocked", or "Goal"
var locationStatus = function(location, rowArray) {
  var width = rowArray.length
  var dft = location.distanceFromTop
  var dfl = location.distanceFromLeft

  if (location.distanceFromLeft < 0 ||
      location.distanceFromLeft >= width ||
      location.distanceFromTop < 0 ||
      location.distanceFromTop >= width) {

    // location is not on the grid--return false
    return 'Invalid'
  } else if (rowArray[dft][dfl] === 'Goal') {
    return 'Goal'
  } else if (rowArray[dft][dfl] !== 0) {
    // location is either an obstacle or has been visited
    return 'Blocked'
  } else {
    return 'Valid'
  }
}


// Explores the grid from the given location in the given
// direction
var exploreInDirection = function(currentLocation, direction, rowArray) {
  var newPath = currentLocation.path.slice()
  newPath.push(direction)

  var dft = currentLocation.distanceFromTop
  var dfl = currentLocation.distanceFromLeft

  if (direction === 'North') {
    dft -= 1
  } else if (direction === 'East') {
    dfl += 1
  } else if (direction === 'South') {
    dft += 1
  } else if (direction === 'West') {
    dfl -= 1
  }

  var newLocation = {
    distanceFromTop: dft,
    distanceFromLeft: dfl,
    path: newPath,
    status: 'Unknown'
  }
  newLocation.status = locationStatus(newLocation, rowArray)

  // If this new location is valid, mark it as 'Visited'
  if (newLocation.status === 'Valid') {
    rowArray[newLocation.distanceFromTop][newLocation.distanceFromLeft] = 'Visited'
  }

  return newLocation
}


//GHOST MOVEMENT
let ghostsInterval = 0


function findPath(whichGhost, ghostCSS){
  ghostsInterval = setInterval(() => {
    let nextStep = 0
    let nextPath = 0
    const gx = whichGhost % width
    const gy = Math.floor(whichGhost / width)
    const px = pacmanPosition % width
    const py = Math.floor(pacmanPosition / width)
    console.log((gy * width) + gx)
    console.log((py * width) + px)
    if (((gy * width) + gx) === ((py * width) + px) 
    // || nextPath.length === 0
    ) {
      clearInterval(ghostsInterval)
      clearInterval(pacMvmt)
      playerLives -= 1
      // setTimeout(() => {
      //   for (let i = cells.length; i > 0; i--) {
      //     const singleCell = document.querySelector('.cell')
      //     singleCell.remove()
      //   }
      //   createGrid()
      //   pAutoMov()
      //   findPath(blueGhostPostion, 'blue-ghost')
      // // findPath(redGhostPosition, 'red-ghost')
      // // findPath(yellowGhostPosition, 'yellow-ghost')
      // // findPath(pinkGhostPostion, 'pink-ghost')
      // }, 4000)
      // location.reload()
    }
    //calculate quickest path 
    const arrayCopy = rowArray.map((arr) => {
      return [...arr]
    })
    arrayCopy[py][px] = 'Goal'
    nextPath = findShortestPath([gy,gx], arrayCopy)
    console.log(nextPath)
    // console.log(JSON.stringify(playerPoints))
    //move ghost

    cells[whichGhost].classList.remove(ghostCSS)
    nextStep = nextPath[0]
    if (nextStep === 'North') {
      whichGhost -= width
    } else if (nextStep === 'South') {
      whichGhost += width
    } else if (nextStep === 'West') {
      whichGhost -= 1
    } else if (nextStep === 'East') {
      whichGhost += 1
    }
    cells[whichGhost].classList.add(ghostCSS)
  }, speed)
}
// findPath(blueGhostPostion, 'blue-ghost')
// findPath(redGhostPosition, 'red-ghost')
// findPath(yellowGhostPosition, 'yellow-ghost')
// findPath(pinkGhostPostion, 'pink-ghost')


//GAME OVER MESSAGE
if (playerLives === 0) {
  alert('Game Over!')
}