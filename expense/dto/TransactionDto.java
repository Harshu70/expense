package com.example.expense.dto;

import com.example.expense.entities.TransactionType;
import lombok.Data;

import java.time.LocalDate;

@Data
public class TransactionDto {
    private Long id;
    private Double amount;
    private String description;
    private LocalDate date;
    private TransactionType type;
    private String category;
}
