'use strict'

// Model
var gBoard
var gGame
var gTimerInterval

const FLAG = '🚩'
const MINE = '💣'

function onInit() {
    setDifficulty('beginner')
    startGame()
    renderSafeClicksCount()
}

function resetGame() {
    const defaultLives = gGame && gGame.level ? (gGame.level.SIZE === 4 ? 2 : 3) : 2
    gGame = {
        isOn: true,
        shownCount: 0,
        markedCount: 0,
        secsPassed: 0,
        lives: defaultLives,
        hints: 3,
        isHintActive: false,
        isFirstClick: true,
        level: gGame ? gGame.level : { SIZE: 4, MINES: 2 },
        difficulty: 'Beginner',
        safeClicks: 3
    }
    gBoard = buildBoard()
}

function startGame() {
    resetGame()
    renderBoard(gBoard)
    renderLives()
    renderHints()
    renderSmiley('😃')
}

function buildBoard() {
    const size = gGame.level.SIZE
    const board = createMat(size)
    for (var i = 0; i < board.length; i++) {
        for (var j = 0; j < board[0].length; j++) {
            board[i][j] = { minesAroundCount: 0, isShown: false, isMine: false, isMarked: false }
        }
    }
    return board
}

function onCellClicked(elCell, i, j) {
    console.log(`Cell clicked: (${i}, ${j})`)
    if (!gGame.isOn) return
    var cell = gBoard[i][j]
    if (cell.isMarked || cell.isShown) return

    if (gGame.isHintActive) {
        revealHint(i, j)
        gIsHintActive = false
        const activeHint = document.querySelector(`.hint.active`)
        if (activeHint) activeHint.classList.remove('active')
        else console.log('Active hint element not found')
        return
    }

    if (gGame.isFirstClick) {
        gGame.isFirstClick = false
        placeMines(gBoard, gGame.level.MINES, { i, j })
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
        gGame.lives--
        renderLives()
        console.log(`Mine clicked: Lives left ${gGame.lives}`)
    }
    checkGameOver()
}

function onHintClicked(elHint) {
    if (!gGame.isOn || gGame.hints === 0) return
    gIsHintActive = true
    elHint.classList.add('active')
    // console.dir(elHint)
    // console.log('Hint mode activated. Click on a cell to reveal.')
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
    gGame.hints--
    renderHints()

    setTimeout(() => {
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
        // gBestTime = document.querySelector('.timer').innerHTML
        // storeData(gBestTime)
        alert('Game Over: You Win!')
        setDifficulty(gGame.difficulty)

    } else if (gGame.lives === 0) {
        renderSmiley('🤯')
        gGame.isOn = false
        clearInterval(gTimerInterval)
        showMines()
        alert('Game Over: You Lose!')
        // setDifficulty(gGame.difficulty)
    }



    if (allMinesMarked && allCellsShown) {
        renderSmiley('😎')
        gGame.isOn = false
        clearInterval(gTimerInterval)
        alert('Game Over: You Win!')
        // setDifficulty(gGame.difficulty)
    }

}

function expandShown(board, cellI, cellJ) {
    for (var i = cellI - 1; i <= cellI + 1; i++) {
        if (i < 0 || i >= board.length) continue
        for (var j = cellJ - 1; j <= cellJ + 1; j++) {
            if (j < 0 || j >= board[0].length) continue
            if (i === cellI && j === cellJ) continue
            const cell = board[i][j]
            var elNeighborCell = document.querySelector(`.cell-${i}-${j}`)
            if (!cell.isShown && !cell.isMine) {
                elNeighborCell.classList.remove('invisible')
                cell.isShown = true
                gGame.shownCount++
                elNeighborCell.innerText = cell.minesAroundCount === 0 ? '' : cell.minesAroundCount
                if (cell.minesAroundCount === 0) expandShown(board, i, j)
            }
        }
    }
}

function safeClick() {
    if (!gGame.isOn) return
    if (gGame.safeClicks === 0) {
        alert('No more safe clicks available')
        return
    }

    const safeCells = []
    for (var i = 0; i < gBoard.length; i++) {
        for (var j = 0; j < gBoard[i].length; j++) {
            const cell = gBoard[i][j]
            if (!cell.isMine && !cell.isShown) safeCells.push({ i, j })
        }
    }

    if (safeCells.length === 0) {
        alert('No safe cells to click')
        return
    }

    var randomCell = getRandomIntInclusive(0, safeCells.length - 1)
    console.log("🚀 ~ safeClick ~ randomCell:", randomCell)
    var randomCellClass = getCellLocation(safeCells[randomCell].i, safeCells[randomCell].j)
    console.log("🚀 ~ safeClick ~ randomCellClass:", randomCellClass)
    var elCell = document.querySelector(`.${randomCellClass}`)
    elCell.style.backgroundColor = 'lightgreen'
    console.log("🚀 ~ safeClick ~ elCell:", elCell)
    gGame.safeClicks--
    renderSafeClicksCount()

    setTimeout(() => {
        elCell.style.backgroundColor = 'grey'
    }, 1000);
}   