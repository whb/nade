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

	public static boolean checkAuthorization(HttpServletRequest request, HttpServletResponse response, String opreate)
			throws ServletException, IOException {
		String loginOpreate = (String) request.getSession().getAttribute("LOGIN_OPREATE");
		if (opreate.equals(loginOpreate)) {
			return true;
		}
		RequestDispatcher requestDispatcher = request.getRequestDispatcher("/index.jsp");
		requestDispatcher.forward(request, response);
		return false;
	}

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
		if (passwords[0].equals(password)) {
			request.getSession().setAttribute("LOGIN_OPREATE", "dashboard");
			response.getWriter().write("dashboard");
		} else if (passwords[1].equals(password)) {
			request.getSession().setAttribute("LOGIN_OPREATE", "console");
			response.getWriter().write("console");
		} else {
			response.getWriter().write("error");
		}
	}

	public void destroy() {
	}
}