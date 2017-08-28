package com.bochum.nade.api;

import java.io.IOException;
import java.util.Date;
import java.util.HashMap;
import java.util.HashSet;
import java.util.Iterator;
import java.util.Map;
import java.util.Map.Entry;
import java.util.Set;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import com.google.gson.Gson;

public class DdosServlet extends JsonResponseServlet {
	private static final long serialVersionUID = -3549133063919188376L;

	@SuppressWarnings("unchecked")
	public void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		response.setHeader("Content-Type", "application/json; charset=UTF-8");
		Map<String, Object> map = new HashMap<String, Object>();

		String activeAttackArea = (String) request.getServletContext().getAttribute("activeAttackArea");
		String lastDefensingArea = (String) request.getServletContext().getAttribute("lastDefensingArea");

		Set<String> attackAreas = (Set<String>) request.getServletContext().getAttribute("attackAreas");
		if (attackAreas == null)
			attackAreas = new HashSet<String>();
		Map<String, Date> defensingAreaMap = (Map<String, Date>) request.getServletContext().getAttribute("defensingAreaMap");
		if (defensingAreaMap == null)
			defensingAreaMap = new HashMap<String, Date>();

		Iterator<Entry<String, Date>> it = defensingAreaMap.entrySet().iterator();
		while (it.hasNext()) {
			Entry<String, Date> entry = it.next();
			String defensingArea = entry.getKey();
			Date beginTime = entry.getValue();

			Date now = new Date();
			if ((now.getTime() - beginTime.getTime()) > 4000) {
				attackAreas.remove(defensingArea);
				it.remove();
			}
		}
		
		request.getServletContext().setAttribute("attackAreas", attackAreas);
		request.getServletContext().setAttribute("defensingAreaMap", defensingAreaMap);

		boolean attackViolent = false;
		HttpSession session = request.getSession();
		if (attackAreas.size() >= 4) {
			Integer ajaxCallCount = (Integer) session.getAttribute("ajaxCallCount");
			if (ajaxCallCount == null) {
				session.setAttribute("ajaxCallCount", 1);
			} else if (ajaxCallCount > 3) {
				attackViolent = true;
			} else {
				session.setAttribute("ajaxCallCount", ++ajaxCallCount);
			}
		} else if (attackAreas.size() == 0) {
			session.setAttribute("ajaxCallCount", null);
		}

		Boolean alarm = (Boolean) request.getServletContext().getAttribute("alarm");
		if (alarm != null && alarm) {
			map.put("alarm", alarm);
			request.getServletContext().setAttribute("alarm", null);
		}

		map.put("activeAttackArea", activeAttackArea);
		map.put("lastDefensingArea", lastDefensingArea);
		map.put("attackAreas", attackAreas);
		map.put("defensingAreas", defensingAreaMap.keySet());
		map.put("attackViolent", attackViolent);
		String json = new Gson().toJson(map);
		response.getWriter().write(json);
	}

}