package com.sinaldasorte.service;

import org.springframework.stereotype.Service;

import com.sinaldasorte.configuration.security.hmac.HmacRequester;
import com.sinaldasorte.dto.UserDTO;
import com.sinaldasorte.mock.MockUsers;

import javax.servlet.http.HttpServletRequest;

/**
 * Hmac Requester service
 * Created by Michael DESIGAUD on 16/02/2016.
 */
@Service
public class DefaultHmacRequester implements HmacRequester{

    @Override
    public Boolean canVerify(HttpServletRequest request) {
        return request.getRequestURI().contains("/api") && !request.getRequestURI().contains("/api/authenticate");
    }

    @Override
    public String getPublicSecret(String iss) {
        UserDTO userDTO = MockUsers.findById(Integer.valueOf(iss));
        if(userDTO != null){
            return userDTO.getPublicSecret();
        }
        return null;
    }
}
