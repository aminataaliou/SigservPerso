package com.example.sigserv.Services;

import com.example.sigserv.Models.*;
import com.example.sigserv.Repository.ServeurRepository;
import com.example.sigserv.config.BadAlertRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.stereotype.Service;
import org.springframework.web.client.HttpClientErrorException;

import java.util.List;
import java.util.Optional;
import java.util.Set;

@Service
public class ServeurService {

    @Autowired
    ServeurRepository serveurRepository;

    public List<Serveur> getAll(){

        return serveurRepository.findAll();
    }

    public Optional<Serveur> findOneById(Long id){

        return serveurRepository.findById(id);
    }

    public List<Serveur> findServeurVirtuelByServeurId(Long id){
        return serveurRepository.findServeurVirtuelByServeurId(id);
    }

    public List<Serveur> findServeurByApplicationId(Long id){
        return serveurRepository.findServeurByApplicationId(id);
    }

    public List<Serveur> findServeurByComptedaccesId(Long id){
        return serveurRepository.findServeurByComptedaccesId(id);
    }

    public List<Serveur> findServeurBySystemeId(Long id){
        return serveurRepository.findServeurBySystemeId(id);
    }


    public List<Serveur> findServeurByEmplacementId(Long id){
        return serveurRepository.findServeurByEmplacementId(id);
    }


    public Serveur create(Serveur serveur){

        return serveurRepository.save(serveur);
    }

    public Serveur addApplicationsToServerById(Long idServer, Set<Application> applications){
        return serveurRepository.findById(idServer)
                .map(serveur -> {
            serveur.setApplications(applications);
            serveurRepository.save(serveur);
            return  serveur;
        }).orElseThrow(() -> new BadAlertRequest("Cet application n'existe plus !"));
    }
    public Serveur addComptesToServerById(Long idServer, Set<Comptedacces> comptedacces){
        return serveurRepository.findById(idServer)
                .map(serveur -> {
                    serveur.setComptedacces(comptedacces);
                    serveurRepository.save(serveur);
                    return  serveur;
                }).orElseThrow(() -> new BadAlertRequest("Ce compte n'existe plus !"));
    }
    public Serveur addTagsToServerById(Long idServer, Set<Tags> tags){
        return serveurRepository.findById(idServer)
                .map(serveur -> {
                    serveur.setTags(tags);
                    serveurRepository.save(serveur);
                    return  serveur;
                }).orElseThrow(() -> new BadAlertRequest("Ce tags n'existe plus !"));
    }

    public Serveur addServeursToServerById(Long idServer,List<Serveur> serveurs) {

        return serveurRepository.findById(idServer).map( serveur -> {
            serveur.setServeurs(serveurs);
            serveurRepository.save(serveur);
            return serveur;
        }).orElseThrow(() -> new BadAlertRequest("Ce serveur n'existe plus!"));

    }

    public Serveur update(Serveur serveur){

        return serveurRepository.save(serveur);
    }

    public void delete(Long id){
        serveurRepository.deleteById(id);
    }


}
