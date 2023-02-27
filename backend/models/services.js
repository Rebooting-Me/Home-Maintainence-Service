/**
 * Defines the types of services available to homeowners and contractors.
 */

// Permitted service types
const services = Object.freeze({
  PLUMBING: "plumbing",
  REMODELING: "remodeling",
  PEST_CONTROL: "pest_control",
  LANDSCAPING: "landscaping",
  ELECTRICAL: "electrical",
  ROOFING: "roofing"
});

function getServices() {
  return Object.values(services);
}

module.exports = {
  services,
  getServices,
};
