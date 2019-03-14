package com.example.JsonDB;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

@Controller
@RequestMapping("/")
public class PageController {
	@RequestMapping(value="/", method=RequestMethod.GET)
    public String getDBPage()
    {

        return "getDB";
    }
}
