package com.bochum.nade.api;

import java.io.IOException;
import java.util.Date;
import java.util.Iterator;
import java.util.LinkedHashMap;
import java.util.LinkedHashSet;
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

	public void init() throws ServletException {
		buildStatusDefine("ddos.dat");
	}

	public void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		response.setHeader("Content-Type", "application/json; charset=UTF-8");
		String action = (String) request.getServletContext().getAttribute("action");
		String status = "initial";
		if (action == null || action.length() == 0 || action.equals("reset")) {
			status = "initial";
		} else {
			status = action;
		}
		String jsonTemplate = getDefine(status);
		String chartDataJson = buildDataJson(request, response);
		jsonTemplate = jsonTemplate.replace("#{chartData}", chartDataJson);
		response.getWriter().write(jsonTemplate);
	}

	@SuppressWarnings("unchecked")
	public String buildDataJson(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		Map<String, Object> map = new LinkedHashMap<String, Object>();

		String activeAttackArea = (String) request.getServletContext().getAttribute("activeAttackArea");
		String lastDefensingArea = (String) request.getServletContext().getAttribute("lastDefensingArea");

		Set<String> attackAreas = (Set<String>) request.getServletContext().getAttribute("attackAreas");
		if (attackAreas == null)
			attackAreas = new LinkedHashSet<String>();
		Map<String, Date> defensingAreaMap = (Map<String, Date>) request.getServletContext().getAttribute("defensingAreaMap");
		if (defensingAreaMap == null)
			defensingAreaMap = new LinkedHashMap<String, Date>();

		Iterator<Entry<String, Date>> it = defensingAreaMap.entrySet().iterator();
		while (it.hasNext()) {
			Entry<String, Date> entry = it.next();
			Date beginTime = entry.getValue();

			Date now = new Date();
			if ((now.getTime() - beginTime.getTime()) > 4000) {
				it.remove();
			}
		}
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

		String focusArea = "河北";
		for (String attackArea : attackAreas) {
			focusArea = attackArea;
		}
		for (String defensingArea : defensingAreaMap.keySet()) {
			focusArea = defensingArea;
		}

		map.put("focusArea", focusArea);
		map.put("activeAttackArea", activeAttackArea);
		map.put("lastDefensingArea", lastDefensingArea);
		map.put("attackAreas", attackAreas);
		map.put("defensingAreas", defensingAreaMap.keySet());
		map.put("attackViolent", attackViolent);

		String chartDataJson = new Gson().toJson(map);
		return chartDataJson;
	}

}