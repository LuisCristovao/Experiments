package com.example.postgresdemo2;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.data.jpa.repository.config.EnableJpaAuditing;

@SpringBootApplication
@EnableJpaAuditing
public class Postgresdemo2Application {

	public static void main(String[] args) {
		SpringApplication.run(Postgresdemo2Application.class, args);
	}

}
