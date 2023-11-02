package com.example.sigserv.Controllers;

import com.example.sigserv.Models.Comptedacces;
import com.example.sigserv.Models.Serveur;
import com.example.sigserv.Services.ComptedaccesService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api")
public class ComptedaccesController {
    @Autowired
    ComptedaccesService comptedaccesService;

    @GetMapping("/compte-acces")
    public ResponseEntity<List<Comptedacces>> getAll(){
        return ResponseEntity.ok(comptedaccesService.getAll());
    }

    @GetMapping("/compte-acces/{id}")
    public ResponseEntity<Comptedacces> findOneById(@PathVariable Long id){
        return ResponseEntity.of(comptedaccesService.findOneById(id));
    }

    @GetMapping("/compte-acces/compte-acces-serveurs/{id}")
    public ResponseEntity<List<Comptedacces>> findComptedaccesByServeurId(@PathVariable Long id){
        System.out.println("compte dacces serveurs");
        System.out.println(id);

        return ResponseEntity.ok(comptedaccesService.findComptedaccesByServeurId(id));
    }

    @PostMapping("/compte-acces")
    public ResponseEntity<Comptedacces> create(@RequestBody Comptedacces comptedacces){
        System.out.println(comptedacces);
        return ResponseEntity.ok(comptedaccesService.create(comptedacces));
    }

    @PutMapping("/compte-acces")
    public ResponseEntity<Comptedacces> update(@RequestBody Comptedacces comptedacces){
        return ResponseEntity.ok(comptedaccesService.update(comptedacces));
    }

    @DeleteMapping("/compte-acces/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id){
        comptedaccesService.delete(id);
        return ResponseEntity.noContent().build();
    }
}
