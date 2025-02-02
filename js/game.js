'use strict'

// Model
var gBoard
var gIsFirstClick
var gGame
var gLevel = { SIZE: 4, MINES: 2 }
var gLives
var gTimerInterval

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
    gLives = 3
    renderLives()
    renderSmiley('😃')
}

function buildBoard() {
    const size = gLevel.SIZE
    const board = createMat(size)
    for (var i = 0; i < board.length; i++) {
        for (var j = 0; j < board[0].length; j++) {
            board[i][j] = { minesAroundCount: 0, isShown: false, isMine: false, isMarked: false }
        }
    }
    return board
}

function onCellClicked(elCell, i, j) {
    // console.log(`Cell clicked: (${i}, ${j})`)
    if (!gGame.isOn) return
    var cell = gBoard[i][j]
    if (cell.isMarked || cell.isShown) return

    if (gIsFirstClick) {
        gIsFirstClick = false
        placeMines(gBoard, gLevel.MINES, { i, j })
        setMinesNegsCount(gBoard)
        renderBoard(gBoard)
        renderLives()
        renderSmiley('😃')
        // console.log('First click: Mines placed and board rendered')
        elCell = document.querySelector(`.cell-${i}-${j}`)
        startTimer()
    }



    elCell.classList.remove('invisible')
    cell.isShown = true
    gGame.shownCount++

    if (!cell.isMine) {
        elCell.innerText = cell.minesAroundCount === 0 ? '' : cell.minesAroundCount
        if (cell.minesAroundCount === 0) {
            expandShown(gBoard, elCell, i, j)
        }
    }
    if (cell.isMine) {
        elCell.innerText = MINE
        gLives--
        // console.log('MINE')
        // console.log(`Lives: ${gLives}`)
        renderLives()
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

    if (gLives === 0) {
        renderSmiley('🤯')
        gGame.isOn = false
        alert('Game Over: You Lose!')
        clearInterval(gTimerInterval)
        // console.log('Game Over: You Lose!')
    }

    for (var i = 0; i < gBoard.length; i++) {
        for (var j = 0; j < gBoard[0].length; j++) {
            var cell = gBoard[i][j]
            if (cell.isMine && !cell.isMarked) {
                allMinesMarked = false
                // console.log(`Mine at (${i}, ${j}) is not marked`)
            }
            if (!cell.isMine && !cell.isShown) {
                allCellsShown = false
                // console.log(`Cell at (${i}, ${j}) is not shown`)
            }
        }
    }

    // console.log(`allMinesMarked: ${allMinesMarked}, allCellsShown: ${allCellsShown}`)

    if (allMinesMarked && allCellsShown) {
        renderSmiley('😎')
        gGame.isOn = false
        clearInterval(gTimerInterval)
        alert('Game Over: You Win!')
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
                if (cell.minesAroundCount === 0) expandShown(board, elNeighborCell, i, j)
            }
        }
    }
}

function startTimer() {
    var elTimer = document.querySelector('.timer')
    var startTime = Date.now()
    gTimerInterval = setInterval(function () {
        var timePassed = Date.now() - startTime
        elTimer.innerText = (timePassed / 1000).toFixed(3)
    }, 1)
}