package cn.edu.zhku.service;

import java.util.ArrayList;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import cn.edu.zhku.mapper.BillMapper;
import cn.edu.zhku.pojo.BillEntity;
@Service
public class BillServiceImpl implements BillService {
	@Autowired
	private BillMapper billMapper;
	@Override
	public int addBillInfo(BillEntity billInfo) {
		return 0;
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

}
