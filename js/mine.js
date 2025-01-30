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

function countMines(board) {
    var count = 0
    for (var i = 0; i < board.length; i++) {
        for (var j = 0; j < board.length; j++) {
            if (board[i][j].isMine) count++
        }
    }
    return count
}