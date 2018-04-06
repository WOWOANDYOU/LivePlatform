package cn.edu.zhku.pojo;
//分页实体
public class PagesEntity {
	public static Integer pageSize = 8;//每页的记录数
	private Integer currentPage;//当前页码数
	public static Integer pageTotal;//总页数
	public static Integer totalNum;//总记录数
	private Object object;//分页查询到的数据
	
	
	public static Integer getPageSize() {
		return pageSize;
	}
	public static Integer getTotalNum() {
		return totalNum;
	}
	public static void setTotalNum(Integer totalNum) {
		PagesEntity.totalNum = totalNum;
	}
	public void setPageSize(Integer pageSize) {
		this.pageSize = pageSize;
	}
	public Integer getCurrentPage() {
		return currentPage;
	}
	public void setCurrentPage(Integer currentPage) {
		this.currentPage = currentPage;
	}
	
	public Integer getPageTotal() {
		return pageTotal;
	}
	public void setPageTotal(Integer pageTotal) {
		this.pageTotal = pageTotal;
	}
	public Object getObject() {
		return object;
	}
	public void setObject(Object object) {
		this.object = object;
	}
	 
	
}
