import { useState } from 'react';

// child component
function Square({value, onSquareClick}) {
  return ( 
  <button 
          className="square"
          onClick={onSquareClick}
  >
    {value}
  </button>
  );
}

// parent component
export default function Board() {

  
  // to store the state of the board , i.e array of 9 squares
  // Array(9).fill(null) creates an array with nine elements and sets each of them to null. 
  const [squares, setSquares] = useState(Array(9).fill(null));
  // xIsNext is a boolean that will be flipped to determine which player goes next .
  const [xIsNext, setXIsNext] = useState(true);

// this is how the squares array will look like later... squares = ['O', null, 'X', 'X', 'X', 'O', 'O', null, null]

//The handleClick function creates a copy of the squares array (nextSquares) with the JavaScript slice() Array method. because we should not mutate the state directly. We should create a copy of the state, modify the copy and then set the state with the modified copy. This is called immutability in React.

// Then, handleClick updates the nextSquares array to add X to the first ([0] index) square. Finally, handleClick calls setSquares to update the squares state variable with the new array. 


// handleClick is an inside function and it can access the variables & functions defined in outside function( Board function). This is called closure in JavaScript. 
  function handleClick(i){
    if (squares[i] || calculateWinner(squares)) {
      return;
    }
    // return early , if a Square is already filled or if a player has already won the game.

    const nextSquares = squares.slice();

    if (xIsNext) {
      nextSquares[i] = "X";
    } else {
      nextSquares[i] = "O";
    }

    // we pass nextSquares to setSquares to update the squares state variable with the new array.
    setSquares(nextSquares);
    setXIsNext(!xIsNext);
    // setXIsNext(!xIsNext) is used to flip the boolean value of xIsNext.
    // If true, then false.       If false, then true.
  }

  const winner = calculateWinner(squares);
  let status;
  if (winner) {
    status = "Winner: " + winner;
  } else {
    status = "Next player: " + (xIsNext ? "X" : "O");
  }

  // TIC TAC TOE GAME WIN LOGIC
  // 0 1 2
  // 3 4 5
  // 6 7 8

  //8 possible winning combinations
  // 3 horizontal lines , 3 vertical lines , 2 diagonal lines


  function calculateWinner(squares) {
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6]
    ];

    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i];
      if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) { 
        // if squares[a] is not null and squares[a] === squares[b] and squares[a] === squares[c],
        // then return squares[a] , because squares[a] is either 'X' or 'O' and it is the winner.
        // else return null.
        return squares[a];
      }
    }
    return null;
   
  }

  // onSquareClick(0) is a function call that would run infinite times because it is inside the render function.
  // it runs infinite times BECAUSE we are passing a function call to the Square component as a prop. The Square component will call this function when the button is clicked. So, every time the Board component renders, it will create a new function and pass it to the Square component. The Square component will call this new function when the button is clicked. This will cause the Board component to render again, which will create a new function and pass it down. This will cause the Square component to render again, and so on. This is called an infinite loop.

  //onSquareClick={() => handleClick(0)} is a function call inside a function call that would run only when the button is clicked .
  // BECAUSE we are passing a function to the Square component as a prop. The Square component will call this function when the button is clicked .

  return (
    <>
      <div className="status">{status}</div>
      <div className="board-row">
        <Square value={squares[0]} onSquareClick={() => handleClick(0)} />
        <Square value={squares[1]} onSquareClick={() => handleClick(1)} />
        <Square value={squares[2]} onSquareClick={() => handleClick(2)} />
      </div>
      <div className="board-row">
        <Square value={squares[3]} onSquareClick={() => handleClick(3)} />
        <Square value={squares[4]} onSquareClick={() => handleClick(4)} />
        <Square value={squares[5]} onSquareClick={() => handleClick(5)} />
      </div>
      <div className="board-row">
        <Square value={squares[6]} onSquareClick={() => handleClick(6)} />
        <Square value={squares[7]} onSquareClick={() => handleClick(7)} />
        <Square value={squares[8]} onSquareClick={() => handleClick(8)} />
      </div>
    </>
  );
};
