import {
  Component,
  For,
  Index,
  onMount,
  onCleanup,
  createSignal,
  createEffect,
} from "solid-js";
import Node from "../utils/Node";
import SVGNode from "./SVGNodeComponent";
import {
  forceManyBody,
  forceSimulation,
  forceCenter,
  forceLink,
  forceCollide,
  forceX,
  forceY
} from "d3";

export interface ForceGraphProps {
  nodes: Node[];
}

const ForceGraph: Component<ForceGraphProps> = (props) => {
  let svg;
  const [simNodes, setSimNodes] = createSignal(props.nodes);
  const [ticks, setTicks] = createSignal(0);
  const simulation = forceSimulation([...props.nodes])
    .force(
      "x",
      forceX(window.window.innerWidth / 2)
    )
    .force(
        "y",
        forceY(window.window.innerHeight / 2)
      )
    .force(
      "collide",
      forceCollide(props.nodes.length > 0 ? props.nodes[0].r + 1 : 5)
    )
    .on("tick", () => {
      setTicks((t) => t + 1);
      setSimNodes([...simulation.nodes()]);
      console.log("tick");
    })

//   const timer = setInterval(() => {
//     simulation.tick()
//   }, 100);

  createEffect(() => {
    // console.log(simNodes());
  });

  onCleanup(() => {
    //   clearInterval(timer);
  });

  function updateSimulation() {
    simulation.nodes(simNodes());
  }

  function addNode() {
    setSimNodes((arr) => [...arr, new Node(arr.length, 10)]);
    updateSimulation();
    console.log(simNodes());
  }

  function removeNode() {
    setSimNodes((arr) => {
      arr.pop();
      return arr;
    });
    updateSimulation();
    console.log(simNodes());
  }

  return (
    <>
      <p>{ticks}</p>
      <button onClick={() => console.log(simNodes())}>log nodes</button>
      <button
        onClick={addNode}
        class="m-2 rounded bg-slate-700 p-2 text-white hover:shadow"
      >
        Add Node
      </button>
      <button
        onClick={removeNode}
        class="m-2 rounded bg-slate-700 p-2 text-white hover:shadow"
      >
        Remove Node
      </button>
      <p>{`${simNodes()[0].index} ${simNodes()[0].r} ${simNodes()[0].x.toFixed(
        2
      )} ${simNodes()[0].y.toFixed(2)} ${simNodes()[0].vx.toFixed(
        2
      )} ${simNodes()[0].vy.toFixed(2)}`}</p>
      <svg
        ref={svg}
        width={window.window.innerWidth}
        height={window.window.innerHeight}
        class="fill-slate-800"
      > 
        <For each={simNodes()}>
          {(node,index) => (
            <SVGNode
              x={simNodes()[index()].x}
              y={simNodes()[index()].y}
              radius={simNodes()[index()].r}
              text={`${simNodes()[index()].index}`}
            />
          )}
        </For>
      </svg>
    </>
  );
};

export default ForceGraph;
