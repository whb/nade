package com.bochum.nade.api;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.lang.reflect.Type;
import java.util.ArrayList;
import java.util.List;
import java.util.Random;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.google.gson.Gson;
import com.google.gson.reflect.TypeToken;

public class VirusServlet extends JsonResponseServlet {
	private static final String JSON_PATH = "/WEB-INF/api-json/";
	private static final long serialVersionUID = 6119709263019798714L;
	private static final int BEGIN_NUM_OF_municipality_AREA = 0;
	private static final int BEGIN_NUM_OF_KEY_AREA = 0;
	private static final int INCREACE_NUM = 70;
	private static final int municipality_INCREACE_NUM = 100;
	private static final int MIN_INCREACE_NUM = 5;
	private static final int OTHER_INCREACE_NUM = 50;

	private static ProvinceArea[] provinceAreas;

	public void init() throws ServletException {
		String jsonString = readFromFile("province_areas.json");
		provinceAreas = new Gson().fromJson(jsonString, ProvinceArea[].class);
		buildStatusDefine("virus.dat");
	}

	public void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		response.setHeader("Content-Type", "application/json; charset=UTF-8");
		String action = (String) request.getServletContext().getAttribute("action");
		String status = "initial";
		if (action == null || action.length() == 0 || action.equals("reset")) {
			status = "initial";
			request.getSession().setAttribute("VIRUS_LOOP_COUNT", 0);
			request.getSession().setAttribute("VIRUS_CONTROL", false);
		} else {
			status = action;
		}
		String jsonTemplate = getDefine(status);

		List<NameValue> areaHostsNum;
		if ("initial".equals(status)) {
			areaHostsNum = readZeroDataFromFile(request);
		} else if ("attack".equals(status) || "alarm".equals(status) || "analyze".equals(status)
				|| "repair".equals(status)) {
			areaHostsNum = buildAreaHostsNum(request);
		} else {
			areaHostsNum = keepOrBuildZeroAreaHostsNum(request);
		}
		List<NameValue> categoryHostsNum = buildCategoryHostsNum(areaHostsNum, request);
		request.getServletContext().setAttribute("areaHostsNum", areaHostsNum);
		request.getServletContext().setAttribute("infectionHostsNum", categoryHostsNum);

		String areaHostsNumJson = new Gson().toJson(areaHostsNum);
		String categoryHostsNumJson = new Gson().toJson(categoryHostsNum);

		jsonTemplate = jsonTemplate.replace("#{areaHostsNum}", areaHostsNumJson);
		jsonTemplate = jsonTemplate.replace("#{infectionHostsNum}", categoryHostsNumJson);

		response.getWriter().write(jsonTemplate);
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
		Integer loopCount = (Integer) request.getSession().getAttribute("VIRUS_LOOP_COUNT");
		if (loopCount == null) {
			loopCount = 0;
		}

		List<NameValue> areaHostsNum = (List<NameValue>) request.getServletContext().getAttribute("areaHostsNum");
		if (areaHostsNum == null) {
			areaHostsNum = readIntialDataFromFile(request);
		} else {
			for (NameValue hostNum : areaHostsNum) {
				Integer value = (Integer) (hostNum.getValue());

				Boolean controlFlag = (Boolean) request.getSession().getAttribute("VIRUS_CONTROL");
				value += calValue(hostNum, loopCount, controlFlag);
				hostNum.setValue(value);
			}
		}

		request.getSession().setAttribute("VIRUS_LOOP_COUNT", loopCount + 1);
		return areaHostsNum;
	}

	private Integer randomValue(double probability, Integer increasNum) {
		if ((new Random()).nextDouble() > probability) {
			return rangeRandom(increasNum);
		} else {
			return 0;
		}
	}

	private Integer calAreaValue(NameValue hostNum, Integer loopCount,int[] switchNum, int[] controlNum) {
		if (loopCount < controlNum[0])
			return 0;
		if (hostNum.getValue() < switchNum[0]) {
			return rangeRandom(controlNum[1]);
		} else if (hostNum.getValue() < switchNum[1]) {
			return randomValue(0.9, controlNum[2]);
		} else {
			return randomValue(0.58, controlNum[3]);
		}
	}

	private Integer calValue(NameValue hostNum, Integer loopCount, Boolean controlFlag) {
		if (controlFlag != null && controlFlag) {
			return randomValue(0.95, MIN_INCREACE_NUM);
		}
		
		if ("北京".equals(hostNum.getName())) {
			int[] switchNum = {900, 980};
			int[] controlNum = {0, municipality_INCREACE_NUM, INCREACE_NUM, MIN_INCREACE_NUM};
			return calAreaValue(hostNum, loopCount, switchNum, controlNum);
		} else if ("天津".equals(hostNum.getName())) {
			int[] switchNum = {1400, 1480};
			int[] controlNum = {3, municipality_INCREACE_NUM, INCREACE_NUM, MIN_INCREACE_NUM};
			return calAreaValue(hostNum, loopCount, switchNum, controlNum);
		} else if (isProvinceArea(hostNum.getName(), "河北")) {
			int[] switchNum = {250, 300};
			int[] controlNum = {5, INCREACE_NUM, INCREACE_NUM, MIN_INCREACE_NUM};
			return calAreaValue(hostNum, loopCount, switchNum, controlNum);
		} else if (isProvinceArea(hostNum.getName(), "山西")) {
			int[] switchNum = {500, 590};
			int[] controlNum = {7, INCREACE_NUM, INCREACE_NUM, MIN_INCREACE_NUM};
			return calAreaValue(hostNum, loopCount, switchNum, controlNum);
		} else if (isProvinceArea(hostNum.getName(), "山东")) {
			int[] switchNum = {150, 200};
			int[] controlNum = {9, INCREACE_NUM, INCREACE_NUM, MIN_INCREACE_NUM};
			return calAreaValue(hostNum, loopCount, switchNum, controlNum);
		} else {
			if (loopCount < 9)
				return 0;
			return randomValue(0.95, OTHER_INCREACE_NUM);
		}
	}

	private boolean isProvinceArea(String name, String province) {
		for (ProvinceArea p : provinceAreas) {
			if (p.getProvince().equals(province)) {
				for (String area : p.getAreas()) {
					if (area.equals(name)) {
						return true;
					}
				}
			}
		}
		return false;
	}

	// private boolean isKeyArea(String name) {
	// for (ProvinceArea p : provinceAreas) {
	// for (String area : p.getAreas()) {
	// if (area.equals(name)) {
	// return true;
	// }
	// }
	// }
	// return false;
	// }

	private List<NameValue> readIntialDataFromFile(HttpServletRequest request) {
		String jsonString = readFromFile("virus_area_num.json");
		List<NameValue> intialHostsNum = new ArrayList<NameValue>();
		Type collectionType = new TypeToken<ArrayList<NameValue>>() {
		}.getType();
		intialHostsNum = new Gson().fromJson(jsonString, collectionType);

		for (NameValue hostNum : intialHostsNum) {
			hostNum.setValue(calNum(hostNum.getName()));
		}

		return intialHostsNum;
	}

	private List<NameValue> readZeroDataFromFile(HttpServletRequest request) {
		String jsonString = readFromFile("virus_area_num.json");
		List<NameValue> intialHostsNum = new ArrayList<NameValue>();
		Type collectionType = new TypeToken<ArrayList<NameValue>>() {
		}.getType();
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

	private List<NameValue> buildCategoryHostsNum(List<NameValue> areaHostsNum, HttpServletRequest request) {
		List<NameValue> categoryHostsNum = new ArrayList<NameValue>();
		Integer fiveProvinces = 0;
		for (ProvinceArea p : provinceAreas) {
			NameValue nv = new NameValue();
			nv.setName(p.getProvince());
			nv.setValue(sumCategory(areaHostsNum, p));
			categoryHostsNum.add(nv);

			fiveProvinces += nv.getValue();
		}

		NameValue fiveProvincesTotal = new NameValue();
		fiveProvincesTotal.setName("合计");
		fiveProvincesTotal.setValue(fiveProvinces);
		categoryHostsNum.add(fiveProvincesTotal);

		if (fiveProvinces > 10000) {
			request.getSession().setAttribute("VIRUS_CONTROL", true);
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
		InputStream is = getServletContext().getResourceAsStream(JSON_PATH + filename);
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