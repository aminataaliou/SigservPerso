package com.example.sigserv.Repository;

import com.example.sigserv.Models.Emplacement;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface EmplacementRepository extends JpaRepository<Emplacement,Long> {

@Query(value="select data.* from datacenter data inner join datacenter_emplacements de on data.id = de.datacenter_id inner join emplacements empl on de.emplacements_id = empl.id where empl.id= :idEmplacements\n",nativeQuery=true)
    List<Emplacement> findEmplacementByDatacenterId(Long idEmplacements);
}
