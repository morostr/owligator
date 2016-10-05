/**
 * Created by morten on 31/08/16.
 */
import React, {Component} from 'react'
import { connect } from 'react-redux'
import * as actions from '../store/actions'
import {IS_OPEN, IS_CLOSED, IS_ASYNC, IS_UNRESOLVED, IS_LEAF} from '../store/reducers'

export class Node extends Component {
    constructor(props) {
        super(props);
        this.renderChild = this.renderChild.bind(this)
        this.handleNodeClick = this.handleNodeClick.bind(this);
    }

    handleNodeClick() {
        const { toggleNode, syncChildrenDo, treeNodeId, nodeId, status} = this.props;
        console.log(this.props);
        if (status === IS_CLOSED || status === IS_OPEN )
            toggleNode(treeNodeId);
        else if (status === IS_ASYNC)
            syncChildrenDo(treeNodeId, nodeId);
        else
            console.log("Cannot open or close nodes with this status:" + status);
    }

    renderChild(childId) {
        const { id, treeNodeId } = this.props;
        //console.log("Creating node in code", this.props);
        return (
            <li key={childId}>
                <ConnectedNode parentId={id} treeNodeId={childId} />
            </li>
        )
    }

    render() {
        const {label, status, hasChildren, children} = this.props;

        return (
            <div >
                <span
                    onClick={this.handleNodeClick}
                    style={{
                        color: hasChildren ? 'black' : 'blue'
                    }}
                >{label}</span>

                <ul>
                    {(status === IS_OPEN) &&
                        children.map(this.renderChild)
                    }
                </ul>
            </div>)
    }
}
/*
Return the state item corresponding to the id of the node
found in the "id" field in the props provided by parent.
 */
function mapStateToProps(state, ownProps) {
    let {tree, nodes} = state;
    //console.log("ownProps", ownProps);
    if (!(ownProps.treeNodeId || ownProps.nodeId))
        throw "Neither treeNodeId nor nodeId set, error";

    //This code is searching for treeNodeId given the node id if
    //no tree node id is found. This will be used when we initialize
    //the tree, as we dont know the treeNodeIds on compile-time
    let treeNodeId = ownProps.treeNodeId
        ? ownProps.treeNodeId
        : Object.keys(tree).find((o) => {
            return tree[o].nodeId == ownProps.nodeId;
        });

    //let nodeId = tree[treeNodeId].nodeId;
    //We dont use data from the node. If we need data from there, we must get it explicitly
    /*
    let nodeInfo = {
        ...nodes[ownProps.nodeId],
        ...tree[treeNodeId]
    };
    */

    return tree[treeNodeId];

}

const ConnectedNode = connect(mapStateToProps, actions)(Node);
export default ConnectedNode


