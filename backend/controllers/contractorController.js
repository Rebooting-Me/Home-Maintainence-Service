/**
 * Functions for retrieving contractor information.
 */
const { getContractorData } = require('../models/helper');

/**
 * Retrieves the dashboard information for the contractor with the given contractor_id.
 * @param {*} req 
 * @param {*} res 
 */
const getContractorDashboard = async (req, res) => {
    try {
        const contractorId = req.contractor_id;
        const contractor = await getContractorData(contractorId);
        res.status(200).json({ "contractorDashboard": "Content for contractor dashboard", "contractor": contractor });
    }
    catch (error) {
        res.status(400).json({ error: error.message });
    }
}


/**
 * Retrieves the profile information for the contractor with the given contractor_id.
 * @param {*} req 
 * @param {*} res 
 */
const getContractorProfile = async (req, res) => {
    try {
        const contractorId = req.contractor_id;
        const contractor = await getContractorData(contractorId);
        res.status(200).json({ "contractorProfile": "Content for contractor profile", "contractor": contractor });
    }
    catch (error) {
        res.status(400).json({ error: error.message });
    }
}

module.exports = { getContractorDashboard, getContractorProfile };