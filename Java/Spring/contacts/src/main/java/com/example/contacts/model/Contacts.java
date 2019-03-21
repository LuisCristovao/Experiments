package com.example.contacts.model;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.SequenceGenerator;
import javax.persistence.Table;
import javax.validation.constraints.NotBlank;

@Entity
@Table(name = "contacts")
public class Contacts {
	
	/*@SequenceGenerator(
    name = "contacts_generator",
    sequenceName = "contacts_sequence",
    initialValue = 1
	)*/
	
	@Id
    @GeneratedValue(generator = "contacts_generator")//
    private Long id;

    //@NotBlank
    //@Size(min = 0, max = 100)
    private String name;
    
    
    //@Column(columnDefinition = "text")
    @Column(name="number")
    private String number;

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getNumber() {
		return number;
	}

	public void setNumber(String number) {
		this.number = number;
	}
    
}
