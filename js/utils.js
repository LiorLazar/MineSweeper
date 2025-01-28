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

            const className = `cell cell-${i}-${j}`

            var isMineStr = mat[i][j].isMine ? MINE : setMinesNegsCount(i, j)
            if (mat[i][j].isMine) strHTML += `<td class="${className} invisible" onclick="onCellClicked(this,${i},${j})" oncontextmenu="onCellMarked(this); return false;">${isMineStr}</td>`
            else {
                strHTML += `<td class="${className} invisible" onclick="onCellClicked(this,${i},${j})" oncontextmenu="onCellMarked(this); return false;">${isMineStr} </td>`
                gBoard[i][j].minesAroundCount = setMinesNegsCount(i, j)
            }
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
            if (gBoard[i][j].isMine) minesCount++
        }
    }
    if (minesCount === 0) return ''
    return minesCount
}

function countEmptyCells(board) {
    var res = []
    for (var i = 0; i < board.length; i++) {
        for (var j = 0; j < board[0].length; j++) {
            if (board[i][j] !== MINE) res.push({ i, j })
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
function createMine() {
    var emptyCells = countEmptyCells(gBoard)
    if (!emptyCells) return null
    var randomCell = getRandomPos(emptyCells)
    gBoard[randomCell.i][randomCell.j].isMine = true
    renderBoard(gBoard)
}

function getRandomIntInclusive(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min
}