const promptModel = require('../models/promptModel');

const { ObjectId } = require('mongodb');

const promptGetAll = (req, res) => {
    return promptModel.find({ user: new ObjectId(req.user) })
        .then(prompts => {
            return prompts;
        })
        .catch(error => {
            console.log('There was an error:', error);
            return error;
        });
};

const promptSearch = (req, res) => {
    const { name, tag } = req
    let filters = { user: new ObjectId(req.user) };

    // If the user has entered a search term in either field then we will filter by that value and send back all matching results to the client side
    if (name) {
        filters.name = { $regex: `${name}`, $options: 'i' };
    };
    if (tag) {
        filters.tags = { $regex: `${tag}`, $options: 'i' };
    };

    return promptModel.find(filters)
        .then(prompts => {
            return prompts;
        })
        .catch(error => {
            console.log('There was an error:', error);
            return error;
        });
};

module.exports = {
    promptGetAll,
    promptSearch
};
