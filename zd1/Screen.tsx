import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { BUTTON_CONSTS, ITracker } from './Container';

interface Props {
	tracker: ITracker;
	onResetCounterPress: () => void;
	onResetColorPress: () => void;
	onChangeColorPress: (color: string) => () => void;
}

function Screen({ tracker, onResetColorPress, onResetCounterPress, onChangeColorPress }: Props) {
	return (
		<View style={styles.container}>
			<View style={[styles.trackerView, { backgroundColor: tracker.color }]}>
				<Text>{`Number of Birds: ${tracker.numberOfBirds}`}</Text>
			</View>
			<View style={styles.buttonWrapper}>
				<View style={styles.buttonRow}>
					{Object.values(BUTTON_CONSTS).map((value) => (
						<TouchableOpacity
							key={`ColorButton-${value.color}`}
							onPress={onChangeColorPress(value.color)}
							style={[styles.colorButton, { backgroundColor: value.color }]}>
							<Text>{value.label}</Text>
						</TouchableOpacity>
					))}
				</View>
				<View style={styles.buttonRow}>
					<TouchableOpacity style={styles.resetButton} onPress={onResetCounterPress}>
						<Text>{`Reset counter`}</Text>
					</TouchableOpacity>
					<TouchableOpacity style={styles.resetButton} onPress={onResetColorPress}>
						<Text>{`Reset color`}</Text>
					</TouchableOpacity>
				</View>
			</View>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		backgroundColor: '#FFF',
		flex: 1,
	},
	buttonRow: {
		flexDirection: 'row',
		alignContent: 'center',
		justifyContent: 'space-around',
		marginTop: 20,
	},

	colorButton: {
		paddingHorizontal: 16,
		paddingVertical: 8,
		borderRadius: 4,
	},
	resetButton: {
		paddingHorizontal: 16,
		paddingVertical: 8,
		borderRadius: 4,
		borderWidth: 1,
	},
	trackerView: {
		alignItems: 'center',
		justifyContent: 'center',
		flex: 1,
	},
	buttonWrapper: {
		marginBottom: 20,
	},
});

export default Screen;
