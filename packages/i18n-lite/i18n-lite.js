var config = {
    lang: "en"
};

var langs = {
    en: require("./en")
};

var template = (tpl, args) => tpl.replace(/\${(\w+)}/g, (_, v) => args[v]);

class i18n {
    t(key, args) {
        var result = langs[config.lang][key];

        if (!result) {
            result = key ? key : "NO_I18N_KEY";
        } else if (args) {
            result = template(result, args);
        }

        return result;
    }
    addKey(lang, key, translation) {
        langs[config.lang][key] = translation;
    }
}

module.exports = new i18n();
