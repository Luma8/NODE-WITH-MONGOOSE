const imageModel = require('../models/ImageModels');
const upload = require('../functions/userImageStorage');

class ImageControler {
    async store(req, res) {
        upload(req, res, (err) => {
            if (err) {
                console.log(err)
            }
            else {
                const newImage = new imageModel({
                    name: req.body.name,
                    image: {
                        data: req.file.filename,
                        contentType: 'image/png'
                    }
                })
                newImage.save()
                    .then(() => res.send('sucessfull upload!'))
                    .catch(err => console.log(err))
            }
        })
    }
    async update(req, res) {
        upload(req, res, (err) => {

            if (err) {
                console.log(err)
            }
            else {
                //TODO Adjust this later
                const { id } = req.params
                imageModel.findByIdAndUpdate(id, {
                    name: req.body.name,
                    image: {
                        data: req.file.filename,
                        contentType: 'image/png'
                    }
                })
                    .then(() => res.send('sucessfull!!'))
                    .catch(err => console.log(err))
            }

        })
    }
    async index(req, res) {
        const Imagens = await imageModel.find();
        // return res.status(200).json({ imageModel });
        try {
            return res.status(800).send(Imagens)
        } catch (err) {
            console.log(err)
            return res.status(404).json({ msg: 'error' })
        }
    }
    async show(req, res) {
        try {
            const { id } = req.params;
            const Imagens = await imageModel.findById(id);

            if (!Imagens) {
                return res.status(404).json({ msg: 'not exist image' })
            }
            return res.status(202).send(Imagens)
        } catch (err) {
            console.log(err)
            return res.status(404).json({ msg: 'not exist this Image' })
        }
    }
}
module.exports = new ImageControler();