/**
 * 
 */
package com.weatherprediction.servlet;

/**
 * @author I
 *
 */
public class WeatherPredictionVO {
	
	private long countryNo;
	private String country;
	private String state;
	private String district;
	private String crop;
	private String gcm;
	private String cropSeason;
	private String gcmSeason;
	
	/**
	 * @return the countryNo
	 */
	public long getCountryNo() {
		return countryNo;
	}
	/**
	 * @param countryNo the countryNo to set
	 */
	public void setCountryNo(long countryNo) {
		this.countryNo = countryNo;
	}
	/**
	 * @return the country
	 */
	public String getCountry() {
		return country;
	}
	/**
	 * @param country the country to set
	 */
	public void setCountry(String country) {
		this.country = country;
	}
	/**
	 * @return the state
	 */
	public String getState() {
		return state;
	}
	/**
	 * @param state the state to set
	 */
	public void setState(String state) {
		this.state = state;
	}
	/**
	 * @return the district
	 */
	public String getDistrict() {
		return district;
	}
	/**
	 * @param district the district to set
	 */
	public void setDistrict(String district) {
		this.district = district;
	}
	/**
	 * @return the crop
	 */
	public String getCrop() {
		return crop;
	}
	/**
	 * @param crop the crop to set
	 */
	public void setCrop(String crop) {
		this.crop = crop;
	}
	/**
	 * @return the gcm
	 */
	public String getGcm() {
		return gcm;
	}
	/**
	 * @param gcm the gcm to set
	 */
	public void setGcm(String gcm) {
		this.gcm = gcm;
	}
	/**
	 * @return the cropSeason
	 */
	public String getCropSeason() {
		return cropSeason;
	}
	/**
	 * @param cropSeason the cropSeason to set
	 */
	public void setCropSeason(String cropSeason) {
		this.cropSeason = cropSeason;
	}
	/**
	 * @return the gcmSeason
	 */
	public String getGcmSeason() {
		return gcmSeason;
	}
	/**
	 * @param gcmSeason the gcmSeason to set
	 */
	public void setGcmSeason(String gcmSeason) {
		this.gcmSeason = gcmSeason;
	}
	
	

}
