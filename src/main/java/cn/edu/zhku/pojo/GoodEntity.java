package cn.edu.zhku.pojo;

import java.util.Date;

public class GoodEntity {
	private String goodId;
	private String goodName;
	private Integer goodPrice;
	private Date goodUpTime;//闲置商品上架时间
	private Integer goodNumber;//库存
	private Integer goodCate;//闲置商品的分类 只卖  书籍类 以及 生活工具类 1表示 书籍  0表示 其他生活工具类
	private String goodImgPath;//商品 图片路径 位置
	public String getGoodId() {
		return goodId;
	}
	public void setGoodId(String goodId) {
		this.goodId = goodId;
	}
	public String getGoodName() {
		return goodName;
	}
	public void setGoodName(String goodName) {
		this.goodName = goodName;
	}
	public Integer getGoodPrice() {
		return goodPrice;
	}
	public void setGoodPrice(Integer goodPrice) {
		this.goodPrice = goodPrice;
	}
	public Date getGoodUpTime() {
		return goodUpTime;
	}
	public void setGoodUpTime(Date goodUpTime) {
		this.goodUpTime = goodUpTime;
	}
	public Integer getGoodNumber() {
		return goodNumber;
	}
	public void setGoodNumber(Integer goodNumber) {
		this.goodNumber = goodNumber;
	}
	public Integer getGoodCate() {
		return goodCate;
	}
	public void setGoodCate(Integer goodCate) {
		this.goodCate = goodCate;
	}
	public String getGoodImgPath() {
		return goodImgPath;
	}
	public void setGoodImgPath(String goodImgPath) {
		this.goodImgPath = goodImgPath;
	}
	
	
}
