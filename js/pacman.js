'use strict'

const PACMAN = 'ᗤ'
var gPacman

function createPacman(board) {
    gPacman = {
        location: {
            i: 3,
            j: 5
        },
        isSuper: false,
        direction : 90
    }
    board[gPacman.location.i][gPacman.location.j] = PACMAN
}

function movePacman(ev) {
    if (!gGame.isOn) return
    if(!isFood()) gameOver()

    const nextLocation = getNextLocation(ev)

    if (!nextLocation) return

    var nextCell = gBoard[nextLocation.i][nextLocation.j]


    if (nextCell === WALL) return
    if (nextCell === POWER_FOOD && !gPacman.isSuper) superMode()
    if (nextCell === FOOD) updateScore(1)
    if (nextCell === CHERRY) updateScore(10)
    if (nextCell === GHOST && gPacman.isSuper) eatGhost(nextLocation)
    else if (nextCell === GHOST && !gPacman.isSuper) {
        gameOver()
        renderCell(gPacman.location, EMPTY)
        return
    }

    // update the model
    gBoard[gPacman.location.i][gPacman.location.j] = EMPTY

    // update the DOM
    renderCell(gPacman.location, EMPTY)

    // update the model
    gPacman.location = nextLocation
    gBoard[gPacman.location.i][gPacman.location.j] = PACMAN
    
    // update the DOM
    renderCell(gPacman.location, getPacmanHTML())
}

function superMode(){
    // console.log("super")
    gPacman.isSuper = true
    const timeout = setTimeout(noSuper, 5000)
}

function noSuper(){
    // console.log("no super")
    gPacman.isSuper = false
    if(!gRemovedGhosts.length) return
    gGhosts = [...gGhosts ,...gRemovedGhosts]
    gRemovedGhosts = []
}

function eatGhost(nextLocation){
    console.log(nextLocation)
        for (var i = 0; i < gGhosts.length; i++) {
            if (gGhosts[i].location.i === nextLocation.i && gGhosts[i].location.j === nextLocation.j) {
                gRemovedGhosts.push(gGhosts[i])
                gGhosts.splice(i, 1)
            }
        }
}

function getPacmanHTML() {
    return `<div style="transform: rotate(${gPacman.direction}deg);">${PACMAN}</div>`
}


function getNextLocation(eventKeyboard) {
    var nextLocation = {
        i: gPacman.location.i,
        j: gPacman.location.j
    }
    switch (eventKeyboard.code) {
        case 'ArrowUp':
            nextLocation.i--;
            gPacman.direction = 90
            break;
        case 'ArrowDown':
            nextLocation.i++;
            gPacman.direction = 280
            break;
        case 'ArrowLeft':
            nextLocation.j--;
            gPacman.direction = 0
            break;
        case 'ArrowRight':
            nextLocation.j++;
            gPacman.direction = 180
            break;
        default:
            return null;
    }
    return nextLocation;
}