const express = require('express');
const { checkSchema, validationResult } = require('express-validator');
const router = express.Router();
const QRCode = require("qrcode-svg");
const fs = require('fs');

// Middleware get ip address, time, owner_id
router.use((req, res, next) => {
    const ip = req.headers['x-forwarded-for'] || req.socket.remoteAddress;

    fs.writeFile('log.txt', `IP: ${ip}, Time: ${Date.now()}`,  {'flag':'a'},  function(err) {
        if (err) {
            return console.error(err);
        }
    });

    next();
})

// Create and generate QR for public use, no authentication and basic customisation
router.get('/', checkSchema({
    content: {
        in: ['query'],
        notEmpty: true,
        isString: true,
        errorMessage: "Content is empty or invalid",
    },
    predefined: {
        in: ['query'],
        optional: { options: { nullable: true } },
        notEmpty: true,
        isBoolean: true,
        errorMessage: "Predefined should be true or false",
    },
    type: {
        in: ['query'],
        optional: { options: { nullable: true } },
        isIn: {
            options: [['svg', 'png']],
        },
        notEmpty: true,
        isString: true,
        errorMessage: "Type should be svg, png",
    },
    padding: {
        in: ['query'],
        optional: { options: { nullable: true } },
        isLength: {
            options: { min: 0, max: 3 },
            bail: true
        },
        notEmpty: true,
        isInt: true,
        toInt: true,
    },
    width: {
        in: ['query'],
        optional: { options: { nullable: true } },
        isLength: {
            options: { min: 1, max: 4 },
            bail: true
        },
        notEmpty: true,
        isInt: true,
        toInt: true,
    },
    height: {
        in: ['query'],
        optional: { options: { nullable: true } },
        isLength: {
            options: { min: 1, max: 4 },
            bail: true
        },
        notEmpty: true,
        isInt: true,
        toInt: true,
    },
    color: {
        in: ['query'],
        optional: { options: { nullable: true } },
        notEmpty: true,
    },
    background: {
        in: ['query'],
        optional: { options: { nullable: true } },
        notEmpty: true,
    },
    ecl: {
        in: ['query'],
        optional: { options: { nullable: true } },
        isIn: {
            options: [['L', 'M', 'H', 'Q']],
        },
        notEmpty: true,
        errorMessage: "Valid option are L, M, H, Q",
    }
}),
   async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

   let qr = new QRCode({
     join: true,
     predefined: !req.query.predefined,
     content: req.query.content,
     padding: req.query.padding ?? 2,
     width:req.query.width ?? 256,
     height:req.query.height ?? 256,
     color: req.query.color ?? "#000000",
     background: req.query.background ?? "#ffffff",
     ecl: req.query.ecl ?? "M",
   }).svg();

    switch (req.query.type)
    {
        case 'png':
            return res.status(500).send("Serverless not supported for this feaeture yet");
            break
        case 'svg':
        default:
            return res
            .setHeader('Content-Type', 'image/svg+xml')
            .status(200)
            .send(qr);
    }
   }
)

router.get('/about', (req, res) => {
    res.json({'status': 500, code: 'about'});
})

module.exports = router