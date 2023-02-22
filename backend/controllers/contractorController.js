/**
 * Functions for retrieving contractor information.
 */
const getContractorDashboard = async (req, res) => {
    try {
        const contractorId = req.contractor_id;
        // TODO: Get contractor from DB using ID, then return contractor-dependent response.
        res.status(200).json({ "contractorDashboard": "Content for contractor dashboard", "contractorId": contractorId });
    }
    catch (error) {
        res.status(400).json({ error: error.message });
    }
}


const getContractorProfile = async (req, res) => {
    try {
        const contractorId = req.contractor_id;
        // TODO: Get contractor from DB using ID, then return contractor-dependent response.
        res.status(200).json({ "contractorProfile": "Content for contractor profile", "contractorId": contractorId });
    }
    catch (error) {
        res.status(400).json({ error: error.message });
    }
}

module.exports = { getContractorDashboard, getContractorProfile };