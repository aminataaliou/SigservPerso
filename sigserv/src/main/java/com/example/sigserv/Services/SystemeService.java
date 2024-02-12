package com.example.sigserv.Services;

import com.example.sigserv.Models.Datacenter;
import com.example.sigserv.Models.Serveur;
import com.example.sigserv.Models.Systeme;
import com.example.sigserv.Repository.DatacenterRepository;
import com.example.sigserv.Repository.ServeurRepository;
import com.example.sigserv.Repository.SystemeRepository;
import com.example.sigserv.config.BadAlertRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.Set;

@Service
public class SystemeService {

    @Autowired
    SystemeRepository systemeRepository;

    @Autowired
    private ServeurRepository serveurRepository;

    public List<Systeme> getAll() {
        return systemeRepository.findAll();
    }

    public Optional<Systeme> findOneById(Long id){
        return systemeRepository.findById(id);
    }

    public Systeme create(Systeme systeme){
        return systemeRepository.save(systeme);
    }

    public Systeme update(Systeme systeme){
        return systemeRepository.save(systeme);
    }

    public void delete(Long id) {
//        systemeRepository.findById(id).ifPresentOrElse(systeme -> {
//            List<Serveur> serveurs = serveurRepository.findServeurBySystemeId(systeme.getId());
//            System.out.println("SERVEURS : "+serveurs);
//            serveurs.forEach(serveur -> {
//                serveur.setComptedacces(null);
//                serveurRepository.save(serveur);
//                serveurRepository.deleteById(serveur.getId());
//            });
//            systeme.setServeurs(null);
//            systemeRepository.save(systeme);
//            systemeRepository.deleteById(id);
//        },() -> new BadAlertRequest("Ce systeme n'existe plus !"));
         systemeRepository.deleteById(id);;
    }

//    public Systeme addServeurToSystemesById(Long id, Set<Serveur> serveurs) {
//        return systemeRepository.findById(id)
//                .map(systeme -> {
//                    systeme.setServeurs(serveurs);
//                    systemeRepository.save(systeme);
//                    return  systeme;
//                }).orElseThrow(() -> new BadAlertRequest("Ce serveur n'existe plus !"));
//    }
}
