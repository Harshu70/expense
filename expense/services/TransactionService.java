package com.example.expense.services;

import com.example.expense.dto.StatsDto;
import com.example.expense.dto.TransactionDto;
import com.example.expense.entities.Transaction;
import com.example.expense.entities.TransactionType;
import com.example.expense.entities.User;
import com.example.expense.repo.TransactionRepo;
import com.example.expense.repo.UserRepo;
import jakarta.persistence.EntityNotFoundException;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class TransactionService {
    @Autowired
    private TransactionRepo transactionRepo;

    @Autowired
    private UserRepo userRepo;

    @Autowired
    private ModelMapper modelMapper;

    public TransactionDto createTransaction(TransactionDto dto, String username){
        User user = userRepo.findByUsername(username).orElseThrow(()-> new EntityNotFoundException("ye na hai"));
        Transaction transaction = modelMapper.map(dto, Transaction.class);
        transaction.setUser(user);
        Transaction saved = transactionRepo.save(transaction);
        return modelMapper.map(transaction, TransactionDto.class);
    }
    public List<TransactionDto> getTransactions(String username){
        User user = userRepo.findByUsername(username).orElseThrow(()->new EntityNotFoundException("ye na hai"));
        return transactionRepo.findByUserIdOrderByDateDesc(user.getId())
                .stream()
                .map(ts-> modelMapper.map(ts, TransactionDto.class))
                .collect(Collectors.toList());
    }
    public void deleteTransaction(Long id){
        transactionRepo.deleteById(id);
    }
    public StatsDto getStats(String username){
        User user = userRepo.findByUsername(username).orElseThrow(()-> new EntityNotFoundException("ye na hai babu"));
        List<Transaction> transactions = transactionRepo.findByUserIdOrderByDateDesc(user.getId());

        double income = transactions.stream()
                .filter(t-> t.getType()== TransactionType.INCOME)
                .mapToDouble(Transaction::getAmount).sum();
        double expense = transactions.stream()
                .filter(ts->ts.getType() == TransactionType.EXPENSE)
                .mapToDouble(Transaction::getAmount).sum();

        return new StatsDto(income, expense,income-expense);
    }
}
