package cn.edu.zhku.service;

import java.sql.Timestamp;
import java.util.ArrayList;
import java.util.Date;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import cn.edu.zhku.mapper.UnusedMapper;
import cn.edu.zhku.pojo.GoodEntity;
@Service
public class UnusedServiceImpl implements UnusedService {
	@Autowired
	private UnusedMapper unUsedMapper;
	
	@Override
	public int addGoodInfo(GoodEntity good) {
		Timestamp time = new Timestamp(new Date().getTime());
		good.setGoodUpTime(time);
		return unUsedMapper.addGoodInfo(good);
	}

	@Override
	public int deleteGoodInfo(String goodId) {
		return 0;
	}

	@Override
	public ArrayList<GoodEntity> selectPageGoodInfo(Map map) {
		return unUsedMapper.selectPageGoodInfo(map);
	}

	@Override
	public int updateGoodInfo(GoodEntity goodInfo) {
		return 0;
	}

	@Override
	public GoodEntity selectOne(String goodId) {
		return null;
	}

	@Override
	public Integer userGoodInfoTotalNum(Map map) {
		return unUsedMapper.selectUserGoodInfoTotal(map);
	}

}
