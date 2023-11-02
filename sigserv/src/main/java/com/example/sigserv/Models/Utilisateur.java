package com.example.sigserv.Models;

import com.example.sigserv.Models.enums.Etat;
import com.example.sigserv.Models.enums.Profil;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.time.Instant;
import java.util.ArrayList;
import java.util.List;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
public class Utilisateur {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String nom;
    private String prenom;
    private String email;

    @Enumerated(EnumType.STRING)
    private Etat etat;

    @Enumerated(EnumType.STRING)
    private Profil profil;

    private Instant createdAt;

    private Instant updatedAt;



    @PrePersist
    public  void onCreate(){
        this.createdAt = Instant.now();
        this.updatedAt = Instant.now();
    }

    @PreUpdate
    public  void onUpdate(){
        this.updatedAt = Instant.now();
    }



}
