package com.onAir.CityMvc;

import java.io.IOException;
import java.io.PrintWriter;
import java.sql.Connection;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.json.JSONArray;

import com.onAir.CityMvc.CityModel;
/**
 * Servlet implementation class CityListController
 */
@WebServlet("/CityList")
public class CityListController extends HttpServlet {
	private static final long serialVersionUID = 1L;

	/**
	 * @see HttpServlet#doGet(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void doGet(HttpServletRequest req, HttpServletResponse res) throws ServletException, IOException {
		// TODO Auto-generated method stub
		Connection con=(Connection) getServletContext().getAttribute("Connection");
		CityModel cm = new CityModel();
		JSONArray jsonArray = cm.getList(con);
		PrintWriter out = res.getWriter();
		String js = jsonArray.toString();
		out.print(js);
		System.out.println(js);
	}

}
