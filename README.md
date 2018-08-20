# Belgium Trash Pickup
[![Travis build status](https://img.shields.io/travis/Savjee/trash-pickup-belgium.svg)](https://travis-ci.org/Savjee/trash-pickup-belgium)
[![Current version](https://img.shields.io/npm/v/trash-pickup-belgium.svg)](https://www.npmjs.com/package/trash-pickup-belgium)
[![Downloads on npm](https://img.shields.io/npm/dt/trash-pickup-belgium.svg)](https://www.npmjs.com/package/trash-pickup-belgium)
[![License](https://img.shields.io/npm/l/trash-pickup-belgium.svg)](/LICENSE)
[![Dependencies](https://img.shields.io/david/savjee/trash-pickup-belgium.svg)](https://www.npmjs.com/package/trash-pickup-belgium)



Simple library to fetch trashpickups in Belgium (Ophaalkalender). It wraps around the API that is powering [ophaalkalender.be](http://www.ophaalkalender.be).

The library uses Promises and supports async/await. It also uses classes so an up-to-date version of node is required.

# Usage
Load the library:
```javascript
const TrashPickupFinder = require('trash-pickup-belgium');
```

## Initialize
Initialize with an streetname and zipcode:
```javascript
const trashPickupFinder = new TrashPickupFinder({
    streetName: 'Korenmarkt',
    zipcode: '9000'
});
```

Or initialize with a streetId (this reduces the number of API calls to 1)
```javascript
const trashPickupFinder = new TrashPickupFinder({
    streetId: '46537',
});
```

## Fetch the pickups for this week
This fetches the trash pickups that are scheduled this week:

```javascript
trashPickupFinder.getTrashPickupsThisWeek().then((pickupData) => {
    console.log("Pickups this week:", pickupData);
});
```

Example return data:

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
    }
]
```


## Fetching all pickups for your street
Returns all pickups for your street (usually for the entire year):

```javascript
trashPickupFinder.getTrashPickups().then((pickupData) => {
    console.log(pickupData);
});
```

Return data will look like this:

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
    }
]
```

# License & contribution
MIT license (see [LICENSE file](LICENSE))

Found a bug? Have ideas for improvements? Everything is welcome!

Open issues or create pull requests to contribute.

# Changelog

### 1.1.0
* Added the ability to fetch the pickups for this week.
* Added documentation on how you can pass `streetId` to reduce the amount of API calls needed.

### v1.0.0
* Initial release