package com.bochum.nade.api;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.io.PrintWriter;
import java.util.ArrayList;
import java.util.List;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.google.gson.Gson;

public class JsonResponseServlet extends HttpServlet {
	private static final long serialVersionUID = -1779650997215496331L;
	private String filename;

	protected String getFilename() {
		return filename;
	}

	protected void setFilename(String filename) {
		this.filename = filename;
	}

	public void init() throws ServletException {
	}

	public void destroy() {
	}

	@SuppressWarnings("unchecked")
	public void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		response.setHeader("Content-Type", "application/json; charset=UTF-8");
		List<String> attackAreasAvailable = (List<String>) request.getServletContext().getAttribute("attackAreasAvailable");
		if (attackAreasAvailable == null)
			attackAreasAvailable = new ArrayList<String>();

		String json = new Gson().toJson(attackAreasAvailable);
		response.getWriter().write(json);
	}

	public void doGet2(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		response.setHeader("Content-Type", "application/json; charset=UTF-8");
		String filename = "/WEB-INF/test/" + getFilename();

		InputStream is = getServletContext().getResourceAsStream(filename);
		if (is != null) {
			InputStreamReader isr = new InputStreamReader(is, "UTF-8");
			BufferedReader reader = new BufferedReader(isr);
			PrintWriter pw = response.getWriter();

			String text;
			while ((text = reader.readLine()) != null) {
				pw.println(text);
			}
		}

	}

}