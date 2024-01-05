package com.example.sigserv.Controllers;

import com.example.sigserv.Models.AuthRequest;
import com.example.sigserv.Models.Utilisateur;
import com.example.sigserv.Services.JwtService;
import com.example.sigserv.Services.UtilisateurService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api")
public class UtilisateurController {

    @Autowired
    UtilisateurService utilisateurService;
    @Autowired
    private JwtService jwtService;
    @Autowired
    private AuthenticationManager authenticationManager;

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

    @PostMapping("/authenticate")
    public String authenticateAndGetToken(@RequestBody AuthRequest authRequest) {
        Authentication authentication = authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(authRequest.getUsername(), authRequest.getPassword()));

        if (authentication.isAuthenticated()) {
            return jwtService.generateToken(authRequest.getUsername());
        } else {
            throw new UsernameNotFoundException("invalid user request !");
      }
    }

}
