package com.sinaldasorte.rest;

import org.springframework.web.bind.annotation.*;

import com.sinaldasorte.dto.Profile;
import com.sinaldasorte.dto.UserDTO;
import com.sinaldasorte.mock.MockUsers;

import javax.validation.Valid;
import java.util.ArrayList;
import java.util.List;

/**
 * Users resource
 * Created by Michael DESIGAUD on 15/02/2016.
 */
@RestController
@RequestMapping(value = "/api")
@CrossOrigin(maxAge = 3600)
public class Users {
	
    @RequestMapping("/users")
    @CrossOrigin(origins = "*")
    public List<UserDTO> query(){
        return MockUsers.getUsers();
    }
	
    @RequestMapping("/users/{id}")
    @CrossOrigin(origins = "*")
    public UserDTO query(@PathVariable Integer id){
        return MockUsers.findById(id);
    }
	
    @RequestMapping(value = "/users/{id}", method = RequestMethod.PUT)
    @CrossOrigin(origins = "*")
    public UserDTO update(@RequestBody @Valid UserDTO userDTO){
        return MockUsers.update(userDTO);
    }
	
    @RequestMapping("/users/profiles")
    @CrossOrigin(origins = "*")
    public List<String> getProfiles(){
        List<String> profiles = new ArrayList<>();
        for(Profile profile: Profile.values()){
            profiles.add(profile.name());
        }
        return profiles;
    }
}
