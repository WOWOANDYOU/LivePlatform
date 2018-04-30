package cn.edu.zhku.controller;

import java.io.File;
import java.io.IOException;
import java.util.UUID;

import javax.servlet.http.HttpServletRequest;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.multipart.MultipartFile;

import cn.edu.zhku.pojo.UserEntity;

@Controller
@RequestMapping("/test")
public class TestController {
	@RequestMapping(value="fileUpload",method=RequestMethod.POST)
	public String fileUpload(UserEntity user,@RequestParam MultipartFile[] file,HttpServletRequest request) {
		if(file!=null) {
			String path=null;// 文件路径
			String type[]=new String[file.length];;// 文件类型
			String fileName[] = new String[file.length]; 
			for(int i=0;i<fileName.length;i++) {
				fileName[i] = file[i].getOriginalFilename();
				type[i]=fileName[i].indexOf(".")!=-1?fileName[i].substring(fileName[i].lastIndexOf(".")+1, fileName[i].length()):null;
			}
			//String fileName=file.getOriginalFilename();// 文件原名称
			// 判断文件类型
			//type=fileName.indexOf(".")!=-1?fileName.substring(fileName.lastIndexOf(".")+1, fileName.length()):null;
			//String realPath=request.getSession().getServletContext().getRealPath("/");
			String realPath="E:\\java2018\\images\\";
			System.out.println(realPath);
			//realPath+="images/";
			String realImgPath[] = new String[file.length];
			for(int i=0;i<file.length;i++) {
				String uuid = UUID.randomUUID().toString();
				realImgPath[i] = realPath+uuid+"."+type[i];
			}
			String currentPath=getClass().getResource(".").getFile().toString();
			System.out.println(currentPath);
			/*String uuid = UUID.randomUUID().toString();
			String realImgPath = realPath+uuid+"."+type;*/
			try {
				for(int i=0;i<file.length;i++) {
					file[i].transferTo(new File(realImgPath[i]));
				}
			} catch (IllegalStateException e) {
				e.printStackTrace();
			} catch (IOException e) {
				e.printStackTrace();
			}
		}
		return null;
	}
}
