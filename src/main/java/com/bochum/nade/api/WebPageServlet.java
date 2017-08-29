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
		
		
		if ("attack".equals(request.getServletContext().getAttribute("action"))) {
			map.put("status", "attacked");
			map.put("attackArea", "河北");
			map.put("targetArea", "天津");
			map.put("alarm_text", "攻击者发起口令破解攻击。");
		} else if ("alarm".equals(request.getServletContext().getAttribute("action"))) {
			map.put("status", "alarm");
			map.put("alarm_text", "用户口令被破解（admin/p@ssw0rd）");
			map.put("chart_image", "distort_webpage.jpg");
		} else if ("repair".equals(request.getServletContext().getAttribute("action"))) {
		} else if ("defense".equals(request.getServletContext().getAttribute("action"))) {
		} else {
			map.put("status", "initial");
			map.put("attackArea", "河北");
			map.put("targetArea", "天津");
		}

		String json = new Gson().toJson(map);
		response.getWriter().write(json);
	}

}