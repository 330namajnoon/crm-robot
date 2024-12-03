const mergeObjects = (obj1, obj2) => {
    Object.keys(obj2).forEach((key) => {
        if (obj1[key] !== undefined) {
            if (typeof obj1[key] !== "object" && typeof obj2[key] !== "object") {
                obj1[key] = obj2[key];
            } else {
                obj1[key] = mergeObjects(obj1[key], obj2[key]);
            }
        } else {
            obj1[key] = obj2[key];
        }
    });
    return obj1;
};

module.exports = { mergeObjects };
