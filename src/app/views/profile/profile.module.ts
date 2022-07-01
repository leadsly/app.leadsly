import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { SharedModule } from 'app/shared/shared.module';
import { AssistantAccountInformationComponent } from './assistant-account-information/assistant-account-information.component';
import { ConnectedAccountComponent } from './connected-account/connected-account.component';
import { ProfileRoutingModule } from './profile-routing.module';
import { ProfileSandboxService } from './profile-sandbox.service';
import { ProfileComponent } from './profile/profile.component';
import { VirtualAssistantComponent } from './virtual-assistant/virtual-assistant.component';

/**
 * @description User profile module.
 */
@NgModule({
	declarations: [ProfileComponent, ConnectedAccountComponent, AssistantAccountInformationComponent, VirtualAssistantComponent],
	providers: [ProfileSandboxService],
	imports: [CommonModule, SharedModule, ProfileRoutingModule]
})
export class ProfileModule {}
