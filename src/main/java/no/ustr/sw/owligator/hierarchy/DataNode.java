package no.ustr.sw.owligator.hierarchy;

import java.util.List;
import java.util.Map;

/**
 * Class that represents a node in a graph. Made for automatic conversion to JSON *
 */
public class DataNode {
    public final String nodeId;
    public final String label;

    public List<DataNode> getChildren() {
        return children;
    }

    private List<DataNode> children;


    public DataNode(String nodeId, String label) {
        this.nodeId = nodeId;
        this.label = label;
    }

    public void setChildren(List<DataNode> newChildren) {
        children = newChildren;
    }


}
