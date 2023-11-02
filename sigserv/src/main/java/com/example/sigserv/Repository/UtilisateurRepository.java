package com.example.sigserv.Repository;

import com.example.sigserv.Models.Utilisateur;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UtilisateurRepository extends JpaRepository<Utilisateur,Long> {
}
