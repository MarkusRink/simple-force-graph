import {
  Component,
  For,
  Show,
  Index,
  onMount,
  onCleanup,
  createSignal,
  createEffect,
} from "solid-js";
import D3Node from "../utils/Node";
import SVGNode from "./SVGNodeComponent";
import SVGEdge from "./SVGEdgeComponent";
import {
  forceManyBody,
  forceSimulation,
  forceCenter,
  forceLink,
  forceCollide,
  forceX,
  forceY,
} from "d3";
import { D3Edge } from "../utils/Edge";

export interface ForceGraphProps {
  nodes: D3Node[];
  edges: any[];
}

/** Global */
const [mousePosition, setMousePosition] = createSignal({ x: 0, y: 0 });
addEventListener("mousemove", (event) => {
  setMousePosition({
    x: event.clientX,
    y: event.clientY,
  });
});

interface Vector2D {
  x: number;
  y: number;
}

function vectorLength(vector: Vector2D): number {
  const res = Math.sqrt(vector.x ** 2 + vector.y ** 2);
  return res;
}

function vector2D(x1: number, y1: number, x2: number, y2: number): Vector2D {
  return {
    x: x2 - x1,
    y: y2 - y1,
  };
}

/** values should be: percentage [0,1]*/
function scaleVector2D(
  vector: Vector2D,
  to: { pixels?: number; percentage?: number; shortenByPixels?: number }
): void {
    if (to.shortenByPixels != null) {
        const oldLength = vectorLength(vector);
        const newLength = oldLength - to.shortenByPixels
        if (newLength > 0) {
            vector.x = (vector.x / oldLength) * newLength;
            vector.y = (vector.y / oldLength) * newLength; 
        } 
    }
  if (to.pixels != null) {
    const length = vectorLength(vector);
      if (length !== 0) {
          vector.x = (vector.x / length) * to.pixels;
          vector.y = (vector.y / length) * to.pixels;
    }
  }
  if (to.percentage != null) {
    vector.x = vector.x * to.percentage;
    vector.y = vector.y * to.percentage;
  } 
}

function addVector2D(vector1: Vector2D, vector2: Vector2D) {
    vector1.x += vector2.x
    vector1.y += vector2.y
};


const ForceGraph: Component<ForceGraphProps> = (props) => {
  let svg;
  const [simNodes, setSimNodes] = createSignal(props.nodes);
  const [simEdges, setSimEdges] = createSignal([
    { source: 0, target: 1 },
    { source: 1, target: 2 },
  ]);
  const [ticks, setTicks] = createSignal(0);
  const simulation = forceSimulation([...props.nodes])
    .force(
      "center",
      forceCenter(window.window.innerWidth / 2, window.window.innerHeight / 2)
    )
    .force(
      "collide",
      forceCollide(5) //TODO radius should not be hardcoded
    )
    .force("charge", forceManyBody().strength(-10))
    .force("link", forceLink(props.edges).distance(100))
    .alphaDecay(0)
    .on("tick", () => {
      setTicks((t) => t + 1);
      setSimNodes([...simulation.nodes()]);
    });

  function addNode(sourceIndex) {
    let targetIndex = 0;
    setSimNodes((arr) => {
      targetIndex = arr.length;
      return [...arr, new D3Node(arr.length, 40)];
    });
    setSimEdges((arr) => [
      ...arr,
      { source: sourceIndex, target: targetIndex },
    ]);
  }

  function removeNode() {
    setSimNodes((arr) => {
      arr.pop();
      return arr;
    });
    console.log(simNodes());
  }

  const [drawMode, setDrawMode] = createSignal(false);
  const [drawOriginNodeIndex, setDrawOriginNodeIndex] = createSignal(0);

  const drawModeEdge = () => {
    const origin: Vector2D = {
      x: simNodes()[drawOriginNodeIndex()].x,
      y: simNodes()[drawOriginNodeIndex()].y,
    };
    let target = vector2D(
      simNodes()[drawOriginNodeIndex()].x,
      simNodes()[drawOriginNodeIndex()].y,
      mousePosition().x,
      mousePosition().y
    );

    scaleVector2D(target, {
      shortenByPixels: 10,
    });
    addVector2D(target, origin);
    return { origin, target };
  };

  function drawEdge(nodeIndex: number) {
    setDrawMode(true);
    setDrawOriginNodeIndex(nodeIndex);
    addEventListener(
      "mouseup",
      (event: Event) => {
        setDrawMode(false);
        console.log("drawEdge()");
        const targetIndex = searchTargetNodeIndex(event.target as HTMLElement);
        if (targetIndex != undefined && nodeIndex !== targetIndex) {
          setSimEdges((edges) => [
            ...edges,
            { source: nodeIndex, target: targetIndex },
          ]);
        }
      },
      { once: true }
    );

    console.log("mousedown");

    function searchTargetNodeIndex(element: HTMLElement): number | undefined {
      console.log("searchTargetNodeIndex");
      console.log(element);
      while (element != undefined && element.nodeName !== "BODY") {
        console.log(element.dataset.nodeindex);
        if (element.dataset.nodeindex != undefined) {
          return Number(element.dataset.nodeindex);
        }
        // next step
        element = element.parentElement;
      }
      return undefined;
    }
  }

  const [tempEdge, setTempEdge] = createSignal(null);

  return (
    <>
      <div class="absolute">
        <p>Ticks: {ticks}</p>
        <p>
          Edge: {drawModeEdge().origin.x.toFixed(0)} |{" "}
          {drawModeEdge().origin.y.toFixed(0)} -> {drawModeEdge().target.x.toFixed(0)} |{" "}
          {drawModeEdge().target.y.toFixed(0)}
        </p>
        <p>{`${mousePosition().x}/${mousePosition().y}`}</p>
        <button onClick={() => console.log(simNodes())}>log nodes</button>
      </div>
      <svg
        ref={svg}
        width={window.window.innerWidth}
        height={window.window.innerHeight}
      >
        <circle cx={mousePosition().x} cy={mousePosition().y} r="5"></circle>
        <For each={simEdges()}>
          {(edge, idx) => {
            return (
              <SVGEdge
                x1={simNodes()[edge.source].x}
                y1={simNodes()[edge.source].y}
                x2={simNodes()[edge.target].x}
                y2={simNodes()[edge.target].y}
              ></SVGEdge>
            );
          }}
        </For>
        <For each={simNodes()}>
          {(node, index) => (
            <SVGNode
              x={simNodes()[index()].x}
              y={simNodes()[index()].y}
              radius={simNodes()[index()].r}
              text={`Node ${simNodes()[index()].index}`}
              nodeIndex={node.index}
              onAddNode={addNode}
              onRemoveNode={removeNode}
              showButtons={drawMode()}
              onMakeConnection={drawEdge}
            />
          )}
        </For>
        <Show when={drawMode()}>
          <SVGEdge
            x1={drawModeEdge().origin.x}
            y1={drawModeEdge().origin.y}
            x2={drawModeEdge().target.x}
            y2={drawModeEdge().target.y}
          ></SVGEdge>
        </Show>
      </svg>
    </>
  );
};

export default ForceGraph;
