package cn.edu.zhku.filter;

import java.io.IOException;

import javax.servlet.Filter;
import javax.servlet.FilterChain;
import javax.servlet.FilterConfig;
import javax.servlet.ServletException;
import javax.servlet.ServletRequest;
import javax.servlet.ServletResponse;
import javax.servlet.annotation.WebFilter;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
//设置 request 请求中文的编码方式
@WebFilter("/*")
public class RequestEncoding implements Filter {
  public RequestEncoding() {
  }
	public void destroy() {
	}
	public void doFilter(ServletRequest request, ServletResponse response, FilterChain chain) throws IOException, ServletException {
		HttpServletRequest hrequest = (HttpServletRequest) request;
		HttpServletResponse hresponse = (HttpServletResponse) response;
		hrequest.setCharacterEncoding("utf-8");
		chain.doFilter(hrequest, hresponse);
	}
	public void init(FilterConfig fConfig) throws ServletException {
	}

}
