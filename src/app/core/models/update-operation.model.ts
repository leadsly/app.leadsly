/**
 * @description Update operation.
 */
export interface UpdateOperation {
	/**
	 * @description Update operation type.
	 */
	op: 'add' | 'remove' | 'replace' | 'move' | 'copy' | 'test';

	/**
	 * @description Property path.
	 */
	path: string;

	/**
	 * @description value of the property
	 */
	value?: unknown;
}
