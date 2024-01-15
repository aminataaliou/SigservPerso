package com.example.sigserv.Services;

import com.example.sigserv.Models.Application;
import com.example.sigserv.Models.Datacenter;
import com.example.sigserv.Models.Emplacement;
import com.example.sigserv.Repository.DatacenterRepository;
import com.example.sigserv.Repository.EmplacementRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class EmplacementService {

    @Autowired
    EmplacementRepository emplacementRepository;

    public List<Emplacement> getAll() {
        return emplacementRepository.findAll();
    }

    public Optional<Emplacement> findOneById(Long id){
        return emplacementRepository.findById(id);
    }

    public Emplacement create(Emplacement emplacement){
        return emplacementRepository.save(emplacement);
    }

    public Emplacement update(Emplacement emplacement){
        return emplacementRepository.save(emplacement);
    }

    public List<Emplacement> findEmplacementByDatacenterId(Long id){
//        List<Emplacement> emplacementByDatacenterId = emplacementRepository.findEmplacementByDatacenterId(id);
        return emplacementRepository.findEmplacementByDatacenterId(id);
    }
    public void delete(Long id){
        emplacementRepository.deleteById(id);
    }
}
