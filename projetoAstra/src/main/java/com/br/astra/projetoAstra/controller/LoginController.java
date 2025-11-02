package com.br.astra.projetoAstra.controller;

import com.br.astra.projetoAstra.model.User;
import com.br.astra.projetoAstra.repository.UserRepository;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServlet;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

import javax.naming.Binding;

@Controller
public class LoginController {

    @Autowired
    private UserRepository ur;

    @PostMapping("/logar")
    public String loginUser(User user, Model model, HttpServletResponse response){
        User userLogado = this.ur.login(user.getEmail(), user.getPassword());
        if (userLogado != null){
            return "redirect:/";
        }

        model.addAttribute("erro", "Usuário inválido");
        return "index";
    }

    @GetMapping("/")
    public String dashboard(){
        return "dashboard";
    }

    @GetMapping("/index")
    public String login(){
        return "index";
    }


    @RequestMapping(value = "/index", method = RequestMethod.POST)
    public String cadastroUsuario(@Valid User user, BindingResult result){

        if (result.hasErrors()){
            return "redirect:/index";
        }
        ur.save(user);
        return "redirect:/index";
    }

}
