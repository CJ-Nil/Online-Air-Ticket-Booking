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
 * Servlet implementation class AddOfferController
 */
@WebServlet("/AddOffer")
public class AddOfferController extends HttpServlet {
	private static final long serialVersionUID = 1L;

	/**
	 * @see HttpServlet#doPost(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void doPost(HttpServletRequest req, HttpServletResponse res) throws ServletException, IOException {
		String from="";
		String to = "";
		String start="";
		String end = "";
		String session="";
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
		    String data = jsonObject.getString("Method");
		    JSONObject dataobject = new JSONObject(data);
		    from = dataobject.getString("from");
		    to = dataobject.getString("to");
		    start = dataobject.getString("start");
		    end = dataobject.getString("end");
		    off = Integer.parseInt(dataobject.getString("off"));
		    session = dataobject.getString("session");
		} catch (JSONException e) {
			throw new IOException("Error parsing JSON request string");
		}
		ServletContext ctx = getServletContext();
		AdminUser admin = (AdminUser) ctx.getAttribute(session);
		Connection con = (Connection)ctx.getAttribute("Connection");
		String js="";
		System.out.println("from:"+from+" to:"+to+" Start:"+start+" end:"+end+" off:"+off+" session:"+session);
		if(admin!=null) {
			OfferModel model = new OfferModel();
			JSONArray arr = model.addItem(con,from,to,start,end,off);
			js = arr.toString();
		}
		PrintWriter out = res.getWriter();
		out.println(js);
		System.out.println(js);
	}

}
