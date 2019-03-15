package com.example.postgresdemo2.repository;


import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.postgresdemo2.module.Question;

@Repository
public interface QuestionRepository extends JpaRepository<Question, Long> {
}