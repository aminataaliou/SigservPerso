package com.example.sigserv.Services;

import com.example.sigserv.MessageError.BusinessResourceException;
import com.example.sigserv.Models.Application;
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

    public Optional<Tags> findOneById(Long id)throws BusinessResourceException {
        Optional<Tags> tags = tagsRepository.findById(id);
        if (Boolean.FALSE.equals(tags.isPresent())){
            throw new BusinessResourceException("Tags Not Found", "Aucune tags avec l'identifiant :" + id);
        }
        return tags;
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
