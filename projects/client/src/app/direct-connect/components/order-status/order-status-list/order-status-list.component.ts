import { Component, OnInit, Input, ChangeDetectionStrategy } from '@angular/core';
import { OrderStatusOutputModel } from 'src/app/direct-connect/models/output/orderStatus/order-status-ouput.model';

@Component({
  selector: 'app-order-status-list',
  templateUrl: './order-status-list.component.html',
  styleUrls: ['./order-status-list.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class OrderStatusListComponent {
  @Input() orderStatusOutput: OrderStatusOutputModel;

  constructor() { }

}
