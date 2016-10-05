/**
 * Created by morten on 21/09/16.
 */

import {take, put, call, fork, select} from 'redux-saga/effects'
import {takeEvery} from 'redux-saga'

import * as act from '../store/actions';

import { api } from '../services'

const { syncChildren, toggleNode } = act;


function* watchAsyncChildren() {
    //noinspection InfiniteLoopJS
    while(true) {

        //consume the action
       const { treeNodeId, nodeId } =  yield take(act.SYNC_CHILDREN.DO);

        //Create new action, this will create a new state indicating that we are waiting
        //for a response
        yield put(syncChildren.request(treeNodeId));

        //perform the actual request, using the service api
        const newDataNodes = yield call(api.getNode, nodeId);

        console.log(newDataNodes, "new data nodes");
        yield put(syncChildren.success(treeNodeId, newDataNodes));

        //opening the node ( I think?)
        console.log("opening node ?");
        yield put(toggleNode(treeNodeId));
        console.log("done opening node");
    }

}


export default function* root() {
    yield [
        fork(watchAsyncChildren)
    ];
   // yield fork(takeEvery, 'CREATE_USER', createUser)
}