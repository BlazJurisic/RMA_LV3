import dayjs, { Dayjs } from 'dayjs';

class InspiringPerson {
	_id: string;
	_rev: string;
	image: string;
	quotes: string[];
	description: string;
	dateOfBirth: Dayjs;
	dateOfDeath?: Dayjs;

	constructor(
		_id: string,
		_rev: string,
		image: string,
		quotes: string[],
		description: string,
		dateOfBirth: Dayjs,
		dateOfDeath?: Dayjs
	) {
		(this._id = _id), (this._rev = _rev), (this.quotes = quotes);
		this.description = description;
		this.dateOfBirth = dateOfBirth;
		this.dateOfDeath = dateOfDeath;
		this.image = image;
	}

	static fromString(person: string): InspiringPerson {
		const personObject = JSON.parse(person);
		return this.fromJSON(personObject);
	}

	public static fromJSON(maybe: any): InspiringPerson {
		if (!maybe) throw Error('must be object');
		if (typeof maybe._id !== 'string') throw Error('_id must be string');
		if (typeof maybe._rev !== 'string') throw Error('_rev must be string');
		if (typeof maybe.image !== 'string') throw Error('image must be string');
		if (!Array.isArray(maybe.qoutes) || maybe.qoutes.some((qoute: any) => typeof qoute !== 'string'))
			throw Error('qoutes must array of strings');
		if (typeof maybe.description !== 'string') throw Error('description must be string');
		const dateOfBirth = dayjs(maybe.date_of_birth);
		if (!dateOfBirth.isValid()) throw Error('date_of_birth must be valid date');
		let dateOfDeath = undefined;
		if (maybe.date_of_death) {
			dateOfDeath = dayjs(maybe.date_of_death);
			if (!dateOfDeath.isValid()) throw Error('date_of_death must be valid date');
		}

		return new InspiringPerson(
			maybe._id,
			maybe._rev,
			maybe.image,
			maybe.qoutes,
			maybe.description,
			dateOfBirth,
			dateOfDeath
		);
	}

	public static toJSON(inspiringPerson: InspiringPerson) {
		return {
			_id: inspiringPerson._id,
			_rev: inspiringPerson._rev,
			image: inspiringPerson.image,
			qoutes: inspiringPerson.quotes,
			description: inspiringPerson.description,
			date_of_birth: inspiringPerson.dateOfBirth.toISOString(),
			date_of_death: inspiringPerson.dateOfDeath?.toISOString(),
		};
	}
}

export default InspiringPerson;
