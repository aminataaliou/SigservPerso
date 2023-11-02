package com.example.sigserv.Controllers;


import com.example.sigserv.Models.Emplacement;
import com.example.sigserv.Models.Tags;
import com.example.sigserv.Services.EmplacementService;
import com.example.sigserv.Services.TagsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api")
public class TagsController {

    @Autowired
    TagsService tagsService;

    @GetMapping("/tags")
    public ResponseEntity<List<Tags>> getAll(){
        return ResponseEntity.ok(tagsService.getAll());
    }

    @GetMapping("/tags/{id}")
    public ResponseEntity<Tags> findOneById(@PathVariable Long id){
        return ResponseEntity.of(tagsService.findOneById(id));
    }

    @PostMapping("/tags")
    public ResponseEntity<Tags> create(@RequestBody Tags tags){
        System.out.println(tags);
        return ResponseEntity.ok(tagsService.create(tags));
    }

    @PutMapping("/tags")
    public ResponseEntity<Tags> update(@RequestBody Tags tags){
        return ResponseEntity.ok(tagsService.update(tags));
    }

    @DeleteMapping("/tags/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id){
        tagsService.delete(id);
        return ResponseEntity.noContent().build();
    }
}
