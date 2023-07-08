package com.itss.gym_master.exceptions;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(HttpStatus.UNAUTHORIZED)
public class UserIsBannedException extends RuntimeException {
    public UserIsBannedException(String message) {
        super(message);
    }

    public UserIsBannedException(String message, Throwable cause) {
        super(message, cause);
    }
}
