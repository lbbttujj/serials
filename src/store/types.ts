export type SerialCard = {
	_id: string
	title: string
	description: string
	years: string
	rating: string
	country: string
	series: number
	tags: string[]
	image: string
	userId: string
}

export type User = {
	_id: string
	username: string
	password: string
	favorite?: string[]
	watched?: string[]
}

export type Authorize = {
	accessToken: string
	refreshToken: string
	user: {
		username: string
		id: string
		isActivated: boolean
	}
}
