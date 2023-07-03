package com.itss.gym_master.controllers;

import com.itss.gym_master.entities.Payment;
import com.itss.gym_master.exceptions.EntityNotFoundException;
import com.itss.gym_master.services.PaymentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("api/v1/payments")
public class PaymentController {
    private final PaymentService paymentService;

    @Autowired
    public PaymentController(PaymentService paymentService) {
        this.paymentService = paymentService;
    }

    @GetMapping()
    public ResponseEntity<List<Payment>> all() {
        return ResponseEntity.ok().body(paymentService.getAllPayments());
    }

    @GetMapping("/{id}")
    public ResponseEntity<Payment> one(@PathVariable Long id) {
        Payment payment = paymentService.getOnePayment(id)
                .orElseThrow(() -> new EntityNotFoundException("Could not found payment with id " + id));
        return ResponseEntity.ok().body(payment);
    }
}
