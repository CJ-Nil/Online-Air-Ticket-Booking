package com.onAir;
import org.json.*;
import java.sql.*;
public class AllOfferModel {
	private String from,to,start,end,maxp,minp,maxoff,minoff;
	AllOfferModel(String f,String t,String s,String e,String maxp,String minp,String maxoff,String minoff){
		from=f;
		to=t;
		start=s;
		end=e;
		this.maxoff=maxoff;
		this.minoff=minoff;
		this.maxp = maxp;
		this.minp = minp;
	}
	public JSONArray getList(Connection con) {
		String sql = "SELECT x.t_id,x.a_time,x.d_time,x.from_city,y.to_city,x.from_id,y.to_id,off.offer,x.original_cost,"
				+ "FLOOR((x.original_cost-(x.original_cost*(off.offer/100)))) AS offer_cost,off.start,off.end "
				+ "FROM (SELECT t.t_id,t.a_time,t.d_time,c.name AS from_city,"
				+ "t.from_city AS from_id,t.cost AS original_cost FROM transport t,city c WHERE c.c_id=t.from_city) x,"
				+ "(SELECT t.t_id,c.name AS to_city,t.to_city AS to_id FROM transport t,city c WHERE c.c_id=t.to_city ) y,offer off "
				+ "WHERE x.t_id=y.t_id AND x.from_id=off.from_city AND y.to_id=off.to_city AND "
				+ "CURRENT_TIMESTAMP()>=off.start AND CURRENT_TIMESTAMP()<=off.end "
				+"AND off.from_city LIKE ? AND off.to_city LIKE ? "
				+"AND FLOOR((x.original_cost-(x.original_cost*(off.offer/100)))) >= ? "
				+ "AND FLOOR((x.original_cost-(x.original_cost*(off.offer/100)))) <= ? "
				+"AND off.offer >= ? AND off.offer <= ? ";
				if(start!=null)
				sql+="AND off.start<=? ";
				if(end!=null)
				sql+="AND off.end>=?" ;
				
		JSONArray jsonArray = new JSONArray();
		try {
			PreparedStatement st = con.prepareStatement(sql);
			if(from!=null)
			st.setString(1, from);
			else
			st.setString(1, "_%");
			if(to!=null)
			st.setString(2, to);
			else
			st.setString(2, "_%");
			if(minp!=null)
				st.setString(3, minp);
			else
				st.setString(3,"0");
			if(maxp!=null)
				st.setString(4, maxp);
			else
				st.setString(4, Integer.MAX_VALUE+"");
			if(minoff!=null)
				st.setString(5, minoff);
			else 
				st.setString(5, "0");
			if(maxoff!=null)
				st.setString(6, maxoff);
			else
				st.setString(6,Integer.MAX_VALUE+"" );
			if(start!=null)
				st.setString(7, start);
			if(end!=null && start!=null)
				st.setString(8, end);
			else if(end!=null)
				st.setString(7, end);
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
