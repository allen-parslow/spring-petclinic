import en from "../en";
import i18n from "../i18n";

describe("i18n Utilities", () => {  

    it("Should import json and contain app title", () => {
        expect(en["TEXT__APP_TITLE"]).toBe("Your Bucket List");
    });  

    it("Should translate i18n keys", () => {
        expect(i18n.t("TEXT__APP_TITLE")).toBe("Your Bucket List");
    });
    
    it("Should fallback to key name when not found", () => {
        expect(i18n.t("TEXT__THIS_KEY_IS_NOT_THERE", null, true)).toBe("TEXT__THIS_KEY_IS_NOT_THERE");
    });  

    it("Should fallback to default key name when no key is provided", () => {
        expect(i18n.t(null, null, true)).toBe("NO_I18N_KEY");
    });  

    it("Should interpolate arguments", () => {
        i18n.addKey("en", "TEXT__TEST", "${value} Ring to rule them ${result}");
        expect(i18n.t("TEXT__TEST", {value: 1, result: "all"})).toBe("1 Ring to rule them all");
    });  
});
