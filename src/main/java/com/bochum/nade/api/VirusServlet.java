package com.bochum.nade.api;

import java.io.IOException;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Random;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.google.gson.Gson;

public class VirusServlet extends JsonResponseServlet {
	private static final long serialVersionUID = 6119709263019798714L;

	@SuppressWarnings("unchecked")
	public void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		response.setHeader("Content-Type", "application/json; charset=UTF-8");
		Map<String, Object> map = new HashMap<String, Object>();

		List<Map<String, Object>> infectionHostsNum = (List<Map<String, Object>>) request.getServletContext().getAttribute(
				"infectionHostsNum");
		if (infectionHostsNum == null) {
			infectionHostsNum = new ArrayList<Map<String, Object>>();
			infectionHostsNum.add(buildMap("beijing", 100000));
			infectionHostsNum.add(buildMap("tianjin", 100000));
			infectionHostsNum.add(buildMap("hebei", 100000));
			infectionHostsNum.add(buildMap("shanxi", 100000));
			infectionHostsNum.add(buildMap("shandong", 100000));
		} else {
			for (Map<String, Object> areaHostNum : infectionHostsNum) {
				Integer value = (Integer) (areaHostNum.get("value"));
				value = value + rangeRandom(2000);
				areaHostNum.put("value", value);
			}
		}
		infectionHostsNum.add(buildSumMap(2000, infectionHostsNum));
		request.getServletContext().setAttribute("infectionHostsNum", infectionHostsNum);

		map.put("infectionHostsNum", infectionHostsNum);
		String json = new Gson().toJson(map);
		response.getWriter().write(json);
	}

	@SuppressWarnings("rawtypes")
	private Map buildMap(String area, int range) {
		int value = rangeRandom(range);
		Map<String, Object> m = new HashMap<String, Object>();
		m.put("name", area);
		m.put("value", value);
		return m;
	}

	private Map<String, Object> buildSumMap(int range, List<Map<String, Object>> infectionHostsNum) {
		Integer sum = 0;
		for (Map<String, Object> areaHostNum : infectionHostsNum) {
			if ("total".equals(areaHostNum.get("name")))
				continue;
			sum += (Integer) areaHostNum.get("value");
		}
		sum += rangeRandom(range);
		Map<String, Object> m = new HashMap<String, Object>();
		m.put("name", "total");
		m.put("value", sum);
		return m;
	}

	private int rangeRandom(int range) {
		return Math.abs((int) ((new Random()).nextDouble() * range));
	}
}