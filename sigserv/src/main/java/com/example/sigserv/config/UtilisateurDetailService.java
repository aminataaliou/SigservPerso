package com.example.sigserv.config;

import com.example.sigserv.Models.Utilisateur;
import com.example.sigserv.Repository.UtilisateurRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Component;

import java.util.Optional;

@Component
public class UtilisateurDetailService implements UserDetailsService {

    @Autowired
    private UtilisateurRepository utilisateurRepository;

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {

        Optional<Utilisateur> utilisateur = utilisateurRepository.findByUsername(username);
        if (utilisateur.isPresent()){
            System.out.println("Utilisateur trouvé ---- LOAD USER");
            return  utilisateur.get();
        }else {
            System.out.println("Utilisateur non trouvé ---- LOAD USER");
           throw new UsernameNotFoundException("user not found " + username);
        }
    }
}
