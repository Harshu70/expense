import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Transaction } from '../../services/transaction';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Chart, registerables } from 'chart.js';
Chart.register(...registerables);

@Component({
  selector: 'app-dashboard',
  imports: [CommonModule, FormsModule],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css',
  standalone: true,
})
export class Dashboard implements OnInit {

  @ViewChild('myChart') chartCanvas!: ElementRef;
  chart: any;

  stats: any = { income: 0, expense: 0, balance: 0 };
  transactions: any[] = [];
  transactionData = {
    description: '',
    amount: null,
    type: 'Expense',
    category: '',
    date: new Date().toISOString().split('T')[0],
  };

  constructor(private transactionService: Transaction) {}
  ngOnInit(): void {
    this.loadData();
  }

  loadData() {
    this.transactionService.getStats().subscribe((res) => {
      this.stats = res;
      this.updateChart();
    });
    this.transactionService.getAll().subscribe((res) => {
      this.transactions = res;
    });
  }
  updateChart(){
    if(this.chart) this.chart.destroy();
    this.chart = new Chart(this.chartCanvas.nativeElement, {
      type: 'doughnut',
      data: {
        labels: ['Income', 'Expense'],
        datasets: [{
          data: [this.stats.income, this.stats.expense],
          backgroundColor: ['#10B981', '#EF4444'],
          hoverOffset: 4
        }]
      },
      options: {
        responsive: true, 
        plugins: {
          legend: {position: 'bottom'}
        }
      }
    })
  }
  onSubmit() {
    if (!this.transactionData.amount || !this.transactionData.description) {
      alert('Please fill in all the fields!');
      return;
    }
    this.transactionService.addTs(this.transactionData).subscribe({
      next: (res) => {
        this.transactionData = {
          description: '',
          amount: null,
          type: 'EXPENSE',
          category: '',
          date: new Date().toISOString().split('T')[0],
        };
        this.loadData();
      },
      error: (err) => {
        console.error('Error in adding transaction', err);
      },
    });
  }
  deleteTs(id: number) {
    if (confirm('Sach me delete krna chahte ho?')) {
      this.transactionService.deleteTs(id).subscribe(() => {
        this.loadData();
      });
    }
  }
}
