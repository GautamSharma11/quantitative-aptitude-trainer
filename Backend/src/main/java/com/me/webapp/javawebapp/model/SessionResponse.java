// src/main/java/com/qat/model/SessionResponse.java
package com.me.webapp.javawebapp.model;

import java.util.List;

public class SessionResponse {
    private String            sessionId;
    private List<QuestionDTO> questions;

    public SessionResponse(String sessionId, List<QuestionDTO> questions) {
        this.sessionId = sessionId;
        this.questions = questions;
    }

    public String            getSessionId() { return sessionId; }
    public List<QuestionDTO> getQuestions() { return questions; }
}