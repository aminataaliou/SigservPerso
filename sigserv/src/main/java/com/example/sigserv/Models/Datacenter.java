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

public class  Datacenter {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String nom;
    private String ville;
    private String quartier;
    private String pays;

    @OneToMany
    private Set<Emplacement> emplacements= new HashSet<>();;

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

    public Datacenter(Long id, String nom, String ville, String quartier, String pays, Set<Emplacement> emplacements, Instant createdAt, Instant updatedAt) {
        this.id = id;
        this.nom = nom;
        this.ville = ville;
        this.quartier = quartier;
        this.pays = pays;
        this.emplacements = emplacements;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
    }

    public Datacenter() {
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

    public String getVille() {
        return ville;
    }

    public void setVille(String ville) {
        this.ville = ville;
    }

    public String getQuartier() {
        return quartier;
    }

    public void setQuartier(String quartier) {
        this.quartier = quartier;
    }

    public String getPays() {
        return pays;
    }

    public void setPays(String pays) {
        this.pays = pays;
    }

    public Set<Emplacement> getEmplacements() {
        return emplacements;
    }

    public void setEmplacements(Set<Emplacement> emplacements) {
        this.emplacements = emplacements;
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
}
