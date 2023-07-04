package com.itss.gym_master.exceptions;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(HttpStatus.BAD_REQUEST)
public class AlreadyRegisteredMembershipException extends RuntimeException {
    public AlreadyRegisteredMembershipException(String message) {
        super(message);
    }

    public AlreadyRegisteredMembershipException(String message, Throwable cause) {
        super(message, cause);
    }
}
