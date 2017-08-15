package com.bochum.nade.api;

import java.io.IOException;
import java.util.HashMap;
import java.util.HashSet;
import java.util.Map;
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
		Map<String, Object> map = new HashMap<String, Object>();

		String activeAttackArea = (String) request.getServletContext().getAttribute("activeAttackArea");
		Set<String> attackAreas = (Set<String>) request.getServletContext().getAttribute("attackAreasAvailable");
		if (attackAreas == null)
			attackAreas = new HashSet<String>();

		map.put("activeAttackArea", activeAttackArea);
		map.put("attackAreas", attackAreas);
		map.put("attackViolent", false);
		String json = new Gson().toJson(map);
		response.getWriter().write(json);
	}
}