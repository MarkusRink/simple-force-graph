import { Component } from "solid-js";
import ForceGraph from "./ForceGraphComponent";
import D3Node from "../utils/Node";

export interface InteractiveForceGraphProps {}

const InteractiveForceGraph: Component<InteractiveForceGraphProps> = (
  props
) => {
  const radius = 40;
  const nodes = [new D3Node(0, radius, 30,30), new D3Node(1, radius, 300, 300), new D3Node(2, radius, 250, 110)];
  const edges = [{source: 0, target: 1}, {source: 1, target: 2}]

  return (
    <>
      <ForceGraph nodes={nodes} edges={edges}></ForceGraph>
    </>
  );
};

export default InteractiveForceGraph;
