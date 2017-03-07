package com.sinaldasorte.rest;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.sinaldasorte.dto.LoginDTO;
import com.sinaldasorte.dto.UserDTO;
import com.sinaldasorte.service.AuthenticationService;

/**
 * Authentication rest controller
 * Created by Michael DESIGAUD on 14/02/2016.
 */
@RestController
@RequestMapping(value = "/api")
@CrossOrigin(maxAge = 3600)
public class Authentication {

    @Autowired
    private AuthenticationService authenticationService;
    
    @CrossOrigin(origins = "*")
    @RequestMapping(value = "/authenticate",method = RequestMethod.POST)
    public UserDTO authenticate(@RequestBody LoginDTO loginDTO, HttpServletResponse response, HttpServletRequest request) throws Exception{
        return authenticationService.authenticate(loginDTO,response, request);
    }

    @CrossOrigin(origins = "*")
    @RequestMapping(value = "/logout",method = RequestMethod.GET)
    public void logout(){
        authenticationService.logout();
    }
}
