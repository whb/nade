package com.bochum.nade.api;

import java.io.IOException;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

public class DnsServlet extends JsonResponseServlet {
	private static final long serialVersionUID = -8391751802661610783L;

	public void init() throws ServletException {
		buildStatusDefine("dns.dat");
	}
	
	public void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		response.setHeader("Content-Type", "application/json; charset=UTF-8");
		String action = (String) request.getServletContext().getAttribute("action");
		String status = "initial";
		if (action == null || action.length() == 0 || action.equals("reset")) {
			status = "initial";
		} else {
			status = action;
		}
		String jsonResult = getDefine(status);
		response.getWriter().write(jsonResult);
	}

}