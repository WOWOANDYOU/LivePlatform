package cn.edu.zhku.service;

import java.util.ArrayList;
import java.util.Map;

import cn.edu.zhku.pojo.GoodEntity;

public interface UnusedService {
	public int addGoodInfo(GoodEntity good);
	
	public int deleteGoodInfo(String goodId);
	
	public ArrayList<GoodEntity> selectPageGoodInfo(Map map);
	
	public int updateGoodInfo(GoodEntity goodInfo);
	
	public GoodEntity selectOne(String goodId);

	public Integer userGoodInfoTotalNum(String userId);
}
