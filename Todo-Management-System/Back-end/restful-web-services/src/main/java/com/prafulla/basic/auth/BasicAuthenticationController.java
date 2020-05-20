package com.prafulla.basic.auth;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

//Controller
@CrossOrigin(origins = "http://localhost:4200")
@RestController
public class BasicAuthenticationController
{
	//hello-world-bean
	@GetMapping(path = "/basicauth")
	public AuthenticationBean helloWorldBean()
	{
//		throw new RuntimeException("Some Error Has Occurred ! Contact Support.");
		return new AuthenticationBean("You are authenticated!");
	}
}
