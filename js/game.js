'use strict'

// TODOS - GENERAL:
// DONE: create the model with matrix of gBoard and each cell has the following object for example: {minesAroundCount: 4,isShown: false,isMine: false,isMarked: true} 
// TODO: create the gLevel object - gLevel = {SIZE: 4, MINES: 2}
// TODO: create the Ggame Object - gGame = {isOn: false, shownCount: 0, markedCount: 0, secsPassed: 0}

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
    console.log(gBoard)
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
    // TODO: Called When a cell is clicked
    if (!gGame.isOn) return
    if (gIsFirstClick) {
        gIsFirstClick = false
        // createMines(4)
    }
    elCell.classList.remove('invisible')
    gGame.shownCount++
    var pos = { i, j }
    if (gBoard[i][j].isMine) {
        renderCell(pos, MINE)
        checkGameOver()
    } else if (gBoard[i][j].minesAroundCount === 0) {
        console.log(gBoard[i][j].minesAroundCount)
        expandShown(gBoard, elCell, i, j)
    }
    // if (gBoard[i][j].minesAroundCount === 0) {
    // if (gBoard[i][j].minesAroundCount) {
    //     elCell.classList.remove('invisible')
    // }
    //     if (gBoard[i][j].isMine) return
    //     expandShown(gBoard, elCell, i, j)
    // }
}

function onCellMarked(elCell) {
    // DONE: Check how to hide the context menu on right click.
    // DONE: Called when a cell is right-clicked
    if (!gGame.isOn) return
    const classArr = []
    var arr = []

    var classId = elCell.classList[1]
    arr = classId.split('-')
    classArr.push(arr[1], arr[2])

    var cell = gBoard[classArr[0]][classArr[1]]

    if (!cell.isMarked) {
        elCell.classList.remove('invisible')
        cell.isMarked = true
        elCell.innerText = FLAG
        gGame.markedCount++
    } else {
        elCell.classList.add('invisible')
        cell.isMarked = false
        if (cell.isMine) {
            cell.isMarked = false
            elCell.innerText = MINE
            elCell.classList.add('invisible')
        } else {
            cell.isMarked = false
            elCell.innerText = cell.minesAroundCount
            elCell.classList.add('invisible')
        }
    }
}

function checkGameOver() {
    // TODO: Game ends when all mines are marked, and all the other cells are shown.
    if (countCells(gBoard) === gGame.shownCount && gLevel.MINES === countMines(gBoard)) gGame.isOn = false
}

function expandShown(board, elCell, cellI, cellJ) {
    // DONE: When User Clicks a cell with no mines aro8und, we need to open not only that cell, but also its neigbors.
    // NOTE: Start with a basic implementation that only opens the non-mine 1st degree neighbors.
    if (!gGame.isOn) return
    for (var i = cellI - 1; i <= cellI + 1; i++) {
        if (i < 0 || i >= board.length) continue
        for (var j = cellJ - 1; j <= cellJ + 1; j++) {
            if (i === cellI && j === cellJ) continue
            if (j < 0 || j >= board.length) continue
            if (board[i][j].isMine) continue

            var className = getCellLocation(i, j)
            elCell = document.querySelector(`.${className}`)
            elCell.classList.remove('invisible')
            gGame.shownCount++
        }
    }
}