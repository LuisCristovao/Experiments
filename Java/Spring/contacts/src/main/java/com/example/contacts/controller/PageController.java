package com.example.contacts.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

@Controller
@RequestMapping("/")
public class PageController {
	@RequestMapping(value="/", method=RequestMethod.GET)
    public String getPage()
    {

        return "contactsDB";
    }
}
