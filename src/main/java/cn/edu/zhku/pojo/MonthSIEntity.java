package cn.edu.zhku.pojo;

//封装 年度 各月份 收支数据
public class MonthSIEntity {
	private String monthNum;
	private Float totalNum;
	public String getMonthNum() {
		return monthNum;
	}
	public void setMonthNum(String monthNum) {
		this.monthNum = monthNum;
	}
	public Float getTotalNum() {
		return totalNum;
	}
	public void setTotalNum(Float totalNum) {
		this.totalNum = totalNum;
	}
	
	
}
