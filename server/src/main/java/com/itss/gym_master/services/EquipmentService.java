package com.itss.gym_master.services;

import com.itss.gym_master.entities.Equipment;
import com.itss.gym_master.exceptions.EntityNotFoundException;
import com.itss.gym_master.repositories.EquipmentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class EquipmentService {
    private final EquipmentRepository equipmentRepository;

    @Autowired
    public EquipmentService(EquipmentRepository equipmentRepository) {
        this.equipmentRepository = equipmentRepository;
    }

    public List<Equipment> getAllEquipment() {
        return equipmentRepository.findAll();
    }

    public Equipment removeEquipment(Long id) {
        Equipment e = equipmentRepository.findById(id).orElseThrow(
                () -> new EntityNotFoundException("Could not found equipment with id " + id)
        );
        equipmentRepository.deleteById(id);
        return e;
    }

    public Equipment createEquipment(Equipment equipment) {
        return equipmentRepository.save(equipment);
    }

    public Equipment editEquipment(Long id, Equipment equipment) {
        return equipmentRepository.findById(id).map(e -> {
            e.setName(equipment.getName());
            e.setType(equipment.getType());
            e.setManufacturer(equipment.getManufacturer());
            e.setDescription(equipment.getDescription());
            e.setImage(equipment.getImage());
            return equipmentRepository.save(e);
        }).orElseThrow(() -> new EntityNotFoundException("Could not find equipment with id " + id));
    }
}
