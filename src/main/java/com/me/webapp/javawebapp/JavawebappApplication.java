package com.me.webapp.javawebapp;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.GetMapping;


@SpringBootApplication
@RestController
public class JavawebappApplication {

	public static void main(String[] args) {
		SpringApplication.run(JavawebappApplication.class, args);
	}
	@GetMapping("/")
	public String Helloworld() {
		return "Hello There!";
	}
	@GetMapping("/hello")
	public String Hello() {
		return "It's a web app!";
	}
}
