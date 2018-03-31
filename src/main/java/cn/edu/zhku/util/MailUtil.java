package cn.edu.zhku.util;

import java.util.Properties;

import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSenderImpl;

public class MailUtil {
	private JavaMailSenderImpl senderImpl = new JavaMailSenderImpl();
	private SimpleMailMessage mailMessage = new SimpleMailMessage();
	
	//发送验证码 to是目标邮箱地址，text是发送的验证码（事先生成）
	@SuppressWarnings("finally")
	public boolean sendMail(String to,String text) {
		boolean istrue = false;
		try {
			senderImpl.setHost("smtp.163.com");  //smtp.exmail.qq.com
			mailMessage.setTo(to); 
			mailMessage.setCc("13535528187@163.com");
            mailMessage.setFrom( "13535528187@163.com" ); 
            mailMessage.setSubject( "【生活管理平台】验证码" ); 
            mailMessage.setText("验证码为:" + text); 

            senderImpl.setUsername("13535528187@163.com");
            senderImpl.setPassword("184008,wentao"); //vpnruhobaliidjgi

            Properties prop = System.getProperties();
            prop.put("mail.smtp.auth","true");
            prop.put("mail.smtp.timeout","25000");
            senderImpl.setJavaMailProperties(prop);

            //发送邮件
            senderImpl.send(mailMessage);

            System.out.println("发送邮件成功");

            istrue = true;
		}catch(Exception e) {
			e.printStackTrace();
			istrue = false;
		}finally {
			return istrue;
		}
		
	}
}
