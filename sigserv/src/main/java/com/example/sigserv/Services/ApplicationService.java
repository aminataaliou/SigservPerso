package com.example.sigserv.Services;

import com.example.sigserv.Models.Application;
import com.example.sigserv.Models.Datacenter;
import com.example.sigserv.Models.Serveur;
import com.example.sigserv.Repository.ApplicationRepository;
import com.example.sigserv.Repository.DatacenterRepository;
import com.example.sigserv.config.BadAlertRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.Set;

@Service
public class ApplicationService {

    @Autowired
    ApplicationRepository applicationRepository;


    public List<Application> getAll() {
        return applicationRepository.findAll();
    }

    public Optional<Application> findOneById(Long id){
        return applicationRepository.findById(id);
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
    public void delete(Long id){
        applicationRepository.deleteById(id);
    }
}
