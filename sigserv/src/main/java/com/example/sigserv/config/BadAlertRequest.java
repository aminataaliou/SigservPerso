package com.example.sigserv.config;

import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.lang.Nullable;
import org.springframework.web.client.HttpClientErrorException;

import java.nio.charset.Charset;

public class BadAlertRequest  extends RuntimeException {

    public BadAlertRequest(String message) {
        super(message);
    }
}
