# Latest exchange rates lookup
Simple web application that display the latest exchange rates.

## How to use?
### Open the application
#### Github Page
Go to [https://laurelgr.github.io/exchange-rates-lookup](https://laurelgr.github.io/exchange-rates-lookup) and 
click on __Basic version__.

#### On the go
Open the `takeaway.html` file in a browser with javascript enabled.

Script and CSS are included to make it usable without downloading multiple files.

### Getting started
The application initialize with the latest available rates, on base currency EUR.  

Click another currency to change base currency! (A new request is fired to update the rates.)

Click the date and pick another to see that day's rates! If no rates are available, the API provide the previous 
available rates and the date is updated to reflect the true day referred.
## Credits
Exchange rates: [Foreign exchange rates API](https://exchangeratesapi.io)

CSS browser-specific prefixes: [-prefix-free](https://projects.verou.me/prefixfree/) (1.0.7).  
The PrefixFree code is also included in the separate file `prefixfree.min.js`
