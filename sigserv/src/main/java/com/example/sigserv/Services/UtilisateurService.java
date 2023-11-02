package com.example.sigserv.Services;

import com.example.sigserv.Models.Datacenter;
import com.example.sigserv.Models.Utilisateur;
import com.example.sigserv.Repository.DatacenterRepository;
import com.example.sigserv.Repository.UtilisateurRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class UtilisateurService {

    @Autowired
    UtilisateurRepository utilisateurRepository;

    public List<Utilisateur> getAll() {
        return utilisateurRepository.findAll();
    }

    public Optional<Utilisateur> findOneById(Long id){
        return utilisateurRepository.findById(id);
    }

    public Utilisateur create(Utilisateur utilisateur){
        return utilisateurRepository.save(utilisateur);
    }

    public Utilisateur update(Utilisateur utilisateur){
        return utilisateurRepository.save(utilisateur);
    }

    public void delete(Long id){
        utilisateurRepository.deleteById(id);
    }
}
