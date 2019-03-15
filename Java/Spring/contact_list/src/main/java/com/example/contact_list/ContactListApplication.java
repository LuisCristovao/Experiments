package com.example.contact_list;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.domain.EntityScan;
import org.springframework.data.jpa.repository.config.EnableJpaAuditing;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;

@SpringBootApplication
//@EnableJpaAuditing
@EntityScan(basePackages = { "com.example.contact_list.model" }) 
@EnableJpaRepositories(basePackages = { "com.example.contact_list.repository" })

//Read more: http://mrbool.com/rest-server-with-spring-data-spring-boot-and-postgresql/34023#ixzz5iFudtJvz
public class ContactListApplication {

	public static void main(String[] args) {
		SpringApplication.run(ContactListApplication.class, args);
	}

}
