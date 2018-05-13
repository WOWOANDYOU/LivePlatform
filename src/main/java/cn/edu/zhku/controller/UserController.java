package cn.edu.zhku.controller;

import java.io.File;
import java.util.Date;
import java.util.UUID;

import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.multipart.MultipartFile;

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
	
	@RequestMapping("userSettingUI")
	public String userSettingUI() {
		return "userSetting";
		/*JsonReturn jr = new JsonReturn();
		try {
			UserEntity user = (UserEntity) request.getSession().getAttribute("userSession");
			jr.setIsLogin(user==null?"false":"true");
			jr.setInfo("true");
		}catch(Exception e) {
			jr.setInfo("false");
			e.printStackTrace();
		}finally {
			return JSON.toJSONString(jr);
		}*/
	}
	
	@SuppressWarnings("finally")
	@RequestMapping(value="userInfo",method=RequestMethod.POST)
	@ResponseBody
	public String userInfo(HttpServletRequest request) {
		JsonReturn jr = new JsonReturn();
		try {
			UserEntity user = (UserEntity) request.getSession().getAttribute("userSession");
			if(user==null) {
				jr.setIsLogin("false");
			}else {
				jr.setInfo("true");
				jr.setObject(user);
			}
		}catch(Exception e) {
			e.printStackTrace();
			jr.setInfo("false");
		}finally {
			return JSON.toJSONString(jr);
		}
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
					userEntity.setUserPhotoPath("\\images\\defaultPhoto.jpg");
					userEntity.setUserGender("none");
					userEntity.setUserGrade("none");
					userEntity.setUserMajor("none");
					userEntity.setUserUniversityName("none");
					userEntity.setUserClassNum("none");
					int num = userService.addUser(userEntity);
					if (num != 0) {
						jr.setInfo("true");// 表示 注册成功
						//注册成功并 在session中存值并 跳转
						UserEntity userEntity2 = userService.selectOne(userEntity);
						if(userEntity2!=null) {
							session.setAttribute("userSession", userEntity2);
							userService.updateSiginTime(((UserEntity)session.getAttribute("userSession")).getUserId());
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
				userService.updateSiginTime(user.getUserId());
			} else {
				jr.setInfo("error"); //表示 用户名或者密码错误
			}
		} catch (Exception e) {
			jr.setInfo("false");//表示 服务器出错
		} finally {
			return JSON.toJSONString(jr);
		}
	}
	
	@SuppressWarnings("finally")
	@RequestMapping(value="changePadIn",method=RequestMethod.POST)
	@ResponseBody
	public String changePadIn(String originPad,String newPad, HttpServletRequest request) {
		JsonReturn jr = new JsonReturn();
		try {
			UserEntity user = (UserEntity) request.getSession().getAttribute("userSession");
			if(user==null) {
				jr.setIsLogin("false");
			}else {
				if(originPad.equals(user.getUserPassword())) {
					user.setUserPassword(newPad);
					int num = userService.updateUser(user);
					jr.setInfo(num!=0?"true":"false");
					jr.setObject("修改成功");
					if(num!=0) {
						request.getSession().setAttribute("userSession",user);
					}else {
						user.setUserPassword(originPad);
						request.getSession().setAttribute("userSession",user);
					}
					
				}else {
					jr.setInfo("false");
					jr.setObject("原密码错误");
				}
			}
		}catch(Exception e) {
			e.printStackTrace();
			jr.setInfo("false");
		}finally {
			return JSON.toJSONString(jr);
		}
	}
	
	@SuppressWarnings("finally")
	@RequestMapping(value="updateInfo",method=RequestMethod.POST)
	@ResponseBody
	public String updateInfo(UserEntity user,@RequestParam MultipartFile[] file, HttpServletRequest request) {
		JsonReturn jr = new JsonReturn();
		try {
			UserEntity user2 = (UserEntity) request.getSession().getAttribute("userSession");
			if(user2==null) {
				jr.setIsLogin("false");
			}else {
				user.setUserId(user2.getUserId());
				if(file!=null && file.length!=0) {
					String type[] = new String[file.length];
					// 文件类型
					String fileName[] = new String[file.length];
					for (int i = 0; i < fileName.length; i++) {
						fileName[i] = file[i].getOriginalFilename();
						type[i] = fileName[i].indexOf(".") != -1
								? fileName[i].substring(fileName[i].lastIndexOf(".") + 1, fileName[i].length())
								: null;
					}
					String realPath = "E:\\java2018\\images\\";
					String realImgPath[] = new String[file.length];
					String picPath1 = "\\images\\";
					String picPath = "";
					for (int i = 0; i < file.length; i++) {
						String uuid = UUID.randomUUID().toString();
						realImgPath[i] = realPath + uuid + "." + type[i];
						picPath1 += uuid + "." + type[i];
						picPath += picPath1 + ",";
						picPath1 = "\\images\\";
					}
					picPath = picPath.substring(0, picPath.length() - 1);
					user.setUserPhotoPath(picPath);
					for (int i = 0; i < file.length; i++) {
						file[i].transferTo(new File(realImgPath[i]));
					}
				}else {
					user.setUserPhotoPath(user2.getUserPhotoPath());
				}
				int num = userService.updateUser(user);
				UserEntity user3 = userService.selectOne(user);
				request.getSession().setAttribute("userSession", user3);
				jr.setInfo(num!=0?"true":"false");
				jr.setObject(user3);
			}
		}catch(Exception e) {
			e.printStackTrace();
			jr.setInfo("false");
		}finally {
			return JSON.toJSONString(jr);
		}
	}
	@RequestMapping("logout")
	public String logout(HttpServletRequest request,HttpServletResponse response) {
		userService.updateLogoutTime(((UserEntity)(request.getSession().getAttribute("userSession"))).getUserId());
		request.getSession().removeAttribute("userSession");
		Cookie cookieUserName = new Cookie("cookieUserName",null);
		Cookie cookieUserPad = new Cookie("cookieUserPad",null);
		cookieUserName.setMaxAge(0);
		cookieUserPad.setMaxAge(0);
		response.addCookie(cookieUserName); 
		response.addCookie(cookieUserPad);
		return "signinup";
	}
}
