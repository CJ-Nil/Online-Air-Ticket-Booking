package com.onAir.FlightsMvc;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.PrintWriter;
import java.sql.Connection;

import javax.servlet.ServletContext;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.json.HTTP;
import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;

import com.onAir.LoginMvc.AdminUser;

/**
 * Servlet implementation class EditFlightController
 */
@WebServlet("/EditFlight")
public class EditFlightController extends HttpServlet {
	private static final long serialVersionUID = 1L;

	protected void doPost(HttpServletRequest req, HttpServletResponse res) throws ServletException, IOException {
		// TODO Auto-generated method stub
		int from,to,id,cost,airline,day;
		String arival="";
		String departure = "";
		String session="";
		
		System.out.println("Hello!!!");
		StringBuffer jb = new StringBuffer();
		String line = null;
		try {
		     BufferedReader reader = req.getReader();
		     while ((line = reader.readLine()) != null) {
		    	 jb.append(line);
		     }
		} catch (Exception e) { /*report an error*/ }
		try {
			JSONObject jsonObject =  HTTP.toJSONObject(jb.toString());
			System.out.println(jsonObject.toString());
		    String data = jsonObject.getString("Method");
		    JSONObject dataobject = new JSONObject(data);
		    from = Integer.parseInt(dataobject.getString("from"));
		    to = Integer.parseInt(dataobject.getString("to"));
		    departure = dataobject.getString("depature");
		    arival = dataobject.getString("arival");
		    cost = Integer.parseInt(dataobject.getString("cost"));
		    session = dataobject.getString("session");
		    id = Integer.parseInt(dataobject.getString("id"));
		    day = Integer.parseInt(dataobject.getString("day"));
		    airline = Integer.parseInt(dataobject.getString("airline"));
		} catch (JSONException e) {
			throw new IOException("Error parsing JSON request string");
		}
		ServletContext ctx = getServletContext();
		AdminUser admin = (AdminUser) ctx.getAttribute(session);
		Connection con = (Connection)ctx.getAttribute("Connection");
		String js="";
		if(admin!=null) {
			FlightModel model = new FlightModel();
			JSONArray arr = model.editItem(con, id, cost, from, to, departure, arival, day, airline);
			js = arr.toString();
		}
		PrintWriter out = res.getWriter();
		out.println(js);
	}

}
