package com.bochum.neteye.api;

import javax.servlet.ServletException;

public class DetailServlet extends JsonResponseServlet {
	private static final long serialVersionUID = -3549133063919188376L;

	public void init() throws ServletException {
		setFilename("resultdata_detail.json");
	}
}