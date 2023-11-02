package com.example.sigserv.Controllers;


import com.example.sigserv.Models.Application;
import com.example.sigserv.Models.Serveur;
import com.example.sigserv.Services.ApplicationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Set;

@RestController
@RequestMapping("/api")
public class ApplicationController {

    @Autowired
    ApplicationService applicationService;

    @GetMapping("/applications")
    public ResponseEntity<List<Application>> getAll(){
        return ResponseEntity.ok(applicationService.getAll());
    }


    @GetMapping("/applications/{id}")
    public ResponseEntity<Application> findOneById(@PathVariable Long id){
        return ResponseEntity.of(applicationService.findOneById(id));
    }

    @GetMapping("/applications/applications-serveur/{id}")
    public ResponseEntity<List<Application>> findApplicationByServeurId(@PathVariable Long id){
        return ResponseEntity.ok(applicationService.findApplicationByServeurId(id));
    }

    @PostMapping("/applications")
    public ResponseEntity<Application> create(@RequestBody Application application){
        System.out.println(application);
        return ResponseEntity.ok(applicationService.create(application));
    }

    @PostMapping("/applications/add-serveur/{id}")
    public ResponseEntity<Application> addServeursToApplicationById(@PathVariable Long id,@RequestBody Set<Serveur> serveurs){
        return ResponseEntity.ok(applicationService.addServeursToApplicationById(id,serveurs));
    }

    @PutMapping("/applications")
    public ResponseEntity<Application> update(@RequestBody Application application){
        return ResponseEntity.ok(applicationService.update(application));
    }

    @DeleteMapping("/applications/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id){
        applicationService.delete(id);
        return ResponseEntity.noContent().build();
    }

}
