package no.ustr.sw.owligator.user;

import java.time.LocalDateTime;
import java.util.Set;

import javax.validation.constraints.Size;

import no.ustr.sw.owligator.role.Role;
import com.fasterxml.jackson.annotation.JsonIdentityInfo;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.ObjectIdGenerators;

import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@EqualsAndHashCode(of = { "username", "roles", "enabled" })
@ToString(of = { "id", "username" })
@Setter
@Getter
@JsonIdentityInfo(generator = ObjectIdGenerators.PropertyGenerator.class, property = "id")
public class UserDto {

	private Integer id;

	@Size(max = User.MAX_LENGTH_USERNAME)
	private String username;

	private String password;
	private boolean enabled;
	private LocalDateTime creationTime;
	private LocalDateTime modificationTime;
	@JsonIgnore
	private Set<Role> roles;

}
