import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { BaristaService } from '../services/barista.services';

@Component({
  selector: 'app-barista',
  templateUrl: './barista.component.html',
  styleUrls: ['./barista.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BaristaComponent implements OnInit {
  pluginList$ = this.baristaService.pluginList$;

  constructor(private baristaService: BaristaService) {}

  ngOnInit(): void {
    this.baristaService.init();
  }
}
