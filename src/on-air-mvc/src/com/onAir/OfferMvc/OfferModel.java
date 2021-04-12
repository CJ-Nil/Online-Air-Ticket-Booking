package com.onAir.OfferMvc;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Timestamp;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;
import org.json.JSONArray;
import org.json.JSONObject;

public class OfferModel {
	public JSONArray deleteItem(Connection con,String off_id) {
		 int id=Integer.parseInt(off_id); 
		 int status=0;
		 JSONArray jsonArray = new JSONArray();
		 String sql = "delete from offer where off_id=?";
		 try {
			PreparedStatement st = con.prepareStatement(sql);
			st.setInt(1,id);  
			status =st.executeUpdate();
			jsonArray = this.getList(con);
			System.out.println("Status"+status);
		} catch (SQLException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		 return jsonArray;
	}
	public JSONArray getList(Connection con) {
		String sql = "SELECT off.off_id,x.from_id,y.to_id,x.from_city,y.to_city,off.offer,off.start,off.end "
				+ "FROM (SELECT off.off_id AS l_id,c.c_id AS from_id,c.name AS from_city FROM offer off,city "
				+ "c WHERE c.c_id=off.from_city) X,(SELECT off.off_id AS r_id,c.c_id AS to_id,c.name AS to_city "
				+ "FROM offer off,city c WHERE c.c_id=off.to_city) Y,offer off WHERE "
				+ "x.from_id=off.from_city AND y.to_id=off.to_city AND x.l_id=y.r_id";
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
	public JSONArray addItem(Connection con,String from,String to,String start,String end,int off) {
		int status=0;
		 JSONArray jsonArray = new JSONArray();
		 String sql = "INSERT INTO offer (from_city,to_city,offer,start,end) VALUES (?, ?, ?, ?, ?)";
		 try {
			PreparedStatement state = con.prepareStatement(sql);
			state.setString(1,from);
			state.setString(2,to);
			state.setInt(3,off); 
			state.setString(4,start);
			state.setString(5,end);
			status =state.executeUpdate();
			jsonArray = this.getList(con);
			//System.out.println("Status"+status);
		} catch (SQLException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		 return jsonArray;
	}
	public JSONObject getItem(Connection con,int id) {
		String sql = "SELECT off.off_id,x.from_id,y.to_id,x.from_city,y.to_city,off.offer,off.start,off.end "
				+ "FROM (SELECT off.off_id AS l_id,c.c_id AS from_id,c.name AS from_city FROM offer off,city "
				+ "c WHERE c.c_id=off.from_city) X,(SELECT off.off_id AS r_id,c.c_id AS to_id,c.name AS to_city "
				+ "FROM offer off,city c WHERE c.c_id=off.to_city) Y,offer off WHERE "
				+ "x.from_id=off.from_city AND y.to_id=off.to_city AND x.l_id=y.r_id AND off.off_id=?";
		JSONObject obj = new JSONObject();
		try {
			PreparedStatement st = con.prepareStatement(sql);
			st.setInt(1,id);
			ResultSet resultSet=st.executeQuery();
			if(resultSet.next()) {
				int total_cols = resultSet.getMetaData().getColumnCount();
				for (int i = 0; i < total_cols; i++) {
	                obj.put(resultSet.getMetaData().getColumnLabel(i + 1).toLowerCase(), resultSet.getObject(i + 1));
	            }
			}
		} catch (SQLException e) {
			e.printStackTrace();
		} 
		return obj;
	}
	public JSONArray editItem(Connection con,int id,int offer ,String from,String to,String start,String end) {
		JSONArray jsonArray = new JSONArray();
		int status=0;
		 String sql = "UPDATE offer SET from_city=?,to_city=?,offer=?,start=?,end=? WHERE off_id=?";
		 try {
			PreparedStatement state = con.prepareStatement(sql);
			state.setString(1,from);
			state.setString(2,to);
			state.setInt(3,offer); 
			state.setString(4,start);
			state.setString(5,end);
			state.setInt(6,id); 
			status =state.executeUpdate();
			jsonArray = this.getList(con);
			//System.out.println("Status"+status);
		} catch (SQLException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		 return jsonArray;
	}
}
