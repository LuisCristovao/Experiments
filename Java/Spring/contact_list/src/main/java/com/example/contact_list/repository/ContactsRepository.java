package com.example.contact_list.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.contact_list.model.Contacts;

@Repository
public interface ContactsRepository extends JpaRepository<Contacts, Long> {
}
