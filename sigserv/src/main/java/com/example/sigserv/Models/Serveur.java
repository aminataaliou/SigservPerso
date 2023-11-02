package com.example.sigserv.Models;
import com.example.sigserv.Models.enums.Etat;
import com.example.sigserv.Models.enums.Type;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
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
public class Serveur {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String nom;
    private String adresseip;

    @ManyToOne
    private Emplacement emplacement;

    @Enumerated(EnumType.STRING)
    private Type type;

    @ManyToOne
    private Systeme systeme ;

    @Enumerated(EnumType.STRING)
    private Etat etat;

    @ManyToMany
    @JoinTable(
            name="serveurs_comptedacces",
            joinColumns=@JoinColumn(name="serveur_id"),
            inverseJoinColumns=@JoinColumn(name="comptedacces_id"))
    private List<Comptedacces> comptedacces = new ArrayList<>();

    @OneToMany
    private List<Tags> tags = new ArrayList<>();

    @OneToMany
    private List<Serveur> serveurs = new ArrayList<>();

    @ManyToMany(cascade = CascadeType.ALL)
    @JoinTable(
            name="serveurs_applications",
            joinColumns=@JoinColumn(name="serveur_id"),
            inverseJoinColumns=@JoinColumn(name="application_id"))
    @JsonIgnoreProperties(value = {"serveurs","applications","tags","comptedacces"},allowSetters = true)
    private Set<Application> applications = new HashSet<>();

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

    public Serveur(Long id, String nom, String adresseip, Emplacement emplacement, Type type, Systeme systeme, Etat etat, List<Comptedacces> comptedacces, List<Tags> tags, List<Serveur> serveurs, Set<Application> applications, Instant createdAt, Instant updatedAt) {
        this.id = id;
        this.nom = nom;
        this.adresseip = adresseip;
        this.emplacement = emplacement;
        this.type = type;
        this.systeme = systeme;
        this.etat = etat;
        this.comptedacces = comptedacces;
        this.tags = tags;
        this.serveurs = serveurs;
        this.applications = applications;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
    }

    public Serveur() {
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

    public String getAdresseip() {
        return adresseip;
    }

    public void setAdresseip(String adresseip) {
        this.adresseip = adresseip;
    }

    public Emplacement getEmplacement() {
        return emplacement;
    }

    public void setEmplacement(Emplacement emplacement) {
        this.emplacement = emplacement;
    }

    public Type getType() {
        return type;
    }

    public void setType(Type type) {
        this.type = type;
    }

    public Systeme getSysteme() {
        return systeme;
    }

    public void setSysteme(Systeme systeme) {
        this.systeme = systeme;
    }

    public Etat getEtat() {
        return etat;
    }

    public void setEtat(Etat etat) {
        this.etat = etat;
    }

    public List<Comptedacces> getComptedacces() {
        return comptedacces;
    }

    public void setComptedacces(List<Comptedacces> comptedacces) {
        this.comptedacces = comptedacces;
    }

    public List<Tags> getTags() {
        return tags;
    }

    public void setTags(List<Tags> tags) {
        this.tags = tags;
    }

    public List<Serveur> getServeurs() {
        return serveurs;
    }

    public void setServeurs(List<Serveur> serveurs) {
        this.serveurs = serveurs;
    }

    public Set<Application> getApplications() {
        return applications;
    }

    public void setApplications(Set<Application> applications) {
        this.applications = applications;
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
