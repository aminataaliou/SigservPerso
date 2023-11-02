package com.example.sigserv.Services;

import com.example.sigserv.Models.Comptedacces;
import com.example.sigserv.Models.Datacenter;
import com.example.sigserv.Models.Serveur;
import com.example.sigserv.Repository.ComptedaccesRepository;
import com.example.sigserv.Repository.DatacenterRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ComptedaccesService {

    @Autowired
    ComptedaccesRepository comptedaccesRepository;

    public List<Comptedacces> getAll() {
        return comptedaccesRepository.findAll();
    }

    public Optional<Comptedacces> findOneById(Long id){
        return comptedaccesRepository.findById(id);
    }

    public List<Comptedacces> findComptedaccesByServeurId(Long id){ return comptedaccesRepository.findComptedaccesByServeurId(id);}

    public Comptedacces create(Comptedacces comptedacces){
        return comptedaccesRepository.save(comptedacces);
    }

    public Comptedacces update(Comptedacces comptedacces){
        return comptedaccesRepository.save(comptedacces);
    }

    public void delete(Long id){
        comptedaccesRepository.deleteById(id);
    }



}
