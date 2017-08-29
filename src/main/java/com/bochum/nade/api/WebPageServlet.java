package com.bochum.nade.api;

import java.io.IOException;
import java.util.LinkedHashMap;
import java.util.Map;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.google.gson.Gson;

public class WebPageServlet extends JsonResponseServlet {
	private static final long serialVersionUID = -3549133063919188376L;

	public void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		response.setHeader("Content-Type", "application/json; charset=UTF-8");
		Map<String, Object> map = new LinkedHashMap<String, Object>();

		Boolean alarm = (Boolean) request.getServletContext().getAttribute("alarm");
		if (alarm != null && alarm) {
			map.put("alarm", alarm);
			request.getServletContext().setAttribute("alarm", null);
		}

		String json = new Gson().toJson(map);
		response.getWriter().write(json);
	}

}