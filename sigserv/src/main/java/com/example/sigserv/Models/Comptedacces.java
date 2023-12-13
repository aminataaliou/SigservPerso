package com.example.sigserv.Models;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.time.Instant;
import java.util.ArrayList;
import java.util.List;

@Entity
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
            inverseJoinColumns=@JoinColumn(name="serveur_id"))
    @JsonIgnoreProperties(value = {"serveurs","applications","tags","comptedacces"},allowSetters = true)
    private List<Serveur> serveurs = new ArrayList<>();

    private Instant createdAt;

    private Instant updatedAt;


    public Comptedacces(Long id, String nom, String type, String password, List<Serveur> serveurs, Instant createdAt, Instant updatedAt) {
        this.id = id;
        this.nom = nom;
        this.type = type;
        this.password = password;
        this.serveurs = serveurs;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
    }

    public Comptedacces() {
    }

    @PrePersist
    public  void onCreate(){
        this.createdAt = Instant.now();
        this.updatedAt = Instant.now();
    }

    @PreUpdate
    public  void onUpdate(){
        this.updatedAt = Instant.now();
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

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public List<Serveur> getServeurs() {
        return serveurs;
    }

    public void setServeurs(List<Serveur> serveurs) {
        this.serveurs = serveurs;
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
