package com.example.sigserv.Models;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.time.Instant;
import java.util.ArrayList;
import java.util.List;

@Entity
public class Emplacement {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String couloir;
    private String etagere;
    private String armoire;
    private Instant createdAt;
    private Instant updatedAt;

    @ManyToOne
    private Datacenter datacenter;

    @OneToMany(fetch = FetchType.EAGER)
    private List<Serveur> serveurs = new ArrayList<>();

    @PrePersist
    public  void onCreate(){
        this.createdAt = Instant.now();
        this.updatedAt = Instant.now();
    }

    @PreUpdate
    public  void onUpdate(){
        this.updatedAt = Instant.now();
    }

    public Emplacement() { }

    public Emplacement(Long id, String couloir, String etagere, String armoire, Instant createdAt, Instant updatedAt, Datacenter datacenter, List<Serveur> serveurs) {
        this.id = id;
        this.couloir = couloir;
        this.etagere = etagere;
        this.armoire = armoire;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
        this.datacenter = datacenter;
        this.serveurs = serveurs;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getCouloir() {
        return couloir;
    }

    public void setCouloir(String couloir) {
        this.couloir = couloir;
    }

    public String getEtagere() {
        return etagere;
    }

    public void setEtagere(String etagere) {
        this.etagere = etagere;
    }

    public String getArmoire() {
        return armoire;
    }

    public void setArmoire(String armoire) {
        this.armoire = armoire;
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

    public Datacenter getDatacenter() {
        return datacenter;
    }

    public void setDatacenter(Datacenter datacenter) {
        this.datacenter = datacenter;
    }

    public List<Serveur> getServeurs() {
        return serveurs;
    }

    public void setServeurs(List<Serveur> serveurs) {
        this.serveurs = serveurs;
    }
}
