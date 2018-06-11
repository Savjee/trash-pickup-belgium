# Belgium Trash Pickup
Simple library to fetch trashpickups in Belgium (Ophaalkalender). It wraps around the API that is powering [ophaalkalender.be](http://www.ophaalkalender.be).

The library uses Promises and supports async/await. It also uses classes so an up-to-date version of node is required.

# Usage
Load the library:
```javascript
const TrashPickupFinder = require('trash-pickup-belgium');
```

Initialize with an streetname and zipcode:
```javascript
const trashPickupFinder = new TrashPickupFinder({
    streetName: 'Korenmarkt',
    zipcode: '9000'
});
```

Fetching the trash pickup:
```javascript
trashPickupFinder.getTrashPickups().then((pickupData) => {
    console.log(pickupData);
});
```


The `pickupData` will contain the raw data that the API returns. No processing is going on. Data will look like this:

```json
[
    {
        "allDay": true,
        "color": "blue",
        "start": "2018-01-04T00:00:00+01:00",
        "title": "PMD"
    },
    {
        "allDay": true,
        "color": "grey",
        "start": "2018-01-04T00:00:00+01:00",
        "title": "Restafval"
    },
    {
        "allDay": true,
        "color": "brown",
        "start": "2018-01-11T00:00:00+01:00",
        "title": "P-K"
    },
    {
        "allDay": true,
        "color": "yellow",
        "start": "2018-01-11T00:00:00+01:00",
        "title": "Glas"
    },
    {
        "allDay": true,
        "color": "green",
        "start": "2018-01-11T00:00:00+01:00",
        "title": "GFT"
    },
    {
        "allDay": true,
        "color": "purple",
        "start": "2018-01-18T00:00:00+01:00",
        "title": "Grof huisvuil afroep"
    },
    (...)
]
```

# License & contribution
MIT license (see [LICENSE file](LICENSE))

Found a bug? Have ideas for improvements? Everything is welcome!

Open issues or create pull requests to contribute.