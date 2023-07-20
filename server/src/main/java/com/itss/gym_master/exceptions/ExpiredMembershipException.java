package com.itss.gym_master.exceptions;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(HttpStatus.BAD_REQUEST)
public class ExpiredMembershipException extends RuntimeException {
    public ExpiredMembershipException(String message) {
        super(message);
    }

    public ExpiredMembershipException(String message, Throwable cause) {
        super(message, cause);
    }
}
