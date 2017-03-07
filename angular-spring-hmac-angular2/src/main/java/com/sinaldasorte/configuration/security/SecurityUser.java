package com.sinaldasorte.configuration.security;

import java.util.Collection;

import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.User;

import com.sinaldasorte.dto.Profile;

/**
 * Security spring security user
 * Created by Michael DESIGAUD on 15/02/2016.
 */
public class SecurityUser extends User {
	
	private static final long serialVersionUID = 3766421150587231901L;

	private Integer id;

    private Profile profile;

    public SecurityUser(String username, String password, Collection<? extends GrantedAuthority> authorities) {
        super(username, password, authorities);
    }

    public SecurityUser(Integer id,String username, String password, Profile profile, Collection<? extends GrantedAuthority> authorities) {
        super(username, password, authorities);
        this.id = id;
        this.profile = profile;
    }

    public Integer getId() {
        return id;
    }

    public Profile getProfile() {
        return profile;
    }
}
