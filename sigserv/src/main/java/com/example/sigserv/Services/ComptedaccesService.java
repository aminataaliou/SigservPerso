package com.example.sigserv.Services;

import com.example.sigserv.Models.Comptedacces;
import com.example.sigserv.Models.Datacenter;
import com.example.sigserv.Models.Serveur;
import com.example.sigserv.Repository.ComptedaccesRepository;
import com.example.sigserv.Repository.DatacenterRepository;
import com.example.sigserv.Repository.ServeurRepository;
import com.example.sigserv.config.BadAlertRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.Set;

@Service
public class ComptedaccesService {

    @Autowired
    ComptedaccesRepository comptedaccesRepository;

    @Autowired
    ServeurRepository serveurRepository;

    public List<Comptedacces> getAll() {
        return comptedaccesRepository.findAll();
    }

    public Optional<Comptedacces> findOneById(Long id){
        return comptedaccesRepository.findById(id);
    }

    public List<Comptedacces> findComptedaccesByServeurId(Long id){
        return comptedaccesRepository.findComptedaccesByServeurId(id);}

    public Comptedacces create(Comptedacces comptedacces){
        return comptedaccesRepository.save(comptedacces);
    }

    public Comptedacces update(Comptedacces comptedacces){
        return comptedaccesRepository.save(comptedacces);
    }

    public void delete(Long id){
        comptedaccesRepository.findById(id).ifPresentOrElse( comptedacces -> {
            List<Serveur> serveurs = serveurRepository.findServeurByComptedaccesId(comptedacces.getId());
            System.out.println("SERVEURS : "+serveurs);
            serveurs.forEach(serveur -> {
                serveur.setComptedacces(null);
                serveurRepository.save(serveur);
                serveurRepository.deleteById(serveur.getId());
        });
            comptedacces.setServeurs(null);
            comptedaccesRepository.save(comptedacces);
            comptedaccesRepository.deleteById(id);
        },() -> new BadAlertRequest("Ce compte n'existe plus !"));
    }

    public Comptedacces addServeursToComptedaccesById(Long idServeur, Set<Serveur> serveurs) {
        return comptedaccesRepository.findById(idServeur)
                .map(comptedacces -> {
                    comptedacces.setServeurs(serveurs);
                    comptedaccesRepository.save(comptedacces);
                    return  comptedacces;
                }).orElseThrow(() -> new BadAlertRequest("Ce serveur n'existe plus !"));
    }
}
