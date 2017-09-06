package com.bochum.nade.servlet;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;

import javax.servlet.RequestDispatcher;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

public class LoginServlet extends HttpServlet {
	private static final long serialVersionUID = -1779650997215496961L;
	private String[] passwords;

	public void init() throws ServletException {
		InputStream is = getServletContext().getResourceAsStream("/WEB-INF/login/password");
		StringBuffer sb = new StringBuffer();
		if (is != null) {
			try {
				BufferedReader reader = new BufferedReader(new InputStreamReader(is, "UTF-8"));
				String text;
				while ((text = reader.readLine()) != null) {
					sb.append(text);
				}
			} catch (IOException e) {
				e.printStackTrace();
			}
		}
		;
		passwords = sb.toString().split("\\s");
	}

	@Override
	public void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		RequestDispatcher requestDispatcher = request.getRequestDispatcher("/index.jsp");
		requestDispatcher.forward(request, response);
	}

	@Override
	protected void doPost(HttpServletRequest request, HttpServletResponse response)
			throws ServletException, IOException {
		String password = request.getParameter("password");
		if (isContain(password)) {
			request.getSession().setAttribute("USER_LOGIN", true);
			response.getWriter().write("success");
		} else {
			response.getWriter().write("error");
		}
	}

	private boolean isContain(String password) {
		for (String p : passwords) {
			if (p.equals(password))
				return true;
		}
		return false;
	}

	public void destroy() {
	}
}