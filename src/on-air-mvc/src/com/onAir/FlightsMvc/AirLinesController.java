package com.onAir.FlightsMvc;

import java.io.IOException;
import java.io.PrintWriter;
import java.sql.Connection;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import org.json.JSONArray;

/**
 * Servlet implementation class AirLinesController
 */
@WebServlet("/AirLines")
public class AirLinesController extends HttpServlet {
	private static final long serialVersionUID = 1L;
       
   
	protected void doGet(HttpServletRequest req, HttpServletResponse res) throws ServletException, IOException {
		// TODO Auto-generated method stub
		Connection con=(Connection) getServletContext().getAttribute("Connection");
		FlightModel fm = new FlightModel();
		JSONArray jsonArray = fm.getAirlines(con);
		PrintWriter out = res.getWriter();
		
		String js = jsonArray.toString();
		out.print(js);
		System.out.print(js);
	}

}
