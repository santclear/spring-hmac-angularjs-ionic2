package com.sinaldasorte.configuration.mvc;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurerAdapter;

/**
 * MVC configuration
 * Created by Michael DESIGAUD on 14/02/2016.
 * Modify by Sant'Clear Ali Costa on 06/03/2017
 */
@Configuration
//@EnableWebMvc
public class MvcConfiguration extends WebMvcConfigurerAdapter{

    /*@Override
    public void addViewControllers(ViewControllerRegistry registry) {
        registry.addViewController("/home").setViewName("home");
        registry.addViewController("/").setViewName("home");
        //registry.addViewController("/hello").setViewName("hello");
        registry.addViewController("/login").setViewName("login");
    }*/
}
