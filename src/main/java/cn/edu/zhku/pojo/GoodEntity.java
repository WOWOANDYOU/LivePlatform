package cn.edu.zhku.pojo;

import java.util.Date;

public class GoodEntity {
	private String goodId;
	private String goodTitle;
	private Float goodPrice;
	private Date goodUpTime;//闲置商品上架时间
	private String goodContent;//库存
	private Integer goodCate;//闲置商品的分类 只卖  书籍类 以及 生活工具类 1表示 书籍  0表示 其他生活工具类
	private String goodImgPath;//商品 图片路径 位置
	private String goodUserId;
	
	public String getGoodUserId() {
		return goodUserId;
	}
	public void setGoodUserId(String goodUserId) {
		this.goodUserId = goodUserId;
	}
	public String getGoodId() {
		return goodId;
	}
	public void setGoodId(String goodId) {
		this.goodId = goodId;
	}
	
	public String getGoodTitle() {
		return goodTitle;
	}
	public void setGoodTitle(String goodTitle) {
		this.goodTitle = goodTitle;
	}
	
	public Float getGoodPrice() {
		return goodPrice;
	}
	public void setGoodPrice(Float goodPrice) {
		this.goodPrice = goodPrice;
	}
	public Date getGoodUpTime() {
		return goodUpTime;
	}
	public void setGoodUpTime(Date goodUpTime) {
		this.goodUpTime = goodUpTime;
	}
	
	public String getGoodContent() {
		return goodContent;
	}
	public void setGoodContent(String goodContent) {
		this.goodContent = goodContent;
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
