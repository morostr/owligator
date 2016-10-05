/**
 * Created by morten on 01/09/16.
 */


/*
  async actions and action.types
 */

const DO = 'DO';
const REQUEST = 'REQUEST';
const SUCCESS = 'SUCCESS';
const FAILURE = 'FAILURE';

function createRequestTypes(base) {
    return [DO, REQUEST, SUCCESS, FAILURE].reduce((acc, type) => {
        acc[type] = `${base}_${type}`
        return acc
    }, {})
}


export const SYNC_CHILDREN = createRequestTypes('SYNC_CHILDREN');


function action(type, payload = {}) {
    console.log("returning:", {type, ...payload});
    return {type, ...payload}
}



//noinspection JSUnresolvedVariable
export const syncChildren = {
    do: (treeNodeId, nodeId) => action(SYNC_CHILDREN.DO, {treeNodeId, nodeId}),
    request: (treeNodeId) => action(SYNC_CHILDREN.REQUEST, {treeNodeId}),
    success: (treeNodeId, childDataNodes) => action(SYNC_CHILDREN.SUCCESS, {treeNodeId, childDataNodes}),
    failure: (treeNodeId, error) => action(SYNC_CHILDREN.FAILURE, {treeNodeId, error})
};
//cant get mapping to work, this is a quick and dirty fix
export const syncChildrenDo = syncChildren.do;
//export const syncChildrenRequest = syncChildren.request;
//export const syncChildrenSuccess = sy




export const TOGGLE_NODE_CLOSED = 'TOGGLE_NODE';
export const ADD_NODE = 'ADD_NODE';
export const REMOVE_NODE = 'REMOVE_NODE';
export const SHOW_NODE_LOADING = 'SHOW_NODE_LOADING';


export function toggleNode(treeNodeId) {
    console.log("triggered toggle node on node :" + treeNodeId);
    return {
        type: TOGGLE_NODE_CLOSED,
        treeNodeId
    }
}

export function addNode(treeNodeId, newNode) {
    return {
        type: ADD_NODE,
        treeNodeId,
        newNode
    }
}

export function removeNode(treeNodeId) {
    return {
        type: REMOVE_NODE,
        treeNodeId
    }
}

