package com.bochum.nade.api;

import java.io.IOException;
import java.util.HashSet;
import java.util.Set;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.google.gson.Gson;

public class DdosServlet extends JsonResponseServlet {
	private static final long serialVersionUID = -3549133063919188376L;

	@SuppressWarnings("unchecked")
	public void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		response.setHeader("Content-Type", "application/json; charset=UTF-8");
		Set<String> attackAreasAvailable = (Set<String>) request.getServletContext().getAttribute("attackAreasAvailable");
		if (attackAreasAvailable == null)
			attackAreasAvailable = new HashSet<String>();

		String json = new Gson().toJson(attackAreasAvailable);
		response.getWriter().write(json);
	}
}