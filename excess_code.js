// const wall = [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,26,27,35,36,38,39,40,41,42,44,45]

//--------------------

// let i = 1
// while (i > 0) {
//   cells[pacmanPosition].classList.remove('pacman')
//   cells[pacmanPosition].style.backgroundImage = 'none'
//   pacmanPosition += 1
//   cells[pacmanPosition].classList.add('pacman')
//   // console.log(cells[pacmanPosition + 1].classList.contains('wall'))
//   i++
//   if (cells[pacmanPosition + 1].classList.contains('wall')) {
//     i = 0
//   }
// }


//------------------

//PATHFINDING with EasystarJS
// ex 115 -> 210

// var easystarjs = require('easystarjs')
// var easystar = new easystarjs.js()
// // var easystar = new EasyStar.js()

// easystar.setGrid(rowArray)
// easystar.setAcceptableTiles([0])

// easystar.findPath(7, 6, 12, 11, function( path ) {
//   if (path === null) {
//     alert('Path was not found.')
//   } else {
//     alert('Path was found. The first Point is ' + path[0].x + ' ' + path[0].y)
//   }
// })
// easystar.calculate()

//PATHFINDING with Breadth-First (Wikipedia)
// let root = [(2, 1)]
// let goal = [(2, 4)]
// G = rowArray
// function bfs(G, root) {
//   let Q = []
//   // root = 'discovered'
//   Q.push(root)
//   while (Q !== []) {
//     let v = Q.shift()
//     if (v = goal) {
//       return v
//     }
    
//   }
// }


//---------------------

//--------------------------------
// Create a 4x4 grid
// Represent the grid as a 2-dimensional array
// var gridSize = 4
// var testGrid = []
// for (var i = 0; i < gridSize; i++) {
//   testGrid[i] = []
//   for (var j = 0; j < gridSize; j++) {
//     testGrid[i][j] = 'Empty'
//   }
// }

// testGrid[0][0] = 'Start'
// testGrid[2][2] = 'Goal'

// testGrid[1][1] = 'Obstacle'
// testGrid[1][2] = 'Obstacle'
// testGrid[1][3] = 'Obstacle'
// testGrid[2][1] = 'Obstacle'

// console.log(testGrid)
//-----------------------------------

//CellNum to coordinates
function cell2Coordinates(cellNum) {
  let x = cellNum % width
  let y = Math.floor(cellNum / width)
  return coordinates = [x , y]
}

//Coordinates to CellNum
function coordinates2Cell(x, y) {
  return cellNum = (y * width) + x
}
// console.log(cell2Coordinates(207))


//---------


// function findPath(){
  ghostsInterval = setInterval(() => {
    const bgx = blueGhostPostion % width
    const bgy = Math.floor(blueGhostPostion / width)
    const px = pacmanPosition % width
    const py = Math.floor(pacmanPosition / width)
    //calculate quickest path 
    const arrayCopy = rowArray.map((arr) => {
      return [...arr]
    })
    arrayCopy[py][px] = 'Goal'
  //check first run 
    // if (checkFirst) {
    //   checkFirst = false
    nextPath = findShortestPath([bgy,bgx], arrayCopy)
    // }
  //move ghost
    cells[blueGhostPostion].classList.remove('blue-ghost')
    nextStep = nextPath[0]
    // console.log(nextPath)
    if (nextStep === 'North') {
      blueGhostPostion -= width
    } else if (nextStep === 'South') {
      blueGhostPostion += width
    } else if (nextStep === 'West') {
      blueGhostPostion -= 1
    } else if (nextStep === 'East') {
      blueGhostPostion += 1
    }
    cells[blueGhostPostion].classList.add('blue-ghost')
    // nextPath.pop()
    if (blueGhostPostion === pacmanPosition || nextPath.length === 0) {
      clearInterval(ghostsInterval)
    }
  }, 350)
  // }
  // findPath()


// //-------------------------
// //GHOST MOVEMENT
// const up = ' - width'
// const down = ' + width'
// const left = ' - 1'
// const right = ' + 1'
// const ghostDirections = [up,left,down,right]
// // let position1
// // let position2
// let rdmDireString = 0
// let blueGhostMvmt = 0
// // position1 = blueGhostPostion
// function generateRdmDirect1(){
//   rdmDireString = ghostDirections[Math.floor(Math.random() * 4)]
//   console.log(rdmDireString)
//   blueGhostMvmt = setInterval(() => {
//     if (!cells[eval(blueGhostPostion + rdmDireString)].classList.contains('wall')) {
//       cells[blueGhostPostion].classList.remove('blue-ghost')
//       blueGhostPostion = eval(blueGhostPostion + rdmDireString)
//       cells[blueGhostPostion].classList.add('blue-ghost')
//     } else {
//       generateRdmDirect2()
//       clearInterval(blueGhostMvmt)
//     }
//   }, 350)
// }
// function generateRdmDirect2(){
//   rdmDireString = ghostDirections[Math.floor(Math.random() * 4)]
//   console.log(rdmDireString)
//   blueGhostMvmt = setInterval(() => {
//     if (!cells[eval(blueGhostPostion + rdmDireString)].classList.contains('wall')) {
//       cells[blueGhostPostion].classList.remove('blue-ghost')
//       blueGhostPostion = eval(blueGhostPostion + rdmDireString)
//       cells[blueGhostPostion].classList.add('blue-ghost')
//     } else {
//       clearInterval(blueGhostMvmt)
//       generateRdmDirect1()
//     }
//   }, 350)
// }
// // generateRdmDirect1()
// //-----------------------------


//rebuild grid
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



      
//------------
      //FLEEING BEHAVIOUR
// let fleeingInterval = 0
// function fleeingPath(redGhostPosition, ghostCSS){
//   fleeingInterval = setInterval(() => {
//     fleeingInterval += 1  
//     if (fleeingInterval > 15) {
//       clearInterval(fleeingInterval)
//       findStraightPath(redGhostPosition, 'red-ghost')
//       // findPlus2Path(blueGhostPosition, 'blue-ghost')
//       // findMinus2Path(pinkGhostPosition, 'pink-ghost')
//       // findSwitchPath(yellowGhostPosition, 'yellow-ghost')
//     } else {
//       let nextStep = 0
//       let nextPath = 0
//       const gx = redGhostPosition % width
//       const gy = Math.floor(redGhostPosition / width)
//       const px = pacmanPosition % width
//       const py = Math.floor(pacmanPosition / width)
//       console.log((gy * width) + gx)
//       console.log((py * width) + px)
//       //calculate quickest path 
//       const arrayCopy = rowArray.map((arr) => {
//         return [...arr]
//       })
//       if (py <= 8 && px <= 8) {
//         arrayCopy[16][16] = 'Goal'
//       } else if (py > 8 && px <= 8) {
//         arrayCopy[1][16] = 'Goal'
//       } else if (py <= 8 && px > 8) {
//         arrayCopy[16][1] = 'Goal'
//       } else if (py > 8 && px > 8) {
//         arrayCopy[1][1] = 'Goal' 
//       }
//       // arrayCopy[py][px] = 'Goal'
//       nextPath = findShortestPath([gy,gx], arrayCopy)
//       console.log(nextPath)
//       //move ghost
//       cells[redGhostPosition].classList.remove(ghostCSS)
//       if (((gy * width) + gx) === ((py * width) + px) 
//       // || nextPath.length === 0
//       ) {
//         clearInterval(fleeingInterval)
//         clearInterval(pacMvmt)
//         playerLives -= 1
//       }
//       nextStep = nextPath[0]
//       if (nextStep === 'North') {
//         redGhostPosition -= width
//       } else if (nextStep === 'South') {
//         redGhostPosition += width
//       } else if (nextStep === 'West') {
//         redGhostPosition -= 1
//       } else if (nextStep === 'East') {
//         redGhostPosition += 1
//       }
//       cells[redGhostPosition].classList.add(ghostCSS)

//       console.log(fleeingInterval)
//     }
//   }, speed)
// }
// fleeingPath(pinkGhostPosition, 'pink-ghost')