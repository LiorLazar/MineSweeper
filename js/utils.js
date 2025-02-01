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
            var cell = board[i][j]
            var className = `cell cell-${i}-${j}`
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
    strHTML += '<div class="lives"></div>'
    strHTML += '<button onclick="setDifficulty(this)">Beginner</button>'
    strHTML += '<button onclick="setDifficulty(this)">Medium</button>'
    strHTML += '<button onclick="setDifficulty(this)">Expert</button>'
    const elBoard = document.querySelector('.board')
    elBoard.innerHTML = strHTML
}

function setDifficulty(elBtn) {
    var difficulty = elBtn.innerText
    switch (difficulty) {
        case 'Beginner':
            gLevel = { SIZE: 4, MINES: 2 }
            break
        case 'Medium':
            gLevel = { SIZE: 8, MINES: 14 }
            break
        case 'Expert':
            gLevel = { SIZE: 12, MINES: 32 }
            break
    }
    onInit()
}

function renderLives() {
    var elBoard = document.querySelector('.lives')
    var strHTML = ''
    strHTML += '<div>'
    for (var i = 0; i < gLives; i++) {
        strHTML += '♥️'
    }
    strHTML += '</div>'
    elBoard.innerHTML = strHTML
}

function renderSmiley(smiley) {
    var elSmiley = document.querySelector('.smiley')
    elSmiley.innerHTML = smiley
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