package com.bochum.nade.servlet;

import java.io.IOException;
import java.util.HashSet;
import java.util.Set;

import javax.servlet.RequestDispatcher;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

public class ConsoleServlet extends HttpServlet {
	private static final long serialVersionUID = -1779650997215496961L;

	public void init() throws ServletException {
	}

	public void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		RequestDispatcher requestDispatcher = request.getRequestDispatcher("/console.jsp");
		requestDispatcher.forward(request, response);
	}

	@SuppressWarnings("unchecked")
	public void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		String reset = request.getParameter("reset");
		if ("true".equals(reset)) {
			request.getServletContext().setAttribute("activeAttackArea", null);
			request.getServletContext().setAttribute("attackAreasAvailable", null);
			return;
		}

		String subject = request.getParameter("subject");
		if (subject != null && subject.length() > 0) {
			request.getServletContext().setAttribute("subject", subject);
			return;
		}

		String activeAttackArea = request.getParameter("activeAttackArea");
		if (activeAttackArea != null && activeAttackArea.length() > 0) {
			request.getServletContext().setAttribute("activeAttackArea", activeAttackArea);

			Set<String> attackAreasAvailable = (HashSet<String>) request.getServletContext().getAttribute("attackAreasAvailable");
			if (attackAreasAvailable == null)
				attackAreasAvailable = new HashSet<String>();
			attackAreasAvailable.add(activeAttackArea);

			request.getServletContext().setAttribute("attackAreasAvailable", attackAreasAvailable);
			return;
		}
		
		String inactiveAttackArea = request.getParameter("inactiveAttackArea");
		if (inactiveAttackArea != null && inactiveAttackArea.length() > 0) {
			request.getServletContext().setAttribute("inactiveAttackArea", inactiveAttackArea);

			Set<String> attackAreasAvailable = (HashSet<String>) request.getServletContext().getAttribute("attackAreasAvailable");
			if (attackAreasAvailable == null)
				attackAreasAvailable = new HashSet<String>();
			attackAreasAvailable.remove(inactiveAttackArea);

			request.getServletContext().setAttribute("attackAreasAvailable", attackAreasAvailable);
			return;
		}
	}

	public void destroy() {
	}
}