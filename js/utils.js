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
            strHTML += `<td>${mat[i][j].MinesAroundCount} </td>`
        }
        strHTML += '</tr>'
    }
    const elBoard = document.querySelector('.board')
    elBoard.innerHTML = strHTML
}