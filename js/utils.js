'use strict'

function createMat(size) {
    var mat = []
    for (var i = 0; i < size; i++) {
        mat[i] = []
        for (var j = 0; j < size; j++) {
            mat[i][j] = 1
        }
    }
    return mat
}

function renderBoard(mat) {
    var strHTML = ''
    for (var i = 0; i < mat.length; i++) {
        strHTML += '<tr>'
        for (var j = 0; j < mat[i].length; j++) {
            if (mat[i][j].minesAroundCount === '*') strHTML += `<td>${mat[i][j].minesAroundCount} </td>`
            else strHTML += `<td>${setMinesNegsCount(i, j)} </td>`
        }
        strHTML += '</tr>'
    }
    const elBoard = document.querySelector('.board')
    elBoard.innerHTML = strHTML
}

function setMinesNegsCount(cellI, cellJ) {
    // DONE: Count mins around each cell and set the cell's mineAroundCount.
    var minesCount = 0
    for (var i = cellI - 1; i <= cellI + 1; i++) {
        if (i < 0 || i >= gBoard.length) continue
        for (var j = cellJ - 1; j <= cellJ + 1; j++) {
            if (i === cellI && j === cellJ) continue
            if (j < 0 || j >= gBoard[i].length) continue
            if (gBoard[i][j].minesAroundCount === '*') minesCount++
        }
    }
    return minesCount
}