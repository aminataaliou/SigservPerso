package com.example.sigserv.Controllers;


import com.example.sigserv.Models.Serveur;
import com.example.sigserv.Models.Systeme;
import com.example.sigserv.Services.SystemeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Set;

@RestController
@RequestMapping("/api")
public class SystemeController {

    @Autowired
    SystemeService systemeService;

    @GetMapping("/systemes")
    public ResponseEntity<List<Systeme>> getAll(){
        return ResponseEntity.ok(systemeService.getAll());
    }

    @GetMapping("/systemes/{id}")
    public ResponseEntity<Systeme> findOneById(@PathVariable Long id){
        return ResponseEntity.of(systemeService.findOneById(id));
    }

    @PostMapping("/systemes")
    public ResponseEntity<Systeme> create(@RequestBody Systeme systeme){
        System.out.println(systeme);
        return ResponseEntity.ok(systemeService.create(systeme));
    }

    @PutMapping("/systemes")
    public ResponseEntity<Systeme> update(@RequestBody Systeme systeme){
        return ResponseEntity.ok(systemeService.update(systeme));
    }

    @DeleteMapping("/systemes/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id){
        systemeService.delete(id);
        return ResponseEntity.noContent().build();
    }
//    @PostMapping("/systemes/add-serveurs/{id}")
//    public ResponseEntity<Systeme> addServeurToSystemesById(@PathVariable Long id,@RequestBody Set<Serveur> serveurs){
//        return ResponseEntity.ok(systemeService.addServeurToSystemesById(id,serveurs));
//    }
}
