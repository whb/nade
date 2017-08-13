package com.bochum.nade.api;

import javax.servlet.ServletException;

public class DdosServlet extends JsonResponseServlet {
	private static final long serialVersionUID = -3549133063919188376L;

	public void init() throws ServletException {
		setFilename("ddos.json");
	}
}