function getCleanObject(dirtyObject, propertiesToKeep) {
    return propertiesToKeep.reduce((cleanObject, propertyToKeep) => {
        if (dirtyObject[propertyToKeep] !== undefined) {
            cleanObject[propertyToKeep] = dirtyObject[propertyToKeep];
        }

        return cleanObject;
    }, {});
}

module.exports = getCleanObject;