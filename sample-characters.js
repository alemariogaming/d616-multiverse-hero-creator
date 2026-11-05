/**
 * Multiverse RPG Character Sheet - Vorlagen
 * 100% freie und neutrale Charakter-Vorlagen ohne Markenrecht-Verletzungen
 */

const SAMPLE_CHARACTERS = {
    "blank": {
        id: "char-blank",
        name: "Neuer Held",
        realName: "",
        player: "",
        rank: 1,
        karma: 1,
        origin: "Special Training",
        occupation: "Adventurer",
        identity: "Secret Identity",
        base: "",
        teams: "",
        
        // Portrait / Bild
        portrait: {
            url: "",
            width: 200,
            height: 125,
            fit: "cover"
        },
        
        height: "",
        weight: "",
        gender: "",
        eyes: "",
        hair: "",
        size: "Average",
        distinguishingFeatures: "",

        speed: {
            run: 5,
            climb: 5,
            jump: 5,
            swim: 2,
            extra: []
        },

        initiativeEdge: false,
        damageReductionHealth: "—",
        damageReductionFocus: "—",

        abilities: {
            melee: 1,
            agility: 1,
            resilience: 1,
            vigilance: 1,
            ego: 1,
            logic: 0
        },

        defenseBonuses: { melee: 0, agility: 0, resilience: 0, vigilance: 0, ego: 0, logic: 0 },
        nonCombatBonuses: { melee: 0, agility: 0, resilience: 0, vigilance: 0, ego: 0, logic: 0 },
        damageBonuses: { melee: 0, agility: 0, ego: 0, logic: 0 },

        powers: [],
        traits: [],
        tags: [],
        history: "",
        personality: ""
    }
};

if (typeof module !== 'undefined' && module.exports) {
    module.exports = SAMPLE_CHARACTERS;
}
