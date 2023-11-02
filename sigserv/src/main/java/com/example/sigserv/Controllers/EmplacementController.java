package com.example.sigserv.Controllers;


import com.example.sigserv.Models.Application;
import com.example.sigserv.Models.Emplacement;
import com.example.sigserv.Services.EmplacementService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api")
public class EmplacementController {
    @Autowired
    EmplacementService emplacementService;

    @GetMapping("/emplacements")
    public ResponseEntity<List<Emplacement>> getAll(){
        return ResponseEntity.ok(emplacementService.getAll());
    }

    @GetMapping("/emplacements/{id}")
    public ResponseEntity<Emplacement> findOneById(@PathVariable Long id){
        return ResponseEntity.of(emplacementService.findOneById(id));
    }

    @GetMapping("/emplacements/emplacements-data-center/{id}")
    public ResponseEntity<List<Emplacement>> findEmplacementByDatacenterId(@PathVariable Long id){
        return ResponseEntity.ok(emplacementService.findEmplacementByDatacenterId(id));
    }

    @PostMapping("/emplacements")
    public ResponseEntity<Emplacement> create(@RequestBody Emplacement emplacement){
        System.out.println(emplacement);
        return ResponseEntity.ok(emplacementService.create(emplacement));
    }

    @PutMapping("/emplacements")
    public ResponseEntity<Emplacement> update(@RequestBody Emplacement emplacement){
        return ResponseEntity.ok(emplacementService.update(emplacement));
    }

    @DeleteMapping("/emplacements/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id){
        emplacementService.delete(id);
        return ResponseEntity.noContent().build();
    }
}
