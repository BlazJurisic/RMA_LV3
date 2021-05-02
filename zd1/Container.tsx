import AsyncStorage from '@react-native-async-storage/async-storage';
import React from 'react';
import Screen from './Screen';

export interface ITracker {
	numberOfBirds: number;
	color: string;
}

const initTracker: ITracker = {
	numberOfBirds: 0,
	color: '#FFF',
};

export const BUTTON_CONSTS = {
	red: { label: 'Red', color: 'red' },
	blue: { label: 'Blue', color: 'blue' },
	green: { label: 'Green', color: 'green' },
	yellow: { label: 'Yellow', color: 'yellow' },
};

const CACHE_KEY = 'CACHE_KEY';

function Container() {
	const [tracker, setTracker] = React.useState<ITracker>();

	React.useEffect(() => {
		AsyncStorage.getItem(CACHE_KEY)
			.then((res) => {
				if (res) setTracker(JSON.parse(res));
				else setTracker(initTracker);
			})
			.catch(() => {
				console.error('Failed to read CACHE');
			});
	}, []);

	React.useEffect(() => {
		if (tracker)
			AsyncStorage.setItem(CACHE_KEY, JSON.stringify(tracker)).catch((e) => {
				console.error('Failed to store CACHE');
			});
	}, [tracker]);

	const resetCounter = React.useCallback(
		() => setTracker((prev) => (prev ? { ...prev, numberOfBirds: initTracker.numberOfBirds } : undefined)),
		[]
	);

	const changeColorAndIncrement = React.useCallback(
		(color: string) => () =>
			setTracker((prev) => (prev ? { numberOfBirds: prev.numberOfBirds + 1, color } : undefined)),
		[]
	);

	const resetColor = React.useCallback(
		() => setTracker((prev) => (prev ? { ...prev, color: initTracker.color } : undefined)),
		[]
	);

	if (!tracker) return null;

	return (
		<Screen
			tracker={tracker}
			onResetCounterPress={resetCounter}
			onResetColorPress={resetColor}
			onChangeColorPress={changeColorAndIncrement}
		/>
	);
}

export default Container;
