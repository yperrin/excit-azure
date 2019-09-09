import { Component, Input, ChangeDetectionStrategy, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { PluginNodeModel } from '../../models/plugin-node.model';
import { BaristaService } from '../../services/barista.services';
import { trigger, state, transition, style, animate } from '@angular/animations';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-plugin-list',
  templateUrl: './plugin-list.component.html',
  styleUrls: ['./plugin-list.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({ height: '0px', minHeight: '0', display: 'none' })),
      state('expanded', style({ height: '*' })),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ]
})
export class PluginListComponent implements OnDestroy {
  @Input() pluginList: PluginNodeModel[];
  private subscription: Subscription;

  constructor(private baristaService: BaristaService, private changeDetectorRef: ChangeDetectorRef) { }

  getPluginInfo(plugin: PluginNodeModel): void {
    if ((plugin.config != null) || (plugin.info != null)) {
      plugin.showDetails = !plugin.showDetails;
    } else {
      this.subscription = this.baristaService.retrievePluginDetails$(plugin)
        .subscribe(pluginValue => {
          pluginValue.showDetails = true;
          this.changeDetectorRef.detectChanges();
        });
    }
  }

  getMonitorUrl(plugin: string | PluginNodeModel) {
    return this.baristaService.getMonitorUrl(plugin);
  }

  switchPluginStatus(plugin: PluginNodeModel) {
    this.baristaService.switchPluginStatus(plugin);
  }

  triggerSchedule(scheduleName: string) {
    if (scheduleName) {
      this.baristaService.triggerSchedule(scheduleName);
    }
  }
  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
