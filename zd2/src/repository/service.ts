import PouchDB from 'pouchdb-react-native';
import { initInspiringPersons } from '../consts/initData';
import InspiringPerson from '../model/InspiringPerson';

const db = new PouchDB('localDB');

interface Params {
	id: string;
	rev: string;
}

interface IService {
	getAllInspiringPersons: () => Promise<InspiringPerson[]>;
	setInitData: () => Promise<boolean>;
	deleteInspiringPerson: (id: string, rev: string) => Promise<boolean>;
	modifyPerson: (inspiringPerson: InspiringPerson) => Promise<Params>;
}

export const service: IService = {
	getAllInspiringPersons: async () => {
		const res = await db.allDocs();
		return res.rows.map((item: any) => InspiringPerson.fromJSON(item.doc));
	},

	setInitData: async () => {
		await db.bulkDocs(initInspiringPersons.map(InspiringPerson.toJSON));
		return true;
	},

	deleteInspiringPerson: async (id: string, rev: string) => {
		await db.remove(id, rev);
		return true;
	},

	modifyPerson: async (inspiringPerson: InspiringPerson) => {
		const res = (await inspiringPerson._id)
			? db.put(InspiringPerson.toJSON(inspiringPerson))
			: db.post(InspiringPerson.toJSON(inspiringPerson));
		return res;
	},
};
