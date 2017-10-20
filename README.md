# with-retry

Retry an async action

## Usage

```javascript
const fetchSite = superagent('https://www.github.com');
const fetchSiteWithRetry = withRetry(fetchSite);

const fetchSiteWithRetryWithOptions = withRetry(fetchSite, 5, {
  shouldRetry: error => error.name === 'TimeoutError',
  maxRetries: 5,
  getDelayForRetry: n => 1000 * n,
});
```

## Author

Andreas Brekken <andreas@brekken.com>
