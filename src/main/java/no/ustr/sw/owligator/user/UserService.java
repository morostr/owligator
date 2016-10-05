package no.ustr.sw.owligator.user;

import java.util.List;

import no.ustr.sw.owligator.role.RoleName;

public interface UserService {

	void createUser(UserDto user, RoleName roleName);

	void updateUser(UserDto user);

	void deleteUser(Integer id);

	UserDto getUser(Integer id);

	List<UserDto> getUsers();

}
