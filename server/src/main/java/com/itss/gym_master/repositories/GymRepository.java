package com.itss.gym_master.repositories;

import com.itss.gym_master.entities.Gym;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface GymRepository
        extends JpaRepository<Gym, Long> {

}
