package com.sinaldasorte.configuration.security;

import java.util.Arrays;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.authentication.configurers.provisioning.InMemoryUserDetailsManagerConfigurer;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.builders.WebSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

import com.sinaldasorte.configuration.security.hmac.HmacRequester;
import com.sinaldasorte.configuration.security.hmac.HmacSecurityConfigurer;
import com.sinaldasorte.dto.UserDTO;
import com.sinaldasorte.mock.MockUsers;
import com.sinaldasorte.service.AuthenticationService;

/**
 * Security configuration
 * Created by Michael DESIGAUD on 14/02/2016.
 * Modify by Sant'Clear Ali Costa on 06/03/2017
 */
@Configuration
@EnableWebSecurity
public class SecurityConfiguration extends WebSecurityConfigurerAdapter{
    @Bean
    public PasswordEncoder passwordEncoder(){
        return new BCryptPasswordEncoder();
    }

    @Autowired
    private AuthenticationService authenticationService;

    @Autowired
    private HmacRequester hmacRequester;

    @Override
    public void configure(WebSecurity web) throws Exception {
        web.ignoring()
                .antMatchers("/scripts/**/*.{js}")
                .antMatchers("/node_modules/**")
                .antMatchers("/assets/**")
                .antMatchers("*.{ico}")
                .antMatchers("/views/**/*.{html}")
                .antMatchers("/app/**/*.{html}");
    }

    @Override
    protected void configure(HttpSecurity http) throws Exception {
        http
        		.cors().and()
                .authorizeRequests()
                    .antMatchers("/api/authenticate").anonymous()
                    .antMatchers("/").anonymous()
                    .antMatchers("/favicon.ico").anonymous()
                    .antMatchers("/api/**").authenticated()
                .and()
                .csrf()
                    .disable()
                    .headers()
                    .frameOptions().disable()
//                .csrf()
//				.csrfTokenRepository(CookieCsrfTokenRepository.withHttpOnlyFalse())
                .and()
                    .sessionManagement()
                    .sessionCreationPolicy(SessionCreationPolicy.STATELESS)
                .and()
                .logout()
                    .permitAll()
                .and()
                    .apply(authTokenConfigurer())
                .and()
                    .apply(hmacSecurityConfigurer());
    }

    @Override
    public void configure(AuthenticationManagerBuilder auth) throws Exception {
        InMemoryUserDetailsManagerConfigurer<AuthenticationManagerBuilder> configurer = auth
                .inMemoryAuthentication()
                    .passwordEncoder(passwordEncoder());

        for(UserDTO userDTO : MockUsers.getUsers()) {
            configurer.withUser(userDTO.getLogin())
                    .password(passwordEncoder().encode(userDTO.getPassword()))
                    .roles(userDTO.getProfile().name());
        }
    }
    
    @Bean
	CorsConfigurationSource corsConfigurationSource() {
		CorsConfiguration configuration = new CorsConfiguration();
		configuration.setAllowedOrigins(Arrays.asList("*"));
		configuration.setAllowedHeaders(Arrays.asList("*"));
		configuration.setAllowedMethods(Arrays.asList("*"));
		configuration.setAllowCredentials(true);
		configuration.setExposedHeaders(Arrays.asList("X-TokenAccess, X-Secret, Authentication, X-Digest, X-Once, X-ISS, X-HMAC-CSRF, WWW-Authenticate", "X-Content-Type-Options", "X-XSS-Protection", "Transfer-Encoding", "Date"));
		UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
		source.registerCorsConfiguration("/api/**", configuration);
		return source;
	}
    
    @Bean
    @Override
    public AuthenticationManager authenticationManagerBean() throws Exception {
        return super.authenticationManagerBean();
    }

    private HmacSecurityConfigurer hmacSecurityConfigurer(){
        return new HmacSecurityConfigurer(hmacRequester);
    }

    private XAuthTokenConfigurer authTokenConfigurer(){
        return new XAuthTokenConfigurer(authenticationService);
    }
}
