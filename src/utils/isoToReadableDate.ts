export const isoToReadableDate = (lastUpdate: Date): string => {
	const CURRENT_DATE = new Date();
	const DIFF_TIME = CURRENT_DATE.getTime() - lastUpdate.getTime();
	const DIFF_DAYS = Math.round(DIFF_TIME / (1000 * 3600 * 24));

	if (DIFF_DAYS === 0) {
		return 'today';
	}

	if (DIFF_DAYS > 30) {
		return 'more than a month ago';
	}

	return `${DIFF_DAYS} days ago`;
};
