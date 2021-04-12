package com.onAir.LoginMvc;

import java.io.BufferedReader;

import org.json.HTTP;
import org.json.JSONException;
import org.json.JSONObject;
import java.io.IOException;
import java.io.PrintWriter;

import javax.servlet.ServletContext;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
import java.sql.*;
/**
 * Servlet implementation class LoginController
 */
@WebServlet("/Login")
public class LoginController extends HttpServlet {
	private static final long serialVersionUID = 1L;
       
    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		PrintWriter out=response.getWriter();
		String name="";
		String password="";
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
		    password = dataobject.getString("password");
		} catch (JSONException e) {
			throw new IOException("Error parsing JSON request string");
		}	
		System.out.println("name:"+name+" password"+password);
		Connection con=(Connection) getServletContext().getAttribute("Connection");
		AdminUser user = new AdminUser(name,password);
		String sessionid="";
		ServletContext ctx = getServletContext();
		if(user.checkCreditational(con)){
			HttpSession session = request.getSession();
			sessionid = session.getId();
			user.setSession(sessionid);
			ctx.setAttribute(sessionid, user);
		}
		JSONObject obj = new JSONObject();
		obj.put("session",sessionid);
		out.println(obj);
	}

}
