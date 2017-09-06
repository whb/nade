package com.bochum.nade.servlet;

import java.io.IOException;
import java.util.Date;
import java.util.LinkedHashSet;
import java.util.LinkedHashMap;
import java.util.Map;
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
		if (!LoginServlet.checkAuthorization(request, response))
			return;

		String subject = (String) request.getServletContext().getAttribute("subject");
		if (subject == null || subject.length() == 0)
			request.getServletContext().setAttribute("subject", "ddos");

		RequestDispatcher requestDispatcher = request.getRequestDispatcher("/console.jsp");
		requestDispatcher.forward(request, response);
	}

	public void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		String ddosAlarm = request.getParameter("alarm");
		if ("true".equals(ddosAlarm)) {
			request.getServletContext().setAttribute("alarm", true);
			return;
		}

		String subject = request.getParameter("subject");
		if (subject != null && subject.length() > 0) {
			String oldSubject = (String) request.getServletContext().getAttribute("subject");
			if (!subject.equals(oldSubject)) {
				request.getServletContext().setAttribute("subject", subject);
				request.getServletContext().setAttribute("action", null);
			}
			return;
		}

		subject = (String) request.getServletContext().getAttribute("subject");
		if (subject == null || subject.length() == 0)
			subject = "ddos";

		if (subject.equals("ddos")) {
			doDdos(request);
		} else {
			doCommonAction(request);
		}
	}

	@SuppressWarnings("unchecked")
	private void doDdos(HttpServletRequest request) {
		String reset = request.getParameter("reset");
		if ("true".equals(reset)) {
			request.getServletContext().setAttribute("alarm", null);
			request.getServletContext().setAttribute("activeAttackArea", null);
			request.getServletContext().setAttribute("lastDefensingArea", null);

			request.getServletContext().setAttribute("attackAreas", null);
			request.getServletContext().setAttribute("defensingAreaMap", null);
			return;
		}

		String activeAttackArea = request.getParameter("activeAttackArea");

		if (activeAttackArea != null && activeAttackArea.length() > 0) {
			request.getServletContext().setAttribute("activeAttackArea", activeAttackArea);

			addActiveArea(request, activeAttackArea);
			return;
		}

		String defensingArea = request.getParameter("defensingArea");
		if (defensingArea != null && defensingArea.length() > 0 && isRemoveFromActive(request, defensingArea)) {
			request.getServletContext().setAttribute("lastDefensingArea", defensingArea);

			Map<String, Date> defensingAreaMap = (Map<String, Date>) request.getServletContext()
					.getAttribute("defensingAreaMap");
			if (defensingAreaMap == null)
				defensingAreaMap = new LinkedHashMap<String, Date>();
			defensingAreaMap.put(defensingArea, new Date());

			return;
		}
	}

	@SuppressWarnings("unchecked")
	private boolean isRemoveFromActive(HttpServletRequest request, String defensingArea) {
		Set<String> attackAreas = (LinkedHashSet<String>) request.getServletContext().getAttribute("attackAreas");
		if (attackAreas == null)
			attackAreas = new LinkedHashSet<String>();
		boolean alreadyActive = attackAreas.contains(defensingArea);
		if (alreadyActive) {
			attackAreas.remove(defensingArea);
			request.getServletContext().setAttribute("attackAreas", attackAreas);
		}

		return alreadyActive;
	}

	@SuppressWarnings("unchecked")
	private void addActiveArea(HttpServletRequest request, String activeAttackArea) {
		Set<String> attackAreas = (LinkedHashSet<String>) request.getServletContext().getAttribute("attackAreas");
		if (attackAreas == null)
			attackAreas = new LinkedHashSet<String>();
		attackAreas.add(activeAttackArea);
		request.getServletContext().setAttribute("attackAreas", attackAreas);
	}

	private void doCommonAction(HttpServletRequest request) {
		String reset = request.getParameter("reset");
		if ("true".equals(reset)) {
			request.getServletContext().setAttribute("action", "reset");
			return;
		}

		String action = request.getParameter("action");
		if (action != null && action.length() > 0) {
			request.getServletContext().setAttribute("action", action);
			return;
		}

	}

}