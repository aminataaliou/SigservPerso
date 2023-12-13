package com.example.sigserv.Repository;

import com.example.sigserv.Models.Application;
import com.example.sigserv.Models.Serveur;
import com.example.sigserv.Models.Systeme;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import java.util.List;
import java.util.Optional;

@Repository
public interface ServeurRepository extends JpaRepository<Serveur,Long> {
    @Query(value = "select  s from application app\n" +
            "inner join serveurs_applications sa on app.id = sa.application_id\n" +
            "inner join serveur s on sa.serveur_id = s.id where s.id= :idApplication",nativeQuery=true)
    List<Serveur> findServeurByApplicationId( Long idApplication);

    @Query(value = "select  s.* from comptedacces compte inner join serveurs_comptedacces sc on compte.id = sc.comptedacces_id inner join serveur s on sc.serveur_id = s.id where s.id= :idComptedacces",nativeQuery=true)
    List<Serveur> findServeurByComptedaccesId( Long idComptedacces);

    @Query(value="select serv.* from serveur serv inner join serveur_serveurs ss on serv.id = ss.serveur_id where ss.serveur_id = :idServeurvirtuel",nativeQuery=true)
    List<Serveur> findServeurVirtuelByServeurId(Long idServeurvirtuel);

    @Query(value="select  sys.* from systeme sys inner join systeme_serveurs ss on sys.id = ss.systeme_id inner join serveur s on ss.serveurs_id = s.id where s.id= :idServeur",nativeQuery=true)
    List<Serveur> findServeurBySystemeId(@Param("idServeur") Long idServeur);

    List<Serveur> findServeurByEmplacementId(Long id);
}


