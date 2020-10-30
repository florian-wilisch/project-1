const grid = document.querySelector('.grid')
const width = 18
const cells = []
const path = [19,20,21,21,22,23,24,25,28,29,30,31,32,33,34,37,43,46,52,55,61,64,70,73,74,75,76,77,78,79,80,81,82,83,84,85,86,87,88,91,106,109,110,111,112,113,115,116,117,118,120,121,122,123,124,131,133,136,138,144,145,146,147,148,149,150,151,154,155,156,157,158,159,160,161,167,169,170,171,172,174,185,192,199,200,201,202,203,204,205,208,209,210,211,212,213,214,217,221,223,226,228,232,235,239,241,242,243,244,246,250,253,254,255,256,257,264,265,266,267,268,271,286,289,290,291,292,293,294,295,296,297,298,299,300,301,302,303,304]
const superfood = [55,70,235,250]
let pacmanPosition = 242
let blueGhostPosition = 116
let redGhostPosition = 117
let yellowGhostPosition = 170
let pinkGhostPosition = 171
let playerPoints = 0
let playerLives = 3
const speed = 350
// let lastDirection = 0

document.querySelector('.player-points').innerHTML = `Points: ${playerPoints}`

function updateLives() {
  document.querySelector('.player-lives').innerHTML = `Lives: ${playerLives}`
}
updateLives()


function resetPositions() {
  cells.forEach((item) => {
    item.classList.remove('no-background')
    item.classList.remove('pacman')
    item.classList.remove('red-ghost')
    item.classList.remove('blue-ghost')
    item.classList.remove('pink-ghost')
    item.classList.remove('yellow-ghost')
    item.classList.remove('fleeing')
  })
  pacmanPosition = 242
  cells[pacmanPosition].classList.add('pacman')
  redGhostPosition = 117
  cells[redGhostPosition].classList.add('red-ghost')
  blueGhostPosition = 116
  cells[blueGhostPosition].classList.add('blue-ghost')
  pinkGhostPosition = 171
  cells[pinkGhostPosition].classList.add('pink-ghost')
  yellowGhostPosition = 170
  cells[yellowGhostPosition].classList.add('yellow-ghost')
  startKey = false
  musicPlayed = false
}

function resetRed() {
  clearInterval(straightInterval)
  cells[redGhostPosition].classList.remove('fleeing')
  setTimeout(() => {
    redFleeing = false
    redFleeingCounter = 0
    cells[redGhostPosition].classList.add('red-ghost')
    cells[redGhostPosition].classList.add('redflash')
  }, 500)
  setTimeout(() => {
    cells[redGhostPosition].classList.remove('redflash')
    findStraightPath(redGhostPosition, 'red-ghost')
  }, 2000) 
}

function resetBlue() {
  clearInterval(plus2Interval)
  cells[blueGhostPosition].classList.remove('fleeing')
  setTimeout(() => {
    blueFleeing = false
    blueFleeingCounter = 0
    cells[blueGhostPosition].classList.add('blue-ghost')
    cells[blueGhostPosition].classList.add('blueflash')
  }, 500)
  setTimeout(() => {
    cells[blueGhostPosition].classList.remove('blueflash')
    findPlus2Path(blueGhostPosition, 'blue-ghost')
  }, 2000)
}

function resetPink() {
  clearInterval(minus2Interval)
  cells[pinkGhostPosition].classList.remove('fleeing')
  setTimeout(() => {
    pinkFleeing = false
    pinkFleeingCounter = 0
    cells[pinkGhostPosition].classList.add('pink-ghost')
    cells[pinkGhostPosition].classList.add('pinkflash')
  }, 500)
  setTimeout(() => {
    cells[pinkGhostPosition].classList.remove('pinkflash')
    findMinus2Path(pinkGhostPosition, 'pink-ghost')
  }, 2000)
}

function resetYellow() {
  clearInterval(switchInterval)
  cells[yellowGhostPosition].classList.remove('fleeing')
  setTimeout(() => {
    yellowFleeing = false
    yellowFleeingCounter = 0
    cells[yellowGhostPosition].classList.add('yellow-ghost')
    cells[yellowGhostPosition].classList.add('yellowflash')
  }, 500)
  setTimeout(() => {
    cells[yellowGhostPosition].classList.remove('yellowflash')
    findSwitchPath(yellowGhostPosition, 'yellow-ghost')
  }, 2000)
}


//CREATING THE STARTING GRID
function createGrid(){
  // // const pacmanPosition = 242
  // const blueGhostPosition = 116
  // const redGhostPosition = 117
  // const yellowGhostPosition = 170
  // const pinkGhostPosition = 171
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
    } else if (i === blueGhostPosition) {
      div.classList.add('blue-ghost')
    } else if (i === pinkGhostPosition) {
      div.classList.add('pink-ghost')
      // div.classList.add('flash')
    // } else if (i === 115) {
    //   div.classList.add('fleeing')
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
    audio('pacman_eatfruit.wav')
    redFleeing = true
    blueFleeing = true
    pinkFleeing = true
    yellowFleeing = true
    setTimeout(() => {
      audio('pacman_intermission.wav')
    }, 500)
 
  } else {
    playerPoints += 5
    if (musicPlayed) {
      audio('pacman_chomp.wav')
    }
  }
  return playerPoints
}

//PLAY AUDIO
let musicPlayed = false

function audio(type){
  document.querySelector('audio').src = './sounds/' + type
  document.querySelector('audio').play()
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
// function pAutoMov(){

//   let firstKey = false
//   if (!firstKey) {
//     firstKey = true
//     pacMvmt = setInterval(() => {
//       countFoodPoints()
//       cells[pacmanPosition].classList.remove('pacman')
//       cells[pacmanPosition].classList.add('no-background')
//       pacmanPosition += 1
//       cells[pacmanPosition].classList.add('pacman')
//       document.querySelector('.player-points').innerHTML = `Points: ${playerPoints}`
//       if ((cells[pacmanPosition + 1].classList.contains('wall')) && pacmanPosition !== 161) {
//         clearInterval(pacMvmt)
//       }
//     },350)
//   }
// }
// pAutoMov()


let pacMvmt = 0
let startKey = false

document.addEventListener('keydown', () => {
  //if beginning of game wait for first key to start ghost 
  if (!startKey) {
    startKey = true
    audio('pacman_beginning.wav')
    setTimeout(() => {
      musicPlayed = true
    }, 4000)
    setTimeout(() => {
      findStraightPath(redGhostPosition, 'red-ghost')      
    }, 2000)
    setTimeout(() => {
      findPlus2Path(blueGhostPosition, 'blue-ghost')
      findMinus2Path(pinkGhostPosition, 'pink-ghost')
    }, 1500)
    setTimeout(() => {
      findSwitchPath(yellowGhostPosition, 'yellow-ghost')
    }, 1000)
    
  }
})


//Key stroke instructions
document.addEventListener('keydown', (action) => {
  const key = action.key
  //if beginning of game wait for first key to start ghost 
  // if (!startKey) {
  //   startKey = true
  //   findStraightPath(redGhostPosition, 'red-ghost')
  //   findStraightPath(blueGhostPosition, 'blue-ghost')
  // }
  if (key === 'ArrowRight' && !(cells[pacmanPosition + 1].classList.contains('wall'))) {
    clearInterval(pacMvmt)
    // lastDirection = 
    pacMvmt = setInterval(() => {
      cells[pacmanPosition].classList.remove('pacman')
      cells[pacmanPosition].classList.add('no-background')
      if ((pacmanPosition + 1) === 162) { 
        pacmanPosition = 144
      } else {
        pacmanPosition += 1
      }
      cells[pacmanPosition].classList.add('pacman')
      countFoodPoints()
      document.querySelector('.player-points').innerHTML = `Points: ${playerPoints}`
      if ((cells[pacmanPosition + 1].classList.contains('wall')) && pacmanPosition !== 161) {
        clearInterval(pacMvmt)
      }
    }, (speed * .9))
  } else if (key === 'ArrowDown' && !(cells[pacmanPosition + width].classList.contains('wall'))) {
    clearInterval(pacMvmt)
    pacMvmt = setInterval(() => {
      cells[pacmanPosition].classList.remove('pacman')
      cells[pacmanPosition].classList.add('no-background')
      pacmanPosition += width
      cells[pacmanPosition].classList.add('pacman')
      countFoodPoints()
      document.querySelector('.player-points').innerHTML = `Points: ${playerPoints}`
      if (cells[pacmanPosition + width].classList.contains('wall')) {
        clearInterval(pacMvmt)
      }
    },(speed * .9))
  } else if (key === 'ArrowLeft' && !(cells[pacmanPosition - 1].classList.contains('wall'))) {
    clearInterval(pacMvmt)
    pacMvmt = setInterval(() => {
      cells[pacmanPosition].classList.remove('pacman')
      cells[pacmanPosition].classList.add('no-background')
      if ((pacmanPosition - 1) === 143){
        pacmanPosition = 161
      } else {
        pacmanPosition -= 1
      }
      cells[pacmanPosition].classList.add('pacman')
      countFoodPoints()
      document.querySelector('.player-points').innerHTML = `Points: ${playerPoints}`
      if ((cells[pacmanPosition - 1].classList.contains('wall'))  && pacmanPosition !== 144) {
        clearInterval(pacMvmt)
      }
    },(speed * .9))
  } else if (key === 'ArrowUp' && !(cells[pacmanPosition - width].classList.contains('wall'))) {
    clearInterval(pacMvmt)
    pacMvmt = setInterval(() => {
      cells[pacmanPosition].classList.remove('pacman')
      cells[pacmanPosition].classList.add('no-background')
      pacmanPosition -= width
      cells[pacmanPosition].classList.add('pacman')
      countFoodPoints()
      document.querySelector('.player-points').innerHTML = `Points: ${playerPoints}`
      if (cells[pacmanPosition - width].classList.contains('wall')) {
        clearInterval(pacMvmt)
      }
    }, (speed * .9))
  } else if (key === 'e') {
  //emergency code
    clearInterval(straightInterval)
    clearInterval(plus2Interval)
    clearInterval(minus2Interval)
    clearInterval(switchInterval)
  }
})




//*GHOST MOVEMENT

//Red
let straightInterval = 0
let redFleeing = false
let redFleeingCounter = 0
function findStraightPath(redGhostPosition, ghostCSS){
  straightInterval = setInterval(() => {
    let nextStep = 0
    let nextPath = 0
    const gx = redGhostPosition % width
    const gy = Math.floor(redGhostPosition / width)
    const px = pacmanPosition % width
    const py = Math.floor(pacmanPosition / width)
    cells[redGhostPosition].classList.remove(ghostCSS)
    cells[redGhostPosition].classList.remove('fleeing')
    //calculate quickest path 
    const arrayCopy = rowArray.map((arr) => {
      return [...arr]
    })
    if (redFleeing) {
      redFleeingCounter += 1
      console.log(redFleeingCounter)
      if (py <= 8 && px > 8) {
        arrayCopy[6][7] = 'Goal'
      } else {
        arrayCopy[1][16] = 'Goal'
      }
      nextPath = findShortestPath([gy,gx], arrayCopy)
      if (((gy * width) + gx) === ((py * width) + px)) {
        redGhostPosition = 117
        audio('pacman_eatghost.wav')
        playerPoints += 250
        resetRed()
      } else {
        nextStep = nextPath[0]
        if (nextStep === 'North') {
          redGhostPosition -= width
        } else if (nextStep === 'South') {
          redGhostPosition += width
        } else if (nextStep === 'West') {
          redGhostPosition -= 1
        } else if (nextStep === 'East') {
          redGhostPosition += 1
        }
        cells[redGhostPosition].classList.add('fleeing')
      }
    } else {
      arrayCopy[py][px] = 'Goal'
      nextPath = findShortestPath([gy,gx], arrayCopy)
      // console.log(nextPath)
      // console.log(JSON.stringify(playerPoints))
      //move ghost
      cells[redGhostPosition].classList.remove(ghostCSS)
      if (((gy * width) + gx) === (py * width) + px) { 
        console.log('ALERT!')
        clearAndReset()
      } else {
        nextStep = nextPath[0]
        if (nextStep === 'North') {
          redGhostPosition -= width
        } else if (nextStep === 'South') {
          redGhostPosition += width
        } else if (nextStep === 'West') {
          redGhostPosition -= 1
        } else if (nextStep === 'East') {
          redGhostPosition += 1
        }
        cells[redGhostPosition].classList.add(ghostCSS)
      }
    }
    if (redFleeingCounter === 15) {
      redFleeing = false
      redFleeingCounter = 0
    }
    // console.log(py + ' ' + px)
  }, speed)
}



//Blue
let plus2Interval = 0
let blueFleeing = false
let blueFleeingCounter = 0
function findPlus2Path(blueGhostPosition, ghostCSS){
  plus2Interval = setInterval(() => {
    let nextStep = 0
    let nextPath = 0
    const gx = blueGhostPosition % width
    const gy = Math.floor(blueGhostPosition / width)
    const px = path[edges(2)] % width
    const py = Math.floor(path[edges(2)] / width)
    cells[blueGhostPosition].classList.remove(ghostCSS)
    cells[blueGhostPosition].classList.remove('fleeing')
    //calculate quickest path 
    const arrayCopy = rowArray.map((arr) => {
      return [...arr]
    })
    if (blueFleeing) {
      blueFleeingCounter += 1
      console.log(blueFleeingCounter)
      if (py <= 8 && px <= 8) {
        arrayCopy[6][7] = 'Goal'
      } else {
        arrayCopy[1][1] = 'Goal'
      }
      nextPath = findShortestPath([gy,gx], arrayCopy)
      if (((gy * width) + gx) === (pacmanPosition)) {
        blueGhostPosition = 116
        audio('pacman_eatghost.wav')
        playerPoints += 250
        resetBlue()
      } else {
        nextStep = nextPath[0]
        if (nextStep === 'North') {
          blueGhostPosition -= width
        } else if (nextStep === 'South') {
          blueGhostPosition += width
        } else if (nextStep === 'West') {
          blueGhostPosition -= 1
        } else if (nextStep === 'East') {
          blueGhostPosition += 1
        }
        cells[blueGhostPosition].classList.add('fleeing')
      }
    } else {
      arrayCopy[py][px] = 'Goal'
      nextPath = findShortestPath([gy,gx], arrayCopy)
      //move ghost
      cells[blueGhostPosition].classList.remove(ghostCSS)
      if (((gy * width) + gx) === (pacmanPosition)
      // || nextPath.length === 0
      ) {
        clearAndReset()
      } else {
        nextStep = nextPath[0]
        if (nextStep === 'North') {
          blueGhostPosition -= width
        } else if (nextStep === 'South') {
          blueGhostPosition += width
        } else if (nextStep === 'West') {
          blueGhostPosition -= 1
        } else if (nextStep === 'East') {
          blueGhostPosition += 1
        }
        cells[blueGhostPosition].classList.add(ghostCSS)
      }
    }
    if (blueFleeingCounter === 15) {
      blueFleeing = false
      blueFleeingCounter = 0
    }
    // console.log(py + ' ' + px)
  }, speed)
}

//Pink
let minus2Interval = 0
let pinkFleeing = false
let pinkFleeingCounter = 0
function findMinus2Path(pinkGhostPosition, ghostCSS){
  minus2Interval = setInterval(() => {
    let nextStep = 0
    let nextPath = 0
    const gx = pinkGhostPosition % width
    const gy = Math.floor(pinkGhostPosition / width)
    const px = path[edges(-2)] % width
    const py = Math.floor(path[edges(-2)] / width)
    cells[pinkGhostPosition].classList.remove(ghostCSS)
    cells[pinkGhostPosition].classList.remove('fleeing')
    //calculate quickest path 
    const arrayCopy = rowArray.map((arr) => {
      return [...arr]
    })
    if (pinkFleeing) {
      pinkFleeingCounter += 1
      console.log(pinkFleeingCounter)
      if (py > 8 && px > 8) {
        arrayCopy[9][7] = 'Goal'
      } else {
        arrayCopy[16][16] = 'Goal'
      }
      nextPath = findShortestPath([gy,gx], arrayCopy)
      if (((gy * width) + gx) === (pacmanPosition)) {
        pinkGhostPosition = 116
        audio('pacman_eatghost.wav')
        playerPoints += 250
        resetPink()
      } else {
        nextStep = nextPath[0]
        if (nextStep === 'North') {
          pinkGhostPosition -= width
        } else if (nextStep === 'South') {
          pinkGhostPosition += width
        } else if (nextStep === 'West') {
          pinkGhostPosition -= 1
        } else if (nextStep === 'East') {
          pinkGhostPosition += 1
        }
        cells[pinkGhostPosition].classList.add('fleeing')
      }
    } else {
      arrayCopy[py][px] = 'Goal'
      nextPath = findShortestPath([gy,gx], arrayCopy)
      //move ghost
      cells[pinkGhostPosition].classList.remove(ghostCSS)
      if (((gy * width) + gx) === (pacmanPosition)
      // || nextPath.length === 0
      ) {
        clearAndReset()
      } else {
        nextStep = nextPath[0]
        if (nextStep === 'North') {
          pinkGhostPosition -= width
        } else if (nextStep === 'South') {
          pinkGhostPosition += width
        } else if (nextStep === 'West') {
          pinkGhostPosition -= 1
        } else if (nextStep === 'East') {
          pinkGhostPosition += 1
        }
        cells[pinkGhostPosition].classList.add(ghostCSS)
      }
    }
    if (pinkFleeingCounter === 15) {
      pinkFleeing = false
      pinkFleeingCounter = 0
    }
    // console.log(py + ' ' + px)
  }, speed)
}

//Yellow path (switch)
let switchInterval = 0
let yellowFleeing = false
let yellowFleeingCounter = 0
function findSwitchPath(yellowGhostPosition, ghostCSS){
  let straight = 0
  let flee = 0
  switchInterval = setInterval(() => {
    let nextStep = 0
    let nextPath = 0
    const gx = yellowGhostPosition % width
    const gy = Math.floor(yellowGhostPosition / width)
    const px = pacmanPosition % width
    const py = Math.floor(pacmanPosition / width)
    cells[yellowGhostPosition].classList.remove(ghostCSS)
    cells[yellowGhostPosition].classList.remove('fleeing')
    //calculate quickest path 
    const arrayCopy = rowArray.map((arr) => {
      return [...arr]
    })
    if (yellowFleeing) {
      yellowFleeingCounter += 1
      console.log(yellowFleeingCounter)
      if (py > 8 && px <= 8) {
        arrayCopy[9][10] = 'Goal'
      } else {
        arrayCopy[16][1] = 'Goal'
      }
      nextPath = findShortestPath([gy,gx], arrayCopy)
      if (((gy * width) + gx) === (pacmanPosition)) {
        yellowGhostPosition = 116
        audio('pacman_eatghost.wav')
        playerPoints += 250
        resetYellow()
      } else {
        nextStep = nextPath[0]
        if (nextStep === 'North') {
          yellowGhostPosition -= width
        } else if (nextStep === 'South') {
          yellowGhostPosition += width
        } else if (nextStep === 'West') {
          yellowGhostPosition -= 1
        } else if (nextStep === 'East') {
          yellowGhostPosition += 1
        }
        cells[yellowGhostPosition].classList.add('fleeing')
      }
    } else {
      if (straight <= 20) {
        arrayCopy[py][px] = 'Goal'
        straight += 1
        console.log(straight)
      } else {
        console.log(flee)
        flee += 1
        if (py <= 8 && px <= 8) {
          arrayCopy[16][16] = 'Goal'
        } else if (py > 8 && px <= 8) {
          arrayCopy[1][16] = 'Goal'
        } else if (py <= 8 && px > 8) {
          arrayCopy[16][1] = 'Goal'
        } else if (py > 8 && px > 8) {
          arrayCopy[1][1] = 'Goal'
        }
        if (flee === 20) {
          straight = 0
        }
      }
      nextPath = findShortestPath([gy,gx], arrayCopy)
      //move ghost
      cells[yellowGhostPosition].classList.remove(ghostCSS)
      if (((gy * width) + gx) === (pacmanPosition)) {
        clearAndReset()
      } else {
        nextStep = nextPath[0]
        if (nextStep === 'North') {
          yellowGhostPosition -= width
        } else if (nextStep === 'South') {
          yellowGhostPosition += width
        } else if (nextStep === 'West') {
          yellowGhostPosition -= 1
        } else if (nextStep === 'East') {
          yellowGhostPosition += 1
        }
        cells[yellowGhostPosition].classList.add(ghostCSS)
      }
    }
    if (yellowFleeingCounter === 15) {
      yellowFleeing = false
      yellowFleeingCounter = 0
    }
    // console.log(py + ' ' + px)
  }, speed)
}
  



function clearAndReset() {
  audio('pacman_death.wav')
  document.querySelector('.grid').classList.add('death-blink')
  clearInterval(pacMvmt)
  clearInterval(straightInterval)
  clearInterval(plus2Interval)
  clearInterval(minus2Interval)
  clearInterval(switchInterval)
  setTimeout(() => {
    playerLives -= 1
    updateLives()
    checkGameOver()
    // resetPositions()
    document.querySelector('.grid').classList.remove('death-blink')
  }, 2000)
}

//edge cases (**NEEDS FIXING)
function edges(adaptValue) {
  if (path.indexOf(pacmanPosition) > 1 && path.indexOf(pacmanPosition) < (path.length - 2)) {
    return path.indexOf(pacmanPosition) + adaptValue
  } else if ((path.indexOf(pacmanPosition) + adaptValue) < 0) {
    return 0
  } else if ((path.indexOf(pacmanPosition) + adaptValue) > path.length) {
    return path.length - 1
  }
}

// console.log(path[path.length - 1])



//GAME OVER MESSAGE
function checkGameOver(){
  if (playerLives === 0) {
    if (confirm(`Game Over!\nYou got ${playerPoints} points.\nWould you like to play again?`)) {
      location.reload()
    }
  } else {
    resetPositions()
  }
}

//SOUNDS/MUTE
let mute = false
const muteButton = document.querySelector('.mute')
muteButton.addEventListener('click', () => {
  if (!mute) {
    mute = true
    document.querySelector('audio').muted = true
    document.querySelector('.mute').classList.add('soundoff')
  } else {
    mute = false
    document.querySelector('audio').muted = false
    document.querySelector('.mute').classList.remove('soundoff')
  }
})