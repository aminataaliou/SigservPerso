package com.example.sigserv.Repository;
import com.example.sigserv.Models.Tags;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface TagsRepository extends JpaRepository<Tags,Long> {

@Query(value=("select  tags.* from tags tags inner join applications_tags at on tags.id = at.tags_id inner join application app on at.application_id = app.id where app.id= :idApplication"),nativeQuery=true)
    List<Tags> findTagsByApplicationId(Long idApplication);

@Query(value=("select  tags.* from tags tags inner join serveur_tags st on tags.id = st.tags_id inner join serveur s on st.serveur_id = s.id where s.id= :idServeur"),nativeQuery=true)
    List<Tags> findTagsByServeurId(Long idServeur);
}
