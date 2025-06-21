package com.example.backend.security;

import jakarta.servlet.*;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import java.io.IOException;

public class ApiKeyFilter implements Filter {

    private final String expectedApiKey;

    public ApiKeyFilter(String expectedApiKey) {
        this.expectedApiKey = expectedApiKey;
    }

    @Override
    public void doFilter(ServletRequest request, ServletResponse response, FilterChain chain)
            throws IOException, ServletException {

        HttpServletRequest httpRequest = (HttpServletRequest) request;
        HttpServletResponse httpResponse = (HttpServletResponse) response;

        String path = httpRequest.getRequestURI();

        // パスによってはスキップ
        if (path.startsWith("/api/auth") || path.startsWith("/swagger") || path.startsWith("/v3/api-docs")) {
            chain.doFilter(request, response);
            return;
        }

        String requestApiKey = httpRequest.getHeader("X-API-KEY");
        if (requestApiKey == null || !requestApiKey.equals(expectedApiKey)) {
            httpResponse.setStatus(HttpServletResponse.SC_FORBIDDEN);
            httpResponse.getWriter().write("Invalid API Key");
            return;
        }

        chain.doFilter(request, response);
    }
}
