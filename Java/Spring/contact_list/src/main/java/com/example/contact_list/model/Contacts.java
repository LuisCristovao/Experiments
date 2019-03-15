package com.example.contact_list.model;

import javax.persistence.Column;
import javax.persistence.EntityListeners;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.MappedSuperclass;
import javax.persistence.SequenceGenerator;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Size;

import org.springframework.data.jpa.domain.support.AuditingEntityListener;

//@MappedSuperclass
//@EntityListeners(AuditingEntityListener.class)
public class Contacts {
	@Id
    @GeneratedValue(generator = "contact_generator")
    @SequenceGenerator(
            name = "contact_generator",
            sequenceName = "contact_sequence",
            initialValue = 1
    )
    private Long id;

    @NotBlank
    @Size(min = 3, max = 100)
    private String name;
    
    
    @Column(columnDefinition = "text")
    private String number;

    
    
    public Contacts() {
    	
    }
    
    
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
