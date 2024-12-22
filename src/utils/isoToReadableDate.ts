export const isoToReadableDate = (lastUpdate: string): string => {
	const LAST_UPDATE_DATE = new Date(lastUpdate);
	const CURRENT_DATE = new Date();
	const DIFF_DAYS = CURRENT_DATE.getDate() - LAST_UPDATE_DATE.getDate();

	if (DIFF_DAYS === 0) {
		return 'today';
	}

	if (DIFF_DAYS > 30) {
		return 'more than a month ago';
	}

	return `${DIFF_DAYS} days ago`;
};
