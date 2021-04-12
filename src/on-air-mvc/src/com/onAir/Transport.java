package com.onAir;

public class Transport{
	private String atime,dtime,airline;
	private int original_cost,offer_cost,offer;
	public Transport(String air,String at,String dt,int o_cost,int off_cost,int off) {
		atime = at;
		dtime = dt;
		airline = air;
		this.original_cost = o_cost;
		this.offer = off;
		this.offer_cost = off_cost;
	}
	public String getArivalTime() {
		return atime;
	}
	public String getDepartureTime() {
		return dtime;
	}
	public String getAirLine() {
		return airline;
	}
	public int getOriginalCost() {
		return original_cost;
	}
	public int getOffer() {
		return offer;
	}
	public int getOfferCost() {
		return offer_cost;
	}
}
