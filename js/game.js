'use strict'

// TODOS - GENERAL:
// TODO: create the model with matrix of gBoard and each cell has the following object for example: {minesAroundCount: 4,isShown: false,isMine: false,isMarked: true} 
// TODO: create the gLevel object - gLevel = {SIZE: 4, MINES: 2}
// TODO: create the Ggame Object - gGame = {isOn: false, shownCount: 0, markedCount: 0, secsPassed: 0}
var gBoard
// = [
//     [{ MinesAroundCount: 1, isShown: false, isMine: false, isMarked: true }],
//     [{ MinesAroundCount: 1, isShown: false, isMine: false, isMarked: true }],
//     [{ MinesAroundCount: 1, isShown: false, isMine: false, isMarked: true }],
//     [{ MinesAroundCount: 1, isShown: false, isMine: false, isMarked: true }]
// ]

function onInit() {
    // TODO: Load The Game
    gBoard = buildBoard()
    renderBoard(gBoard)
}

function buildBoard() {
    // TODO: Builds the board.
    // TODO: Set Mines
    // TODO: Call setMinesNegsCount()
    // TODO: Return the created board.
    const board = createMat(4)
    for (var i = 0; i < board.length; i++) {
        for (var j = 0; j < board[i].length; j++) {
            board[i][j] = { MinesAroundCount: 1, isShown: false, isMine: false, isMarked: true }
        }
    }
    return board
}

function setMinesNegsCount(board) {
    // TODO: Count mins around each cell and set the cell's mineAroundCount.
}

function onCellClicked(elCell, i, j) {
    // TODO: Called When a cell is clicked
}

function onCellMarked(elCell) {
    // TODO: Called when a cell is right-clicked
    // TODO: Check how to hide the context menu on right click.
}

function checkGameOver() {
    // TODO: Game ends when all mines are marked, and all the other cells are shown.
}

function expandShown(board, elCell, i, j) {
    // TODO: When User Clicks a cell with no mines aro8und, we need to open not only that cell, but also its neigbors.
    // NOTE: Start with a basic implementation that only opens the non-mine 1st degree neighbors.
}