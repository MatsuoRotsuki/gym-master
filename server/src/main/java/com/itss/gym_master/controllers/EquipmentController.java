package com.itss.gym_master.controllers;

import com.itss.gym_master.entities.Equipment;
import com.itss.gym_master.services.EquipmentService;

import jakarta.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/equipments")
public class EquipmentController {
    private final EquipmentService equipmentService;

    @Autowired
    public EquipmentController(EquipmentService equipmentService) {
        this.equipmentService = equipmentService;
    }

    @PostMapping(consumes = "application/json;charset=UTF-8",
            produces = "application/json;charset=UTF-8")
    ResponseEntity<Equipment> create(@RequestBody @Valid Equipment equipment) {
        return new ResponseEntity<Equipment>(equipmentService.createEquipment(equipment), HttpStatus.CREATED);
    }

    @GetMapping
    ResponseEntity<List<Equipment>> all() {
        return ResponseEntity.ok().body(equipmentService.getAllEquipment());
    }

    @DeleteMapping("/{id}")
    ResponseEntity<Equipment> delete(@PathVariable Long id) {
        return ResponseEntity.ok().body(equipmentService.removeEquipment(id));
    }

    @PutMapping("/{id}")
    ResponseEntity<Equipment> edit(@PathVariable Long id, @RequestBody Equipment equipment) {
        return ResponseEntity.ok().body(equipmentService.editEquipment(id, equipment));
    }
}
