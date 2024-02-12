package com.example.sigserv.Models;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.time.Instant;
import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

@Entity
public class Systeme {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String nom;
    private String version;
    private String distribution;
    private Instant createdAt;
    private Instant updatedAt;

//    @OneToMany
//    private Set<Serveur> serveurs = new HashSet<>();


    @PrePersist
    public  void onCreate(){
        this.createdAt = Instant.now();
        this.updatedAt = Instant.now();
    }

    @PreUpdate
    public  void onUpdate(){
        this.updatedAt = Instant.now();
    }

    public Systeme() { }

    public Systeme(Long id, String nom, String version, String distribution, Instant createdAt, Instant updatedAt, Set<Serveur> serveurs) {
        this.id = id;
        this.nom = nom;
        this.version = version;
        this.distribution = distribution;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
//        this.serveurs = serveurs;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getNom() {
        return nom;
    }

    public void setNom(String nom) {
        this.nom = nom;
    }

    public String getVersion() {
        return version;
    }

    public void setVersion(String version) {
        this.version = version;
    }

    public String getDistribution() {
        return distribution;
    }

    public void setDistribution(String distribution) {
        this.distribution = distribution;
    }

    public Instant getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(Instant createdAt) {
        this.createdAt = createdAt;
    }

    public Instant getUpdatedAt() {
        return updatedAt;
    }

    public void setUpdatedAt(Instant updatedAt) {
        this.updatedAt = updatedAt;
    }
//
//    public Set<Serveur> getServeurs() {
//        return serveurs;
//    }
//
//    public void setServeurs(Set<Serveur> serveurs) {
//        this.serveurs = serveurs;
//    }
}
