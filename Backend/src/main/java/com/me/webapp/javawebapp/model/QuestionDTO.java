// src/main/java/com/qat/model/QuestionDTO.java
package com.me.webapp.javawebapp.model;

public class QuestionDTO {
    private int    id;
    private long   operand1;
    private long   operand2;
    private long   answer;
    private String operator;

    public QuestionDTO(int id, long operand1, long operand2, long answer, String operator) {
        this.id       = id;
        this.operand1 = operand1;
        this.operand2 = operand2;
        this.answer   = answer;
        this.operator = operator;
    }

    public int    getId()       { return id; }
    public long   getOperand1() { return operand1; }
    public long   getOperand2() { return operand2; }
    public long   getAnswer()   { return answer; }
    public String getOperator() { return operator; }
}