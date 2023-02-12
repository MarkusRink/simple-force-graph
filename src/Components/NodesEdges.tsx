import type { Component } from "solid-js";

class Node {
  id: number;
  text: string;
}

class Edge {
  left: Node;
  right: Node;
}

class Graph {
  nodes: Node[];
  edges: Edge[];
}

interface Props {
  text: string;
}

export const NodeComponent: Component<Props> = (props) => {
  return (
    <div class="grid grid-rows-2">
      <div class="bg-blue-500 text-white rounded-xl text-center inline p-2 text-xl">
        {props.text}
      </div>
      <div class="grid grid-flow-col justify-between">
        <i class="fa-solid fa-circle-plus text-emerald-700 mx-2 hover:border-2"></i>
        <i class="fa-solid fa-pen text-yellow-500 mx-2 hover:border-2"></i>
      </div>
    </div>
  );
};
