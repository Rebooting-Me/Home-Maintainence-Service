/**
 * Defines the types of services available to homeowners and contractors.
 */

// Permitted service types
const SERVICE_ROOFING = "roofing";
const SERVICE_REMODELING = "remodeling";
const SERVICE_PLUMBING = "plumbing";
const SERVICE_PEST_CONTROL = "pest_control";
const SERVICE_LANDSCAPING = "landscaping";
const SERVICE_ELECTRICAL = "electrical";

const SERVICES = new Set([
    SERVICE_ROOFING,
    SERVICE_REMODELING,
    SERVICE_PLUMBING,
    SERVICE_PEST_CONTROL,
    SERVICE_LANDSCAPING,
    SERVICE_ELECTRICAL
]);

/**
 * Checks whether the given array of services contains only valid service types.
 * @param {Array[String]} services 
 * @returns true if the array of service types contains only valid service types, false otherwise
 */
function validateServices(services) {
    for (const service of services) {
        if (!SERVICES.has(service.toLowerCase())) {
            return false;
        }
    }
    return true;
}

module.exports = {
    SERVICES: SERVICES,
    SERVICE_ROOFING: SERVICE_ROOFING,
    SERVICE_REMODELING: SERVICE_REMODELING,
    SERVICE_PLUMBING: SERVICE_PLUMBING,
    SERVICE_PEST_CONTROL: SERVICE_PEST_CONTROL,
    SERVICE_LANDSCAPING: SERVICE_LANDSCAPING,
    SERVICE_ELECTRICAL: SERVICE_ELECTRICAL,
    validateServices: validateServices
}
