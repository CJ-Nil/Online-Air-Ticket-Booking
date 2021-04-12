package com.onAir.LoginMvc;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.PrintWriter;


import javax.servlet.ServletContext;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.json.HTTP;

import org.json.JSONException;
import org.json.JSONObject;


/**
 * Servlet implementation class LogoutController
 */
@WebServlet("/Logout")
public class LogoutController extends HttpServlet {
	private static final long serialVersionUID = 1L;

	/**
	 * @see HttpServlet#doPost(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		PrintWriter out=response.getWriter();
		String name="";
		String id="";
		StringBuffer jb = new StringBuffer();
		String line = null;
		try {
		     BufferedReader reader = request.getReader();
		     while ((line = reader.readLine()) != null) {
		    	 jb.append(line);
		     }
		} catch (Exception e) { /*report an error*/ }
		try {
			JSONObject jsonObject =  HTTP.toJSONObject(jb.toString());
		    String data = jsonObject.getString("Method");
		    JSONObject dataobject = new JSONObject(data);
		    name = dataobject.getString("username");
		    id = dataobject.getString("session");
		} catch (JSONException e) {
			throw new IOException("Error parsing JSON request string");
		}	
		ServletContext ctx = getServletContext();
		AdminUser admin = (AdminUser) ctx.getAttribute(id);
		boolean status =false;
		if(admin!=null) {
			ctx.removeAttribute(id);
			status = true;
		}
		out.println(status);
	}

}
