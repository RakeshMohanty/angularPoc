export interface MenuItem {
	name: string;
	active?: boolean;
	url: string;
	icon: string;
	permissions?: string[];
}