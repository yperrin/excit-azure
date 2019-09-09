import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { BaseDetailComponent } from '../base-detail.component';
import { DirectConnectService } from '../../services/direct-connect.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, Validators } from '@angular/forms';
import { tap } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { OrderStatusOutputModel } from '../../models/output/orderStatus/order-status-ouput.model';

@Component({
  selector: 'app-order-status',
  templateUrl: './order-status.component.html',
  styleUrls: ['./order-status.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class OrderStatusComponent extends BaseDetailComponent implements OnInit {
  orderStatusOutput$: Observable<OrderStatusOutputModel>;
  orderStatusForm = this.fb.group({
    supplierId: [0],
    accountNumber: [''],
    username: ['', Validators.required],
    password: ['', Validators.required],
    poNumber: ['', Validators.required]
  });

  constructor(
    protected directConnectService: DirectConnectService,
    protected route: ActivatedRoute,
    protected router: Router,
    private fb: FormBuilder) {
    super(directConnectService, route, router);
  }

  ngOnInit() {
    super.ngOnInit();
    this.supplierConfig$ = this.supplierConfig$.pipe(
      tap(config => {
        this.orderStatusForm.get('supplierId').setValue(config.id);
        this.orderStatusForm.get('accountNumber').setValue('');
        this.orderStatusForm.get('username').setValue('');
        this.orderStatusForm.get('password').setValue('');
        this.orderStatusForm.get('poNumber').setValue('');
        this.orderStatusOutput$ = null;
      })
    )
  }

  reset(): void {
    this.orderStatusOutput$ = null;
  }

  getStatus(): void {
    if (this.orderStatusForm.valid && this.orderStatusForm.get('supplierId').value > 0) {
      this.reset();
      this.orderStatusOutput$ =
        this.directConnectService.getOrderStatus$(
          this.orderStatusForm.get('supplierId').value,
          this.orderStatusForm.get('poNumber').value,
          this.orderStatusForm.get('username').value,
          this.orderStatusForm.get('password').value,
          this.orderStatusForm.get('accountNumber').value);
    }
  }
}
