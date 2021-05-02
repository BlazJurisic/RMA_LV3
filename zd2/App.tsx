import AsyncStorage from '@react-native-async-storage/async-storage';
import React from 'react';
import { service } from './src/repository/service';
import Router from './src/router/Router';

const FIRST_TIME = 'FIRST_TIME';

const App = () => {
	const [mounted, setMounted] = React.useState(false);

	React.useEffect(() => {
		AsyncStorage.getItem(FIRST_TIME)
			.then(async (res) => {
				if (res) setMounted(true);
				else {
					await service.setInitData().catch(console.log);
					await AsyncStorage.setItem(FIRST_TIME, 'true').catch(console.log);
					setMounted(true);
				}
			})
			.catch(console.log);
	}, []);

	if (!mounted) return null;

	return <Router />;
};

export default App;
