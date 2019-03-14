package com.example.JsonDB;

import java.io.FileNotFoundException;
import java.io.FileReader;
import java.io.FileWriter;
import java.io.IOException;

import org.json.simple.JSONObject;
import org.json.simple.parser.JSONParser;
import org.json.simple.parser.ParseException;

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
	public boolean setDb(String db) {
		JSONParser parser = new JSONParser();
		JSONObject json = null;
		try {
			json = (JSONObject) parser.parse(db);
			
		} catch (ParseException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
			return false;
		}
		this.db = json;
		writeJsonToFile(this.db);
		return true;
	}
	private boolean writeJsonToFile(JSONObject db) {
		try (FileWriter file = new FileWriter(this.path)) {

            file.write(db.toJSONString());
            file.flush();
            return true;

        } catch (IOException e) {
            e.printStackTrace();
            return false;
        }
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
