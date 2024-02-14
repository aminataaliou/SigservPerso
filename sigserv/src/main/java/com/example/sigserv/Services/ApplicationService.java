package com.example.sigserv.Services;

import com.example.sigserv.MessageError.BusinessResourceException;
import com.example.sigserv.Models.*;
import com.example.sigserv.Repository.ApplicationRepository;
import com.example.sigserv.Repository.DatacenterRepository;
import com.example.sigserv.Repository.ServeurRepository;
import com.example.sigserv.Repository.UtilisateurRepository;
import com.example.sigserv.config.BadAlertRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.Set;

@Service
public class ApplicationService {

    @Autowired
    ApplicationRepository applicationRepository;

    @Autowired
    ServeurRepository serveurRepository;


    public List<Application> getAll() {
        return applicationRepository.findAll();
    }

    public Optional<Application> findOneById(Long id)throws BusinessResourceException {
        Optional<Application> application = applicationRepository.findById(id);
        if (Boolean.FALSE.equals(application.isPresent())){
            throw new BusinessResourceException("Application Not Found", "Aucune application avec l'identifiant :" + id);
        }
        return application;
    }

    public Application create(Application application){
        return applicationRepository.save(application);
    }

    public Application update(Application application){
        return applicationRepository.save(application); }

    public List<Application> findApplicationByServeurId(Long id){
        List<Application> applicationByServeurId = applicationRepository.findApplicationByServeurId(id);
        return applicationByServeurId;
    }

    public Application addServeursToApplicationById(Long idApplication, Set<Serveur> serveurs){
        return applicationRepository.findById(idApplication)
                .map(application -> {
                    application.setServeurs(serveurs);
                    applicationRepository.save(application);
                    return  application;
                }).orElseThrow(() -> new BadAlertRequest("Ce serveur n'existe plus !"));
    }
    public Application addTagsToApplicationById(Long idApplication, Set<Tags> tags){
        return applicationRepository.findById(idApplication)
                .map(application -> {
                    application.setTags(tags);
                    applicationRepository.save(application);
                    return  application;
                }).orElseThrow(() -> new BadAlertRequest("Ce tags n'existe plus !"));
    }
    public void delete(Long id){
        applicationRepository.findById(id).ifPresentOrElse(application -> {
            List<Serveur> serveurs = serveurRepository.findServeurByApplicationId(application.getId());
            System.out.println("SERVEURS : "+serveurs);
            serveurs.forEach(serveur -> {
                serveur.setComptedacces(null);
                serveurRepository.save(serveur);
                serveurRepository.deleteById(serveur.getId());
        });
        application.setServeurs(null);
        applicationRepository.save(application);
        applicationRepository.deleteById(id);
        },() -> new BadAlertRequest("Cette application n'existe plus !"));
    }

}
