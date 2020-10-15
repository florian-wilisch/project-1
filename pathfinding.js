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