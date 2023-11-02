package com.example.sigserv.Services;

import com.example.sigserv.Models.Datacenter;
import com.example.sigserv.Models.Serveur;
import com.example.sigserv.Models.Systeme;
import com.example.sigserv.Repository.DatacenterRepository;
import com.example.sigserv.Repository.SystemeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class SystemeService {

    @Autowired
    SystemeRepository systemeRepository;

    public List<Systeme> getAll() {
        return systemeRepository.findAll();
    }

    public Optional<Systeme> findOneById(Long id){
        return systemeRepository.findById(id);
    }

    public Systeme create(Systeme systeme){
        return systemeRepository.save(systeme);
    }


    public Systeme update(Systeme systeme){
        return systemeRepository.save(systeme);
    }

    public void delete(Long id){
        systemeRepository.deleteById(id);
    }
}
