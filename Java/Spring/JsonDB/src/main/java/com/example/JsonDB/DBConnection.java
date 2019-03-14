package com.example.JsonDB;

import java.io.FileNotFoundException;
import java.io.FileReader;
import java.io.IOException;
import java.util.Iterator;

import org.json.simple.JSONArray;
import org.json.simple.JSONObject;
import org.json.simple.parser.JSONParser;

public class DBConnection {
	private JSONObject db;
	private String path;
	
	public DBConnection() {
		path="C:\\Users\\User01\\Documents\\EclipseWorkSpace\\JsonDB\\src\\main\\resources\\JsonDB\\test.json";
		db=getJsonObj();
	}
	
	public JSONObject getDb() {
		return db;
	}
	public void setDb(JSONObject db) {
		this.db = db;
	}
	private JSONObject getJsonObj() {
		// Read JSon file
				JSONParser parser = new JSONParser();

				try {

					Object obj=null;
					try {
						obj = parser.parse(new FileReader(this.path));
					} catch (org.json.simple.parser.ParseException e) {
						// TODO Auto-generated catch block
						e.printStackTrace();
					}
					
					JSONObject jsonObject = (JSONObject) obj;
					System.out.println(jsonObject);
					return jsonObject;
					/*String name = (String) jsonObject.get("name");
					System.out.println(name);

					long age = (Long) jsonObject.get("age");
					System.out.println(age);

					// loop array
					JSONArray msgs = (JSONArray) jsonObject.get("messages");
					Iterator<String> it = msgs.iterator();
					while (it.hasNext()) {
						System.out.println(it.next());
					}*/

				} catch (FileNotFoundException e) {
					e.printStackTrace();
				} catch (IOException e) {
					e.printStackTrace();
				}
				
				return null;
				
	}
}
