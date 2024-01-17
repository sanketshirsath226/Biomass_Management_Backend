// dateUtils.js

const getCurrentDate = (format = 'DD, MMM') => {
    const currentDate = new Date();
    return currentDate.toLocaleString('en-US', {
        day: '2-digit',
        month: 'short',
        year: format.includes('YYYY') ? 'numeric' : undefined,
    });
};

module.exports = { getCurrentDate };