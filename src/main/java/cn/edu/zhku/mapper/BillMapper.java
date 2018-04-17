package cn.edu.zhku.mapper;

import java.util.ArrayList;
import java.util.Map;

import cn.edu.zhku.pojo.BillEntity;

public interface BillMapper {
	public int addBillInfo(BillEntity billInfo);
	
	public int deleteBillInfo(String billInfoId);
	
	public BillEntity selectOne(String billInfoId);
	
	public ArrayList<BillEntity> selectUserBillPage(Map map);
	
	public int updateBillInfo(BillEntity billInfo);
}
