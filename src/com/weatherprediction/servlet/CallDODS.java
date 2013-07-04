package com.weatherprediction.servlet;
import com.opendap.poc.DODS;


public class CallDODS implements Runnable{
	
	private WeatherPredictionVO objWeather;
	private long simId;
	private String simCode;

	public CallDODS(final WeatherPredictionVO objWeather, final long simId, final String simCode){
		this.objWeather = objWeather;
		this.simId = simId;
		this.simCode = simCode;
	}
	
	public static void main(String[] args){
		new CallDODS(new WeatherPredictionVO(), 1, "cmh").run();
	}

	@Override
	public void run() {
		DODS dods = new DODS();
	    try {
	    	dods.buildDODS(objWeather, simId, simCode);
		} catch (Exception e) {
			e.printStackTrace();
			SimDetailsVO simDetailsVO = CropModel.getSimDetailsMap().get(simId);
			if(simDetailsVO != null){
				simDetailsVO.setStatus("Completed");
				simDetailsVO.setStatusMessage(simDetailsVO.getStatusMessage().append("Simulation Failed. Please try again: " + e.getMessage()));
				
				CropModel.getSimDetailsMap().put(simId, simDetailsVO);
			}
		}
	}
}
