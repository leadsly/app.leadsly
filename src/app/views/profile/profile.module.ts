import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { SharedModule } from 'app/shared/shared.module';
import { ConnectedAccountComponent } from './connected-account/connected-account.component';
import { DisconnectedAccountComponent } from './disconnected-account/disconnected-account.component';
import { LinkAccountSetupComponent } from './link-account-setup/link-account-setup.component';
import { LinkedAccountComponent } from './linked-account/linked-account.component';
import { ProfileRoutingModule } from './profile-routing.module';
import { ProfileSandboxService } from './profile-sandbox.service';
import { ProfileComponent } from './profile/profile.component';
import { SetupAccountComponent } from './setup-account/setup-account.component';
import { VirtualAssistantSetupComponent } from './virtual-assistant-setup/virtual-assistant-setup.component';

/**
 * @description User profile module.
 */
@NgModule({
	declarations: [
		ProfileComponent,
		LinkedAccountComponent,
		DisconnectedAccountComponent,
		ConnectedAccountComponent,
		SetupAccountComponent,
		VirtualAssistantSetupComponent,
		LinkAccountSetupComponent
	],
	providers: [ProfileSandboxService],
	imports: [CommonModule, SharedModule, ProfileRoutingModule]
})
export class ProfileModule {}
