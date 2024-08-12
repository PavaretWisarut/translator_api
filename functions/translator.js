const translatte = require('translatte');

exports.translator = async (prompt) => {
    let text = ""
    await translatte(prompt, { to: 'en' }).then(res => {
        text = res.text
    }).catch(err => {
        console.error(err);
    });
    return text
}

exports.translatortoanother = async (prompt,expected_lang) => {
    let text = ""
    await translatte(prompt, { to: expected_lang }).then(res => {
        text = res.text
    }).catch(err => {
        console.error(err);
    });
    return text
}