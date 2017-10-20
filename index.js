const delay = require('delay');
const debug = require('debug')('withRetry');

const defaultGetDelayForRetry = retry =>
  1000 * Math.pow(2, retry) + Math.random() * 100;

const withRetry = (target, options = {}) => {
  const { maxRetries, shouldRetry, getDelayForRetry } = {
    maxRetries: 5,
    shouldRetry: () => true,
    getDelayForRetry: defaultGetDelayForRetry,
    ...options,
  };

  return async (...args) => {
    for (let retry = 0; retry < maxRetries - 1; retry++) {
      try {
        return await target(...args);
      } catch (error) {
        debug(error);

        if (!shouldRetry(error)) {
          break;
        }
      }

      await delay(getDelayForRetry(retry));
    }

    return target(...args);
  };
};

module.exports = withRetry;
