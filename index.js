const express = require("express")
const translator = require("./functions/translator")
const replace = require("./utils/replace")
require("dotenv").config()

const app = express()
const port = process.env.PORT
app.use(express.json())

app.get('/', async (req, res) => {
    let message = "Hello this is home page for translation api"
    res.status(200).json({
        message: message,
        status: true
    })
})

app.post('/api/translation', async (req, res) => {
    try {
        let req_data = req.body
        let prompt = req_data.text
        let lang_options = req_data.lang_options === "formal" ? "formal" : "informal"
        // 1.translator with google api 
        let trans_text = await translator.translator(prompt)
        // 2.get the correct grammar for Palm V2 api
        const body_option = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                prompt: {
                    text: `can you give me the correct grammar of this word with the best ${lang_options} english word '${trans_text}'`
                }
            })
        }
        const response = await fetch('https://generativelanguage.googleapis.com/v1beta2/models/text-bison-001:generateText?key=' + process.env.GOOGLE_AI_KEY, body_option);
        const data = await response.json();
        let correct_grammar_text = data.candidates[0].output
        correct_grammar_text = await replace.replacestring(correct_grammar_text)
        res.status(200).json({
            message: correct_grammar_text,
            status: true
        })
    } catch (error) {
        let error_message = "INTERNAL SERVER ERROR : " + error
        res.status(500).json({
            message: error_message,
            status: true
        })
    }
})

app.post('/api/translationtoanother', async (req, res) => {
    try {
        let req_data = req.body
        let prompt = req_data.text
        let expected_lang = req_data.expected_language
        let trans_text = await translator.translatortoanother(prompt , expected_lang)
        res.status(200).json({
            message: trans_text,
            status: true
        })
    } catch (error) {
        let error_message = "INTERNAL SERVER ERROR : " + error
        res.status(500).json({
            message: error_message,
            status: true
        })
    }
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})
