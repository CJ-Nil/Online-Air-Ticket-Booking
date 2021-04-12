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
 * Servlet implementation class DeleteOfferController
 */
@WebServlet("/DeleteOffer")
public class DeleteOfferController extends HttpServlet {
	private static final long serialVersionUID = 1L;
       
    

	/**
	 * @see HttpServlet#doPost(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void doPost(HttpServletRequest req, HttpServletResponse res) throws ServletException, IOException {
		// TODO Auto-generated method stub
		String user_id="";
		String off_id = "";
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
		    user_id = dataobject.getString("session");
		    off_id = dataobject.getString("offerid");
		} catch (JSONException e) {
			throw new IOException("Error parsing JSON request string");
		}
		ServletContext ctx = getServletContext();
		AdminUser admin = (AdminUser) ctx.getAttribute(user_id);
		Connection con = (Connection)ctx.getAttribute("Connection");
		String js="";
		if(admin!=null) {
			OfferModel model = new OfferModel();
			JSONArray arr = model.deleteItem(con,off_id);
			js = arr.toString();
		}
		PrintWriter out = res.getWriter();
		out.println(js);
		//System.out.println(js);
	}

}
