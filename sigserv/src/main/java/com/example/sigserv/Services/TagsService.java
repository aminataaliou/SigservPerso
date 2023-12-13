package com.example.sigserv.Services;

import com.example.sigserv.Models.Datacenter;
import com.example.sigserv.Models.Serveur;
import com.example.sigserv.Models.Tags;
import com.example.sigserv.Repository.DatacenterRepository;
import com.example.sigserv.Repository.TagsRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class TagsService {

    @Autowired
    TagsRepository tagsRepository;

    public List<Tags> getAll() {
        return tagsRepository.findAll();
    }

    public Optional<Tags> findOneById(Long id){
        return tagsRepository.findById(id);
    }

    public List<Tags> findTagsByApplicationId(Long id){
        return tagsRepository.findTagsByApplicationId(id);
    }

    public List<Tags> findTagsByServeurId(Long id){
        return tagsRepository.findTagsByServeurId(id);
    }

    public Tags create(Tags tags){
        return tagsRepository.save(tags);
    }

    public Tags update(Tags tags){
        return tagsRepository.save(tags);
    }

    public void delete(Long id){
        tagsRepository.deleteById(id);
    }
}
