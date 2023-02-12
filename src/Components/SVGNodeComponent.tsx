import { Component, Show, createSignal } from "solid-js";

export interface NodeProps {
  x: number;
  y: number;
  radius: number;
  text?: string;
}

const SVGNode: Component<NodeProps> = (props) => {
  const [isActive, setActiv] = createSignal<boolean>(false);
  const handleClick = (event) => {
    setActiv(!isActive());
    console.log(`clicked Node: ${props.text}`);
    console.log(isActive());
  };

  return (
    <g>
      <circle
        fill={isActive() ? "red" : "blue"}
        cx={props.x}
        cy={props.y}
        r={props.radius}
        class="hover:stroke-width-2 fill-emerald-400 hover:stroke-fuchsia-800"
        onClick={(e) => handleClick(e)}
      />
      <Show when={props.text != undefined}>
        <text x={props.x} y={props.y} text-anchor="middle">
          {props.text}
        </text>
      </Show>
      <Show when={isActive()}>
        <circle
          fill={isActive() ? "red" : "blue"}
          cx={props.x - 10}
          cy={props.y + props.radius + 10}
          r={5}
          class="hover:stroke-width-2 fill-yellow-400 hover:stroke-fuchsia-800"
        />
        <circle
          fill={isActive() ? "red" : "blue"}
          cx={props.x + 10}
          cy={props.y + props.radius + 10}
          r={5}
          class="hover:stroke-width-2 fill-red-400 hover:stroke-fuchsia-800"
        />
      </Show>
    </g>
  );
};

export default SVGNode;
