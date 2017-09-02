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
			map.put("status", "attack");
			map.put("alarm_title", "演练启动");
			map.put("alarm_text", "攻击者发起口令破解攻击。");
		} else if ("alarm".equals(request.getServletContext().getAttribute("action"))) {
			map.put("status", "alarm");
			map.put("alarm_title", "页面篡改警报");
			map.put("alarm_text", "用户口令被破解（admin/p@ssw0rd）");
			map.put("screenshot", "distort_webpage.jpg");
		} else if ("analyze".equals(request.getServletContext().getAttribute("action"))) {
			map.put("status", "analyze");
			map.put("defense_title", "事件研判");
			map.put("defense_text", "攻击源IP地址：125.39.240.113");
		} else if ("repair".equals(request.getServletContext().getAttribute("action"))) {
			map.put("status", "repair");
			map.put("defense_title", "应急处置");
			String[] displayTexts={"更新应用服务器管理员口令","恢复被篡改的页面代码","升级应用服务器系统补丁", "查杀系统病毒"};
			map.put("defense_text", displayTexts);
		} else if ("defense".equals(request.getServletContext().getAttribute("action"))) {
			map.put("status", "defense");
			map.put("defense_title", "协同处理");
			map.put("defense_text", "封堵攻击源IP地址：125.39.240.113");
		} else if ("confirm".equals(request.getServletContext().getAttribute("action"))) {
			map.put("status", "confirm");
			map.put("defense_title", "结果验证");
			map.put("defense_text", "验证官网主页恢复");
			map.put("screenshot", "tianjin_dianxin.jpg");
		} else {
			map.put("status", "initial");
		}

		map.put("attackArea", "河北");
		map.put("targetArea", "天津");
		String json = new Gson().toJson(map);
		response.getWriter().write(json);
	}

}