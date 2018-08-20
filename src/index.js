const needle = require('needle');

class TrashPickupFinder{

    constructor(config) {
        const defaultConfig = {
            houseNumber: 0,
            streetName: null,
            streetId: null,
            zipcode: null,

            dateStart: this._getTimestampForPickupRange(-1),
            dateEnd: this._getTimestampForPickupRange(1),

            baseApiUrl: 'http://www.ophaalkalender.be',
        }

        // Merge the default config with the one the user provided
        this.config = {
            ...defaultConfig,
            ...config
        };

        // To finish, validate the configuration object that the user passed
        // This function throws if something is wrong!
        this._validateConfig();
    }

    /**
     *
     */
    async getTrashPickups() {
        await this._fetchStreetId();
        return this._fetchTrashPickups();
    }

    async getTrashPickupsThisWeek(){
        await this._fetchStreetId();

        // Calculate begin & end date of the week. We add +1 to the begin date
        // because in JS first day of the week is Sunday, not Monday.
        const currentDate = new Date();
        const begin = currentDate.getDate() - currentDate.getDay() + 1;
        const end = begin + 6;

        const beginDate = new Date(currentDate.setDate(begin));
        const endDate = new Date(currentDate.setDate(end));


        // Fetch the pickups & filter them
        const pickups = await this._fetchTrashPickups();
        return pickups.filter((pickup) => {
            const pickupDate = new Date(pickup.start);
            return pickupDate >= beginDate && pickupDate <= endDate;
        });
    }


    /**
     * @private
     */
    async _fetchStreetId() {
        // If we already know the streetId, return it directly and don't fetch it
        // from the API again.
        if(this.config.streetId && this.config.streetId !== null){
            return this.config.streetId;
        }

        console.log('Fetching the street id...');
        const data = await needle('get', `${this.config.baseApiUrl}/calendar/findstreets?query=${this.config.streetName}&zipcode=${this.config.zipcode}`);

        if (data.length === 0) {
            console.error(data);
            throw new Error(`Could not find street with name "${this.config.streetName}, ${this.config.zipcode}"`);
        }

        if (data.length > 1) {
            console.error(data);
            throw new Error(`Multiple matches for street "${this.config.streetName}, ${this.config.zipcode}"`);
        }

        const streetId = this.config.streetId = data.body[0].Id;
        console.log(streetId);
        return streetId;
    }

    /**
     * @private
     */
    async _fetchTrashPickups() {
        console.log('Fetching trash pickups...');
        const data = await needle('get', `${this.config.baseApiUrl}/api/rides?id=${this.config.streetId}&housenumber=${this.config.houseNumber}&zipcode=${this.config.zipcode}&start=${this.config.dateStart}&end=${this.config.dateEnd}`);

        return data.body;
    }

    /**
     * @private
     */
    _validateConfig() {
        const errors = [];

        // If the user already knows his streetId there is nothing left
        // to validate and we can return this function.
        if (this.config.streetId) {
            return;
        }

        if (!this.config.streetName) {
            errors.push('streetName is not defined');
        }

        if (!this.config.zipcode) {
            errors.push('zipcode was not defined');
        }


         if (errors.length > 0) {
             let message = "There are errors in your config file:\n";

             for(const err of errors){
                 message += "  - " + err + "\n";
             }

             throw new Error(message)
         }
    }

    /**
     * @private
     */
    _getTimestampForPickupRange(months) {
        const currentDate = new Date();

        currentDate.setMonth(currentDate.getMonth() + months);
        return Math.floor(currentDate.getTime() / 1000);
    }
}

module.exports = TrashPickupFinder;