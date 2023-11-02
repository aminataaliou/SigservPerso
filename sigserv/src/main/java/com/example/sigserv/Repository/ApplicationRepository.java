package com.example.sigserv.Repository;

import com.example.sigserv.Models.Application;
import com.example.sigserv.Models.Serveur;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;

public interface ApplicationRepository extends JpaRepository<Application,Long> {


    @Query(value = "select  app.* from application app inner join serveurs_applications sa on app.id = sa.application_id inner join serveur s on sa.serveur_id = s.id where s.id= :idServeur",nativeQuery=true)
    List<Application> findApplicationByServeurId(@Param("idServeur") Long idServeur);

}
