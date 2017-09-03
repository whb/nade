package com.bochum.nade.api;

import java.io.IOException;
import java.util.LinkedHashMap;
import java.util.Map;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

public class DnsServlet extends JsonResponseServlet {
	private static final long serialVersionUID = -8391751802661610783L;

	public void init() throws ServletException {
		buildStatusDefine("dns.dat");
	}
	
	public void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		response.setHeader("Content-Type", "application/json; charset=UTF-8");
		Map<String, Object> map = new LinkedHashMap<String, Object>();

		Boolean alarm = (Boolean) request.getServletContext().getAttribute("alarm");
		if (alarm != null && alarm) {
			map.put("alarm", alarm);
			request.getServletContext().setAttribute("alarm", null);
		}
		
		
//		if ("attack".equals(request.getServletContext().getAttribute("action"))) {
//			map.put("status", "attack");
//			map.put("alarm_text", "攻击者向域名解析服务器发起口令破解攻击。");
//		} else if ("alarm".equals(request.getServletContext().getAttribute("action"))) {
//			map.put("status", "alarm");
//			map.put("alarm_text", "用户口令被破解（admin/abc123456）");
//			map.put("screenshot", "distort_a_record.jpg");
//		} else if ("analyze".equals(request.getServletContext().getAttribute("action"))) {
//			map.put("status", "analyze");
//			String[] displayTexts={"攻击源IP地址：125.39.240.113","攻击目的IP地址: 205.139.40.16","攻击主要协议: HTTP、TCP"};
//			map.put("defense_text", displayTexts);
//		} else if ("repair".equals(request.getServletContext().getAttribute("action"))) {
//			map.put("status", "repair");
//			String[] displayTexts={"更新域名解析服务器管理员口令","清空域名服务器缓存","重建域名服务器解析列表", "将官网的域名解析指向正确网站"};
//			map.put("defense_text", displayTexts);
//		} else if ("defense".equals(request.getServletContext().getAttribute("action"))) {
//			map.put("status", "defense");
//			map.put("defense_text", "封堵攻击源IP地址：125.39.240.113");
//		} else if ("confirm".equals(request.getServletContext().getAttribute("action"))) {
//			map.put("status", "confirm");
//			map.put("defense_text", "验证官网主页DNS恢复正常");
//			map.put("terminal_command", "dig www.baidu.com");
//		} else {
//			map.put("status", "initial");
//		}
//
//		map.put("attackArea", "山东");
//		map.put("targetArea", "山西");
//		String json = new Gson().toJson(map);
//		response.getWriter().write(json);
//		
		
		String action = (String) request.getServletContext().getAttribute("action");
		String status = "initial";
		if (action == null || action.length() == 0 || action.equals("reset")) {
			status = "initial";
		} else {
			status = action;
		}
		String jsonResult = getDefine(status);
		response.getWriter().write(jsonResult);
	}

}