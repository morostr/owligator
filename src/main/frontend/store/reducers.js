/**
 * Created by morten on 01/09/16.
 */
import {TOGGLE_NODE_CLOSED } from './actions'


//const createChildF = (nodes) => (treeNodeId) => {

export const IS_OPEN = 'OPEN',
    IS_CLOSED = 'CLOSED',
    IS_ASYNC = 'NOT_SYNCED',
    IS_UNRESOLVED = 'NOT_RESOLVED',
    IS_LEAF = 'LEAF';

//}
const protoNode = {
    "nodeId" : undefined,
    "treeNodeId" : undefined,
    "status" : IS_UNRESOLVED,
    "children" : []
}

/*

 1. has synced   children, open     | canClose
 2. has synced   children, closed   | canOpen
 3. has async    children, closed   | canSync
 4. has possibly children, closed   | canResolve
 5. has no children                 |

 */


/******************
 * Actual Reducers
 *******************/


/**
 * Return a new state where the node in question is shown.
 * @param tree
 * @param treeNodeId
 */
function toggleNodeClosed(tree, treeNodeId) {
    let treeNode = tree[treeNodeId];
    if (!treeNode)
        throw "Cannot expand unknown treeNode:" + treeNodeId;

    if (treeNode.status != IS_CLOSED && treeNode.status != IS_OPEN)
        throw "Cannot toggle async nodes or leaf nodes. Status of current node is:" + treeNode.status;

    //Changing only the isClosed property of the current tree node.
    let newStatus = (treeNode.status === IS_CLOSED) ? IS_OPEN : IS_CLOSED;
    return {
        ...tree,
        [treeNodeId]: {
            ...treeNode,
            status: newStatus
        }
    };
}




function treeReducer(state = {}, action) {
    switch (action.type) {
        case TOGGLE_NODE_CLOSED:
            return toggleNodeClosed(state, action.treeNodeId);

        default:
            return state;
    }
}



export default function (state = {tree:{}, nodes:{}}, action) {
    const {tree, nodes} = state;
    switch (action.type)    {
        case TOGGLE_NODE_CLOSED:
            return {
                    "tree" : treeReducer(tree, action),
                    "nodes" : nodes
                };


        default:
            return state;
    }

}





/*** CREATE TREES and STATES ***/





function addChildrenToParent(parentTreeNode, childDataNodes) {
    //Create the new tree nodes
    console.log(parentTreeNode, childDataNodes);
    var childTreeNodes = childDataNodes.map(n => createTreeNode(n));


    //place these tree nodes in a key.value map
    var childTreeNodesMap = childTreeNodes.reduce((accTree, node) => {
        accTree[node.treeNodeId] = node;
        return accTree;
    }, {});



    //Create a new parent Node that is the same as before, except
    //we update the children field and the status of the node
    var newParentTreeNode  = {
        ...parentTreeNode,
        children : Object.keys(childTreeNodesMap),
        status: childTreeNodes.length>0 ? IS_CLOSED : IS_LEAF
    };

    //return a new tree with the new children and the updated parent tree
    return {
        //...tree,
        ...childTreeNodesMap,
        [newParentTreeNode.treeNodeId]: newParentTreeNode
    }
}

//Create a new tree where parentTreeNode is root, and new treenodes
//created from the childDataNodes are children
//recursively go through all the children of childDataNodes
function recursiveCreateTree(dataNodes, parentTreeNode, childDataNodeIds) {

    var childDataNodes = childDataNodeIds.map(i => dataNodes[i]);


    //Look for elements in childDataNodes that are undefined
    if (childDataNodes.findIndex(c => !c) >= 0)
        return {
           [parentTreeNode.treeNodeId] : {
               ...parentTreeNode,
               status: IS_ASYNC //has async children
           }
        };


    var newTree = addChildrenToParent(parentTreeNode, childDataNodes);

    return childDataNodes.reduce((tree, node) => {
        var treeId =
            Object.keys(tree).find(k => tree[k].nodeId == node.nodeId);

        var appendTree = recursiveCreateTree(dataNodes, tree[treeId], node.children);
        return {
            ...tree,
            ...appendTree
        }
    }, newTree)

}


/**
 * Create a new node based on  a dataNode
 * @param newNode
 */
export function createTreeNode(newNode) {
    console.log("new node:" + newNode);
    var treeNodeId = createNodeTreeId(newNode.nodeId);

    var newTreeNode = {
        ...protoNode,
        label: newNode.label,
        nodeId: newNode.nodeId,
        treeNodeId: treeNodeId
    }

    if (newNode.children != undefined)
        if (newNode.children.length != 0)
            newTreeNode.status = IS_ASYNC;
        else
            newTreeNode.status = IS_LEAF;
    else
        newTreeNode.status = IS_UNRESOLVED;

    return newTreeNode;

}

let nodeCounter=0;
function createNodeTreeId(nodeId) {
    return nodeId + '_' + nodeCounter++;
}



export function createNewStateFromNodes(nodes, leafNodesAsync) {
    //Find the root nodes
    let rootNodes = Object.keys(nodes).reduce((obj, idx) =>
        {
            obj.tops.push(idx); //current node might be a candidate for root

            //No children of this node can be the top node
            nodes[idx].children.forEach((elm) => {obj.seen.push(elm);})

            //Only have in tops candidates that are not seen before
            obj.tops = obj.tops.filter((topCandidate) => {
                return !obj.seen.some((seenNode) => {
                    return seenNode == topCandidate })
            });

            return obj;
        },
        {seen:[],tops:[]}
    ).tops;

    if (rootNodes.length>1)
        throw "More than one root in tree";
    if (rootNodes.length==0)
        throw "There are cycles in the tree";


    var rootNode = nodes[rootNodes[0]];
    var rootTreeNode = createTreeNode(rootNode);

    var newTree = recursiveCreateTree(nodes, rootTreeNode, rootNode.children);

    return {
        nodes: nodes,
        tree: newTree
    }

}
