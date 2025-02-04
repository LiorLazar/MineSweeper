'use strict'

// Model
var gBoard
var gIsFirstClick
var gGame
var gLevel = { SIZE: 4, MINES: 2 }
var gLives
var gTimerInterval
var gBestTime
var gHints
var gIsHintActive

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
    gHints = 3
    renderLives()
    renderHints()
    renderSmiley('😃')
    gIsHintActive = false
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

    if (gIsHintActive) {
        revealHint(i, j)
        gIsHintActive = false
        const activeHint = document.querySelector(`.hint.active`)
        if (activeHint) activeHint.classList.remove('active')
        else console.log('Active hint element not found')
        return
    }

    if (gIsFirstClick) {
        gIsFirstClick = false
        placeMines(gBoard, gLevel.MINES, { i, j })
        setMinesNegsCount(gBoard)
        renderBoard(gBoard)
        renderLives()
        renderHints()
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
            expandShown(gBoard, i, j)
        }
    } else {
        elCell.innerText = MINE
        gLives--
        renderLives()
        console.log(`Mine clicked: Lives left ${gLives}`)
    }
    checkGameOver()
}

function onHintClicked(elHint) {
    if (!gGame.isOn || gHints === 0) return
    gIsHintActive = true
    elHint.classList.add('active')
    console.dir(elHint)
    console.log('Hint mode activated. Click on a cell to reveal.')
}

function revealHint(cellI, cellJ) {
    for (var i = cellI - 1; i <= cellI + 1; i++) {
        if (i < 0 || i >= gBoard.length) continue
        for (var j = cellJ - 1; j <= cellJ + 1; j++) {
            if (j < 0 || j >= gBoard[0].length) continue
            var cell = gBoard[i][j]
            var elCell = document.querySelector(`.cell-${i}-${j}`)
            elCell.classList.remove('invisible')
            elCell.innerText = cell.isMine ? MINE : (cell.minesAroundCount === 0 ? '' : cell.minesAroundCount)
        }
    }
    gHints--
    renderHints()

    setTimeout(function () {
        for (var i = cellI - 1; i <= cellI + 1; i++) {
            if (i < 0 || i >= gBoard.length) continue
            for (var j = cellJ - 1; j <= cellJ + 1; j++) {
                if (j < 0 || j >= gBoard[0].length) continue
                var cell = gBoard[i][j]
                var elCell = document.querySelector(`.cell-${i}-${j}`)
                if (!cell.isShown) {
                    elCell.classList.add('invisible')
                    elCell.innerText = ''
                }
            }
        }
    }, 1000)
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

    if (allCellsShown) {
        renderSmiley('😎')
        gGame.isOn = false
        clearInterval(gTimerInterval)
        gBestTime = document.querySelector('.timer').innerHTML
        storeData(gBestTime)
        alert('Game Over: You Win!')
    } else if (gLives === 0) {
        renderSmiley('🤯')
        gGame.isOn = false
        clearInterval(gTimerInterval)
        gBestTime = document.querySelector('.timer').innerHTML
        storeData(gBestTime)
        alert('Game Over: You Lose!')
    }



    if (allMinesMarked && allCellsShown) {
        renderSmiley('😎')
        gGame.isOn = false
        clearInterval(gTimerInterval)
        gBestTime = document.querySelector('.timer').innerHTML
        storeData(gBestTime)
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