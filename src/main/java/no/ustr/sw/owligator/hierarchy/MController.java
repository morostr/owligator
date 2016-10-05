package no.ustr.sw.owligator.hierarchy;

import org.apache.jena.query.QueryExecution;
import org.apache.jena.query.QuerySolution;
import org.apache.jena.query.ResultSet;
import org.apache.jena.rdf.model.RDFNode;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import org.apache.jena.query.QueryExecutionFactory;

import java.util.List;

import static org.apache.jena.vocabulary.RDFS.subClassOf;

/**
 * Controller for the Hierarchy Service
 */
@RestController
public class MController {

    @Autowired
	private SparqlHierarchyService hierarchyService;



	@RequestMapping(value = "/mtest", method = RequestMethod.GET)
	public String mtest() {

		return "this is a nice mtest";
	}

	@RequestMapping(value = "/getNode", method = RequestMethod.GET)
    public List<DataNode> getNode(@RequestParam String nodeId) {
        return hierarchyService.getChildrenViaProperty(subClassOf.getURI(), nodeId);
    }

	public  static void main(String args[]) {
        String url = "https://dbpedia.org/sparql";
        String query = "select distinct ?Concept where {[] a ?Concept} LIMIT 100";

        QueryExecution qex = QueryExecutionFactory.sparqlService(url, query);
        ResultSet s = qex.execSelect();

        while (s.hasNext()) {
            QuerySolution qs = s.next();
            RDFNode r = qs.get("Concept");
            System.out.println("found : " + r.toString());
        }
        System.out.println("Adding code here for fun");
	}


}
