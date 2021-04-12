package com.onAir.FlightsMvc;

import java.io.IOException;
import java.io.PrintWriter;
import java.sql.Connection;

import javax.servlet.ServletContext;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.json.JSONArray;
import org.json.JSONObject;

import com.onAir.LoginMvc.AdminUser;



/**
 * Servlet implementation class FlightsController
 */
@WebServlet("/Flights")
public class FlightsController extends HttpServlet {
	private static final long serialVersionUID = 1L;

	/**
	 * @see HttpServlet#doPost(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void doPost(HttpServletRequest req, HttpServletResponse res) throws ServletException, IOException {
		Connection con=(Connection) getServletContext().getAttribute("Connection");
		FlightModel fm = new FlightModel();
		JSONArray jsonArray = fm.getFlights(con);
		PrintWriter out = res.getWriter();
		
		String js = jsonArray.toString();
		//res.getOutputStream().println(js);
		out.print(js);
		System.out.print(js);
	}
	protected void doGet(HttpServletRequest req, HttpServletResponse res) throws ServletException, IOException {
		int id = Integer.parseInt(req.getParameter("id"));
		String user_id = req.getParameter("session");
		ServletContext ctx = getServletContext();
		//AdminUser admin = (AdminUser) ctx.getAttribute(user_id);
		Connection con = (Connection)ctx.getAttribute("Connection");
		String js="";
		FlightModel fm = new FlightModel();
		JSONObject obj = fm.getItem(con, id);
		js = obj.toString();
		PrintWriter out = res.getWriter();
		out.println(js);
		System.out.println("get:"+js);
	}

}
