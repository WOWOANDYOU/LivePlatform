package cn.edu.zhku.pojo;

public class JsonReturn {
	private String info;
	private Object object;
	private Integer megInfo;//-1 表示验证码错误  -2表示验证码超时   1表示验证码正确
	private Integer existence;//用户注册是否存在  -1不存在  1存在
	private String isLogin;
	private String goodId;
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

	public String getIsLogin() {
		return isLogin;
	}

	public void setIsLogin(String isLogin) {
		this.isLogin = isLogin;
	}

	public Integer getExistence() {
		return existence;
	}

	public void setExistence(Integer existence) {
		this.existence = existence;
	}

	public Integer getMegInfo() {
		return megInfo;
	}

	public void setMegInfo(Integer megInfo) {
		this.megInfo = megInfo;
	}

	public Object getObject() {
		return object;
	}

	public void setObject(Object object) {
		this.object = object;
	}

	public String getInfo() {
		return info;
	}

	public void setInfo(String info) {
		this.info = info;
	}

	
}
