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

    @OneToMany
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
}
