'use strict'

// TODOS - GENERAL:
// DONE: create the model with matrix of gBoard and each cell has the following object for example: {minesAroundCount: 4,isShown: false,isMine: false,isMarked: true} 
// DONE: create the gLevel object - gLevel = {SIZE: 4, MINES: 2}
// DONE: create the Ggame Object - gGame = {isOn: false, shownCount: 0, markedCount: 0, secsPassed: 0}

// Model
var gBoard
var gIsFirstClick
var gGame
var gLevel

const FLAG = '🚩'
const MINE = '💣'

function onInit() {
    gBoard = buildBoard()
    renderBoard(gBoard)
    gIsFirstClick = true
    gGame = {
        isOn: true,
        shownCount: 0,
        markedCount: 0,
        secsPassed: 0
    }
    gLevel = {
        SIZE: 4,
        MINES: 2
    }
}

function buildBoard() {
    // DONE: Builds the board.
    // DONE: Set Mines
    // DONE: Call setMinesNegsCount()
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

    setMinesNegsCount(board)
    return board
}

function onCellClicked(elCell, i, j) {
    if (!gGame.isOn) return
    var cell = gBoard[i][j]

    if (cell.isMarked || cell.isShown) return

    elCell.classList.remove('invisible')
    cell.isShown = true
    gGame.shownCount++

    if (cell.isMine) {
        elCell.innerText = MINE
        gGame.isOn = false
        console.log('Game Over: You clicked on a mine!')
    } else {
        elCell.innerText = cell.minesAroundCount === 0 ? '' : cell.minesAroundCount
        if (cell.minesAroundCount === 0) {
            expandShown(gBoard, elCell, i, j)
        }
    }
    checkGameOver()
}

function onCellMarked(elCell, i, j) {
    if (!gGame.isOn) return
    var cell = gBoard[i][j]

    if (cell.isShown) return

    if (!cell.isMarked) {
        elCell.classList.remove('invisible')
        cell.isMarked = true
        elCell.innerText = FLAG
        gGame.markedCount++
    } else {
        elCell.classList.add('invisible')
        cell.isMarked = false
        elCell.innerText = ''
        gGame.markedCount--
    }
    checkGameOver()
}

function checkGameOver() {
    var allMinesMarked = true
    var allCellsShown = true

    for (var i = 0; i < gBoard.length; i++) {
        for (var j = 0; j < gBoard[0].length; j++) {
            var cell = gBoard[i][j]
            if (cell.isMine && !cell.isMarked) {
                allMinesMarked = false
            }
            if (!cell.isMine && !cell.isShown) {
                allCellsShown = false
            }
        }
    }
    if (allMinesMarked && allCellsShown) {
        gGame.isOn = false
        console.log('Game Over: You Win!')
    }
}

function expandShown(board, cellI, cellJ) {
    for (var i = cellI - 1; i <= cellI + 1; i++) {
        if (i < 0 || i >= board.length) continue
        for (var j = cellJ - 1; j <= cellJ + 1; j++) {
            if (j < 0 || j >= board[0].length) continue
            if (i === cellI && j === cellJ) continue
            var cell = board[i][j]
            var elNeighborCell = document.querySelector(`.cell-${i}-${j}`)
            if (!cell.isShown && !cell.isMine) {
                elNeighborCell.classList.remove('invisible')
                cell.isShown = true
                gGame.shownCount++
                elNeighborCell.innerText = cell.minesAroundCount === 0 ? '' : cell.minesAroundCount
                if (cell.minesAroundCount === 0) {
                    expandShown(board, elNeighborCell, i, j)
                }
            }
        }
    }
}