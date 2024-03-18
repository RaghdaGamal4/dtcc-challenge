import * as _ from "lodash";

export const getCitizensIds = (page: number, limit: number, count: number) => {
    const startRange = count - limit * page + 1;
    const citizenIds = _.range(startRange, startRange + limit);
    return citizenIds;
};
