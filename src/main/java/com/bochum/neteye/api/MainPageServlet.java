package com.bochum.neteye.api;

import javax.servlet.ServletException;

public class MainPageServlet extends JsonResponseServlet  {
	private static final long serialVersionUID = 6880912085033154824L;

	public void init() throws ServletException {
		setFilename("mainPage.json");
	}
}