package cn.edu.zhku.service;

import java.sql.Timestamp;
import java.util.ArrayList;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import cn.edu.zhku.mapper.BillMapper;
import cn.edu.zhku.pojo.BillEntity;
import cn.edu.zhku.pojo.CatePie;
import cn.edu.zhku.pojo.IncomeCateEntity;
import cn.edu.zhku.pojo.MonthSIEntity;
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
		return billMapper.deleteBillInfo(billInfoId);
	}

	@Override
	public BillEntity selectOne(String billInfoId) {
		return billMapper.selectOne(billInfoId);
	}

	@Override
	public ArrayList<BillEntity> selectUserAllBillPage(Map map) {
		return billMapper.selectUserBillPage(map);
	}

	@Override
	public int updateBillInfo(BillEntity billInfo) {
		return billMapper.updateBillInfo(billInfo);
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

	@Override
	public Integer userBillTotalNum(String userId, String cateNum) {
		Map<String,Object> map = new HashMap<String,Object>();
		map.put("userId", userId);
		int cateNumber = Integer.parseInt(cateNum);
		map.put("cateNum", cateNumber);
		return billMapper.selectBillTotalNum(map);
	}

	@Override
	public ArrayList<MonthSIEntity> selectMonthSIData(Map<String, Object> map) {
		return billMapper.selectMonthSIData(map);
	}

	@Override
	public List<CatePie> selectCatePie(Map<String, Object> map) {
		if((Integer)map.get("cateNum")==1) {
			return billMapper.selectIncomeCatePie(map);
		}else {
			return billMapper.selectSpendCatePie(map);
		}
		
	}

}
