package com.onAir;

import java.io.IOException;
import java.io.PrintWriter;
import java.sql.Connection;
import java.util.List;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebFilter;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import org.json.*;
/**
 * Servlet implementation class TransportController
 */
@WebServlet("/Transport")
public class TransportController extends HttpServlet {
	private static final long serialVersionUID = 1L;

	/**
	 * @see HttpServlet#doGet(HttpServletRequest request, HttpServletResponse response)
	 */
	public void doGet(HttpServletRequest req, HttpServletResponse res) throws ServletException, IOException {
		String from = req.getParameter("from");
		String to = req.getParameter("to");
		String day = req.getParameter("day");
		Connection con=(Connection) getServletContext().getAttribute("Connection");
		TransportModel tm = new TransportModel(from,to,day);
		JSONArray jsonArray = tm.getList(con);
		PrintWriter out = res.getWriter();
		String js = jsonArray.toString();
		out.print(js);
		System.out.print(js);
	}

}
