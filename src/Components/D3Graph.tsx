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


  //   var simulation = forceSimulation(data.nodes)
  //     .force('charge', forceManyBody())
  //     .force('center', forceCenter(screensize.width/2, screensize.height/2))
  //     .on('tick', ticked)

  return (
    <>
      <p>D3 Entry {count}</p>
      <svg ref={svg} width={screensize.width} height={screensize.height}>
        <Edge x1={count()} x2={count()} y1={count()} y2={count() + 100}/>
        <Node x={count()} y={count()} text="Hello"/>
        <Node x={count()} y={count() + 100} text="Hello"/>
      </svg>
    </>
  );
};

interface NodeProps {
  x: number
  y: number
  text?: string
}

const Node: Component<NodeProps> = (props) => {
  const [isActive, setActiv] = createSignal(false)

  return <g>
    <circle
          fill={isActive() ? 'red' : 'blue'}
          cx={props.x} cy={props.y}
          r="40"
          class="fill-emerald-400 hover:stroke-fuchsia-800 hover:stroke-width-2"
          onClick={() => setActiv(!isActive())}
          />
          <text  x={props.x} y={props.y} text-anchor="middle">{props.text}</text>
    </g>
}

interface EdgeProps {
  x1: number,
  x2: number,
  y1: number,
  y2: number,
  text: string
}

const Edge: Component<EdgeProps> = (props) => {
  //TODO center text

  return <g>
    <line class="stroke-black" x1={props.x1} y1={props.y1} x2={props.x2} y2={props.y2}/>
  </g>
}