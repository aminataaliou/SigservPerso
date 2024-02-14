package com.example.sigserv.Services;

import com.example.sigserv.MessageError.BusinessResourceException;
import com.example.sigserv.Models.Utilisateur;
import com.example.sigserv.Repository.UtilisateurRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.http.HttpStatus;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Service
public class UtilisateurService{


    private final UtilisateurRepository utilisateurRepository;
    private static final Logger logger = LoggerFactory.getLogger(UtilisateurService.class);
    private final PasswordEncoder passwordEncoder;

    public UtilisateurService(UtilisateurRepository utilisateurRepository, PasswordEncoder passwordEncoder) {
        this.utilisateurRepository = utilisateurRepository;
        this.passwordEncoder = passwordEncoder;
    }

    public List<Utilisateur> getAll() {
        return utilisateurRepository.findAll();
    }

    public Optional<Utilisateur> findOneById(Long id) throws  BusinessResourceException{
        Optional<Utilisateur> utilisateur = utilisateurRepository.findById(id);
        if (Boolean.FALSE.equals(utilisateur.isPresent())){
            throw new BusinessResourceException("User Not Found", "Aucun utilisateur avec l'identifiant :" + id);
        }
        return utilisateur;
    }

    public Optional<Utilisateur> findOneByUsername(String username) throws BusinessResourceException {
        Optional<Utilisateur> utilisateur = utilisateurRepository.findByUsername(username);
        if (Boolean.FALSE.equals(utilisateur.isPresent())) {
            throw new BusinessResourceException("User Not Found", "L'utilisateur avec cet username n'existe pas :" + username);
        }
        return utilisateur;
    }

    public Utilisateur create(Utilisateur utilisateur){
        utilisateur.setPassword(passwordEncoder.encode(utilisateur.getPassword()));
        return utilisateurRepository.save(utilisateur);
    }

    public Utilisateur update(Utilisateur utilisateur){
        return utilisateurRepository.save(utilisateur);
    }

//    public Optional<Utilisateur> findByUsernameAndPassword(String username, String password) throws BusinessResourceException{
//        try {
//            Optional<Utilisateur> userFound = this.findOneByUsername(username);
//            if(passwordEncoder.matches(password, userFound.get().getPassword())) {
//                return userFound;
//            } else {
//                throw new BusinessResourceException("UserNotFound", "Mot de passe incorrect", HttpStatus.NOT_FOUND);
//            }
//        } catch (BusinessResourceException ex) {
//            logger.error("Login ou mot de passe incorrect", ex);
//            throw new BusinessResourceException("UserNotFound", "Login ou mot de passe incorrect", HttpStatus.NOT_FOUND);
//        }catch (Exception ex) {
//            logger.error("Une erreur technique est survenue", ex);
//            throw new BusinessResourceException("TechnicalError", "Une erreur technique est survenue", HttpStatus.INTERNAL_SERVER_ERROR);
//        }
//    }

    @Transactional(readOnly=false)
    public void delete(Long id) throws BusinessResourceException{
        try{
            utilisateurRepository.deleteById(id);
        }catch(EmptyResultDataAccessException ex){
            logger.error(String.format("Aucun utilisateur n'existe avec l'identifiant: "+id, ex));
            throw new BusinessResourceException("DeleteUserError", "Erreur de suppression de l'utilisateur avec l'identifiant: "+id, HttpStatus.NOT_FOUND);
         }//catch(Exception ex){
//            throw new BusinessResourceException("DeleteUserError", "Erreur de suppression de l'utilisateur avec l'identifiant: "+id, HttpStatus.INTERNAL_SERVER_ERROR);
//        }
    }

}
