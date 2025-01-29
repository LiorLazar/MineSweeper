'use strict'

var gMines = []

function createMine() {
    var emptyCells = countEmptyCells(gBoard)
    if (!emptyCells) return null
    var randomCell = getRandomPos(emptyCells)
    gBoard[randomCell.i][randomCell.j].isMine = true
    renderBoard(gBoard)
}

function createMines(amount) {
    for (var i = 0; i < amount; i++) {
        createMine()
    }
}