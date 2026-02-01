package com.example.expense.controller;

import com.example.expense.dto.StatsDto;
import com.example.expense.dto.TransactionDto;
import com.example.expense.services.TransactionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;
import java.util.List;

@RestController
@RequestMapping("/api/transactions")
@CrossOrigin(origins = "*")
public class TransactionController {
    @Autowired
    private TransactionService transactionService;

    @PostMapping
    public ResponseEntity<TransactionDto> addTransaction(@RequestBody TransactionDto dto, Principal principal){
        return ResponseEntity.ok(transactionService.createTransaction(dto, principal.getName()));
    }
    @GetMapping
    public ResponseEntity<List<TransactionDto>> getAllTransactions(Principal principal){
        return ResponseEntity.ok(transactionService.getTransactions(principal.getName()));
    }
    @GetMapping("/stats")
    public ResponseEntity<StatsDto> getStats(Principal principal){
        return  ResponseEntity.ok(transactionService.getStats(principal.getName()));
    }
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteTransaction(@PathVariable Long id){
        transactionService.deleteTransaction(id);
        return ResponseEntity.ok().build();
    }
}
