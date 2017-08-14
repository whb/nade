package com.bochum.nade.api;

import java.io.IOException;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.google.gson.Gson;

public class SubjectServlet extends JsonResponseServlet {
	private static final long serialVersionUID = -8982316078963457144L;

	public void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		response.setHeader("Content-Type", "application/json; charset=UTF-8");
		String subject = (String) request.getServletContext().getAttribute("subject");
		String json = new Gson().toJson(subject);
		response.getWriter().write(json);
	}
}