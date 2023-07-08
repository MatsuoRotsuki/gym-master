package com.itss.gym_master.services;

import com.itss.gym_master.entities.*;
import com.itss.gym_master.exceptions.EntityNotFoundException;
import com.itss.gym_master.repositories.EquipmentRepository;
import com.itss.gym_master.repositories.GymRepository;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.Mockito;
import org.mockito.MockitoAnnotations;

import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.when;

class EquipmentServiceTest {

    private EquipmentRepository equipmentRepository;
    private EquipmentService equipmentService;
    private GymService gymService;
    @BeforeEach
    void setUp() throws Exception {
        MockitoAnnotations.openMocks(this); // Initialize mocks
        equipmentRepository = Mockito.mock(EquipmentRepository.class);
        equipmentService = new EquipmentService(equipmentRepository);
    }

    @Test
    void getAllEquipment() {
    }

    @Test
    void removeEquipment_EquipmentExists() {
        Long equipmentId = 1L;
        Equipment equipment = new Equipment();

        // Mocking behavior of staffRepository.findById
        when(equipmentRepository.findById(equipmentId)).thenReturn(Optional.of(equipment));
        Optional<Equipment> result = Optional.ofNullable(equipmentService.removeEquipment(equipmentId));
        // Verify that the result contains the staff object
        assertTrue(result.isPresent());
        assertEquals(equipment, result.get());
    }

    @Test
    void removeEquipment_EquipmentNotExists() {
        Long equipmentId = 2L;
        when(equipmentRepository.findById(equipmentId)).thenReturn(Optional.empty());

        Assertions.assertThrows(EntityNotFoundException.class, () -> {
            equipmentService.removeEquipment(equipmentId);
        });
//        Optional<Equipment> emptyResult = equipmentService.removeEquipment();
//        assertFalse(emptyResult.isPresent());
    }

    @Test
    void createEquipment() {
        Equipment equipment = new Equipment();

        // Mock the behavior of the userRepository.save() and staffRepository.save() methods
        when(equipmentRepository.save(Mockito.any(Equipment.class))).thenReturn(equipment);
        // Call the newStaff() function
        Equipment result = equipmentService.createEquipment(equipment);
        // Verify the behavior and assertions
        Mockito.verify(equipmentRepository).save(equipment);

        Assertions.assertEquals(equipment, result);
    }

    @Test
    void editEquipment_EquimentExist() {
        Equipment existingEquipment = new Equipment();
        existingEquipment.setId(1L);
        existingEquipment.setName("Old Name");
        existingEquipment.setType("Old Type");
        existingEquipment.setManufacturer("Old Manufacturer");
        existingEquipment.setDescription("Old Description");
        existingEquipment.setImage("Old Image");

        when(equipmentRepository.findById(existingEquipment.getId())).thenReturn(Optional.of(existingEquipment));
        when(equipmentRepository.save(Mockito.any(Equipment.class))).thenReturn(existingEquipment);

        Equipment newEquipment = new Equipment();
        newEquipment.setName("New Name");
        newEquipment.setType("New Type");
        newEquipment.setManufacturer("New Manufacturer");
        newEquipment.setDescription("New Description");
        newEquipment.setImage("New Image");

        Equipment editedEquipment = equipmentService.editEquipment(existingEquipment.getId(), newEquipment);

        assertNotNull(editedEquipment);
        assertEquals(existingEquipment.getId(), editedEquipment.getId());
        assertEquals(newEquipment.getName(), editedEquipment.getName());
        assertEquals(newEquipment.getType(), editedEquipment.getType());
        assertEquals(newEquipment.getManufacturer(), editedEquipment.getManufacturer());
        assertEquals(newEquipment.getDescription(), editedEquipment.getDescription());
        assertEquals(newEquipment.getImage(), editedEquipment.getImage());

//        // Verify that the repository methods were called with the expected parameters
//        verify(equipmentRepository, times(1)).findById(existingEquipment.getId());
//        verify(equipmentRepository, times(1)).save(any(Equipment.class));
    }

    @Test
    public void testEditEquipment_EquipmentNotFound() {
        Long equipmentId = 1L;
        // Creating a new Equipment object
        Equipment newEquipment = new Equipment();
        newEquipment.setName("New Name");
        newEquipment.setType("New Type");
        newEquipment.setManufacturer("New Manufacturer");
        newEquipment.setDescription("New Description");
        newEquipment.setImage("New Image");

        // Mocking the repository to return an empty Optional
        when(equipmentRepository.findById(equipmentId)).thenReturn(Optional.empty());

        // Calling the editEquipment() method and expecting an EntityNotFoundException
        assertThrows(EntityNotFoundException.class, () -> {
            equipmentService.editEquipment(1L, newEquipment);
        });

    }
}