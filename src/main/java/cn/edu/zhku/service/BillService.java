package cn.edu.zhku.service;

import java.util.ArrayList;
import java.util.Map;

import cn.edu.zhku.pojo.BillEntity;
import cn.edu.zhku.pojo.IncomeCateEntity;
import cn.edu.zhku.pojo.SpendCateEntity;

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
	
	//添加消费类别
	public int addSpendCate(SpendCateEntity spendEntity);
	
	//查询所有消费 类别
	public  ArrayList<SpendCateEntity> selectAllSpendCate();
	//添加 收入类别
	public int addIncomeCate(IncomeCateEntity incomeEntity);
	
	//查询 所有 收入
	public ArrayList<IncomeCateEntity> selectAllIncomeCate();
}
