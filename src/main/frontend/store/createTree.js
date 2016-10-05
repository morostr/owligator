/**
 * Created by morten on 01/09/16.
 */
 const nodeList =
    [
        {
            "nodeId": "Zero",
            "label" : "Zero",
            "children" : ["One"]
        }


    ];


export default function createTree() {


    let nodeMap = nodeList.reduce((obj, current) => {
        obj[current.nodeId] = current;
        return obj;
    }, {});

    return nodeMap;

}