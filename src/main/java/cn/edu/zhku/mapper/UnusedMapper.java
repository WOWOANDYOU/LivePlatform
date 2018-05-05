package cn.edu.zhku.mapper;

import java.util.ArrayList;
import java.util.Map;

import cn.edu.zhku.pojo.GoodEntity;

public interface UnusedMapper {
	
	public int addGoodInfo(GoodEntity good);
	
	public int deleteGoodInfo(String goodId);
	
	public ArrayList<GoodEntity> selectPageGoodInfo(Map map);
	
	public int updateGoodInfo(GoodEntity goodInfo);
	
	public GoodEntity selectOne(String goodId);

	public Integer selectUserGoodInfoTotal(Map map);
	
}
