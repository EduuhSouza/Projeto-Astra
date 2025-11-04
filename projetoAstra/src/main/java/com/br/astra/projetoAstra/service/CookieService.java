package com.br.astra.projetoAstra.service;

import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

import java.io.UnsupportedEncodingException;
import java.net.URLDecoder;
import java.net.URLEncoder;

import java.util.Arrays;
import java.util.Optional;

//public class CookieService {

//    CODIGO PADRAO PARA CHAMAR O COOKIE

//    public static void setCookie(HttpServletResponse response, String key, String valor, int seconds) throws UnsupportedEncodingException {
//        Cookie cookie = new Cookie(key, URLEncoder.encode(valor, "UTF-8"));
//        cookie.setMaxAge(seconds);
//        response.addCookie(cookie);
//
//    }
//
//    public static String getCookie(HttpServletRequest request, String key) throws UnsupportedEncodingException {
//        String valor = Optional.ofNullable(request.getCookies())
//                .flatMap(cookies -> Arrays.stream(cookies)
//                .filter(cookie -> key.equals(cookie.getName()))
//                .findAny()
//                ).map(e -> e.getValue())
//                .orElse(null);
//
//        if (valor != null){
//            valor = URLDecoder.decode(valor, "UTF-8");
//            return valor;
//        }
//
//        return valor;
//    }
//
//}
