/**
 * Created by morten on 21/09/16.
 */
import fetch from 'isomorphic-fetch'


const serverUrl = "http://localhost:9090";

const getNodeUrl = serverUrl + "/mtest";

export function getNode(nodeId) {
    console.log("getting node :",  nodeId);


    var a =  fetch(getNodeUrl + "?id=" + nodeId)
        .then(r => r.json().then(j => j));

    console.log("found a", a);
    return a;
}