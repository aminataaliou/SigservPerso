package com.example.sigserv.Repository;

import com.example.sigserv.Models.Comptedacces;
import org.hibernate.sql.Select;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface ComptedaccesRepository extends JpaRepository<Comptedacces,Long> {

@Query(value = "select  compte.* from serveur s inner join serveurs_comptedacces sc on s.id = sc.serveur_id inner join comptedacces compte on sc.comptedacces_id = compte.id where s.id= :idServeur",nativeQuery=true)
    List<Comptedacces> findComptedaccesByServeurId(Long idServeur);
}
