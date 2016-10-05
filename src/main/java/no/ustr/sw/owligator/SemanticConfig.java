package no.ustr.sw.owligator;

import no.ustr.sw.owligator.hierarchy.SparqlHierarchyService;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Profile;
import org.springframework.context.annotation.PropertySource;
import org.springframework.core.env.Environment;

/**
 * Created by morten on 30/09/16.
 */
@Configuration
public class SemanticConfig {
    private static final String V_SPARQL_ENDPOINT = "semantic.sparqlEndpoint" ;


    @Profile({ StarterProfiles.STANDALONE, StarterProfiles.TEST})
    @PropertySource("classpath:application-default.properties")
    @Configuration
    static class StandaloneSemanticConfig {

        @Bean
        public SparqlHierarchyService sparqlHierarchyService(final Environment env) {
            String sparqlEndpointUrl = env.getRequiredProperty(V_SPARQL_ENDPOINT);
            return new SparqlHierarchyService(sparqlEndpointUrl);
        }
    }
}
