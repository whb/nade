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
	private static final int BEGIN_NUM_OF_municipality_AREA = 3000;
	private static final int BEGIN_NUM_OF_KEY_AREA = 200;
	private static final int INCREACE_NUM = 200;

	private static ProvinceArea[] provinceAreas;

	public void init() throws ServletException {
		String jsonString = readFromFile("province_areas.json");
		provinceAreas = new Gson().fromJson(jsonString, ProvinceArea[].class);
	}

	public void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		response.setHeader("Content-Type", "application/json; charset=UTF-8");
		Map<String, Object> map = new HashMap<String, Object>();
		
		List<NameValue> areaHostsNum;
		if ("spread".equals(request.getServletContext().getAttribute("action"))) {
			areaHostsNum = buildAreaHostsNum(request);
		} else {
			areaHostsNum = keepOrBuildZeroAreaHostsNum(request);
		}
		
		List<NameValue> categoryHostsNum = buildCategoryHostsNum(areaHostsNum);
		request.getServletContext().setAttribute("areaHostsNum", areaHostsNum);
		request.getServletContext().setAttribute("infectionHostsNum", categoryHostsNum);

		map.put("areaHostsNum", areaHostsNum);
		map.put("infectionHostsNum", categoryHostsNum);

		String json = new Gson().toJson(map);
		response.getWriter().write(json);
	}

	@SuppressWarnings("unchecked")
	private List<NameValue> keepOrBuildZeroAreaHostsNum(HttpServletRequest request) {
		List<NameValue> areaHostsNum = (List<NameValue>) request.getServletContext().getAttribute("areaHostsNum");
		if (areaHostsNum == null) {
			areaHostsNum = readZeroDataFromFile(request);
		}
		return areaHostsNum;
	}

	@SuppressWarnings("unchecked")
	private List<NameValue> buildAreaHostsNum(HttpServletRequest request) {
		List<NameValue> areaHostsNum = (List<NameValue>) request.getServletContext().getAttribute("areaHostsNum");
		if (areaHostsNum == null) {
			areaHostsNum = readIntialDataFromFile(request);
		} else {
			for (NameValue hostNum : areaHostsNum) {
				Integer value = (Integer) (hostNum.getValue());
				if (isPriority(hostNum)) {
					value = value + rangeRandom(INCREACE_NUM);
				}
				hostNum.setValue(value);
			}
		}
		return areaHostsNum;
	}

	private boolean isPriority(NameValue hostNum) {
		if (isShandongArea(hostNum.getName())) {
			return (new Random()).nextDouble() > 0.65;
		} else if (isKeyArea(hostNum.getName())) {
			return true;
		} else {
			return (new Random()).nextDouble() > 0.9;
		}
	}

	private boolean isShandongArea(String name) {
		for (ProvinceArea p : provinceAreas) {
			if (p.getProvince().equals("山东")) {
				for (String area : p.getAreas()) {
					if (area.equals(name)) {
						return true;
					}
				}
			}
		}
		return false;
	}

	private boolean isKeyArea(String name) {
		for (ProvinceArea p : provinceAreas) {
			for (String area : p.getAreas()) {
				if (area.equals(name)) {
					return true;
				}
			}
		}
		return false;
	}

	private List<NameValue> readIntialDataFromFile(HttpServletRequest request) {
		String jsonString = readFromFile("virus_area_num.json");
		List<NameValue> intialHostsNum = new ArrayList<NameValue>();
		Type collectionType = new TypeToken<ArrayList<NameValue>>() {}.getType();
		intialHostsNum = new Gson().fromJson(jsonString, collectionType);

		for (NameValue hostNum : intialHostsNum) {
			hostNum.setValue(calNum(hostNum.getName()));
		}

		return intialHostsNum;
	}
	
	private List<NameValue> readZeroDataFromFile(HttpServletRequest request) {
		String jsonString = readFromFile("virus_area_num.json");
		List<NameValue> intialHostsNum = new ArrayList<NameValue>();
		Type collectionType = new TypeToken<ArrayList<NameValue>>() {}.getType();
		intialHostsNum = new Gson().fromJson(jsonString, collectionType);

		for (NameValue hostNum : intialHostsNum) {
			hostNum.setValue(0);
		}

		return intialHostsNum;
	}

	private Integer calNum(String name) {
		for (ProvinceArea p : provinceAreas) {
			for (String area : p.getAreas()) {
				if (area.equals(name)) {
					if (p.isMunicipality()) {
						return rangeRandom(BEGIN_NUM_OF_municipality_AREA);
					} else {
						return rangeRandom(BEGIN_NUM_OF_KEY_AREA);
					}
				}
			}
		}
		return 0;
	}
	
	private List<NameValue> buildCategoryHostsNum(List<NameValue> areaHostsNum) {
		List<NameValue> categoryHostsNum = new ArrayList<NameValue>();
		for (ProvinceArea p : provinceAreas) {
			NameValue nv = new NameValue();
			nv.setName(p.getProvince());
			nv.setValue(sumCategory(areaHostsNum, p));
			categoryHostsNum.add(nv);
		}

		NameValue total = new NameValue();
		total.setName("全国");
		total.setValue(sumAll(areaHostsNum));
		categoryHostsNum.add(total);

		return categoryHostsNum;
	}

	private Integer sumAll(List<NameValue> areaHostsNum) {
		int total = 0;
		for (NameValue areaNum : areaHostsNum) {
			total += areaNum.getValue();
		}
		return total;
	}

	private Integer sumCategory(List<NameValue> areaHostsNum, ProvinceArea p) {
		int categoryNum = 0;
		for (String area : p.getAreas()) {
			categoryNum += findNum(areaHostsNum, area);
		}
		return categoryNum;
	}

	private int findNum(List<NameValue> areaHostsNum, String area) {
		for (NameValue areaNum : areaHostsNum) {
			if (areaNum.getName().equals(area)) {
				return areaNum.getValue();
			}
		}
		return 0;
	}

	private String readFromFile(String filename) {
		InputStream is = getServletContext().getResourceAsStream("/WEB-INF/test/" + filename);
		StringBuffer sb = new StringBuffer();
		if (is != null) {
			try {
				BufferedReader reader = new BufferedReader(new InputStreamReader(is, "UTF-8"));
				String text;
				while ((text = reader.readLine()) != null) {
					sb.append(text);
				}
			} catch (IOException e) {
				e.printStackTrace();
			}
		}
		return sb.toString();
	}

	private int rangeRandom(int range) {
		return Math.abs((int) ((new Random()).nextDouble() * range));
	}
}