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
