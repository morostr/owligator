package no.ustr.sw.owligator.user;

import java.util.Optional;

import no.ustr.sw.owligator.support.jpa.CustomJpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UserRepository extends CustomJpaRepository<User, Integer> {

	Optional<User> findByUsername(String username);

}
