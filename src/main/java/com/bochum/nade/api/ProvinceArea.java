package com.bochum.nade.api;

public class ProvinceArea {
	private String province;
	private boolean municipality;
	private String[] areas;

	public String getProvince() {
		return province;
	}

	public void setProvince(String province) {
		this.province = province;
	}

	public boolean isMunicipality() {
		return municipality;
	}

	public void setMunicipality(boolean municipality) {
		this.municipality = municipality;
	}

	public String[] getAreas() {
		return areas;
	}

	public void setAreas(String[] areas) {
		this.areas = areas;
	}

}
