function containsFields(object, fieldList) {
    for (const field in fieldList)
        if (object[fieldList[field]] === undefined)
            return { success: false, missingField: fieldList[field] }
    return { success: true }
}

module.exports = {
    containsFields,
}