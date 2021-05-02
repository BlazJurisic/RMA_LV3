import { useNavigation, useRoute } from '@react-navigation/native';
import React from 'react';
import { ToastAndroid } from 'react-native';
import { routes } from '../consts/routes';
import InspiringPerson from '../model/InspiringPerson';
import { service } from '../repository/service';
import HomeScreen from '../screens/HomeScreen';

function HomeContainer() {
	const [inspiringPersons, setInspiringPersons] = React.useState<InspiringPerson[]>([]);
	const navigation = useNavigation();
	const route = useRoute();

	React.useEffect(() => {
		service.getAllInspiringPersons().then(setInspiringPersons).catch(console.log);
	}, []);

	const showToast = React.useCallback((quote: string) => {
		ToastAndroid.showWithGravityAndOffset(quote, ToastAndroid.LONG, ToastAndroid.BOTTOM, 0, 50);
	}, []);

	const navigateToInspiringPerson = React.useCallback(() => {
		navigation.navigate(routes.inspiringPreson);
	}, [navigation]);

	const navigateToInspiringPersonWithPerson = React.useCallback(
		(item: InspiringPerson, index: number) => {
			navigation.navigate(routes.inspiringPreson, {
				person: JSON.stringify(InspiringPerson.toJSON(item)),
				personIndex: index,
			});
		},
		[navigation]
	);

	React.useEffect(() => {
		if (route.params) {
			if (route.params.person) {
				if (route.params.personIndex !== undefined) {
					setInspiringPersons((prev) => {
						prev[route.params!.personIndex] = InspiringPerson.fromString(route.params!.person);
						return [...prev];
					});
				} else setInspiringPersons((prev) => [...prev, InspiringPerson.fromString(route.params!.person)]);
			} else if (route.params.personIndex !== undefined) {
				setInspiringPersons((prev) => prev.filter((person) => person._id !== route.params!.personIndex));
			}
		}
	}, [route]);

	return (
		<HomeScreen
			inspiringPresons={inspiringPersons}
			onItemImagePress={showToast}
			onPlusPress={navigateToInspiringPerson}
			onItemTextPress={navigateToInspiringPersonWithPerson}
		/>
	);
}

export default HomeContainer;
