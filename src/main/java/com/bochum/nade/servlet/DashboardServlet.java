package com.bochum.nade.servlet;

import java.io.IOException;

import javax.servlet.RequestDispatcher;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

public class DashboardServlet extends HttpServlet {
	private static final long serialVersionUID = -1779650997215496961L;

	public void init() throws ServletException {
	}

	public void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		Boolean isLogin = (Boolean) request.getSession().getAttribute("USER_LOGIN");
		if (isLogin == null || isLogin == false) {
			RequestDispatcher requestDispatcher = request.getRequestDispatcher("/index.jsp");
			requestDispatcher.forward(request, response);
			return;
		}

		RequestDispatcher requestDispatcher = request.getRequestDispatcher("/dashboard.jsp");
		requestDispatcher.forward(request, response);
	}

	public void destroy() {
	}
}