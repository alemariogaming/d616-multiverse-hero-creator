/**
 * Marvel Multiverse Role-Playing Game (MMRPG) - Offizielles Regelwerk & Berechnungen
 * Basierend auf dem offiziellen Marvel Multiverse RPG Core Rulebook
 */

const MMRPG_RULES = {
    RANKS: [1, 2, 3, 4, 5, 6],
    
    RANK_INFO: {
        1: { name: "Rank 1: Rookie / Street-Level", maxAbility: 4, abilityPoints: 5, maxPowers: 4, karma: 1, maxTraits: 5 },
        2: { name: "Rank 2: Local Hero / Enhanced", maxAbility: 5, abilityPoints: 10, maxPowers: 8, karma: 2, maxTraits: 6 },
        3: { name: "Rank 3: Champion / Super Hero", maxAbility: 6, abilityPoints: 15, maxPowers: 12, karma: 3, maxTraits: 7 },
        4: { name: "Rank 4: Legend / Master", maxAbility: 7, abilityPoints: 20, maxPowers: 16, karma: 4, maxTraits: 8 },
        5: { name: "Rank 5: Mythic / Cosmic Force", maxAbility: 8, abilityPoints: 25, maxPowers: 20, karma: 5, maxTraits: 9 },
        6: { name: "Rank 6: Cosmic Entity", maxAbility: 9, abilityPoints: 30, maxPowers: 25, karma: 6, maxTraits: 10 }
    },

    ABILITIES: [
        { key: "melee", letter: "M", name: "Melee", labelDe: "Nahkampf & Kraft" },
        { key: "agility", letter: "A", name: "Agility", labelDe: "Fernkampf & Reflexe" },
        { key: "resilience", letter: "R", name: "Resilience", labelDe: "Zähigkeit & Leben" },
        { key: "vigilance", letter: "V", name: "Vigilance", labelDe: "Wahrnehmung & Fokus" },
        { key: "ego", letter: "E", name: "Ego", labelDe: "Charisma & Willenskraft" },
        { key: "logic", letter: "L", name: "Logic", labelDe: "Wissen & Taktik" }
    ],

    ORIGINS: [
        "Alien",
        "High-Tech",
        "Inhuman",
        "Magic",
        "Mutant",
        "Special Training",
        "Weird Science",
        "Cybernetic",
        "Mythic",
        "Other"
    ],

    OCCUPATIONS: [
        "Adventurer",
        "Assassin",
        "Criminal",
        "Engineer",
        "Journalist",
        "Law Enforcement",
        "Leader",
        "Military",
        "Outsider",
        "Scientist",
        "Spy",
        "Student",
        "Tycoon",
        "Other"
    ],

    SIZES: [
        "Average",
        "Small",
        "Big",
        "Gigantic",
        "Microscopic"
    ],

    POWER_SETS: [
        "Basic",
        "Spider-Powers",
        "Martial Arts",
        "Melee Weapons",
        "Ranged Weapons",
        "Shield Bashing",
        "Super-Strength",
        "Super-Speed",
        "Elemental Control",
        "Energy Control",
        "Illusion",
        "Magic",
        "Omniversal Travel",
        "Phasing",
        "Plasticity",
        "Power Control",
        "Resize",
        "Tactics",
        "Telekinesis",
        "Telepathy",
        "Teleportation",
        "Weather Control"
    ],

    ACTION_TYPES: [
        "Standard Action",
        "Reaction",
        "Movement",
        "Free Action"
    ],

    /**
     * Berechnet alle abgeleiteten Werte für den Charakter
     */
    calculateDerivedStats(char) {
        const rank = parseInt(char.rank, 10) || 1;
        
        // Kompatibilität mit might -> melee
        const abilities = char.abilities || {};
        const melee = parseInt(abilities.melee !== undefined ? abilities.melee : abilities.might, 10) || 0;
        const agility = parseInt(abilities.agility, 10) || 0;
        const resilience = parseInt(abilities.resilience, 10) || 0;
        const vigilance = parseInt(abilities.vigilance, 10) || 0;
        const ego = parseInt(abilities.ego, 10) || 0;
        const logic = parseInt(abilities.logic, 10) || 0;

        const scores = { melee, agility, resilience, vigilance, ego, logic };

        // Boni für Defenses (z. B. durch Powers wie Evasion, Integrity)
        const defenseBonuses = char.defenseBonuses || {};
        const defenses = {
            melee: 10 + melee + (parseInt(defenseBonuses.melee, 10) || 0),
            agility: 10 + agility + (parseInt(defenseBonuses.agility, 10) || 0),
            resilience: 10 + resilience + (parseInt(defenseBonuses.resilience, 10) || 0),
            vigilance: 10 + vigilance + (parseInt(defenseBonuses.vigilance, 10) || 0),
            ego: 10 + ego + (parseInt(defenseBonuses.ego, 10) || 0),
            logic: 10 + logic + (parseInt(defenseBonuses.logic, 10) || 0)
        };

        // Boni für Non-Combat Checks (z. B. durch Brilliance, Mighty etc.)
        const nonCombatBonuses = char.nonCombatBonuses || {};
        const nonCombatChecks = {
            melee: melee + (parseInt(nonCombatBonuses.melee, 10) || 0),
            agility: agility + (parseInt(nonCombatBonuses.agility, 10) || 0),
            resilience: resilience + (parseInt(nonCombatBonuses.resilience, 10) || 0),
            vigilance: vigilance + (parseInt(nonCombatBonuses.vigilance, 10) || 0),
            ego: ego + (parseInt(nonCombatBonuses.ego, 10) || 0),
            logic: logic + (parseInt(nonCombatBonuses.logic, 10) || 0)
        };

        // Gesundheit & Fokus (Resilience * 30 / Vigilance * 30)
        const maxHealth = Math.max(30, resilience * 30);
        const maxFocus = Math.max(30, vigilance * 30);

        // Schadensmultiplikatoren (Basis = Rank, plus Boni wie Mighty/Brilliance)
        const damageBonuses = char.damageBonuses || {};
        const damageMultipliers = {
            melee: rank + (parseInt(damageBonuses.melee, 10) || 0),
            agility: rank + (parseInt(damageBonuses.agility, 10) || 0),
            ego: rank + (parseInt(damageBonuses.ego, 10) || 0),
            logic: rank + (parseInt(damageBonuses.logic, 10) || 0)
        };

        // Fortbewegungsraten (Run, Climb, Jump, Swim)
        const speedObj = char.speed || {};
        const runSpeed = parseInt(speedObj.run !== undefined ? speedObj.run : char.speed, 10) || 5;
        const climbSpeed = parseInt(speedObj.climb, 10) || runSpeed;
        const jumpSpeed = parseInt(speedObj.jump, 10) || runSpeed;
        const swimSpeed = parseInt(speedObj.swim, 10) || Math.floor(runSpeed / 2);
        const extraSpeeds = Array.isArray(speedObj.extra) ? speedObj.extra : [];

        // Initiative Modifikator (+Vigilance, optional mit Edge "E")
        const initiativeBase = vigilance;
        const initiativeEdge = Boolean(char.initiativeEdge);
        const initiativeText = (initiativeBase >= 0 ? `+${initiativeBase}` : `${initiativeBase}`) + (initiativeEdge ? 'E' : '');

        // Schadensreduktion (Damage Reduction)
        const drHealth = char.damageReductionHealth !== undefined && char.damageReductionHealth !== '' ? char.damageReductionHealth : '—';
        const drFocus = char.damageReductionFocus !== undefined && char.damageReductionFocus !== '' ? char.damageReductionFocus : '—';

        // Richtwerte nach Rang
        const rankLimits = this.RANK_INFO[rank] || this.RANK_INFO[1];

        return {
            rank,
            scores,
            defenses,
            defenseBonuses,
            nonCombatChecks,
            nonCombatBonuses,
            maxHealth,
            maxFocus,
            damageMultipliers,
            damageBonuses,
            speeds: {
                run: runSpeed,
                climb: climbSpeed,
                jump: jumpSpeed,
                swim: swimSpeed,
                extra: extraSpeeds
            },
            initiative: {
                base: initiativeBase,
                hasEdge: initiativeEdge,
                text: initiativeText
            },
            damageReduction: {
                health: drHealth,
                focus: drFocus
            },
            rankLimits
        };
    },

    /**
     * Berechnet die dynamischen Limits und Tausch-Budgets für Ability Points, Kräfte und Traits
     * gemäß Core Rulebook (Kräfte können 1:1 in Ability Points oder Traits umgewandelt werden).
     */
    calculateRuleLimits(char) {
        const rank = parseInt(char ? char.rank : 1, 10) || 1;
        const rankInfo = this.RANK_INFO[rank] || this.RANK_INFO[1];

        const basePowers = rankInfo.maxPowers;
        const baseTraits = rankInfo.maxTraits;
        const baseAbilityPoints = rankInfo.abilityPoints;
        const maxAbility = rankInfo.maxAbility;

        const actualPowers = (char && Array.isArray(char.powers)) ? char.powers.length : 0;
        const actualTraits = (char && Array.isArray(char.traits)) ? char.traits.length : 0;

        const abilities = (char && char.abilities) ? char.abilities : {};
        const spentAbilityPoints = ['melee', 'agility', 'resilience', 'vigilance', 'ego', 'logic']
            .reduce((sum, k) => sum + (parseInt(abilities[k], 10) || 0), 0);

        // Ungenutzte Kräfte aus dem Grundkontingent
        const unusedPowers = Math.max(0, basePowers - actualPowers);

        // Über das Grundkontingent hinaus genutzte Traits
        const extraTraitsUsed = Math.max(0, actualTraits - baseTraits);

        // Über das Grundbudget hinaus vergebene Ability Points
        const extraAbilityPointsUsed = Math.max(0, spentAbilityPoints - baseAbilityPoints);

        // Gesamtanzahl der in Traits und Ability Points getauschten Kräfte
        const totalTradedPowers = extraTraitsUsed + extraAbilityPointsUsed;

        // Dynamische Limits
        const allowedPowers = Math.max(0, basePowers - totalTradedPowers);
        const allowedTraits = baseTraits + Math.max(0, unusedPowers - extraAbilityPointsUsed);
        const allowedAbilityPoints = baseAbilityPoints + Math.max(0, unusedPowers - extraTraitsUsed);

        return {
            rank,
            basePowers,
            baseTraits,
            baseAbilityPoints,
            maxAbility,
            actualPowers,
            actualTraits,
            spentAbilityPoints,
            unusedPowers,
            extraTraitsUsed,
            extraAbilityPointsUsed,
            totalTradedPowers,
            allowedPowers,
            allowedTraits,
            allowedAbilityPoints
        };
    }
};

if (typeof module !== 'undefined' && module.exports) {
    module.exports = MMRPG_RULES;
}
