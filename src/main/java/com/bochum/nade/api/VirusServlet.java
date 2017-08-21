package com.bochum.nade.api;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.lang.reflect.Type;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Random;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.google.gson.Gson;
import com.google.gson.reflect.TypeToken;

public class VirusServlet extends JsonResponseServlet {
	private static final long serialVersionUID = 6119709263019798714L;
	private static final int BEGIN_NUM_OF_KEY_AREA = 1000;
	private static final int INCREACE_NUM = 200;
	private static final int OTHER_AREA_NUM = 200;

	public void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		response.setHeader("Content-Type", "application/json; charset=UTF-8");
		Map<String, Object> map = new HashMap<String, Object>();

		List<NameValue> areaHostsNum = buildAreaHostsNum(request);
		List<Map<String, Object>> infectionHostsNum = buildInfectionHostsNum(request);

		request.getServletContext().setAttribute("areaHostsNum", areaHostsNum);
		request.getServletContext().setAttribute("infectionHostsNum", infectionHostsNum);

		map.put("areaHostsNum", areaHostsNum);
		map.put("infectionHostsNum", infectionHostsNum);
		String json = new Gson().toJson(map);
		response.getWriter().write(json);
	}

	@SuppressWarnings("unchecked")
	private List<NameValue> buildAreaHostsNum(HttpServletRequest request) {
		List<NameValue> areaHostsNum = (List<NameValue>) request.getServletContext().getAttribute("areaHostsNum");
		if (areaHostsNum == null) {
			areaHostsNum = readIntialDataFromFile(request);
		} else {
			for (NameValue hostNum : areaHostsNum) {
				Integer value = (Integer) (hostNum.getValue());
				value = value + rangeRandom(INCREACE_NUM);
				hostNum.setValue(value);
			}
		}
		return areaHostsNum;
	}

	private List<NameValue> readIntialDataFromFile(HttpServletRequest request) {
		String filename = "/WEB-INF/test/virus_area_num.json";
		StringBuffer sb = new StringBuffer();
		InputStream is = getServletContext().getResourceAsStream(filename);
		if (is != null) {
			BufferedReader reader;
			try {
				reader = new BufferedReader(new InputStreamReader(is, "UTF-8"));
				String text;
				while ((text = reader.readLine()) != null) {
					sb.append(text);
				}
			} catch (IOException e) {
				e.printStackTrace();
			}
		}
		List<NameValue> intialHostsNum = new ArrayList<NameValue>();
		Type collectionType = new TypeToken<ArrayList<NameValue>>() {}.getType();
		intialHostsNum = new Gson().fromJson(sb.toString(), collectionType);

		for (NameValue hostNum : intialHostsNum) {
			hostNum.setValue(0);
		}

		return intialHostsNum;
	}

	@SuppressWarnings("unchecked")
	private List<Map<String, Object>> buildInfectionHostsNum(HttpServletRequest request) {
		List<Map<String, Object>> infectionHostsNum = (List<Map<String, Object>>) request.getServletContext()
				.getAttribute("infectionHostsNum");
		if (infectionHostsNum == null) {
			infectionHostsNum = new ArrayList<Map<String, Object>>();
			infectionHostsNum.add(buildMap("beijing", BEGIN_NUM_OF_KEY_AREA));
			infectionHostsNum.add(buildMap("tianjin", BEGIN_NUM_OF_KEY_AREA));
			infectionHostsNum.add(buildMap("hebei", BEGIN_NUM_OF_KEY_AREA));
			infectionHostsNum.add(buildMap("shanxi", BEGIN_NUM_OF_KEY_AREA));
			infectionHostsNum.add(buildMap("shandong", BEGIN_NUM_OF_KEY_AREA));
		} else {
			for (Map<String, Object> areaHostNum : infectionHostsNum) {
				Integer value = (Integer) (areaHostNum.get("value"));
				value = value + rangeRandom(INCREACE_NUM);
				areaHostNum.put("value", value);
			}
		}
		infectionHostsNum.add(buildSumMap(OTHER_AREA_NUM, infectionHostsNum));
		return infectionHostsNum;
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