package com.sinaldasorte.mock;

import org.springframework.beans.BeanUtils;

import com.sinaldasorte.dto.Profile;
import com.sinaldasorte.dto.UserDTO;

import java.util.*;

/**
 * Mock users Created by Michael DESIGAUD on 15/02/2016.
 * Modify by Sant'Clear Ali Costa on 06/03/2017
 */
public class MockUsers {

	private static List<UserDTO> users = new ArrayList<>();

	private static Map<Profile, List<String>> authorities = new HashMap<Profile, List<String>>() {

		private static final long serialVersionUID = 1869038711668487729L;

		{
			put(Profile.ADMIN, Arrays.asList("ROLE_ADMIN", "ROLE_MANAGER", "ROLE_USER"));
			put(Profile.USER, Arrays.asList("ROLE_USER"));
			put(Profile.MANAGER, Arrays.asList("ROLE_MANAGER", "ROLE_USER"));
		}
	};

	public static void mock() {
		UserDTO sinaldasorte = new UserDTO();
		sinaldasorte.setId(1);
		sinaldasorte.setLogin("sinaldasorte");
		sinaldasorte.setProfile(Profile.ADMIN);
		sinaldasorte.setPassword("sant");
		sinaldasorte.setAuthorities(authorities.get(sinaldasorte.getProfile()));
		users.add(sinaldasorte);
		
		UserDTO admin = new UserDTO();
		admin.setId(1);
		admin.setLogin("admin");
		admin.setProfile(Profile.ADMIN);
		admin.setPassword("sant");
		admin.setAuthorities(authorities.get(admin.getProfile()));
		users.add(admin);

		UserDTO user = new UserDTO();
		user.setId(2);
		user.setLogin("user");
		user.setProfile(Profile.USER);
		user.setPassword("sant");
		user.setAuthorities(authorities.get(user.getProfile()));
		users.add(user);

		UserDTO manager = new UserDTO();
		manager.setId(3);
		manager.setLogin("manager");
		manager.setProfile(Profile.MANAGER);
		manager.setPassword("sant");
		manager.setAuthorities(authorities.get(manager.getProfile()));
		users.add(manager);

	}

	public static List<UserDTO> getUsers() {
		if (users.isEmpty()) {
			mock();
		}
		return users;
	}

	/**
	 * Find a user by username
	 * 
	 * @param username
	 *            username
	 * @return a UserDTO if found, null otherwise
	 */
	public static UserDTO findByUsername(String username) {
		for (UserDTO userDTO : users) {
			if (userDTO.getLogin().equals(username)) {
				return userDTO;
			}
		}
		return null;
	}

	/**
	 * Find a user by id
	 * 
	 * @param id
	 *            user id
	 * @return a UserDTO if found, null otherwise
	 */
	public static UserDTO findById(Integer id) {
		for (UserDTO userDTO : users) {
			if (userDTO.getId().equals(id)) {
				return userDTO;
			}
		}
		return null;
	}

	/**
	 * Update a given user
	 * 
	 * @param newUserDTO
	 *            new user
	 * @return updated user
	 */
	public static UserDTO update(UserDTO newUserDTO) {
		UserDTO existingUser = findById(newUserDTO.getId());
		if (existingUser != null) {
			BeanUtils.copyProperties(newUserDTO, existingUser, "password", "publicSecret");
			existingUser.setAuthorities(authorities.get(existingUser.getProfile()));
		}
		return existingUser;
	}
}
