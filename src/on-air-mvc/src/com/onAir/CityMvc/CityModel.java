package com.onAir.CityMvc;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;

import org.json.JSONArray;
import org.json.JSONObject;

public class CityModel {
	public CityModel() {
		
	}
	public JSONArray getList(Connection con) {
		String sql = "SELECT a.p_id,c.c_id,c.name AS city,a.name AS air_port FROM airport a,city c WHERE a.c_id=c.c_id";
		JSONArray jsonArray = new JSONArray();
		try {
			PreparedStatement st = con.prepareStatement(sql);
			ResultSet resultSet=st.executeQuery();
	        while (resultSet.next()) {
	            int total_rows = resultSet.getMetaData().getColumnCount();
	            JSONObject obj = new JSONObject();
	            for (int i = 0; i < total_rows; i++) {
	                obj.put(resultSet.getMetaData().getColumnLabel(i + 1)
	                        .toLowerCase(), resultSet.getObject(i + 1));
	            }
	            jsonArray.put(obj);
	        }
		} catch (SQLException e) {
			e.printStackTrace();
		} 
		return jsonArray;
	}
}
