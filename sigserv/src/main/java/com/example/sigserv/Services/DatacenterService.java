package com.example.sigserv.Services;


import com.example.sigserv.MessageError.BusinessResourceException;
import com.example.sigserv.Models.Application;
import com.example.sigserv.Models.Datacenter;
import com.example.sigserv.Models.Emplacement;
import com.example.sigserv.Models.Serveur;
import com.example.sigserv.Repository.DatacenterRepository;
import com.example.sigserv.config.BadAlertRequest;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.Set;

@Service
public class DatacenterService {

    @Autowired
    DatacenterRepository datacenterRepository;

    private static final Logger logger = LoggerFactory.getLogger(DatacenterService.class);

   public List<Datacenter> getAll() {
       return datacenterRepository.findAll();
   }

    public Optional<Datacenter> findOneById(Long id) throws BusinessResourceException {
        Optional<Datacenter> datacenter = datacenterRepository.findById(id);
        if (Boolean.FALSE.equals(datacenter.isPresent())){
            throw new BusinessResourceException("Datacenter Not Found", "Aucun datacenter avec l'identifiant :" + id);
        }
        return datacenter;
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

    public void delete(Long id)throws BusinessResourceException{
        try{
            datacenterRepository.deleteById(id);
        }catch(EmptyResultDataAccessException ex){
            logger.error(String.format("Aucun datacenter n'existe avec l'identifiant: "+id, ex));
            throw new BusinessResourceException("DeleteDatacenterError", "Erreur de suppression du datacenter avec l'identifiant: "+id, HttpStatus.NOT_FOUND);
        }//catch(Exception ex){
//            throw new BusinessResourceException("DeleteUserError", "Erreur de suppression du datacenter avec l'identifiant: "+id, HttpStatus.INTERNAL_SERVER_ERROR);
//        }
    }

}
