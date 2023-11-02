package com.example.sigserv.Services;


import com.example.sigserv.Models.Application;
import com.example.sigserv.Models.Datacenter;
import com.example.sigserv.Models.Emplacement;
import com.example.sigserv.Models.Serveur;
import com.example.sigserv.Repository.DatacenterRepository;
import com.example.sigserv.config.BadAlertRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.Set;

@Service
public class DatacenterService {

    @Autowired
    DatacenterRepository datacenterRepository;

   public List<Datacenter> getAll() {
       return datacenterRepository.findAll();
   }

    public Optional<Datacenter> findOneById(Long id){
        return datacenterRepository.findById(id);
    }

    public Datacenter create(Datacenter datacenter){
        return datacenterRepository.save(datacenter);
    }

    public Datacenter addEmplacementsToDatacenterById(Long idEmplacement, Set<Emplacement> emplacements){
        return datacenterRepository.findById(idEmplacement)
                .map(datacenter -> {
                    datacenter.setEmplacements(emplacements);
                    datacenterRepository.save(datacenter);
                    return  datacenter;
                }).orElseThrow(() -> new BadAlertRequest("Cet emplacement n'existe plus !"));
    }

    public Datacenter update(Datacenter datacenter){
        return datacenterRepository.save(datacenter);
    }

    public void delete(Long id){
        datacenterRepository.deleteById(id);
    }

}
