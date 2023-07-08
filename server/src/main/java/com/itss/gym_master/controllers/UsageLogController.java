package com.itss.gym_master.controllers;

import com.itss.gym_master.entities.UsageLog;
import com.itss.gym_master.exceptions.EntityNotFoundException;
import com.itss.gym_master.services.UsageLogService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("api/v1/usage-logs")
public class UsageLogController {
    private final UsageLogService usageLogService;

    @Autowired
    public UsageLogController(UsageLogService usageLogService) {
        this.usageLogService = usageLogService;
    }

    @GetMapping()
    public ResponseEntity<List<UsageLog>> all() {
        return ResponseEntity.ok().body(usageLogService.getAllUsageLogs());
    }

    @GetMapping("/{id}")
    public ResponseEntity<UsageLog> one(@PathVariable Long id) {
        UsageLog usageLog = usageLogService.getOneUsageLog(id)
                .orElseThrow(() -> new EntityNotFoundException("Could not found usage log with id " + id));
        return ResponseEntity.ok().body(usageLog);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<UsageLog> remove(@PathVariable Long id) {
        return ResponseEntity.ok().body(usageLogService.removeUsageLog(id));
    }
}
