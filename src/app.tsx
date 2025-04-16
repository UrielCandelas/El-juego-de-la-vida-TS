import { useState, useEffect, useRef } from "preact/hooks";
import { fillRandom, updateGrid } from "./lib/algorithm";
import "./app.css";

const SIZE = 20;

type DotProps = {
  x: number;
  y: number;
  size?: number;
  color?: string;
};

export function App() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [grid, setGrid] = useState<Array<Array<number>>>([[]]);

  useEffect(() => {
    const filledGrid = fillRandom(SIZE);
    setGrid(filledGrid);

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = "white";
    ctx.font = "18px Arial";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText(
      "Haz click aquí para comenzar",
      canvas.width / 2,
      canvas.height / 2
    );
  }, []);

  const drawDot = ({ x, y, size = 5, color = "#0bde15" }: DotProps) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    ctx.beginPath();
    ctx.arc(x, y, size, 0, Math.PI * 2);
    ctx.fillStyle = color;
    ctx.fill();
  };

  const handleCanvasClick = (e: MouseEvent) => {
    const canvas = canvasRef.current;
    if (!canvas || !e.target) return;

    const ctx = canvas.getContext("2d");

    if (!ctx) return;
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    for (let i = 0; i < SIZE; i++) {
      for (let j = 0; j < SIZE; j++) {
        if (grid[i][j] != 0) {
          drawDot({ x: i * 35, y: j * 35 });
        }
      }
    }
    const nextGen = updateGrid(grid);
    setGrid(nextGen);
  };
  return (
    <main className="general-container">
      <aside className="aside-container">
        <div className="info-container">
          <h1>El juego de la vida</h1>
          <p>Reglas</p>
          <ul>
            <li>
              Una célula muerta con exactamente 3 células vecinas vivas nace.
            </li>
            <li>Una célula viva con 2 o 3 células vecinas vivas sigue viva.</li>
            <li>
              En otro caso, la célula muere (por soledad o superpoblación).
            </li>
          </ul>
        </div>
      </aside>
      <section className="simulation-container">
        <canvas
          ref={canvasRef}
          width={700}
          height={700}
          onClick={handleCanvasClick}
        ></canvas>
      </section>
    </main>
  );
}
