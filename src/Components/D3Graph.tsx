import { Component, onCleanup, onMount, createSignal } from "solid-js";
import styles from "@/style/graph.module.sass";
import { forceManyBody, forceSimulation, forceCenter } from "d3";

const data = {
  nodes: [
    { id: 0, text: "Node 1" },
    { id: 1, text: "Node 2" },
  ],
  edges: [{ id: 0, left: 0, right: 1, text: "Edge 1" }],
};

interface Props {}

export const D3Graph: Component<Props> = (props) => {
  let canvas;
  let svg;
  const screensize = { width: 500, height: 500 };
  const [count, setCount] = createSignal(screensize.width / 2);
  setInterval(
    () =>
      setCount(
        count() > screensize.width / 4 ? count() - 1 : screensize.width / 2
      ),
    1000 / 60
  );

  onMount(() => {
    const ctx: CanvasRenderingContext2D = canvas.getContext("2d");
    let frame = requestAnimationFrame(loop);

    function loop(tick) {
      frame = requestAnimationFrame(loop);
      ctx.clearRect(0, 0, screensize.width, screensize.height);
      ctx.beginPath();
      ctx.arc(count(), 75, 50, 0, 2 * Math.PI);
      ctx.stroke();
    }

    onCleanup(() => {
      cancelAnimationFrame(frame);
    });
  });

  //   var simulation = forceSimulation(data.nodes)
  //     .force('charge', forceManyBody())
  //     .force('center', forceCenter(screensize.width/2, screensize.height/2))
  //     .on('tick', ticked)

  return (
    <>
      <p>D3 Entry {count}</p>
      <svg ref={svg} width={screensize.width} height={screensize.height}>
        <g>

        <circle
          cx={count()}
          cy="50"
          r="40"
          class="fill-emerald-400 hover:stroke-fuchsia-800 hover:stroke-width-2"
          onClick={(e) => console.log(e)}
          />
          <text  x={count()} y="50" text-anchor="middle">Hi</text>
          </g>
      </svg>
      <canvas
        ref={canvas}
        class="bg-slate-300"
        width={screensize.width}
        height={screensize.height}
      ></canvas>
    </>
  );
};

interface NodeProps {
  x: number
  y: number
  text: string
}

const Node: Component<NodeProps> = (props) => {
  const [isAktive, setAktiv] = createSignal(false)

  return <g>
    <circle
          cx={props.x} cy={props.y}
          r="40"
          class="fill-emerald-400 hover:stroke-fuchsia-800 hover:stroke-width-2"
          onClick={() => setAktiv(!isAktive())}
          />
          <text  x={props.x} y={props.y} text-anchor="middle">{props.text}</text>
    </g>
}