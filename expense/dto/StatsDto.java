package com.example.expense.dto;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class StatsDto {
    private Double income;
    private Double expense;
    private Double balance;
}
