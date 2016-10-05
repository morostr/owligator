package no.ustr.sw.owligator.support;

import no.ustr.sw.owligator.AppConfig;
import no.ustr.sw.owligator.DatabaseConfig;
import no.ustr.sw.owligator.SecurityConfig;
import no.ustr.sw.owligator.StarterProfiles;
import org.junit.runner.RunWith;
import org.springframework.boot.test.SpringApplicationConfiguration;
import org.springframework.boot.test.WebIntegrationTest;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;

@RunWith(SpringJUnit4ClassRunner.class)
@SpringApplicationConfiguration(classes = { AppConfig.class, DatabaseConfig.class, SecurityConfig.class })
@WebIntegrationTest
@ActiveProfiles(StarterProfiles.TEST)
public abstract class AbstractWebIntegrationTest {

}
