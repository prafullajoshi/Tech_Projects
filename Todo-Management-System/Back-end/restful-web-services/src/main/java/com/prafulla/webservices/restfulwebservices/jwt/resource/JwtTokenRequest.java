package com.prafulla.webservices.restfulwebservices.jwt.resource;

import java.io.Serializable;

public class  JwtTokenRequest implements Serializable {
  
  private static final long serialVersionUID = -5616176897013108345L;

  private String username;
    private String password;
    
    
//    {
//    	"token": "eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJwcmFmdWxsYSIsImV4cCI6MTU5MDU3Mzc1OCwiaWF0IjoxNTg5OTY4OTU4fQ.REFjqqw0463hgX-tIn3JRzvjlk3xujoVZehmLw0J9mgE0vKrKDQibQAZPubfXaH_hCpqg1H8-IQSmHRMF5f2_g"
//    }
    

    public JwtTokenRequest() {
        super();
    }

    public JwtTokenRequest(String username, String password) {
        this.setUsername(username);
        this.setPassword(password);
    }

    public String getUsername() {
        return this.username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getPassword() {
        return this.password;
    }

    public void setPassword(String password) {
        this.password = password;
    }
}

