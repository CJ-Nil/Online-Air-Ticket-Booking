package com.onAir;

import java.sql.Connection;
import java.sql.DriverManager;

import javax.servlet.ServletContext;
import javax.servlet.ServletContextEvent;
import javax.servlet.ServletContextListener;
import javax.servlet.annotation.WebListener;

/**
 * Application Lifecycle Listener implementation class MvcListener
 *
 */
@WebListener
public class MvcListener implements ServletContextListener {

    /**
     * Default constructor. 
     */
    public MvcListener() {
        // TODO Auto-generated constructor stub
    }

	/**
     * @see ServletContextListener#contextDestroyed(ServletContextEvent)
     */
    public void contextDestroyed(ServletContextEvent sce)  { 
         // TODO Auto-generated method stub
    	ServletContext sc = sce.getServletContext();
    	try {
    		((Connection)sc.getAttribute("Connection")).close();
    	}catch(Exception e) {}
    }

	/**
     * @see ServletContextListener#contextInitialized(ServletContextEvent)
     */
    public void contextInitialized(ServletContextEvent sce)  { 
    	ServletContext sc = sce.getServletContext();
    	String connString = sc.getInitParameter("db");
		String connDriver=sc.getInitParameter("driver");
		String connUser = sc.getInitParameter("user");
		String connPwd = sc.getInitParameter("pwd");
		try{  
			Class.forName(connDriver);  
			Connection con=DriverManager.getConnection(connString,connUser,connPwd);  
			sc.setAttribute("Connection",con);
		}catch(Exception e){ System.out.println(e);}
    	
    }
	
}
