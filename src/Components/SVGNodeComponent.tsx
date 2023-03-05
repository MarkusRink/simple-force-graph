import { Component, Show, createSignal, createEffect } from "solid-js";
import SVGEdge from "./SVGEdgeComponent";

interface D3Node {
  index: string;
  x: number;
  y: number;
  fx: number;
  fy: number;
  vx: number;
  vy: number;
}

export interface NodeProps {
  nodeIndex: number;
  x: number;
  y: number;
  radius: number;
  text?: string;
  onAddNode: (sourceIndex: number) => void;
  onRemoveNode: () => void;
  onMakeConnection: (nodeIndex: number) => void;
  showButtons?: boolean;
  // onAddLink: (sourceNodeIndex) => void;
  // onAddEdge: (sourceIndex: number, targetIndex: number) => void;
}

const SVGNode: Component<NodeProps> = (props) => {
  const [isActive, setActive] = createSignal<boolean>(false);
  const handleHover = () => {
    setActive((isActive) => !isActive);
  };

  const isVisible = () => isActive() && props.showButtons;

  const iconRadius = 15;

  const northPosition = () => {
    return { x: props.x, y: props.y - props.radius };
  };
  const westPosition = () => {
    return { x: props.x - props.radius, y: props.y };
  };
  const eastPosition = () => {
    return { x: props.x + props.radius, y: props.y };
  };

  return (
    <g
      onMouseEnter={() => handleHover()}
      onMouseLeave={() => handleHover()}
      data-nodeindex={props.nodeIndex}
    >
      <circle
        fill={isVisible() ? "red" : "blue"}
        cx={props.x}
        cy={props.y}
        r={props.radius}
        class="hover:stroke-width-2 fill-solarized-15 hover:stroke-fuchsia-800"
      />
      <Show when={props.text != undefined}>
        <text
          x={props.x}
          y={props.y + 2}
          text-anchor="middle"
          class="fill-solarized-magenta"
        >
          {props.text}
        </text>
        <label for="name">Name (4 to 8 characters):</label>

        <input
          type="text"
          id="name"
          name="name"
          required
          minlength="4"
          maxlength="8"
          size="10"
        />
      </Show>
      <Show when={isVisible()}>
        <g onClick={() => props.onRemoveNode()} class="hover:cursor-pointer">
          <circle
            cx={westPosition().x}
            cy={westPosition().y}
            r={iconRadius * 0.4}
            class="hover:stroke-width-2 z-10 fill-white hover:stroke-fuchsia-800"
          />
          <svg
            height={iconRadius}
            width={iconRadius}
            x={westPosition().x - iconRadius / 2}
            y={westPosition().y - iconRadius / 2}
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 512 512"
            class="fill-solarized-45"
          >
            <path d="M256 8C119 8 8 119 8 256s111 248 248 248 248-111 248-248S393 8 256 8zM124 296c-6.6 0-12-5.4-12-12v-56c0-6.6 5.4-12 12-12h264c6.6 0 12 5.4 12 12v56c0 6.6-5.4 12-12 12H124z" />
          </svg>
        </g>
        <g
          onMouseDown={() => props.onMakeConnection(props.nodeIndex)}
          class="hover:cursor-pointer"
        >
          <circle
            cx={northPosition().x}
            cy={northPosition().y}
            r={iconRadius * 0.6}
            class="hover:stroke-width-2 z-10 fill-solarized-45 hover:stroke-fuchsia-800"
          />
          <svg
            class="fill-white"
            height={iconRadius * 0.8}
            width={iconRadius * 0.8}
            x={northPosition().x - (iconRadius * 0.8) / 2}
            y={northPosition().y - (iconRadius * 0.8) / 2}
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 512 512"
          >
            <path d="M326.612 185.391c59.747 59.809 58.927 155.698.36 214.59-.11.12-.24.25-.36.37l-67.2 67.2c-59.27 59.27-155.699 59.262-214.96 0-59.27-59.26-59.27-155.7 0-214.96l37.106-37.106c9.84-9.84 26.786-3.3 27.294 10.606.648 17.722 3.826 35.527 9.69 52.721 1.986 5.822.567 12.262-3.783 16.612l-13.087 13.087c-28.026 28.026-28.905 73.66-1.155 101.96 28.024 28.579 74.086 28.749 102.325.51l67.2-67.19c28.191-28.191 28.073-73.757 0-101.83-3.701-3.694-7.429-6.564-10.341-8.569a16.037 16.037 0 0 1-6.947-12.606c-.396-10.567 3.348-21.456 11.698-29.806l21.054-21.055c5.521-5.521 14.182-6.199 20.584-1.731a152.482 152.482 0 0 1 20.522 17.197zM467.547 44.449c-59.261-59.262-155.69-59.27-214.96 0l-67.2 67.2c-.12.12-.25.25-.36.37-58.566 58.892-59.387 154.781.36 214.59a152.454 152.454 0 0 0 20.521 17.196c6.402 4.468 15.064 3.789 20.584-1.731l21.054-21.055c8.35-8.35 12.094-19.239 11.698-29.806a16.037 16.037 0 0 0-6.947-12.606c-2.912-2.005-6.64-4.875-10.341-8.569-28.073-28.073-28.191-73.639 0-101.83l67.2-67.19c28.239-28.239 74.3-28.069 102.325.51 27.75 28.3 26.872 73.934-1.155 101.96l-13.087 13.087c-4.35 4.35-5.769 10.79-3.783 16.612 5.864 17.194 9.042 34.999 9.69 52.721.509 13.906 17.454 20.446 27.294 10.606l37.106-37.106c59.271-59.259 59.271-155.699.001-214.959z" />
          </svg>
        </g>
        <g
          onClick={() => props.onAddNode(props.nodeIndex)}
          class="hover:cursor-pointer"
        >
          <circle
            cx={eastPosition().x}
            cy={eastPosition().y}
            r={iconRadius * 0.4}
            class="hover:stroke-width-2 z-10 fill-white hover:stroke-fuchsia-800"
          />
          <svg
            height={iconRadius}
            width={iconRadius}
            x={eastPosition().x - iconRadius / 2}
            y={eastPosition().y - iconRadius / 2}
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 512 512"
            class="fill-solarized-45"
          >
            <path d="M256 8C119 8 8 119 8 256s111 248 248 248 248-111 248-248S393 8 256 8zm144 276c0 6.6-5.4 12-12 12h-92v92c0 6.6-5.4 12-12 12h-56c-6.6 0-12-5.4-12-12v-92h-92c-6.6 0-12-5.4-12-12v-56c0-6.6 5.4-12 12-12h92v-92c0-6.6 5.4-12 12-12h56c6.6 0 12 5.4 12 12v92h92c6.6 0 12 5.4 12 12v56z" />
          </svg>
        </g>
      </Show>
    </g>
  );
};

export default SVGNode;
