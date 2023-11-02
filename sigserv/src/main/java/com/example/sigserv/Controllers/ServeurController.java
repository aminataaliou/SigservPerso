package com.example.sigserv.Controllers;


import com.example.sigserv.Models.Application;
import com.example.sigserv.Models.Serveur;
import com.example.sigserv.Models.Systeme;
import com.example.sigserv.Services.ServeurService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Set;

@RestController
@RequestMapping("/api")
public class ServeurController {

    @Autowired
    ServeurService serveurService;

    @GetMapping("/serveurs")
    public ResponseEntity<List<Serveur>> getAll(){
        return ResponseEntity.ok(serveurService.getAll());
    }

    @GetMapping("/serveurs/{id}")
    public ResponseEntity<Serveur> findOneById(@PathVariable Long id){
        return ResponseEntity.of(serveurService.findOneById(id));
    }

    @GetMapping("/serveurs/serveurs-application/{id}")
    public ResponseEntity<List<Serveur>> findServeurByApplicationId(@PathVariable Long id){
        return ResponseEntity.ok(serveurService.findServeurByApplicationId(id));
    }

    @GetMapping("/serveurs/serveurs-systeme/{id}")
    public ResponseEntity<List<Serveur>> findServeurBySystemeId(@PathVariable Long id){
        return ResponseEntity.ok(serveurService.findServeurBySystemeId(id));
    }

    @GetMapping("/serveurs/serveurs-serveur-virtuel/{id}")
    public ResponseEntity<List<Serveur>> findServeurVirtuelByServeurId(@PathVariable Long id){
        return ResponseEntity.ok(serveurService.findServeurVirtuelByServeurId(id));
    }

    @GetMapping("/serveurs/serveurs-compte-acces/{id}")
    public ResponseEntity<List<Serveur>> findServeurByComptedaccesId(@PathVariable Long id){
        return ResponseEntity.ok(serveurService.findServeurByComptedaccesId(id));
    }

    @PostMapping("/serveurs")
    public ResponseEntity<Serveur> create(@RequestBody Serveur serveur){
        System.out.println(serveur);
        return ResponseEntity.ok(serveurService.create(serveur));
    }

    @PostMapping("/serveurs/add-application/{id}")
    public ResponseEntity<Serveur> addApplicationsToServerById(@PathVariable Long id,@RequestBody Set<Application> applications){
        return ResponseEntity.ok(serveurService.addApplicationsToServerById(id,applications));
    }

    @PostMapping("/serveurs/add-serveurs/{id}")
    public ResponseEntity<Serveur> addServeursToServerById(@PathVariable Long id,@RequestBody List<Serveur> serveurs){
        return ResponseEntity.ok(serveurService.addServeursToServerById(id,serveurs));
    }


    @PutMapping("/serveurs/{id}")
    public ResponseEntity<Serveur> update(@PathVariable Long id,@RequestBody Serveur serveur){
        return ResponseEntity.ok(serveurService.update(serveur));
    }

    @DeleteMapping("/serveurs/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id){
        serveurService.delete(id);
        return ResponseEntity.noContent().build();
    }
}
