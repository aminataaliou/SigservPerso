package com.example.sigserv.Models;

import com.example.sigserv.Models.enums.Etat;
import com.example.sigserv.Models.enums.Type;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonProperty;
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
public class Application {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String nom;
    private String adresseIp;
    private String port;
    private String URL;
    private String dateDeploiement;
    private Instant createdAt;
    private Instant updatedAt;

    @Enumerated(EnumType.STRING)
    private Type type;

    @Enumerated(EnumType.STRING)
    private Etat etat;


    @ManyToMany
    @JoinTable(name="serveurs_applications",
            joinColumns=@JoinColumn(name="application_id"),
            inverseJoinColumns=@JoinColumn(name="serveur_id")
    )
    @JsonIgnoreProperties(value = {"serveurs","applications","tags","comptedacces"},allowSetters = true)
    private Set<Serveur> serveurs = new HashSet<>();



    @ManyToMany
    @JoinTable(name="applications_tags",
            joinColumns=@JoinColumn(name="application_id"),
            inverseJoinColumns=@JoinColumn(name="tags_id")
    )
    @JsonIgnoreProperties(value = {"serveurs","applications","tags","comptedacces"},allowSetters = true)
    private Set<Tags> tags =  new HashSet<>();

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

    public Application(Long id, String nom, String adresseIp, String port, String URL, Instant createdAt, Instant updatedAt, Type type, Etat etat, Set<Serveur> serveurs, Set<Tags> tags) {
        this.id = id;
        this.nom = nom;
        this.adresseIp = adresseIp;
        this.port = port;
        this.URL = URL;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
        this.type = type;
        this.etat = etat;
        this.serveurs = serveurs;
        this.tags = tags;
    }

    public Application() {
    }

    public void setNom(String nom) {
        this.nom = nom;
    }

    public String getAdresseIp() {
        return adresseIp;
    }

    public void setAdresseIp(String adresseIp) {
        this.adresseIp = adresseIp;
    }

    public String getPort() {
        return port;
    }

    public void setPort(String port) {
        this.port = port;
    }

    public String getURL() {
        return URL;
    }

    public void setURL(String URL) {
        this.URL = URL;
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

    public Type getType() {
        return type;
    }

    public void setType(Type type) {
        this.type = type;
    }

    public Etat getEtat() {
        return etat;
    }

    public void setEtat(Etat etat) {
        this.etat = etat;
    }

    public Set <Serveur> getServeurs() {
        return serveurs;
    }

    public void setServeurs(Set<Serveur> serveurs) {
        this.serveurs = serveurs;
    }

    public Set<Tags> getTags() {
        return tags;
    }

    public void setTags(Set<Tags> tags) {
        this.tags = tags;
    }
}
