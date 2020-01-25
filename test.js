function filterArray(array, filters) {
    const filterKeys = Object.keys(filters);
    return array.filter(item => {
        // validates all filter criteria
        return filterKeys.every(key => {
            // ignores non-function predicates
            if (typeof filters[key] !== 'function') return true;
            return filters[key](item[key]);
        });
    });
}

const products = [
    { name: 'A', color: 'Blue', size: 50, locations: ['USA', 'Europe'], details: { length: 20, width: 70 } },
    { name: 'B', color: 'Blue', size: 60, locations: [], details: { length: 20, width: 70 } },
    { name: 'C', color: 'Black', size: 70, locations: ['Japan'], details: { length: 20, width: 71 } },
    { name: 'D', color: 'Green', size: 50, locations: ['USA'], details: { length: 20, width: 71 } },
];

const filters = {
    size: size => size === 50 || size === 70,
    color: color => ['blue', 'black'].includes(color.toLowerCase()),
    locations: locations => locations.find(x => ['JAPAN', 'USA'].includes(x.toUpperCase())),
    details: details => details.length < 30 && details.width >= 70,
};

const filtered = filterArray(products, filters);