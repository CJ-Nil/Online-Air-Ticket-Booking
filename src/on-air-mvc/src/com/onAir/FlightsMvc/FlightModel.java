package com.onAir.FlightsMvc;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Time;
import org.json.JSONArray;
import org.json.JSONObject;

public class FlightModel {
	public JSONArray deleteItem(Connection con,String tid) {
		 int id=Integer.parseInt(tid); 
		 int status=0;
		 JSONArray jsonArray = new JSONArray();
		 String sql = "delete from transport where t_id=?";
		 try {
			PreparedStatement st = con.prepareStatement(sql);
			st.setInt(1,id);  
			status =st.executeUpdate();
			jsonArray = this.getFlights(con);
			System.out.println("Status"+status);
		} catch (SQLException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		 return jsonArray;
	}
	public JSONArray getFlights(Connection con) {
		String sql = "SELECT t.t_id,x.from_id,y.to_id,x.from_city,y.to_city,t.d_time,t.a_time,a.name AS airline,t.cost,t.day FROM "
				+ "(SELECT c.c_id AS from_id,c.name AS from_city ,t.t_id AS l_id FROM transport t,city c WHERE c.c_id=t.from_city)X,"
				+ "(SELECT c.c_id AS to_id,c.name AS to_city ,t.t_id AS r_id FROM transport t,city c WHERE c.c_id=t.to_city) Y,"
				+ "transport t,airline a WHERE t.t_id=x.l_id AND t.t_id = y.r_id AND x.l_id=y.r_id AND a.a_id = t.a_id";
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
	public JSONObject getItem(Connection con,int id) {
		String sql = "SELECT t.t_id,x.from_id,y.to_id,x.from_city,y.to_city,t.d_time,t.a_time,a.name AS airline,t.cost,t.day,a.a_id FROM "
				+ "(SELECT c.c_id AS from_id,c.name AS from_city ,t.t_id AS l_id FROM transport t,city c WHERE c.c_id=t.from_city)X,"
				+ "(SELECT c.c_id AS to_id,c.name AS to_city ,t.t_id AS r_id FROM transport t,city c WHERE c.c_id=t.to_city) Y,"
				+ "transport t,airline a WHERE t.t_id=x.l_id AND t.t_id = y.r_id AND x.l_id=y.r_id AND a.a_id = t.a_id AND t.t_id=?";
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
	public JSONArray editItem(Connection con,int id,int cost ,int from,int to,String departure,String arival,int day,int airline) {
		JSONArray jsonArray = new JSONArray();
		int status=0;
		 String sql = "UPDATE transport SET from_city=?,to_city=?,a_id=?,a_time=?,d_time=?,day=?,cost=? WHERE t_id=?";
		 try {
			PreparedStatement state = con.prepareStatement(sql);
			state.setInt(1, from);
			state.setInt(2,to);
			state.setInt(3,airline);
			state.setString(4, arival);
			state.setString(5, departure);
			state.setInt(6,day); 
			state.setInt(7,cost); 
			state.setInt(8,id); 
			status =state.executeUpdate();
			jsonArray = this.getFlights(con);
			System.out.println("Status"+status);
		} catch (SQLException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		 return jsonArray;
	}
	public JSONArray getAirlines(Connection con) {
		String sql = "Select * from airline";
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
	public JSONArray addItem(Connection con,int cost ,int from,int to,String departure,String arival,int day,int airline) {
		JSONArray jsonArray = new JSONArray();
		int status=0;
		 String sql = "INSERT INTO transport (from_city,to_city,a_id,a_time,d_time,day,cost) VALUES (?, ?, ?, ?, ?, ?, ?)";
		 try {
			PreparedStatement state = con.prepareStatement(sql);
			state.setInt(1, from);
			state.setInt(2,to);
			state.setInt(3,airline);
			state.setString(4, arival);
			state.setString(5, departure);
			state.setInt(6,day); 
			state.setInt(7,cost);  
			status =state.executeUpdate();
			jsonArray = this.getFlights(con);
			System.out.println("Status"+status);
		} catch (SQLException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		 return jsonArray;
	}
}
