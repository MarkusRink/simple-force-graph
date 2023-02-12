import {Node} from './Node'

export class Edge {
    left: Node
    right: Node
    label: string

    constructor(left:Node, right:Node, label:string = ''){
        this.left = left
        this.right = right
        this.label = label
    }
}