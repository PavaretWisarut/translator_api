exports.replacestring = async (text) => {
     // Replace backslashes
     replace_text = text.replace(/\\/g, '');
     // Replace double quotes
     replace_text = replace_text.replace(/\"/g, '');
     // Replace \n
     replace_text = replace_text.replace(/\n/g, '');
     // Replace **
     replace_text = replace_text.replace(/\*\*/g, '');
     
    return replace_text
}