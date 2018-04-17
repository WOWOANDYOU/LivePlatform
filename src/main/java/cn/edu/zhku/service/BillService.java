package cn.edu.zhku.service;

import java.util.ArrayList;
import java.util.Map;

import cn.edu.zhku.pojo.BillEntity;

public interface BillService {
	public int addBillInfo(BillEntity billInfo);
	
	//删除单条信息
	public int delectBillInfo(String billInfoId);
	
	//查询单条 账簿信息
	public BillEntity selectOne(String billInfoId);
	
	//分页查询 用户账簿信息
	public ArrayList<BillEntity> selectUserAllBillPage(Map map);
	
	//更新数据
	public int updateBillInfo(BillEntity billInfo);
	
}
