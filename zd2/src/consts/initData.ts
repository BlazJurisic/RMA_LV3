import dayjs from 'dayjs';
import InspiringPerson from '../model/InspiringPerson';
import { billGatesUri, steveJobsUri } from './imgUri';

export const initInspiringPersons: InspiringPerson[] = [
	new InspiringPerson(
		'1',
		'',
		billGatesUri,
		[
			'Don’t compare yourself with anyone in this world…if you do so, you are insulting yourself.',
			'I choose a lazy person to do a hard job. Because a lazy person will find an easy way to do it.',
			'Success is a lousy teacher. It seduces smart people into thinking they can’t lose',
			'If you are born poor it’s not your mistake, but if you die poor it’s your mistake.',
			'Life is not fair get, used to it!',
		],
		'William Henry Gates III is an American business magnate, software developer, investor, author, landowner and philanthropist. He is a co-founder of Microsoft Corporation.',
		dayjs('1955-11-28')
	),
	new InspiringPerson(
		'2',
		'',
		steveJobsUri,
		[
			'Don’t let the noise of others’ opinions drown out your own inner voice.',
			'Being the richest man in the cemetery doesn’t matter to me. Going to bed at night saying we’ve done something wonderful… that’s what matters to me.',
			'Creativity is just connecting things.',
			'Have the courage to follow your heart and intuition. They somehow already know what you truly want to become. Everything else is secondary.',
		],
		'Steven Paul Jobs, known as Steve Jobs, was an American business magnate, industrial designer, investor, and media proprietor. He was the chairman, the chief executive officer (CEO), and a co-founder of Apple Inc.',
		dayjs('1955-02-24'),
		dayjs('2011-10-05')
	),
];
