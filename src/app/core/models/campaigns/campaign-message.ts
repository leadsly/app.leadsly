export interface CampaignMessage {
	content: string;
	order?: number;
	delay: {
		value: number;
		unit: string;
	};
}
