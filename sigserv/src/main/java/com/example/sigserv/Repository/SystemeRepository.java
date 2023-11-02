package com.example.sigserv.Repository;

import com.example.sigserv.Models.Systeme;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface SystemeRepository extends JpaRepository<Systeme,Long> {



}
