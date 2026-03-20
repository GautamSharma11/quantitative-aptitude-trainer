// src/main/java/com/qat/service/AdditionService.java
package com.me.webapp.javawebapp.service;

import com.me.webapp.javawebapp.model.QuestionDTO;
import com.me.webapp.javawebapp.model.SessionConfigRequest;
import com.me.webapp.javawebapp.model.SessionResponse;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Random;
import java.util.UUID;

@Service
public class AdditionService {

    private final Random random = new Random();

    public SessionResponse generateSession(SessionConfigRequest config) {
        int    count    = config.getQuestionCount();
        int    digits   = config.getDigits();
        String mode     = config.getMode();

        long min = (long) Math.pow(10, digits - 1);  // e.g. digits=2 → 10
        long max = (long) Math.pow(10, digits) - 1;  // e.g. digits=2 → 99
        // For 1-digit allow 1-9 (avoid 0)
        if (digits == 1) min = 1;

        List<QuestionDTO> questions = new ArrayList<>();
        long chainedOperand1 = randomInRange(min, max); // only used in CHAINED mode

        for (int i = 0; i < count; i++) {
            long op1, op2;

            if ("CHAINED".equalsIgnoreCase(mode) && i > 0) {
                op1 = chainedOperand1;  // carry over previous answer
            } else {
                op1 = randomInRange(min, max);
            }

            op2 = randomInRange(min, max);
            long answer = op1 + op2;

            questions.add(new QuestionDTO(i + 1, op1, op2, answer, "+"));

            // The answer becomes op1 of the next question in chained mode
            chainedOperand1 = answer;
        }

        String sessionId = UUID.randomUUID().toString();
        return new SessionResponse(sessionId, questions);
    }

    private long randomInRange(long min, long max) {
        return min + (long) (random.nextDouble() * (max - min + 1));
    }
}