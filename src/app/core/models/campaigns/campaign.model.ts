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
	replies: number;
	profileViews: number;
	notes: string;
}
