require('dotenv').config();
const express = require('express');
const path = require('path');
const nodemailer = require('nodemailer');
const bodyParser = require('body-parser');
const fs = require('fs');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

// Configuração do Nodemailer
const transporter = nodemailer.createTransport({
    service: process.env.EMAIL_SERVICE || 'gmail',
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
    }
});

// Rota principal
app.get('/', (req, res) => {
    try {
        const filePath = path.join(__dirname, 'public', 'index.html');
        if (!fs.existsSync(filePath)) {
            throw new Error('Arquivo index.html não encontrado');
        }
        res.sendFile(filePath);
    } catch (error) {
        res.status(404).send('Página não encontrada');
    }
});

// Rota para enviar email
app.post('/send-email', (req, res) => {
    const { name, email, message } = req.body;

    const mailOptions = {
        from: process.env.EMAIL_USER,
        to: process.env.EMAIL_RECEIVER || process.env.EMAIL_USER,
        subject: `Formulário do sistema de força bruta - ${name}`,
        html: `
            <h2>Você recebeu uma nova mensagem do site Força Bruta</h2>
            <p><strong>Nome:</strong> ${name}</p>
            <p><strong>Email:</strong> ${email}</p>
            <p><strong>Mensagem:</strong></p>
            <p>${message}</p>
            <hr>
            <p>Esta mensagem foi enviada através do formulário de contato do seu site.</p>
        `
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.error('Erro ao enviar email:', error);
            return res.status(500).json({ 
                success: false,
                message: 'Ocorreu um erro ao enviar sua mensagem. Por favor, tente novamente mais tarde.'
            });
        }
        
        console.log('Email enviado:', info.response);
        res.json({ 
            success: true,
            message: 'Mensagem enviada com sucesso! Entraremos em contato em breve.'
        });
    });
});

// Inicia o servidor
app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
    console.log(`Acesse: http://localhost:${PORT}`);
});