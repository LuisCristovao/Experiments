package com.example.JsonDB;


import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/")
public class JsonController {
	@RequestMapping(value = "/getDB", method = RequestMethod.GET)
	public String getDB() {
		//Json db connection
		DBConnection dbcon=new DBConnection();
		//return db as string
		return dbcon.getDb().toJSONString();
				
	}
	@PostMapping("/insertDB")
	public String insertDB(@RequestBody String data) {
		//Json db connection
		DBConnection dbcon=new DBConnection();
		//return db as string
		
		System.out.println("post test:");
		System.out.println(data);
		dbcon.setDb(data);
		return "true";
				
	}
}
