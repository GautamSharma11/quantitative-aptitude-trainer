// src/main/java/com/qat/model/SessionConfigRequest.java
package com.me.webapp.javawebapp.model;

public class SessionConfigRequest {
    private int questionCount;
    private int digits;
    private String mode; // "RANDOM" or "CHAINED"

    public int getQuestionCount() { return questionCount; }
    public void setQuestionCount(int questionCount) { this.questionCount = questionCount; }

    public int getDigits() { return digits; }
    public void setDigits(int digits) { this.digits = digits; }

    public String getMode() { return mode; }
    public void setMode(String mode) { this.mode = mode; }
}