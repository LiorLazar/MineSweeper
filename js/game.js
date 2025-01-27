'use strict'

// TODOS - GENERAL:
// DONE: create the model with matrix of gBoard and each cell has the following object for example: {minesAroundCount: 4,isShown: false,isMine: false,isMarked: true} 
// TODO: create the gLevel object - gLevel = {SIZE: 4, MINES: 2}
// TODO: create the Ggame Object - gGame = {isOn: false, shownCount: 0, markedCount: 0, secsPassed: 0}

// Model
var gBoard

const FLAG = '🚩'
const MINE = '*'

function onInit() {
    // TODO: Load The Game
    gBoard = buildBoard()
    renderBoard(gBoard)

}

function buildBoard() {
    // DONE: Builds the board.
    // DONE: Set Mines
    // TODO: Call setMinesNegsCount()
    // DONE: Return the created board.
    const size = 4
    const board = createMat(size)
    for (var i = 0; i < board.length; i++) {
        for (var j = 0; j < board[0].length; j++) {
            board[i][j] = { minesAroundCount: 0, isShown: false, isMine: false, isMarked: false }
        }
    }

    board[0][0].isMine = true
    board[1][1].isMine = true
    board[2][2].isMine = true
    board[3][3].isMine = true

    return board
}

function onCellClicked(elCell, i, j) {
    // TODO: Called When a cell is clicked
    elCell.classList.remove('invisible')
}

function onCellMarked(elCell) {
    // TODO: Called when a cell is right-clicked
    // DONE: Check how to hide the context menu on right click.
    elCell.classList.toggle('flag')
    document.querySelector('.flag').innerHTML = FLAG

}

function checkGameOver() {
    // TODO: Game ends when all mines are marked, and all the other cells are shown.
}

function expandShown(board, elCell, i, j) {
    // TODO: When User Clicks a cell with no mines aro8und, we need to open not only that cell, but also its neigbors.
    // NOTE: Start with a basic implementation that only opens the non-mine 1st degree neighbors.
}