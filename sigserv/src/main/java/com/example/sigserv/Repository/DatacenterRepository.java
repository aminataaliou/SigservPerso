package com.example.sigserv.Repository;

import com.example.sigserv.Models.Datacenter;
import com.example.sigserv.Models.Serveur;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface DatacenterRepository extends JpaRepository<Datacenter,Long> {

}
