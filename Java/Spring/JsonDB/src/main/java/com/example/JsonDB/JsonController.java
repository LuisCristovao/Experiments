package com.example.JsonDB;

import java.io.FileNotFoundException;
import java.io.FileReader;
import java.io.IOException;
import java.text.ParseException;
import java.util.Iterator;

import org.json.simple.JSONArray;
import org.json.simple.JSONObject;
import org.json.simple.parser.JSONParser;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/")
public class JsonController {
	@RequestMapping(value = "/getDB", method = RequestMethod.GET)
	public String getDB() {
		// Read JSon file
		/*JSONParser parser = new JSONParser();

		try {

			Object obj=null;
			try {
				obj = parser.parse(new FileReader("C:\\Users\\User01\\Documents\\EclipseWorkSpace\\JsonDB\\src\\main\\resources\\JsonDB\\test.json"));
			} catch (org.json.simple.parser.ParseException e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			}
			
			JSONObject jsonObject = (JSONObject) obj;
			System.out.println(jsonObject);

			String name = (String) jsonObject.get("name");
			System.out.println(name);

			long age = (Long) jsonObject.get("age");
			System.out.println(age);

			// loop array
			JSONArray msgs = (JSONArray) jsonObject.get("messages");
			Iterator<String> it = msgs.iterator();
			while (it.hasNext()) {
				System.out.println(it.next());
			}

		} catch (FileNotFoundException e) {
			e.printStackTrace();
		} catch (IOException e) {
			e.printStackTrace();
		}*/
		DBConnection dbcon=new DBConnection();
		return dbcon.getDb().toJSONString();
				
		// return json file as string
		//return "{\"ola\":\"meu\",\"tudo\":\"bem\"}";
	}
}
