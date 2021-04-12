package com.onAir;
import org.json.*;
import java.sql.*;
public class TransportModel {
	String from ,to,day;
	public TransportModel(String from,String to,String d) {
		this.from = from;
		this.to = to;
		this.day = d;
	}
	public JSONArray getList(Connection con) {
		String sql = "SELECT x.t_id,x.airline,x.d_time,x.a_time,x.cost AS original_cost,IFNULL(off.offer,0) AS offer,"
				+ "FLOOR(IFNULL((x.cost-(x.cost*(offer/100))),x.cost)) AS offer_cost,off.end FROM (SELECT a.name AS airline,t.t_id,t.from_city,"
				+ "t.to_city,t.a_time,t.d_time,t.cost FROM transport t,airline a WHERE t.a_id = a.a_id AND t.from_city=? AND t.to_city = ? AND t.day=?) X "
				+ "LEFT JOIN offer off ON x.from_city=off.from_city AND x.to_city = off.to_city AND CURRENT_TIMESTAMP() >= off.start AND "
				+ "CURRENT_TIMESTAMP() <= off.end ORDER BY (cost-offer_cost) DESC ";
		JSONArray jsonArray = new JSONArray();
		try {
			PreparedStatement st = con.prepareStatement(sql);
			st.setString(1,from);
			st.setString(2,to);
			st.setString(3,(day+""));
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
