const MissionsModel = require('../models/MissionsModel');

class MissionControler {
    async store(req, res) {
        const { title, description, check } = req.body;

        if (!title) {
            return res.status(422).json({ msg: 'required title Input' })
        }
        if (!description) {
            return res.status(422).json({ msg: 'required description Input' })
        }
        if (!check) {
            return res.status(422).json({ msg: 'required Check Input' })
        }

        const createMission = await MissionsModel.create(req.body);
        return res.status(200).json(createMission);
    }
    async index(req, res) {
        const Missions = await MissionsModel.find();

        return res.status(200).json({ Missions })
    }
    async show(req, res) {
        try {
            const { id } = req.params;
            const Missions = await MissionsModel.findById(id);

            if (!Missions) {
                return res.status(404).json({ msg: 'not exist this mission' })
            }
            return res.status(200).json({ Missions });
        } catch (error) {
            return res.status(404).json({ msg: 'not sexist this mission' })
        }
    }
    async update(req, res) {

        try {
            const { id } = req.params;
            await MissionsModel.findByIdAndUpdate(id, req.body);
            return res.status(200).json({ msg: 'Product updated' })
        } catch (error) {
            return res.status(404).json({ msg: 'Failed to updtate mission' })
        }
    }
    async destroy(req, res) {
        try {
            const { id } = req.params;
            const MissionDeleted = await MissionsModel.findByIdAndDelete(id);

            if (!MissionDeleted) {
                return res.status(404).json({ msg: 'no mission deleted' })
            }
            return res.status(200).json({ msg: 'deleted sucessfull!!' })
        } catch (error) {
            console.log(error);
            return res.status(404).json({ msg: 'failed to deleted this Mission' })
        }
    }
}

module.exports = new MissionControler();