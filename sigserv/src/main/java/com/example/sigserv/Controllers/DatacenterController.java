package com.example.sigserv.Controllers;
import com.example.sigserv.Models.Datacenter;
import com.example.sigserv.Models.Emplacement;
import com.example.sigserv.Services.DatacenterService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Set;

@RestController
@RequestMapping("/api")
public class DatacenterController {

    @Autowired
    DatacenterService datacenterService;

    @GetMapping("/data-centers")
    public ResponseEntity<List<Datacenter>> getAll(){
        return ResponseEntity.ok(datacenterService.getAll());
    }

    @GetMapping("/data-centers/{id}")
    public ResponseEntity<Datacenter> findOneById(@PathVariable Long id){
        return ResponseEntity.of(datacenterService.findOneById(id));
    }

    @PostMapping("/data-centers")
    public ResponseEntity<Datacenter> create(@RequestBody Datacenter datacenter){
        System.out.println(datacenter);
        return ResponseEntity.ok(datacenterService.create(datacenter));
    }

    @PostMapping("/data-centers/add-emplacement/{id}")
    public ResponseEntity<Datacenter> addEmplacementsToDatacenterById(@PathVariable Long id, @RequestBody Set<Emplacement> emplacements){
        return ResponseEntity.ok(datacenterService.addEmplacementsToDatacenterById(id,emplacements));
    }

    @PutMapping("/data-centers")
    public ResponseEntity<Datacenter> update(@RequestBody Datacenter datacenter){
        return ResponseEntity.ok(datacenterService.update(datacenter));
    }

    @DeleteMapping("/data-centers/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id){
        datacenterService.delete(id);
        return ResponseEntity.noContent().build();
    }
}
