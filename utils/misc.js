const { v1: uuid } = require('uuid');

const generateId = () => {
    return String(uuid());
};

const generateVotingLink = (optiondId) => {
    return 'http://localhost:3001/options/' + optiondId + '/add_vote';
};

module.exports = {
    generateId,
    generateVotingLink,
}