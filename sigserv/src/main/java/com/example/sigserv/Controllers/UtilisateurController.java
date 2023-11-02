package com.example.sigserv.Controllers;

import com.example.sigserv.Models.Utilisateur;
import com.example.sigserv.Services.UtilisateurService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api")
public class UtilisateurController {

    @Autowired
    UtilisateurService utilisateurService;

    @GetMapping("/utilisateurs")
    public ResponseEntity<List<Utilisateur>> getAll(){
        return ResponseEntity.ok(utilisateurService.getAll());
    }

    @GetMapping("/utilisateurs/{id}")
    public ResponseEntity<Utilisateur> findOneById(@PathVariable Long id){
        return ResponseEntity.of(utilisateurService.findOneById(id));
    }

    @PostMapping("/utilisateurs")
    public ResponseEntity<Utilisateur> create(@RequestBody Utilisateur utilisateur){
        System.out.println(utilisateur);
        return ResponseEntity.ok(utilisateurService.create(utilisateur));
    }

    @PutMapping("/utilisateurs")
    public ResponseEntity<Utilisateur> update(@RequestBody Utilisateur utilisateur){
        return ResponseEntity.ok(utilisateurService.update(utilisateur));
    }

    @DeleteMapping("/utilisateurs/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id){
        utilisateurService.delete(id);
        return ResponseEntity.noContent().build();
    }

}
