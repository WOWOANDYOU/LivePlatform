package cn.edu.zhku.pojo;

import java.util.Date;

public class Bill {
	private String billId;
	private Integer billAmount;//账单金额
	private Date billDate;//账单记录时间
	private String billComment;//账单 备注
	private String spendCateId;//消费类别id
	private String incomeCateId;
	private String userId;
	private Integer cateNum;//-1 表示该记录是消费，1 表示该记录是收入
	public String getBillId() {
		return billId;
	}
	public void setBillId(String billId) {
		this.billId = billId;
	}
	public Integer getBillAmount() {
		return billAmount;
	}
	public void setBillAmount(Integer billAmount) {
		this.billAmount = billAmount;
	}
	public Date getBillDate() {
		return billDate;
	}
	public void setBillDate(Date billDate) {
		this.billDate = billDate;
	}
	public String getBillComment() {
		return billComment;
	}
	public void setBillComment(String billComment) {
		this.billComment = billComment;
	}
	public String getSpendCateId() {
		return spendCateId;
	}
	public void setSpendCateId(String spendCateId) {
		this.spendCateId = spendCateId;
	}
	public String getIncomeCateId() {
		return incomeCateId;
	}
	public void setIncomeCateId(String incomeCateId) {
		this.incomeCateId = incomeCateId;
	}
	public String getUserId() {
		return userId;
	}
	public void setUserId(String userId) {
		this.userId = userId;
	}
	public Integer getCateNum() {
		return cateNum;
	}
	public void setCateNum(Integer cateNum) {
		this.cateNum = cateNum;
	}
}
