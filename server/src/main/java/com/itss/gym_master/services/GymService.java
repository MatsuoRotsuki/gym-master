package com.itss.gym_master.services;

import com.itss.gym_master.entities.Equipment;
import com.itss.gym_master.entities.Gym;
import com.itss.gym_master.exceptions.EntityNotFoundException;
import com.itss.gym_master.repositories.EquipmentRepository;
import com.itss.gym_master.repositories.GymRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class GymService {
    private final GymRepository gymRepository;
    private final EquipmentRepository equipmentRepository;

    @Autowired
    public GymService(GymRepository gymRepository, EquipmentRepository equipmentRepository) {
        this.gymRepository = gymRepository;
        this.equipmentRepository = equipmentRepository;
    }

    public List<Gym> getAllGyms() {
        return gymRepository.findAll();
    }

    public Gym newGym(Gym newGym) {
        return gymRepository.save(newGym);
    }

    public Optional<Gym> getOneGym(Long id) {
        return gymRepository.findById(id);
    }

    public Gym editGym(Long id, Gym newGym) {
        return gymRepository.findById(id).map(gym -> {
            gym.setName(newGym.getName());
            gym.setAddress(newGym.getAddress());
            gym.setEmail(newGym.getEmail());
            gym.setHotline(newGym.getHotline());
            return gymRepository.save(gym);
        }).orElseThrow(() -> new EntityNotFoundException("Could not found gym with id " + id));
    }

    public Optional<Gym> removeGym(Long id) {
        Optional<Gym> gym = gymRepository.findById(id);
        gymRepository.deleteById(id);
        return gym;
    }

    public Gym addEquipments(Long gymId, Long equipmentId) {
        Gym gym = gymRepository.findById(gymId).orElseThrow(
                () -> new EntityNotFoundException("Could not find gym with id " + gymId)
        );
        Equipment e = equipmentRepository.findById(equipmentId).orElseThrow(
            () -> new EntityNotFoundException("Could not found equipment with id " + equipmentId)
        );
        gym.getEquipments().add(e);
        return gymRepository.save(gym);
    }

    public Gym removeEquipment(Long gymId, Long equipmentId) {
        Gym gym = gymRepository.findById(gymId).orElseThrow(
            () -> new EntityNotFoundException("Could not find gym with id " + gymId)
        );

        Equipment e = equipmentRepository.findById(equipmentId).orElseThrow(
            () -> new EntityNotFoundException("Could not found equipment with id " + equipmentId)
        );

        gym.getEquipments().remove(e);
        return gymRepository.save(gym);
    }
}
