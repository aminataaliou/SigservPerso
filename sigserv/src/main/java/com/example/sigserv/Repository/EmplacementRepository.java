package com.example.sigserv.Repository;

import com.example.sigserv.Models.Emplacement;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface EmplacementRepository extends JpaRepository<Emplacement,Long> {

@Query(value="select empla.* from emplacement empla inner join datacenter_emplacements de on empla.id = de.emplacements_id inner join datacenter data on de.datacenter_id = data.id where data.id= :idDatacenter\n",nativeQuery=true)
    List<Emplacement> findEmplacementByDatacenterId(Long idDatacenter);
}
