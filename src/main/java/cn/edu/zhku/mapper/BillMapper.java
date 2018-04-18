package cn.edu.zhku.mapper;

import java.util.ArrayList;
import java.util.Map;

import cn.edu.zhku.pojo.BillEntity;
import cn.edu.zhku.pojo.IncomeCateEntity;
import cn.edu.zhku.pojo.SpendCateEntity;

public interface BillMapper {
	public int addBillInfo(BillEntity billInfo);
	
	public int deleteBillInfo(String billInfoId);
	
	public BillEntity selectOne(String billInfoId);
	
	public ArrayList<BillEntity> selectUserBillPage(Map map);
	
	public int updateBillInfo(BillEntity billInfo);
	
	public int addSpendCate(SpendCateEntity spendCate);

	public int addIncomeCate(IncomeCateEntity incomeEntity);

	public ArrayList<SpendCateEntity> selectAllSpendCate();

	public ArrayList<IncomeCateEntity> selectAllIncomeCate();
}
