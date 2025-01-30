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
    var strHTML = '<table border="0"><tbody>'
    for (var i = 0; i < board.length; i++) {
        strHTML += '<tr>'
        for (var j = 0; j < board[0].length; j++) {
            var cell = board[i][j]
            var className = `cell cell-${i}-${j}`
            var cellContent = cell.isMine ? MINE : cell.minesAroundCount
            strHTML += `<td 
                        class="${className} invisible" 
                        onclick="onCellClicked(this, ${i}, ${j})">
                        ${cellContent}
                        </td>`
        }
        strHTML += '</tr>'
    }
    strHTML += '</tbody></table>'
    const elBoard = document.querySelector('.board')
    elBoard.innerHTML = strHTML
}

function renderCell(location, value) {
    // Select the elCell and set the value
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
    var res = []
    for (var i = 0; i < board.length; i++) {
        for (var j = 0; j < board[0].length; j++) {
            if (board[i][j].minesAroundCount == '') res.push({ i, j })
        }
    }
    if (res.length === 0) return null
    return res
}

function getRandomPos(emptyCells) {
    var randPos = getRandomIntInclusive(0, emptyCells.length - 1)
    var drawnPos = emptyCells[randPos]
    emptyCells.splice(randPos, 1)
    return drawnPos
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