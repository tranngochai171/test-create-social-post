import moment from 'moment';

const locales = 'en-US';

const DEFAULT_CURRENCY = 'USD';

const defaultCurrencyFormatter = (currency: string = DEFAULT_CURRENCY) =>
  new Intl.NumberFormat(locales, {
    currency,
    style: 'currency',
  });

const NUMBER_FORMATTER = new Intl.NumberFormat(locales);

const COMPACT_NUMBER_FORMATTER = new Intl.NumberFormat(locales, {
  notation: 'compact',
});

const formatUtil = {
  formatCurrency: (num: number, currency?: string) => {
    return defaultCurrencyFormatter(currency).format(num);
  },
  formatNumber: (num: number) => {
    return NUMBER_FORMATTER.format(num);
  },
  formatCompactNumber: (num: number) => {
    // 100000 => 100k, 10000000 => 10M
    return COMPACT_NUMBER_FORMATTER.format(num);
  },
  extractDateAndTimeFromDateString: (
    dateString: string,
    dateFormat: string,
    timeFormat: string,
  ) => {
    let date = '';
    let time = '';
    console.log('dateString', dateString);
    try {
      const dateMoment = moment(dateString);
      date = dateMoment.format(dateFormat);
      time = dateMoment.format(timeFormat);
    } catch (err) {
      // Do nothing
    }
    return { date, time };
  },
};

export default formatUtil;
