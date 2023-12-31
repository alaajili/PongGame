import { ReactP5Wrapper } from '@p5-wrapper/react';
import './App.css';
import game from './Game';
import { io, Socket } from 'socket.io-client'
import { useEffect, useState } from 'react';


const socket: Socket = io("http://localhost:8000");



function App() {

  const [playerY, setPlayerY] = useState<number>();
  const [playerX, setPlayerX] = useState<number>();
  const [opponentX, setOpponentX] = useState<number>();
  const [opponentY, setOpponentY] = useState<number>();

  const [rightScore, setRightScore] = useState<number>(0);
  const [leftScore, setLeftScore] = useState<number>(0);

  const [ball, setBall] = useState({x: 0, y: 0});
  const [side, setSide] = useState<number>();

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {

      if (event.key === "ArrowDown") {
        event.preventDefault();
        if (side === 0) {
          socket.emit("move", { direction: "down", side: "left" } );
        } else {
          socket.emit("move", { direction: "down", side: "right" } );
        }
      }
      else if (event.key === "ArrowUp") {
        event.preventDefault();
        if (side === 0) {
          socket.emit("move", { direction: "up", side: "left" } );
        } else {
          socket.emit("move", { direction: "up", side: "right" } );
        }
      }
    };


    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };

  }, [side]);


  // useEffect(() => {
  //   const handleMouseMove = (event: MouseEvent) => {
  //     const mouseY = event.clientY;

  //     const windowHeight = window.innerHeight;
  //     const halfWindowHeight = windowHeight / 2;

  
  //     if (mouseY < halfWindowHeight) {
  //       if (side === 0) {
  //         socket.emit("move", { direction: "up", side: "left" });
  //       } else {
  //         socket.emit("move", { direction: "up", side: "right" });
  //       }
  //     } else {
  //       if (side === 0) {
  //         socket.emit("move", { direction: "down", side: "left" });
  //       } else {
  //         socket.emit("move", { direction: "down", side: "right" });
  //       }
  //     }
  //   };
  
  //   document.addEventListener("click", handleMouseMove);
  
  //   return () => {
  //     document.removeEventListener("click", handleMouseMove);
  //   };
  // }, [side]);


  useEffect(() => {

    socket.on("side", (data) => {
      setSide(data);
      if (data === 0) {
        setPlayerX(4);
        setOpponentX(988);
      }
      else {
        setPlayerX(988);
        setOpponentX(4);
      }
    });

    socket.on("update", (data) => {
      if (side === 0) {
        setPlayerY(data.leftPlayerY);
        setOpponentY(data.rightPlayerY);
      } else {
        setPlayerY(data.rightPlayerY);
        setOpponentY(data.leftPlayerY);
      }
      setBall(data.ballPos);
      setRightScore(data.rightScore);
      setLeftScore(data.leftScore);
    });
    return() => {
      socket.off("update");
    }
  }, [side]);



  return (
    <div className="bg-black h-screen flex flex-col py-12  items-center space-y-4  overflow-y-scroll">
      <div className="absolute top-4 left-4 flex items-center space-x-2">
      <div className=" w-12 h-12 rounded-full bg-gray-400 "></div>
      <span className="text-white text-xl font-bold">leave the match</span>
      </div>
      <div className="flex space-x-16 lg:space-x-48 items-center">
        <span className="flex flex-col items-center space-y-2">
          <span className="h-16 lg:h-20 w-16 lg:w-20 canvas"></span>
          <span className='text-white text-lg font-mono font-bold'>@USER</span>
        </span>
        <span className="text-4xl lg:text-6xl text-white font-bold">VS</span>
        <span className="flex flex-col items-center space-y-2">
          <span className="h-16 lg:h-20 w-16 lg:w-20 canvas"></span>
          <span className='text-white text-lg font-mono font-bold'>@USER</span>
        </span>
      </div>
      <div className='canvas' >
        <ReactP5Wrapper sketch={game} playerY={playerY} opponentY={opponentY}  playerX={playerX} opponentX={opponentX} side={side} ball={ball}/>
      </div>
      <div className="flex flex-col items-center">
      <span className="text-2xl lg:text-4xl text-white font-bold underline">score</span>
        <div className="flex space-x-16 lg:space-x-48 items-center">
          <span className="text-white text-2xl lg:text-4xl font-black">{leftScore}</span>
          <span className="text-white text-2xl lg:text-4xl font-black">:</span>
          <span className="text-white text-2xl lg:text-4xl font-black">{rightScore}</span>
        </div>
      </div>
    </div>
  );
}

export default App;
