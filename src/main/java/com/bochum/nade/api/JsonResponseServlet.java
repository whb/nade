package com.bochum.nade.api;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.util.HashMap;
import java.util.Map;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

public class JsonResponseServlet extends HttpServlet {
	private static final long serialVersionUID = -1779650997215496331L;
	private Map<String, String> statusDefineMap = new HashMap<String, String>();


	public void init() throws ServletException {
	}

	public void destroy() {
	}

	public void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		response.setHeader("Content-Type", "application/json; charset=UTF-8");
	}

	protected String readJsonTemplates(String filename) {
		InputStream is = getServletContext().getResourceAsStream("/WEB-INF/api/" + filename);
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

	protected void buildStatusDefine(String filename) {
		String[] templates = readJsonTemplates(filename).split(";;");
		for (String t : templates) {
			String[] keyValue = t.split("::");
			this.statusDefineMap.put(keyValue[0], keyValue[1].replaceAll("\\s+"," "));
		}
	}

	protected String getDefine(String status) {
		return this.statusDefineMap.get(status);
	}

}