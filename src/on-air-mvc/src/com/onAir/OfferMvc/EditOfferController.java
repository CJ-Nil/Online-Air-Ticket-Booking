package com.onAir.OfferMvc;

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
 * Servlet implementation class EditOfferController
 */
@WebServlet("/EditOffer")
public class EditOfferController extends HttpServlet {
	private static final long serialVersionUID = 1L;
	protected void doPost(HttpServletRequest req, HttpServletResponse res) throws ServletException, IOException {
		// TODO Auto-generated method stub
		String from="";
		String to = "";
		String start="";
		String end = "";
		String session="";
		int id;
		int off;
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
		    from = dataobject.getString("from");
		    to = dataobject.getString("to");
		    start = dataobject.getString("start");
		    System.out.println("Start: "+start);
		    end = dataobject.getString("end");
		    off = Integer.parseInt(dataobject.getString("offer"));
		    session = dataobject.getString("session");
		    id = Integer.parseInt(dataobject.getString("id"));
		} catch (JSONException e) {
			throw new IOException("Error parsing JSON request string");
		}
		ServletContext ctx = getServletContext();
		AdminUser admin = (AdminUser) ctx.getAttribute(session);
		Connection con = (Connection)ctx.getAttribute("Connection");
		String js="";
		if(admin!=null) {
			OfferModel model = new OfferModel();
			JSONArray arr = model.editItem(con, id, off, from, to, start, end);
			js = arr.toString();
		}
		PrintWriter out = res.getWriter();
		out.println(js);
	}

}
