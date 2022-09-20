'use strict'

const WALL = '⛓️'
const FOOD = '.'
const EMPTY = ' '
const POWER_FOOD = '🍇'
const CHERRY = '🍒'

var gGame = {
    score: 0,
    isOn: false
}
var gBoard
var cherryInterval

function init() {
    hideModal()
    gBoard = buildBoard()
    createPacman(gBoard)
    createGhosts(gBoard)
    renderBoard(gBoard, '.board-container')
    gGame.isOn = true
    gGame.score = 0
    cherryInterval = setInterval(addCherry, 10000)
}

function buildBoard() {
    const SIZE = 10
    const board = []

    for (var i = 0; i < SIZE; i++) {
        board.push([])

        for (var j = 0; j < SIZE; j++) {
            board[i][j] = FOOD
            //regular wall

            // board[i][getRandomIntInclusive(i,SIZE)] = WALL
            // if (i === 0 || i === SIZE - 1 ||
            //     j === 0 || j === SIZE - 1 ||
            //     (j === 3 && i > 4 && i < SIZE - 2)) {

            //random wall position algo
            if (i === 0 || i === SIZE - 1 ||
                j === 0 || j === SIZE - 1) {
                board[i][j] = WALL
            }
        }
    }
    for(var k = 0; k < 15; k++){
        board[getRandomIntInclusive(2,7)][getRandomIntInclusive(2,7)] = WALL
    }
    board[1][1] = POWER_FOOD
    board[board.length - 2][1] = POWER_FOOD
    board[1][board[1].length - 2] = POWER_FOOD
    board[board.length - 2][board[1].length - 2] = POWER_FOOD
    return board
}

function updateScore(diff) {
    gGame.score += diff
    document.querySelector('h2 span').innerText = gGame.score
}

function gameOver() {
    console.log('Game Over')
    gGame.isOn = false
    clearInterval(gIntervalGhosts)
    clearInterval(cherryInterval)
    showModal()
}

function isFood() {
    // return gBoard.some(row => row.includes(FOOD));
    var counter = 0;
    for (var i = 0; i < gBoard.length; i++) {
        for (var j = 0; j < gBoard[i].length; j++) {
            if (gBoard[i][j] === FOOD) counter++
        }
    }
    return counter
}

function addCherry() {
    var cell = getEmptyCell()
    if (!cell) return
    gBoard[cell.i][cell.j] = CHERRY
    renderCell(cell, CHERRY)
}

function showModal() {
    var elModal = document.querySelector(".modal")
    var str = (isFood()) ? 'Try again?' : 'You Won !'
    elModal.innerHTML = `<span>${str}</span><br><button onclick="init()">Restart Game</button>`
}

function hideModal() {
    var elModal = document.querySelector(".modal")
    elModal.innerHTML = ' '
}