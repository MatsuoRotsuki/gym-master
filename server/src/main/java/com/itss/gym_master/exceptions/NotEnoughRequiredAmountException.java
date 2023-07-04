package com.itss.gym_master.exceptions;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(HttpStatus.BAD_REQUEST)
public class NotEnoughRequiredAmountException extends RuntimeException {
    public NotEnoughRequiredAmountException(String message) {
        super(message);
    }

    public NotEnoughRequiredAmountException(String message, Throwable cause) {
        super(message, cause);
    }
}
