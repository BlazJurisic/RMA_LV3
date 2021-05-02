import { useNavigation, useRoute } from '@react-navigation/core';
import dayjs from 'dayjs';
import React from 'react';
import { useForm } from 'react-hook-form';
import { ToastAndroid } from 'react-native';
import { launchImageLibrary } from 'react-native-image-picker';
import { routes } from '../consts/routes';
import { strings } from '../consts/strings';
import InspiringPerson from '../model/InspiringPerson';
import { service } from '../repository/service';
import InspiringPersonScreen from '../screens/InspiringPersonScreen';

export type QuoteFields = {
	quote: string;
};

export type Fields = {
	description: string;
	dateOfBirth: Date;
	dateOfDeath: Date;
	imageUri: string;
};

function InspiringPersonContainer() {
	const { control: quoteControl, handleSubmit: handleSubmitQoutes } = useForm<QuoteFields>();
	const { control, formState, setValue, handleSubmit } = useForm<Fields>();
	const [quotes, setQuotes] = React.useState<string[]>([]);
	const [inspiringPerson, setInspiringPerson] = React.useState<InspiringPerson>();
	const personIndex = React.useRef();
	const navigation = useNavigation();
	const route = useRoute();

	React.useMemo(() => {
		if (route.params && route.params.person) {
			const person = InspiringPerson.fromString(route.params.person);
			personIndex.current = route.params.personIndex;
			setQuotes(person.quotes);
			setInspiringPerson(person);
		}
	}, [route]);

	const addQuote = React.useMemo(
		() =>
			handleSubmitQoutes((data) => {
				setQuotes((prev) => [...prev, data.quote]);
			}),
		[handleSubmitQoutes]
	);

	const removeQuote = React.useCallback(
		(index: number) => setQuotes((prev) => [...prev.filter((_, itemIndex) => itemIndex !== index)]),
		[]
	);

	const openImageLibrary = React.useCallback(
		() =>
			launchImageLibrary({ mediaType: 'photo' }, (e) => {
				if (e.uri) setValue('imageUri', e.uri);
			}),
		[setValue]
	);

	const modifyPerson = React.useMemo(
		() =>
			handleSubmit((data) => {
				if (!quotes.length) {
					ToastAndroid.showWithGravityAndOffset(
						strings.qoute_error_message,
						ToastAndroid.SHORT,
						ToastAndroid.BOTTOM,
						0,
						50
					);
				}

				const person = new InspiringPerson(
					inspiringPerson?._id || '',
					inspiringPerson?._rev || '',
					data.imageUri,
					quotes,
					data.description,
					dayjs(data.dateOfBirth),
					data.dateOfDeath ? dayjs(data.dateOfDeath) : undefined
				);
				service
					.modifyPerson(person)
					.then((res) => {
						person._id = res.id;
						person._rev = res.rev;
						navigation.navigate(routes.home, {
							person: JSON.stringify(InspiringPerson.toJSON(person)),
							personIndex: personIndex.current,
						});
					})
					.catch(console.log);
			}),
		[handleSubmit, quotes, navigation, inspiringPerson]
	);
	const deletePerson = React.useCallback(
		() =>
			service
				.deleteInspiringPerson(inspiringPerson!._id, inspiringPerson!._rev)
				.then(() => navigation.navigate(routes.home, { personIndex: personIndex.current }))
				.catch(console.log),
		[navigation, inspiringPerson]
	);

	React.useEffect(() => {
		const errors = Object.values(formState.errors);
		if (errors.length) {
			ToastAndroid.showWithGravityAndOffset(errors[0]!.message!, ToastAndroid.SHORT, ToastAndroid.BOTTOM, 0, 50);
		}
	}, [formState]);

	return (
		<InspiringPersonScreen
			quoteControl={quoteControl}
			control={control}
			quotes={quotes}
			inspiringPerson={inspiringPerson}
			onAddQuoteButtonPress={addQuote}
			onRemoveQouteButtonPress={removeQuote}
			onAddImageButtonPress={openImageLibrary}
			onAddNewPersonButtonPress={modifyPerson}
			onEditPersonButtonPress={modifyPerson}
			onDeletePersonButtonPress={deletePerson}
		/>
	);
}

export default InspiringPersonContainer;
