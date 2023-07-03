package com.itss.gym_master.services;

import com.itss.gym_master.entities.Reply;
import com.itss.gym_master.exceptions.EntityNotFoundException;
import com.itss.gym_master.repositories.ReplyRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ReplyService {
    private final ReplyRepository replyRepository;

    @Autowired
    public ReplyService(ReplyRepository replyRepository) {
        this.replyRepository = replyRepository;
    }

    public Reply deleteReply(Long id) {
        Reply reply = replyRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Could not find reply with id: " + id));
        replyRepository.deleteById(id);
        return reply;
    }

    public List<Reply> getAll() {
        return replyRepository.findAll();
    }
}
