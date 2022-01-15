/**
 * @param  {T} incoming
 * @param  {T} existing
 * @returns T
 * Updates entity object returning fresh copy of passed in entity
 */
export function updateEntity<T>(incoming: T, existing: T): T {
	const updated: T = existing;

	for (let index = 0; index < Object.getOwnPropertyNames(existing).length; index++) {
		const key = Object.getOwnPropertyNames(existing)[index];
		// check to see if the incoming object has the given property defined
		// this prevents us from overriding existing values if one of the properties is null
		if (incoming[key]) {
			// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
			updated[key] = incoming[key];
		}
	}
	return updated;
}
