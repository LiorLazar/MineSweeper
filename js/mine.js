'use strict'

function placeMines(board, amount, firstClickPos) {
    var emptyCells = countEmptyCells(board)

    var filteredCells = []
    for (var i = 0; i < emptyCells.length; i++) {
        var cell = emptyCells[i]
        if (cell.i !== firstClickPos.i || cell.j !== firstClickPos.j) {
            filteredCells.push(cell)
        }
    }
    emptyCells = filteredCells

    for (var i = 0; i < amount; i++) {
        var randomIdx = Math.floor(Math.random() * emptyCells.length)
        var randomCell = emptyCells[randomIdx]
        board[randomCell.i][randomCell.j].isMine = true

        emptyCells.splice(randomIdx, 1)
    }
}