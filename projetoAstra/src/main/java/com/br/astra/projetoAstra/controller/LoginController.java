package com.br.astra.projetoAstra.controller;


import com.br.astra.projetoAstra.model.User;
import com.br.astra.projetoAstra.repository.UserRepository;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

import javax.naming.Binding;

@Controller
public class LoginController {

    @Autowired
    private UserRepository ur;

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
