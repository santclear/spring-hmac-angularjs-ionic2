package com.sinaldasorte;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

import com.sinaldasorte.Application;
import com.sinaldasorte.mock.MockUsers;

/**
 * Application test
 * Created by Michael DESIGAUD on 15/02/2016.
 */
@SpringBootApplication
public class ApplicationTest {

    public static void main(String[] args) {
        MockUsers.mock();
        SpringApplication.run(Application.class, args);
    }
}
