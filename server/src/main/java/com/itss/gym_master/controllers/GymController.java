package com.itss.gym_master.controllers;

import com.itss.gym_master.entities.Gym;
import com.itss.gym_master.exceptions.EntityNotFoundException;
import com.itss.gym_master.services.GymService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/gyms")
public class GymController {
    public final GymService gymService;

    @Autowired
    public GymController(GymService gymService) {
        this.gymService = gymService;
    }

    @GetMapping()
    ResponseEntity<List<Gym>> all() {
        return ResponseEntity.ok().body(gymService.getAllGyms());
    }

    @PostMapping(consumes = "application/json;charset=UTF-8",
            produces = "application/json;charset=UTF-8")
    ResponseEntity<Gym> newGym(@RequestBody @Valid Gym gym) {
        return new ResponseEntity<>(gymService.newGym(gym), HttpStatus.CREATED);
    }

    @GetMapping("/{id}")
    ResponseEntity<Gym> one(@PathVariable Long id) {
        Gym gym = gymService.getOneGym(id)
                .orElseThrow(() -> new EntityNotFoundException("Could not found gym with id " + id));
        return ResponseEntity.ok().body(gym);
    }

    @PutMapping(value = "/{id}", consumes = "application/json;charset=UTF-8",
            produces = "application/json;charset=UTF-8")
    ResponseEntity<Gym> edit(@RequestBody Gym gym, @PathVariable Long id) {
        return ResponseEntity.ok().body(gymService.editGym(id, gym));
    }

    @DeleteMapping(value = "/{id}")
    ResponseEntity<Gym> remove(@PathVariable Long id) {
        Gym gym = gymService.removeGym(id)
                .orElseThrow(() -> new EntityNotFoundException("Could not found gym with id " + id));
        return ResponseEntity.ok().body(gym);
    }

    @PutMapping(value = "/{gymId}/equipments/{equipmentId}")
    ResponseEntity<Gym> addEquipment(@PathVariable Long gymId, @PathVariable Long equipmentId) {
        return ResponseEntity.ok().body(gymService.addEquipments(gymId, equipmentId));
    }

    @DeleteMapping(value = "/{gymId}/equipments/{equipmentId}")
    ResponseEntity<Gym> removeEquipment(@PathVariable Long gymId, @PathVariable Long equipmentId) {
        return ResponseEntity.ok().body(gymService.removeEquipment(gymId, equipmentId));
    }
}
