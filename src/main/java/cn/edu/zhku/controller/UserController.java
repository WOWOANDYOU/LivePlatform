package cn.edu.zhku.controller;

import java.util.Date;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import com.alibaba.fastjson.JSON;

import cn.edu.zhku.pojo.JsonReturn;
import cn.edu.zhku.pojo.UserEntity;
import cn.edu.zhku.service.UserService;

@Controller
@RequestMapping("/user")
public class UserController {
	@Autowired
	private UserService userService;

	//登录注册页面
	@RequestMapping("signinupUI")
	public String signinup(HttpServletRequest request) {
		UserEntity user = (UserEntity) request.getSession().getAttribute("userSession");
		if(user == null) {
			return "signinup";
		}else {
			return "index";
		}
	}
	
	@RequestMapping("findPasswordUI")
	public String findPasswordUI() {
		return "passwordReset";
	}
	
	//找回密码时 发送验证码接口
	@SuppressWarnings("finally")
	@RequestMapping("findPassSendCode")
	@ResponseBody
	public String findPassSendCode(UserEntity user,HttpServletRequest request) {
		JsonReturn jr = new JsonReturn();
		try {
			// 先去查 邮箱是否已经注册了
			UserEntity existUser = userService.selectOne(user);
			//用户找回密码  -1不存在  1存在
			if(existUser!=null) {
				jr.setExistence(1);
				String text = userService.sendMail(user.getUserEmail());
				String sendMailTime = (new Date().getTime()) + "";
				if (text != null) {
					HttpSession session = request.getSession();
					session.setAttribute("findPassMailTime", text + "#" + sendMailTime);
					jr.setInfo("true");
				} else {
					jr.setInfo("false");
				}
			}else {
				jr.setExistence(-1);
			}
		}catch(Exception e) {
			jr.setInfo("false");
		}finally {
			return JSON.toJSONString(jr);
		}
	}
	
	//密码找回 时检查 验证是否正确 和超时
	@SuppressWarnings("finally")
	@RequestMapping(value="findPassCheckCode",method=RequestMethod.POST)
	@ResponseBody
	public String findPassCheckCode(String code,HttpServletRequest request) {
		JsonReturn jr = new JsonReturn();
		try {
			if(code!=null && !"".equals(code.trim())) {
				HttpSession session = request.getSession();
				String originMailTime = (String) session.getAttribute("findPassMailTime");
				// -1 表示验证码错误 -2表示验证码超时 1表示验证码正确 且在有效时间内 0表示 服务器异常
				Integer i = userService.checkCode(code, originMailTime);
				if (i == 1) {
					jr.setInfo("true");// 表示 正确且 未超时
				}
				jr.setMegInfo(i);
			}else {
				jr.setInfo("false");
			}
		}catch(Exception e) {
			jr.setInfo("false");
		}finally {
			return JSON.toJSONString(jr);
		}
	}
	
	@SuppressWarnings("finally")
	@RequestMapping(value="changePass",method=RequestMethod.POST)
	@ResponseBody
	public String changePass(UserEntity user,HttpServletRequest request) {
		JsonReturn jr = new JsonReturn();
		try {
			if(user!=null && user.getUserEmail()!=null) {
				int num = userService.updateUser(user);
				if(num!=0) {
					jr.setInfo("true");
				}else {
					jr.setInfo("false");
				}
			}else {
				jr.setInfo("false");
			}
		}catch(Exception e) {
			jr.setInfo("false");
		}finally {
			return JSON.toJSONString(jr);
		}
	}
	@SuppressWarnings("finally")
	@RequestMapping(value = "getMegCode", method = RequestMethod.POST)
	@ResponseBody
	public String getMegCode(String userEmail, HttpServletRequest request) {
		JsonReturn jr = new JsonReturn();
		try {
			// 先去查 邮箱是否已经注册了
			UserEntity user = new UserEntity();
			user.setUserEmail(userEmail);
			UserEntity existUser = userService.selectOne(user);
			
			if(existUser==null) {
				jr.setExistence(-1);
				String text = userService.sendMail(userEmail);
				String sendMailTime = (new Date().getTime()) + "";
				if (text != null) {
					HttpSession session = request.getSession();
					session.setAttribute("mailTime", text + "#" + sendMailTime);
					jr.setInfo("true");
				} else {
					jr.setInfo("false");
				}
			}else {
				//用户注册是否存在  -1不存在  1存在
				jr.setExistence(1);
				jr.setInfo("false");
			}
			
		} catch (Exception e) {
			jr.setMegInfo(0);
			jr.setInfo("false");
			e.printStackTrace();
		} finally {
			return JSON.toJSONString(jr);
		}
	}

	@SuppressWarnings("finally")
	@RequestMapping(value = "signup", method = RequestMethod.POST)
	@ResponseBody
	public String signup(UserEntity userEntity, HttpServletRequest request) {
		JsonReturn jr = new JsonReturn();
		try {
			if (userEntity != null) {
				HttpSession session = request.getSession();
				String originMailTime = (String) session.getAttribute("mailTime");
				// -1 表示验证码错误 -2表示验证码超时 1表示验证码正确 且在有效时间内 0表示 服务器异常
				Integer i = userService.checkCode(userEntity.getEmailCode(), originMailTime);
				if (i == 1) {
					int num = userService.addUser(userEntity);
					if (num != 0) {
						jr.setInfo("true");// 表示 注册成功
						//注册成功并 在session中存值并 跳转
						UserEntity userEntity2 = userService.selectOne(userEntity);
						if(userEntity2!=null) {
							session.setAttribute("userSession", userEntity2);
						}
					} else {
						jr.setInfo("false");// 表示 注册失败
					}
				} else {
					jr.setInfo("false");// 表示 注册失败
				}
				jr.setMegInfo(i);
			} else {
				jr.setInfo("false");// 表示 注册失败
				jr.setMegInfo(0);// 0表示 服务器异常
			}
		} catch (Exception e) {
			e.printStackTrace();
			jr.setMegInfo(0);// 0表示 服务器异常
			jr.setInfo("false");
		} finally {
			return JSON.toJSONString(jr);
		}
	}

	@SuppressWarnings("finally")
	@RequestMapping(value = "signin", method = RequestMethod.POST)
	@ResponseBody
	public String signin(UserEntity userEntity, HttpServletRequest request) {
		JsonReturn jr = new JsonReturn();
		try {
			UserEntity user = userService.selectOne(userEntity);
			if (user != null) {
				jr.setObject(user);
				jr.setInfo("true");
				request.getSession().setAttribute("userSession", user);
			} else {
				jr.setInfo("error"); //表示 用户名或者密码错误
			}
		} catch (Exception e) {
			jr.setInfo("false");//表示 服务器出错
		} finally {
			return JSON.toJSONString(jr);
		}
	}
	
	//找回密码
	@SuppressWarnings("finally")
	@RequestMapping(value = "findPassword", method = RequestMethod.POST)
	@ResponseBody
	public String findPassword(UserEntity userEntity, HttpServletRequest request) {
		JsonReturn jr = new JsonReturn();
		try {
			UserEntity user = userService.selectOne(userEntity);
			if (user != null) {
				jr.setObject(user);
				jr.setInfo("true");
				request.getSession().setAttribute("userSession", user);
			} else {
				jr.setInfo("error"); //表示 用户名或者密码错误
			}
		} catch (Exception e) {
			jr.setInfo("false");//表示 服务器出错
		} finally {
			return JSON.toJSONString(jr);
		}
	}
}
