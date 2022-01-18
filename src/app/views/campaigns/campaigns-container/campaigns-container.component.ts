import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { LogService } from 'app/core/logger/log.service';
import { CampaignsSandboxService } from '../campaigns-sandbox.service';

@Component({
	selector: 'ldsly-campaigns-container',
	templateUrl: './campaigns-container.component.html',
	styleUrls: ['./campaigns-container.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class CampaignsContainerComponent implements OnInit {
	constructor(private _route: ActivatedRoute, private _log: LogService, private _sb: CampaignsSandboxService) {}

	ngOnInit(): void {}

	_onCreateCampaignClicked(): void {
		void this._sb.router.navigate(['create'], { relativeTo: this._route.parent });
	}
}
