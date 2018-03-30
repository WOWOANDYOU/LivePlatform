package cn.edu.zhku.pojo;

public class JsonReturn {
	private String info;
	private Object object;
	private Integer megInfo;//-1 表示验证码错误  -2表示验证码超时   1表示验证码正确
	
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
