import {
  Component,
  onCleanup,
  onMount,
  createSignal,
  Show,
  For,
} from "solid-js";
import styles from "@/style/graph.module.sass";
import {
  forceManyBody,
  forceSimulation,
  forceCenter,
  forceLink,
  forceCollide,
} from "d3";

const data = {
  nodes: [
    { id: 0, text: "Node 1" },
    { id: 1, text: "Node 2" },
  ],
  edges: [{ id: 0, left: 0, right: 1, text: "Edge 1" }],
};

interface Props {}
/**
 * https://github.com/d3/d3-force/tree/v3.0.0#simulation_nodes
 */
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
  const radius = 40;
  const [nodes, setNodes] = createSignal([new D3ForceNode(0), new D3ForceNode(1)]);
  let n1;
  let n2;
  const [frameCount, setFrameCount] = createSignal(0);
  const [charge, setCharge] = createSignal(-10);

  onMount(() => {
    var simulation = forceSimulation(nodes())
      .force("center", forceCenter(screensize.width / 2, screensize.height / 2))
      .force("collide", forceCollide().radius(radius * 2))
      .force("charge", forceManyBody().strength(charge))
      .on("tick", () => {
        setFrameCount(frameCount() + 1);
        setNodes(simulation.nodes());
      });
    // .force('link', forceLink().id((d)=> d.index))
    console.log(simulation.nodes());
    simulation.stop();

    let frame = requestAnimationFrame(loop);
    function loop(tick) {
      frame = requestAnimationFrame(loop);
      simulation.tick();
      setFrameCount(frameCount() + 1);
    }

    onCleanup(() => {
      simulation.stop();
    });
  });
  //   var simulation = forceSimulation(data.nodes)
  //     .force('charge', forceManyBody())
  //     .force('center', forceCenter(screensize.width/2, screensize.height/2))
  //     .on('tick', ticked)

  function addNode() {
    setNodes((arr) => [new D3ForceNode(arr.length, radius), ...arr]);
    console.log("append");
  }

  function removeNode() {
    setNodes((arr) => {
      arr.pop();
      return arr;
    });
    console.log("pop");
  }

  return (
    <>
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
      <p>
        D3 Entry {count()}, Frame {frameCount()}
      </p>
      <svg ref={svg} width={screensize.width} height={screensize.height}>
        <For each={nodes()}>
          {(node: any, index) => {
            console.log(node);
            return (
              <Node x={node.x} y={node.y} text={node.id} />
            );
          }}
        </For>
        <Edge
          x1={count()}
          x2={count()}
          y1={count()}
          y2={count() + 100}
          text=""
        />
        <Node x={count()} y={count()} text="Hello" />
        <Node x={count()} y={count() + 100} text="Hello" />
      </svg>
    </>
  );
};

class D3ForceNode {
  index: number
  x: number
  y: number
  r: number
  vx: number
  vy: number
  constructor(index)
  constructor(index:number, r:number)
  constructor(index, x:number, y:number)
  constructor(index:number, x:number = 0, y:number = 0, r:number = 1, vx:number = 0, vy:number = 0){
    this.index = index
    this.x = x
    this.y = y
    this.vx = vx
    this.vy = vy
    this.r = r
  }
}

interface NodeProps {
  x: number;
  y: number;
  text?: string;
}

const Node: Component<NodeProps> = (props) => {
  const radius = 40;
  const [isActive, setActiv] = createSignal<boolean>(true);
  const handleClick = (event) => {
    setActiv(!isActive());
    console.log(isActive());
  };

  return (
    <g>
      <circle
        fill={isActive() ? "red" : "blue"}
        cx={props.x}
        cy={props.y}
        r={radius}
        class="hover:stroke-width-2 fill-emerald-400 hover:stroke-fuchsia-800"
        onClick={(e) => handleClick(e)}
      />
      <text x={props.x} y={props.y} text-anchor="middle">
        {props.text}
      </text>
      <Show when={isActive()}>
        <circle
          fill={isActive() ? "red" : "blue"}
          cx={props.x - 10}
          cy={props.y + radius + 10}
          r={5}
          class="hover:stroke-width-2 fill-emerald-400 hover:stroke-fuchsia-800"
        />
        <circle
          fill={isActive() ? "red" : "blue"}
          cx={props.x + 10}
          cy={props.y + radius + 10}
          r={5}
          class="hover:stroke-width-2 fill-emerald-400 hover:stroke-fuchsia-800"
        />
      </Show>
    </g>
  );
};

interface EdgeProps {
  x1: number;
  x2: number;
  y1: number;
  y2: number;
  text: string;
}

const Edge: Component<EdgeProps> = (props) => {
  //TODO center text

  return (
    <g>
      <line
        class="stroke-black"
        x1={props.x1}
        y1={props.y1}
        x2={props.x2}
        y2={props.y2}
      />
    </g>
  );
};
