package com.onAir.LoginMvc;
import java.sql.*;

public class AdminUser {
	private String name,pwd,session;
	public AdminUser(String name,String pwd) {
		this.name = name;
		this.pwd = pwd;
	}
	public void setSession(String s) {
		this.session = s;
	}
	public String getName() {
		return name;
	}
	public String getPwd() {
		return pwd;
	}
	public String getSession() {
		return session;
	}
	boolean checkCreditational(Connection con) {
		
		boolean check = false;
		String sql = "select * from admin where name=? and password=?";
		try {
			PreparedStatement st = con.prepareStatement(sql);
			st.setString(1,name);
			st.setString(2,pwd);
			ResultSet rs=st.executeQuery();
			if(rs.next())
				check = true;
		} catch (SQLException e) {
			e.printStackTrace();
		}  
		return check;
	}
}
