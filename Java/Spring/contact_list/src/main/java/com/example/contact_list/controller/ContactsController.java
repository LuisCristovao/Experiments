package com.example.contact_list.controller;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.contact_list.model.Contacts;
import com.example.contact_list.repository.ContactsRepository;



@RestController
@RequestMapping("/")
public class ContactsController {
	
	@Autowired
    private ContactsRepository contactsRepository;
	
	@GetMapping("/getDB")
	public Page<Contacts> getDB(Pageable pageable) {
		return contactsRepository.findAll(pageable);
	}
	@PostMapping("/insertDB")
	public Contacts insertDB(@Valid @RequestBody Contacts contact) {
		return contactsRepository.save(contact);	
	}
}
