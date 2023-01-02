const MissionsModel = require('../models/MissionsModel');
const UserModel = require('../models/UserModel');
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
        let { id_user, title, description, check } = req.body;
        id_user = userId;

        console.log(id_user);

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

            const createMission = await MissionsModel.create(req.body);
            console.log(req.body);
            return res.status(200).json(createMission);

        } catch (err) {
            console.log(err);
            return res.status(404).json({ msg: 'erro' })
        }
    }
    async userGet(req, res) {
        const userId = req.params.id;
        const user = await UserModel.findById(userId, '-password')
        const Mission = await MissionsModel.find()

        try {
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