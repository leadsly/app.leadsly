import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthContainerComponent } from './auth-container/auth-container.component';
import { ChangeEmailTokenContainerComponent } from './change-email-token-container/change-email-token-container.component';
import { EmailConfirmationContainerComponent } from './email-confirmation-container/email-confirmation-container.component';
import { ForgotPasswordContainerComponent } from './forgot-password-container/forgot-password-container.component';
import { RedeemRecoveryCodeComponent } from './redeem-recovery-code/redeem-recovery-code.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { SignInContainerComponent } from './sign-in-container/sign-in-container.component';
import { SignUpContainerComponent } from './sign-up-container/sign-up-container.component';
import { TwoStepVerificationComponent } from './two-step-verification/two-step-verification.component';

const routes: Routes = [
	{
		path: '',
		component: AuthContainerComponent,
		children: [
			{
				path: ':id/email-change-confirmation',
				component: ChangeEmailTokenContainerComponent
			},
			{
				path: 'sign-in',
				component: SignInContainerComponent
			},
			{
				path: 'sign-up',
				component: SignUpContainerComponent
			},
			{
				path: 'forgot-password',
				component: ForgotPasswordContainerComponent
			},
			{
				path: 'reset-password',
				component: ResetPasswordComponent
			},
			{
				path: 'two-step-verification',
				component: TwoStepVerificationComponent
			},
			{
				path: 'redeem-recovery-code',
				component: RedeemRecoveryCodeComponent
			},
			{
				path: 'email-confirmation',
				component: EmailConfirmationContainerComponent
			},
			{
				path: '**',
				redirectTo: 'sign-in'
			}
		]
	}
];

/**
 * Auth routing module.
 */
@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule]
})
export class AuthRoutingModule {}
