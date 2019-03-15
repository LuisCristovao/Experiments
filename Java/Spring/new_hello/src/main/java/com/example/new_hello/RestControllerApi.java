package com.example.new_hello;

import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/")
public class RestControllerApi {
	@PostMapping("/test")
	public String sendRes(@RequestBody String data) {
		return "you sended this: "+data;
	}
}
