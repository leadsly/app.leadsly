/**
 * Campaign.
 */
export interface Campaign {
	id: string;
	active: boolean;
	name: string;
	connectionsSentDaily: number;
	connectionsAccepted: number;
	totalConnectionsSent: number;
	expired: boolean;
	replies: number;
	profileViews: number;
	notes: string;
}
