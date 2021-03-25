const GRID_SIZE = 3;

const render = () => {

    let turn = 'X';
    let heading = document.querySelector('.display-status');
    let win;
    let tieCounter = 0;
    const winCombos = [
        [0, 1, 2],[3, 4, 5],[6, 7, 8],
        [0, 3, 6],[1, 4, 7],[2, 5, 8],
        [0, 4, 8],[2, 4, 6]];

    const checkWin = () => {
        tieCounter += 1;
        let grid = Array.from(document.querySelectorAll('#board div'));
        winCombos.forEach((combo) => {
            let i = 0;
            if ((grid[combo[i]].innerHTML !== '' && grid[combo[i]].innerHTML === grid[combo[i+1]].innerHTML) &&
            (grid[combo[i+1]].innerHTML !== '' && grid[combo[i+1]].innerHTML === grid[combo[i]].innerHTML) &&
            (grid[combo[i+2]].innerHTML !== '' && grid[combo[i+2]].innerHTML === grid[combo[i]].innerHTML)) {
                win = turn === 'X'? 'O':'X';
            } else {
                if (tieCounter < 9) {
                    heading.innerHTML = `Player ${turn}'s turn.`;
                } else {
                    heading.innerHTML = 'Tie Game LOSERS!!!!.'
                }
            }
        })
    }

    const initState = () => {
        const mainContainer = document.getElementById('board');
        for (i=0; i<(GRID_SIZE*GRID_SIZE); i++) {
            let newDiv = document.createElement("div");
            mainContainer.appendChild(newDiv).className = "cell";
        }
    }

    const updateState = (e) => {
        let gridCells = Array.from(document.querySelectorAll('#board div'));
        if (!win) {
            let idx = gridCells.findIndex((cell) => {return cell === e.target});
            if (gridCells[idx].innerHTML === '') {
                gridCells[idx].innerHTML = turn;
                turn = turn === 'X' ? 'O':'X';
                checkWin();
                if (win) {
                    heading.innerHTML = `Player ${win} wins.`
                }
            }
        }
    }

    const resetState = () => {
        let gridCells = Array.from(document.querySelectorAll('#board div'));
        gridCells.forEach((cell) => {
            cell.innerHTML = '';
        });
        win = null;
        tieCounter = 0;
        heading.innerHTML = `Player ${turn} turn.`;
    }
    return { initState, updateState, resetState };
}

const gameBoard = (() => {

        const boardState = render();
        boardState.initState()

        document.getElementById('board').addEventListener("click", (e) => boardState.updateState(e));
        document.getElementById('reset-btn').addEventListener("click", boardState.resetState);
})();






