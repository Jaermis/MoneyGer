import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { Title } from '@angular/platform-browser';
import { Router, RouterLink } from '@angular/router';
import { InventoryService } from '../../../../shared/inventory.service';
import { ValidationError } from '../../../../interfaces/validation-error';
import { InventoryRequest } from '../../../../interfaces/inventory-request';
import { InventoryCreate } from '../../../../interfaces/inventory-create';
import { HttpErrorResponse } from '@angular/common/http';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-add-item',
  templateUrl: './add-item.component.html',
  styleUrl: './add-item.component.css',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, RouterLink,CommonModule]
})
export class AddItemComponent implements OnInit{
  @Output() addItem = new EventEmitter<void>();
  addItemForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private titleService: Title,
    private inventoryService: InventoryService,
    public router: Router,
    public dialogRef: MatDialogRef<AddItemComponent>
  ){}

  ngOnInit(): void {
    this.titleService.setTitle('Add Contact');
    this.addItemForm = this.fb.group({
      product: ['', Validators.required],
      quantity: [0],
      price:[0]
    });
  }

  newProduct: InventoryCreate = {
    product: '',
    quantity: 0,
    price: 0
  };
  errors: ValidationError[] = [];

  addProduct() {
    if (this.addItemForm.valid) {
      this.newProduct = { ...this.newProduct, ...this.addItemForm.value };
      this.inventoryService.createProduct(this.newProduct).subscribe({
        next: (response) => {
          console.log(this.newProduct);
        },
        error: (err: HttpErrorResponse) => {
          console.log(err.message);
        },
        complete: () => {this.dialogRef.close(),
          this.addItem.emit()}
      });
    } else {
      this.addItemForm.markAllAsTouched();
    }
  }

  closeDialog(){
    this.dialogRef.close();
  }
}
