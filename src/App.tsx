import type { Component } from 'solid-js';
import InteractiveForceGraph from './Components/InteractiveForceGraphComponent';
import { D3Graph } from './Components/D3Graph';
import { NodeComponent } from './Components/NodesEdges';

const App: Component = () => {
  return (
    <>
      <InteractiveForceGraph/>
    </>
  );
};

export default App;


