import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { SharedModule } from 'app/shared/shared.module';
import { AssistantAccountInformationComponent } from './assistant-account-information/assistant-account-information.component';
import { ConnectedAccountComponent } from './connected-account/connected-account.component';
import { CreateVirtualAssistantComponent } from './create-virtual-assistant/create-virtual-assistant.component';
import { LinkAccountComponent } from './link-account/link-account.component';
import { LinkedAccountOverviewComponent } from './linked-account-overview/linked-account-overview.component';
import { ProfileRoutingModule } from './profile-routing.module';
import { ProfileSandboxService } from './profile-sandbox.service';
import { ProfileComponent } from './profile/profile.component';
import { VirtualAssistantOverviewComponent } from './virtual-assistant-overview/virtual-assistant-overview.component';
import { VirtualAssistantComponent } from './virtual-assistant/virtual-assistant.component';

/**
 * @description User profile module.
 */
@NgModule({
	declarations: [
		ProfileComponent,
		CreateVirtualAssistantComponent,
		ConnectedAccountComponent,
		AssistantAccountInformationComponent,
		VirtualAssistantComponent,
		VirtualAssistantOverviewComponent,
		LinkAccountComponent,
		LinkedAccountOverviewComponent
	],
	providers: [ProfileSandboxService],
	imports: [CommonModule, SharedModule, ProfileRoutingModule]
})
export class ProfileModule {}
