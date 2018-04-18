package cn.edu.zhku.service;

import java.sql.Timestamp;
import java.util.ArrayList;
import java.util.Date;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import cn.edu.zhku.mapper.BillMapper;
import cn.edu.zhku.pojo.BillEntity;
import cn.edu.zhku.pojo.IncomeCateEntity;
import cn.edu.zhku.pojo.SpendCateEntity;
@Service
public class BillServiceImpl implements BillService {
	@Autowired
	private BillMapper billMapper;
	@Override
	public int addBillInfo(BillEntity billInfo) {
		Timestamp ts = new Timestamp(new Date().getTime());
		billInfo.setBillDate(ts);
		return billMapper.addBillInfo(billInfo);
	}
	
	@Override
	public int delectBillInfo(String billInfoId) {
		return 0;
	}

	@Override
	public BillEntity selectOne(String billInfoId) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public ArrayList<BillEntity> selectUserAllBillPage(Map map) {
		return null;
	}

	@Override
	public int updateBillInfo(BillEntity billInfo) {
		return 0;
	}

	@Override
	public int addSpendCate(SpendCateEntity spendEntity) {
		return billMapper.addSpendCate(spendEntity);
	}

	@Override
	public ArrayList<SpendCateEntity> selectAllSpendCate() {
		return billMapper.selectAllSpendCate();
	}

	@Override
	public int addIncomeCate(IncomeCateEntity incomeEntity) {
		return billMapper.addIncomeCate(incomeEntity);
	}

	@Override
	public ArrayList<IncomeCateEntity> selectAllIncomeCate() {
		return billMapper.selectAllIncomeCate();
	}

}
