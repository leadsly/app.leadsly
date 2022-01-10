import { PasswordRequirement } from '../models/auth/password-requirement.model';
import { PasswordRequirementType } from '../models/auth/password-requirement-type.enum';

/**
 * Gets password requirements for this application.
 * @returns password requirements
 */
export function getPasswordRequirements(): PasswordRequirement[] {
	return [
		{
			name: 'ldsly.auth.form.requirements.title',
			type: PasswordRequirementType.None,
			children: [
				{
					name: 'ldsly.auth.form.requirements.min-chars-long',
					type: PasswordRequirementType.MinCharsLength
				},
				{
					name: 'ldsly.auth.form.requirements.one-upper-case',
					type: PasswordRequirementType.UpperCase
				},
				{
					name: 'ldsly.auth.form.requirements.one-lower-case',
					type: PasswordRequirementType.LowerCase
				},
				{
					name: 'ldsly.auth.form.requirements.digit',
					type: PasswordRequirementType.Digit
				},
				{
					name: 'ldsly.auth.form.requirements.three-unique-chars',
					type: PasswordRequirementType.ThreeUniqueChar
				},
				{
					name: 'ldsly.auth.form.requirements.one-special-char',
					type: PasswordRequirementType.SpecialChar
				}
			]
		}
	] as PasswordRequirement[];
}
