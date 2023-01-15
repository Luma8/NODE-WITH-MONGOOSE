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
    async userPost(req, res) {
        const userId = req.params.id;
        const { title, description, check } = req.body;

        try {
            if (!title) {
                return res.status(422).json({ msg: 'required title Input' })
            }
            if (!description) {
                return res.status(422).json({ msg: 'required description Input' })
            }
            if (!check) {
                return res.status(422).json({ msg: 'required Check Input' })
            }

            const createMission = await MissionsModel.create({ title: title, description: description, check: check, id_user: userId });
            console.log(req.body);
            return res.status(200).json(createMission);

        } catch (err) {
            console.log(err);
            return res.status(404).json({ msg: 'erro' })
        }
    }
    async userGet(req, res) {

        try {
            const id  = req.params.id;
            const Mission = await MissionsModel.find({id_user: id})

            console.log(id);
            console.log(Mission);

            return res.status(200).json({ Mission })
        } catch (err) {
            console.log(err);
            return res.status(404).json({ msg: 'erro' })
        }
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
            return res.status(404).json({ msg: 'not exist this mission' })
        }
    }
    async update(req, res) {

        try {
            const { id } = req.params;
            await MissionsModel.findByIdAndUpdate(id, req.body);
            return res.status(200).json({ msg: 'Product updated' })
        } catch (error) {
            console.log(error)
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