import {Component} from 'solid-js'
import ForceGraph from './ForceGraphComponent'
import Node from '../utils/Node'

export interface InteractiveForceGraphProps {
}

const InteractiveForceGraph: Component<InteractiveForceGraphProps> = (props) => {
    const radius = 10
    const nodes = [new Node(0, radius), new Node(1, radius), new Node(2, radius)]
    
    return <ForceGraph nodes={nodes}></ForceGraph>
}

export default InteractiveForceGraph