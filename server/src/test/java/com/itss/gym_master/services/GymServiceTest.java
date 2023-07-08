package com.itss.gym_master.services;

import com.itss.gym_master.entities.Equipment;
import com.itss.gym_master.entities.Gym;
import com.itss.gym_master.exceptions.EntityNotFoundException;
import com.itss.gym_master.repositories.EquipmentRepository;
import com.itss.gym_master.repositories.GymRepository;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.Mockito;
import org.mockito.MockitoAnnotations;

import java.util.HashSet;
import java.util.Optional;
import java.util.Set;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.when;

class GymServiceTest {
    private GymRepository gymRepository;
    private EquipmentRepository equipmentRepository;
    private GymService gymService;

    @BeforeEach
    void setUp() throws Exception {
        MockitoAnnotations.openMocks(this); // Initialize mocks
        gymRepository = Mockito.mock(GymRepository.class);
        equipmentRepository = Mockito.mock(EquipmentRepository.class);
        gymService = new GymService(gymRepository, equipmentRepository);
    }

    @Test
    void getAllGyms() {
    }

    @Test
    void newGym() {
        Long gymId = 1L;
        Gym gym = new Gym();
        Equipment equipment = new Equipment();
        Set<Equipment> equipments = new HashSet<>();
        equipments.add(equipment);
        gym.setId(gymId);
        gym.setEquipments(equipments);
        when(gymRepository.save(Mockito.any(Gym.class))).thenReturn(gym);
        when(equipmentRepository.save(Mockito.any(Equipment.class))).thenReturn(equipment);
        Gym result = gymService.newGym(gym);
        Assertions.assertEquals(gym, result);
        Assertions.assertEquals(equipments, result.getEquipments());
    }

    @Test
    void getOneGym_Success() {
        Long gymId = 1L;
        Gym expectedGym = new Gym();
        expectedGym.setId(gymId);
        when(gymRepository.findById(gymId)).thenReturn(Optional.of(expectedGym));

        Optional<Gym> result = gymService.getOneGym(gymId);
        assertEquals(expectedGym, result.get());
        // Verify the result
        assertTrue(result.isPresent());
        assertEquals(expectedGym, result.get());
    }

    @Test
    void getOneGym_GymNotFound() {

    }

    @Test
    void editGym() {
        Long gymId = 1L;
        Gym existingGym = new Gym();
        existingGym.setId(1L);
        existingGym.setName("Old Name");
        existingGym.setAddress("Old Address");
        existingGym.setEmail("Old Email");
        existingGym.setHotline("Old Hotline");
        existingGym.setImage("Old Image");


        // create new gym
        Gym newGym = new Gym();
        newGym.setId(gymId);
        newGym.setHotline("0123456789");
        newGym.setName("Room 1");
        newGym.setAddress("Hoang Mai, Ha Noi");
        newGym.setEmail("room@gmail.com");
        newGym.setImage("");

        when(gymRepository.findById(existingGym.getId())).thenReturn(Optional.of(existingGym));
        when(gymRepository.save(existingGym)).thenReturn(existingGym);

        Gym updatedGym = gymService.editGym(gymId, newGym);

        //Assertions.assertEquals(newStaff,updatedStaff);
        Assertions.assertEquals(newGym.getName(), updatedGym.getName());
        Assertions.assertEquals(newGym.getHotline(), updatedGym.getHotline());
        Assertions.assertEquals(newGym.getEmail(), updatedGym.getEmail());
        Assertions.assertEquals(newGym.getImage(), updatedGym.getImage());
        Assertions.assertEquals(newGym.getAddress(), updatedGym.getAddress());
        Assertions.assertEquals(newGym.getEquipments(), updatedGym.getEquipments());

    }

    @Test
    void removeGym_GymExists() {
        Long gymId = 1L;
        Gym gym = new Gym();
        gym.setId(gymId);

        // Mocking behavior of staffRepository.findById
        when(gymRepository.findById(gymId)).thenReturn(Optional.of(gym));
        Optional<Gym> result = gymService.removeGym(gymId);
        // Verify that the result contains the staff object
        assertTrue(result.isPresent());
        assertEquals(gym, result.get());
    }

    @Test
    void removeGym_GymNotExists() {
        Long gymId = 1L;
        when(gymRepository.findById(gymId)).thenReturn(Optional.empty());
        Optional<Gym> result = gymService.removeGym(gymId);
        assertFalse(result.isPresent());
    }

    @Test
    void addEquipments_GymExists() {
        Gym gym = new Gym();
        gym.setId(1L);

        Equipment equipment = new Equipment();
        equipment.setId(1L);

        when(gymRepository.findById(gym.getId())).thenReturn(Optional.of(gym));
        when(equipmentRepository.findById(equipment.getId())).thenReturn(Optional.of(equipment));
        when(gymRepository.save(Mockito.any(Gym.class))).thenReturn(gym);

        Gym updatedGym = gymService.addEquipments(gym.getId(), equipment.getId());

        assertNotNull(updatedGym);
        assertEquals(1, updatedGym.getEquipments().size());
        assertTrue(updatedGym.getEquipments().contains(equipment));
    }

    @Test
    public void addEquipments_GymNotExists() {
        when(gymRepository.findById(Mockito.anyLong())).thenReturn(Optional.empty());
        Equipment equipment = new Equipment();
        equipment.setId(1L);
        assertThrows(EntityNotFoundException.class, () -> {
            gymService.addEquipments(1L, equipment.getId());
        });
    }

    @Test
    public void addEquipments_EquipmentNotExists() {
        when(gymRepository.findById(Mockito.anyLong())).thenReturn(Optional.of(new Gym()));
        when(equipmentRepository.findById(Mockito.anyLong())).thenReturn(Optional.empty());

        assertThrows(EntityNotFoundException.class, () -> {
            gymService.addEquipments(1L, 1L);
        });
    }

    @Test
    void removeEquipment_GymAndEquipmentExists() {
        // Mocking the repositories
        Gym gym = new Gym();
        gym.setId(1L);

        Equipment equipment = new Equipment();
        equipment.setId(1L);

        Set<Equipment> equipments = new HashSet<>();
        equipments.add(equipment);
        gym.setEquipments(equipments);

        when(gymRepository.findById(gym.getId())).thenReturn(Optional.of(gym));
        when(equipmentRepository.findById(equipment.getId())).thenReturn(Optional.of(equipment));
        when(gymRepository.save(Mockito.any(Gym.class))).thenReturn(gym);

        Gym updatedGym = gymService.removeEquipment(gym.getId(), equipment.getId());

        assertNotNull(updatedGym);
        assertEquals(0, updatedGym.getEquipments().size());
        assertFalse(updatedGym.getEquipments().contains(equipment));
    }

    @Test
    public void removeEquipment_GymNotExists() {
        when(gymRepository.findById(Mockito.anyLong())).thenReturn(Optional.empty());

        Equipment equipment = new Equipment();
        equipment.setId(1L);

        assertThrows(EntityNotFoundException.class, () -> {
            gymService.removeEquipment(1L, equipment.getId());
        });
//        verify(gymRepository, times(1)).findById(1L);
//        verifyNoInteractions(equipmentRepository);
//        verifyNoInteractions(gymRepository);
    }

    @Test
    void removeEquipment_EquipmentNotExists() {
        Gym gym = new Gym();
        gym.setId(1L);

        when(equipmentRepository.findById(Mockito.anyLong())).thenReturn(Optional.empty());
        when(gymRepository.findById(Mockito.anyLong())).thenReturn(Optional.of(gym));

        assertThrows(EntityNotFoundException.class, () -> {
            gymService.removeEquipment(gym.getId(), 1L);
        });
    }
}
