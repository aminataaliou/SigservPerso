package com.example.sigserv.Models;

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
public class Comptedacces {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String nom;
    private String type;
    private String password;

    @ManyToMany
    @JoinTable(name="serveurs_comptedacces",
            joinColumns=@JoinColumn(name="comptedacces_id"),
            inverseJoinColumns=@JoinColumn(name="serveur_id")
    )    private List<Serveur> serveurs = new ArrayList<>();

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
