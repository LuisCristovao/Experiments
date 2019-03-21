package com.example.contacts.controller;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.example.contacts.model.Contacts;
import com.example.contacts.repository.ContactsRepository;


@RestController
public class ContactsController {
	
	@Autowired
    private ContactsRepository contactsRepository;

    @GetMapping("/contacts")
    public Page<Contacts> getContacts(Pageable pageable) {
        return contactsRepository.findAll(pageable);
    }


    @PostMapping("/contacts")
    public Contacts createContact(@Valid @RequestBody Contacts question) {
        return contactsRepository.save(question);
    }
    
    @PostMapping("/contacts_edit")
    public Contacts editContact(@Valid @RequestBody Contacts question) {
        return contactsRepository.save(question);
    }
}
