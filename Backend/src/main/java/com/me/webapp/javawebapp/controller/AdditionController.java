// src/main/java/com/qat/controller/AdditionController.java
package com.me.webapp.javawebapp.controller;

import com.me.webapp.javawebapp.model.SessionConfigRequest;
import com.me.webapp.javawebapp.model.SessionResponse;
import com.me.webapp.javawebapp.service.AdditionService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/addition")
public class AdditionController {

    private final AdditionService additionService;

    public AdditionController(AdditionService additionService) {
        this.additionService = additionService;
    }

    /**
     * POST /api/addition/generate
     * Body: { questionCount, digits, mode }
     * Returns: { sessionId, questions: [{id, operand1, operand2, answer, operator}] }
     */
    @PostMapping("/generate")
    public ResponseEntity<SessionResponse> generateSession(
            @RequestBody SessionConfigRequest config) {

        SessionResponse response = additionService.generateSession(config);
        return ResponseEntity.ok(response);
    }
}