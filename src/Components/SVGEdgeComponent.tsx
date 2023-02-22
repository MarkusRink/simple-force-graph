import { Component } from "solid-js";

export interface EdgeProps {
  x1: number;
  x2: number;
  y1: number;
  y2: number;
  text?: string;
}

const Edge: Component<EdgeProps> = (props) => {
  //TODO center text

  return (
    <g style="position: absolute; z-index: -10;">
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

export default Edge;
