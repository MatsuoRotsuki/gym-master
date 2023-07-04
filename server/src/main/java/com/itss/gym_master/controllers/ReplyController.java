package com.itss.gym_master.controllers;

import com.itss.gym_master.entities.Reply;
import com.itss.gym_master.services.ReplyService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/replies")
public class ReplyController {
    private final ReplyService replyService;

    @Autowired
    public ReplyController(ReplyService replyService) {
        this.replyService = replyService;
    }

    @GetMapping
    public ResponseEntity<List<Reply>> allReplies() {
        return ResponseEntity.ok().body(replyService.getAll());
    }

    @DeleteMapping(value = "/{id}")
    public ResponseEntity<Reply> delete(@PathVariable Long id) {
        return ResponseEntity.ok().body(replyService.deleteReply(id));
    }
}
