package com.example.sigserv.Repository;
import com.example.sigserv.Models.Tags;
import org.springframework.data.jpa.repository.JpaRepository;

public interface TagsRepository extends JpaRepository<Tags,Long> {
}
