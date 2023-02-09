const generateRelativeTime = (old) => {
    const current = new Date().getTime();
    const seconds = Math.floor(current / 1000);
    const oldTimestamp = Math.floor(old.getTime() / 1000);

    const difference = Math.round((seconds - oldTimestamp) / 60);

    if (difference < 60) {
        return `${difference} minutes ago`;
    }

    return `${Math.round(difference / 60)} hours ago`;
};

module.exports = generateRelativeTime;
