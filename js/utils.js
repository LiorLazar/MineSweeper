'use strict'

function createMat(size) {
    var mat = []
    for (var i = 0; i < size; i++) {
        mat.push([])
        for (var j = 0; j < size; j++) {
            mat[i][j] = ''
        }
    }
    return mat
}

function renderBoard(board) {
    var strHTML = '<button onclick=onInit() class="smiley"></button><table><tbody>'
    for (var i = 0; i < board.length; i++) {
        strHTML += '<tr>'
        for (var j = 0; j < board[0].length; j++) {
            const cell = board[i][j]
            const className = `cell cell-${i}-${j}`
            var cellContent = cell.isMine ? MINE : (cell.minesAroundCount === 0 ? '' : cell.minesAroundCount)
            strHTML += `<td 
                        class="${className} invisible" 
                        onclick="onCellClicked(this, ${i}, ${j})" 
                        oncontextmenu="onCellMarked(this, ${i}, ${j}); return false;">
                        ${cellContent}
                        </td>`
        }
        strHTML += '</tr>'
    }
    strHTML += '</tbody></table>'
    const elBoard = document.querySelector('.board')
    elBoard.innerHTML = strHTML
}

function setDifficulty(difficulty) {
    const elBoard = document.querySelector('.board')
    elBoard.className = 'board'
    switch (difficulty) {
        case 'Beginner':
            gGame.difficulty = 'Beginner'
            gGame.level = { SIZE: 4, MINES: 2 }
            gGame.lives = 2
            elBoard.classList.add('beginner')
            break
        case 'Medium':
            gGame.difficulty = 'Medium'
            gGame.level = { SIZE: 8, MINES: 14 }
            console.log(gGame.level)
            gGame.lives = 3
            elBoard.classList.add('medium')
            break
        case 'Expert':
            gGame.difficulty = 'Expert'
            gGame.level = { SIZE: 12, MINES: 32 }
            gGame.lives = 3
            elBoard.classList.add('expert')
            break
    }
    startGame()
}

function renderLives() {
    var elLives = document.querySelector('.lives')
    var strHTML = ''
    strHTML += '<div>'
    for (var i = 0; i < gGame.lives; i++) {
        strHTML += '♥️'
    }
    strHTML += '</div>'
    elLives.innerHTML = strHTML
}

function renderHints() {
    var elHints = document.querySelector('.hints')
    var strHTML = ''
    strHTML += '<div>'
    for (var i = 1; i < gGame.hints + 1; i++) {
        strHTML += `<button class=hint onclick=onHintClicked(this)>💡</button>`
    }
    strHTML += '</div>'
    elHints.innerHTML = strHTML
}

function renderSmiley(smiley) {
    var elSmiley = document.querySelector('.smiley')
    elSmiley.innerHTML = smiley
}

function renderSafeClicksCount() {
    var elSafeClicks = document.querySelector('.safe-clicks')
    var strHTML = ''
    strHTML += `<div>${gGame.safeClicks} clicks available </div>`
    elSafeClicks.innerHTML = strHTML
}

function renderCell(location, value) {
    const elCell = document.querySelector(`.cell-${location.i}-${location.j}`)
    elCell.innerHTML = value
}

function setMinesNegsCount(board) {
    for (var i = 0; i < board.length; i++) {
        for (var j = 0; j < board[0].length; j++) {
            board[i][j].minesAroundCount = countMinesAround(board, i, j)
        }
    }
}

function countMinesAround(board, row, col) {
    var count = 0
    for (var i = row - 1; i <= row + 1; i++) {
        if (i < 0 || i >= board.length) continue
        for (var j = col - 1; j <= col + 1; j++) {
            if (j < 0 || j >= board[0].length) continue
            if (i === row && j === col) continue
            if (board[i][j].isMine) count++
        }
    }
    return count
}

function countEmptyCells(board) {
    var emptyCells = []
    for (var i = 0; i < board.length; i++) {
        for (var j = 0; j < board[0].length; j++) {
            if (!board[i][j].isMine && !board[i][j].isShown) {
                emptyCells.push({ i, j })
            }
        }
    }
    return emptyCells
}

function getRandomPos(emptyCells) {
    var randomIdx = Math.floor(Math.random() * emptyCells.length)
    return emptyCells[randomIdx]
}

function getRandomIntInclusive(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min
}

function countCells(board) {
    var count = 0
    for (var i = 0; i < board.length; i++) {
        for (var j = 0; j < board[i].length; j++) {
            count++
        }
    }
    return count
}

function getCellLocation(i, j) {
    return `cell-${i}-${j}`
}

function startTimer() {
    var elTimer = document.querySelector('.timer')
    var startTime = Date.now()
    gTimerInterval = setInterval(function () {
        var timePassed = Date.now() - startTime
        elTimer.innerText = (timePassed / 1000).toFixed(3)
    }, 1)
}

function showMines() {
    for (var i = 0; i < gBoard.length; i++) {
        for (var j = 0; j < gBoard[i].length; j++) {
            const cell = gBoard[i][j]
            if (cell.isMine) {
                var elCell = document.querySelector(`.cell-${i}-${j}`)
                elCell.classList.remove('invisible')
                // elCell.innerText = MINE
            }
        }
    }
}