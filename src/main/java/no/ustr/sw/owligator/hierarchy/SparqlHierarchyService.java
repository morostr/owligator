package no.ustr.sw.owligator.hierarchy;

import org.apache.jena.query.QueryExecution;
import org.apache.jena.query.QueryExecutionFactory;
import org.apache.jena.query.QuerySolution;
import org.apache.jena.query.ResultSet;
import org.apache.jena.rdf.model.Literal;
import org.apache.jena.rdf.model.RDFNode;
import org.apache.jena.rdf.model.Resource;
import org.apache.jena.rdf.model.ResourceFactory;
import org.apache.jena.vocabulary.RDFS;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.stream.Collectors;

import static java.util.stream.Collectors.toList;
import static org.apache.jena.vocabulary.RSS.url;

/**
 * Created by morten on 29/09/16.
 */
public class SparqlHierarchyService {

    private String sparqlEndpoint;

    private static String prefixes = " PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>\n" +
            "PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#> \n" +
            "PREFIX owl: <http://www.w3.org/2002/07/owl#> \n" +
            "PREFIX xsd: <http://www.w3.org/2001/XMLSchema#> \n";

    public SparqlHierarchyService(String sparqlEndpointUri) {
        sparqlEndpoint = sparqlEndpointUri;
    }

    /**
     * R
     * @param propertyId
     * @param propertyId
     * @return A id=>label map of children of the given uri
     */
    public List<DataNode> getChildrenViaProperty(String propertyId, String parentId) {
        parentId = encapsulate(parentId);
        propertyId = encapsulate(propertyId);
        String query = "select distinct ?id ?label where { ?id " + propertyId + " " + parentId + ". \n" +
                "?id rdfs:label ?label \n" +
                "}";

        Map<String, String> kvMap = executeIdLabelSelect(query);

        List<DataNode> a = kvMap.keySet().stream()
                .map(k -> new DataNode(k, kvMap.get(k)))
                .collect(toList());

        return a;

    }



    private String encapsulate(String s) {
        if (s.startsWith("http://"))
            return "<" + s + ">";
        return s;
    }

    private Map<String,String> executeIdLabelSelect(String query) {
        query = prefixes + "\n" + query;
        QueryExecution qex = QueryExecutionFactory.sparqlService(sparqlEndpoint , query);


        System.out.println(query + " \nQUERY   \n\n");
        ResultSet s = qex.execSelect();
        HashMap<String,String> map = new HashMap<>();

        /*String idVar = s.getResultVars()
                        .stream()
                        .filter(r->r.equalsIgnoreCase("id") || r.equalsIgnoreCase("uri"))
                        .findFirst()
                        .map(ss -> ss)
                        .orElseThrow(IllegalArgumentException::new) ;
        */


        final String idVar = "id";
        final String labelVar = "label";

        while (s.hasNext()) {
            QuerySolution qs = s.next();
            Resource r = qs.getResource(idVar);
            Literal l = qs.getLiteral(labelVar);
            if (map.containsKey(r.getURI()) && !l.getLanguage().equals("en"))
                continue; //dont overwrite existing label if new label is not english

            map.put(r.getURI(), l.getLexicalForm());
        }

        return map;
    }


    public static void main(String args[]) {
        String url = "https://dbpedia.org/sparql";
        SparqlHierarchyService s = new SparqlHierarchyService(url);
        List<DataNode> map = s.getChildrenViaProperty("http://dbpedia.org/ontology/Organisation", RDFS.subClassOf.getURI());

        map.forEach((k) -> System.out.println(k.nodeId + " : " + k.label));

    }


}
