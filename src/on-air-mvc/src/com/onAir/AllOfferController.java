package com.onAir;

import java.io.IOException;
import java.io.PrintWriter;
import java.sql.Connection;
import java.sql.SQLException;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import org.json.JSONArray;
import com.onAir.AllOfferModel;

/**
 * Servlet implementation class AllOfferController
 */
@WebServlet("/AllOffer")
public class AllOfferController extends HttpServlet {
	private static final long serialVersionUID = 1L;

	/**
	 * @see HttpServlet#doGet(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void doGet(HttpServletRequest req, HttpServletResponse res) throws ServletException, IOException {
		Connection con=(Connection) getServletContext().getAttribute("Connection");
		String from = req.getParameter("from");
		String to = req.getParameter("to");
		String start = req.getParameter("start");
		String end = req.getParameter("end");
		String maxp = req.getParameter("maxp");
		String minp = req.getParameter("minp");
		String maxoff = req.getParameter("maxoff");
		String minoff = req.getParameter("minoff");
		AllOfferModel aom = new AllOfferModel(from,to,start,end,maxp,minp,maxoff,minoff);
		JSONArray jsonArray = aom.getList(con);
		PrintWriter out = res.getWriter();
		String js = jsonArray.toString();
		out.print(js);
		if(from!=null)
		System.out.println("from: "+from+" to: "+to+" start: "+start+" end: "+end);
	}

}
