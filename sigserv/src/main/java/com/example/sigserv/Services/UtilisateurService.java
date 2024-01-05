package com.example.sigserv.Services;

import com.example.sigserv.Models.Utilisateur;
import com.example.sigserv.Repository.UtilisateurRepository;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class UtilisateurService{


    private final UtilisateurRepository utilisateurRepository;

    private final PasswordEncoder passwordEncoder;

    public UtilisateurService(UtilisateurRepository utilisateurRepository, PasswordEncoder passwordEncoder) {
        this.utilisateurRepository = utilisateurRepository;
        this.passwordEncoder = passwordEncoder;
    }

    public List<Utilisateur> getAll() {
        return utilisateurRepository.findAll();
    }

    public Optional<Utilisateur> findOneById(Long id){
        return utilisateurRepository.findById(id);
    }

    public Optional<Utilisateur> findOneByUsername(String username){
        return utilisateurRepository.findByUsername(username);
    }

    public Utilisateur create(Utilisateur utilisateur){
        utilisateur.setPassword(passwordEncoder.encode(utilisateur.getPassword()));
        return utilisateurRepository.save(utilisateur);
    }

    public Utilisateur update(Utilisateur utilisateur){
        return utilisateurRepository.save(utilisateur);
    }

    public void delete(Long id){
        utilisateurRepository.deleteById(id);
    }

}
