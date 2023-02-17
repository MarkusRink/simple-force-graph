import {
  Component,
  For,
  Index,
  onMount,
  onCleanup,
  createSignal,
  createEffect,
} from "solid-js";
import D3Node from "../utils/Node";
import SVGNode from "./SVGNodeComponent";
import SVGEdge from "./SVGEdgeComponent"
import {
  forceManyBody,
  forceSimulation,
  forceCenter,
  forceLink,
  forceCollide,
  forceX,
  forceY
} from "d3";
import { D3Edge } from "../utils/Edge";

export interface ForceGraphProps {
  nodes: D3Node[];
  edges: any[]
}

const ForceGraph: Component<ForceGraphProps> = (props) => {
  let svg;
  const [simNodes, setSimNodes] = createSignal(props.nodes);
  const [simEdges, setSimEdges] = createSignal([{source: 0, target: 1}, {source: 1, target: 2}])
  const [ticks, setTicks] = createSignal(0);
  const simulation = forceSimulation([...props.nodes])
    // .force(
    //   "x",
    //   forceX(window.window.innerWidth / 2)
    // )
    // .force(
    //     "y",
    //     forceY(window.window.innerHeight / 2)
    //   )
    .force(
      "center",
      forceCenter(window.window.innerWidth/2, window.window.innerHeight/2)
    )
    .force(
      "collide",
      forceCollide(5) //TODO radius should not be hardcoded
    )
    .force(
      "charge",
      forceManyBody().strength(-10)
    )
    .force(
      "link",
      forceLink(props.edges).distance(100)
    )
    .alphaDecay(0)
    .on("tick", () => {
      setTicks((t) => t + 1);
      setSimNodes([...simulation.nodes()]);
    })


  function updateSimulation() {
    simulation.nodes(simNodes());
  }

  function updateLinks(links){
    simulation.force("links", forceLink(links))
  }

  function addNode() {
    setSimNodes((arr) => [...arr, new D3Node(arr.length, 40)]);
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

  const [showButtons, setShowButtons] = createSignal(true);
  function addEdge(sourceIndex:number) {
    setTempEdge({source: simNodes()[sourceIndex]});
    console.log(tempEdge())
    addEventListener('click', (event:MouseEvent) => {
      console.log("First click")
      setShowButtons(false)
      addEventListener('click', (event:MouseEvent) => {
        console.log("Second click")
        let parent = event.target;
        while(parent.nodeName !== "BODY"){
          console.log(parent.dataset.nodeindex)
          if (parent.dataset.nodeindex != undefined){
            //parent.dataset.nodeindex
            break;
          }
          // next step
          parent = parent.parentElement;
        }
        setShowButtons(true)
      }, {once: true})
    }, {once: true});

  }

  createEffect(() => {console.log(showButtons())})


  /**
   * 1. create Edge
   *  - get index from onclick function of object
   * 2. add click listener
   * 3. iterate up through parents in search for node-id
   * - if found: bind edge target to target and pop event listener
   * - else: delete last Edge and pop event Listener
   * - if source === target delete edge
   */

  const [tempEdge, setTempEdge] = createSignal(null);

  return (
    <>
      <button onClick={() => addEdge(0)}>make edge</button>
      <p>{ticks}</p>
      <button onClick={() => console.log(simNodes())}>log nodes</button>
      
      <svg
        ref={svg}
        width={window.window.innerWidth}
        height={window.window.innerHeight}
      > 
        <For each={simEdges()}>
          {(edge, idx) => (
            <SVGEdge
              x1={simNodes()[edge.source].x}
              y1={simNodes()[edge.source].y}
              x2={simNodes()[edge.target].x}
              y2={simNodes()[edge.target].y}
            ></SVGEdge>
          )}
        </For>
        <For each={simNodes()}>
          {(node,index) => (
            <SVGNode
              x={simNodes()[index()].x}
              y={simNodes()[index()].y}
              radius={simNodes()[index()].r}
              text={`Node ${simNodes()[index()].index}`}
              nodeIndex={node.index}

              onAddNode={addNode}
              onRemoveNode={removeNode}
              onAddLink={addEdge}
              showButtons={showButtons()}
            />
          )}
        </For>
        <Show when={tempEdge() != null}>
          <SVGEdge x1={tempEdge().source.x} y1={tempEdge().source.y} x2={0}  y2={0}></SVGEdge>
        </Show>
      </svg>
    </>
  );
};

export default ForceGraph;
