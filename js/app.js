/**
 * Marvel Multiverse RPG - App Controller
 * Unterstützt alle offiziellen Regeln und Felder laut Core Rulebook
 */

document.addEventListener('DOMContentLoaded', () => {
    // -------------------------------------------------------------------------
    // 1. Initialer Zustand & Einstellungen
    // -------------------------------------------------------------------------
    let currentTheme = 'dark';
    try {
        currentTheme = localStorage.getItem('mmrpg_theme') || 'dark';
    } catch (e) {}

    let showPowerDescriptions = false;
    try {
        showPowerDescriptions = localStorage.getItem('mmrpg_show_power_desc') === 'true';
    } catch (e) {}

    let ruleCompliance = true;
    try {
        const savedRules = localStorage.getItem('mmrpg_rule_compliance');
        ruleCompliance = savedRules !== null ? savedRules === 'true' : true;
    } catch (e) {}

    let compendiumMode = 'powers';

    function getRoster() {
        try {
            const raw = localStorage.getItem('mmrpg_saved_roster');
            return raw ? JSON.parse(raw) : [];
        } catch (e) {
            return [];
        }
    }

    let character = loadSavedCharacter();
    if (!character) {
        const roster = getRoster();
        if (roster.length > 0 && roster[0].data) {
            character = JSON.parse(JSON.stringify(roster[0].data));
        } else if (typeof SAMPLE_CHARACTERS !== 'undefined' && SAMPLE_CHARACTERS["blank"]) {
            character = JSON.parse(JSON.stringify(SAMPLE_CHARACTERS["blank"]));
        } else {
            character = {};
        }
    }

    // Sanity checks für fehlende Felder
    ensureCharacterStructure(character);

    // DOM-Elemente
    const elements = {
        // Kern-Metriken
        rank: document.getElementById('char-rank'),
        karma: document.getElementById('char-karma'),
        valHealthMax: document.getElementById('val-health-max'),
        drHealth: document.getElementById('char-dr-health'),
        valFocusMax: document.getElementById('val-focus-max'),
        drFocus: document.getElementById('char-dr-focus'),
        valInitiative: document.getElementById('val-initiative-display'),
        initiativeEdge: document.getElementById('char-initiative-edge'),
        rankLimitsDisplay: document.getElementById('rank-limits-display'),

        // Identität & Physische Details
        charName: document.getElementById('char-name'),
        realName: document.getElementById('char-real-name'),
        playerName: document.getElementById('char-player-name'),
        height: document.getElementById('char-height'),
        weight: document.getElementById('char-weight'),
        gender: document.getElementById('char-gender'),
        eyes: document.getElementById('char-eyes'),
        hair: document.getElementById('char-hair'),
        size: document.getElementById('char-size'),
        distFeatures: document.getElementById('char-dist-features'),
        origin: document.getElementById('char-origin'),
        originPresetSelect: document.getElementById('origin-preset-select'),
        occupation: document.getElementById('char-occupation'),
        occupationPresetSelect: document.getElementById('occupation-preset-select'),
        identity: document.getElementById('char-identity'),
        base: document.getElementById('char-base'),
        teams: document.getElementById('char-teams'),

        // Fortbewegung (Speed)
        speedRun: document.getElementById('speed-run'),
        speedClimb: document.getElementById('speed-climb'),
        speedJump: document.getElementById('speed-jump'),
        speedSwim: document.getElementById('speed-swim'),
        extraSpeedsContainer: document.getElementById('extra-speeds-container'),
        btnAddExtraSpeed: document.getElementById('btn-add-extra-speed'),

        // M.A.R.V.E.L. Inputs (Score, Def Bonus, Check Bonus)
        abilities: {
            melee: {
                score: document.getElementById('stat-melee'),
                defVal: document.getElementById('def-val-melee'),
                defBonus: document.getElementById('bonus-def-melee'),
                checkVal: document.getElementById('check-val-melee'),
                checkBonus: document.getElementById('bonus-check-melee')
            },
            agility: {
                score: document.getElementById('stat-agility'),
                defVal: document.getElementById('def-val-agility'),
                defBonus: document.getElementById('bonus-def-agility'),
                checkVal: document.getElementById('check-val-agility'),
                checkBonus: document.getElementById('bonus-check-agility')
            },
            resilience: {
                score: document.getElementById('stat-resilience'),
                defVal: document.getElementById('def-val-resilience'),
                defBonus: document.getElementById('bonus-def-resilience'),
                checkVal: document.getElementById('check-val-resilience'),
                checkBonus: document.getElementById('bonus-check-resilience')
            },
            vigilance: {
                score: document.getElementById('stat-vigilance'),
                defVal: document.getElementById('def-val-vigilance'),
                defBonus: document.getElementById('bonus-def-vigilance'),
                checkVal: document.getElementById('check-val-vigilance'),
                checkBonus: document.getElementById('bonus-check-vigilance')
            },
            ego: {
                score: document.getElementById('stat-ego'),
                defVal: document.getElementById('def-val-ego'),
                defBonus: document.getElementById('bonus-def-ego'),
                checkVal: document.getElementById('check-val-ego'),
                checkBonus: document.getElementById('bonus-check-ego')
            },
            logic: {
                score: document.getElementById('stat-logic'),
                defVal: document.getElementById('def-val-logic'),
                defBonus: document.getElementById('bonus-def-logic'),
                checkVal: document.getElementById('check-val-logic'),
                checkBonus: document.getElementById('bonus-check-logic')
            }
        },

        // Damage Multiplier & Boni
        damage: {
            melee: { disp: document.getElementById('disp-damage-melee'), bonus: document.getElementById('dmg-bonus-melee') },
            agility: { disp: document.getElementById('disp-damage-agility'), bonus: document.getElementById('dmg-bonus-agility') },
            ego: { disp: document.getElementById('disp-damage-ego'), bonus: document.getElementById('dmg-bonus-ego') },
            logic: { disp: document.getElementById('disp-damage-logic'), bonus: document.getElementById('dmg-bonus-logic') }
        },

        // Powers, Traits & Tags
        powersList: document.getElementById('powers-list'),
        powerCountBadge: document.getElementById('power-count-badge'),
        btnAddPower: document.getElementById('btn-add-power'),
        traitsList: document.getElementById('traits-list'),
        traitCountBadge: document.getElementById('trait-count-badge'),
        btnAddTrait: document.getElementById('btn-add-trait'),
        tagsList: document.getElementById('tags-list'),
        tagInput: document.getElementById('tag-input'),
        btnAddTag: document.getElementById('btn-add-tag'),

        // Texte (History & Personality)
        history: document.getElementById('char-history'),
        personality: document.getElementById('char-personality'),

        // Navigation Tabs & Main Views
        mainContent: document.querySelector('.main-content'),
        printSheet: document.getElementById('print-sheet'),
        tabEditor: document.getElementById('tab-editor'),
        tabPreview: document.getElementById('tab-preview'),

        // Header Actions
        presetSelect: document.getElementById('preset-select'),
        btnDeleteHero: document.getElementById('btn-delete-hero'),
        btnExportJson: document.getElementById('btn-export-json'),
        btnImportJson: document.getElementById('btn-import-json'),
        fileInput: document.getElementById('file-input'),
        btnPrint: document.getElementById('btn-print'),
        btnResetSheet: document.getElementById('btn-reset-sheet'),
        btnSettingsOpen: document.getElementById('btn-settings-open'),

        // Settings Modal
        settingsModal: document.getElementById('settings-modal'),
        btnCloseSettings: document.getElementById('btn-close-settings'),
        btnCloseSettingsDone: document.getElementById('btn-close-settings-done'),
        languageSelect: document.getElementById('language-select'),
        toggleRuleCompliance: document.getElementById('toggle-rule-compliance'),
        toggleRuleComplianceSettings: document.getElementById('toggle-rule-compliance-settings'),
        btnThemeToggle: document.getElementById('btn-theme-toggle'),
        themeIcon: document.getElementById('theme-icon'),
        themeLabel: document.getElementById('theme-label'),

        togglePowerDescEditor: document.getElementById('toggle-power-desc-editor'),
        togglePowerDescPreview: document.getElementById('toggle-power-desc-preview'),
        previewToolbar: document.getElementById('preview-toolbar'),

        // Bogen-Vorschau Toolbar & Portrait
        btnUploadPortrait: document.getElementById('btn-upload-portrait'),
        btnUrlPortrait: document.getElementById('btn-url-portrait'),
        btnRemovePortrait: document.getElementById('btn-remove-portrait'),
        portraitFileInput: document.getElementById('portrait-file-input'),
        portraitWidthRange: document.getElementById('portrait-width-range'),
        portraitWidthNum: document.getElementById('portrait-width-num'),
        portraitHeightRange: document.getElementById('portrait-height-range'),
        portraitHeightNum: document.getElementById('portrait-height-num'),
        btnFitOriginalSize: document.getElementById('btn-fit-original-size'),
        btnResetPortraitSize: document.getElementById('btn-reset-portrait-size'),

        // Offizielle Regeln & Punktebudget
        valAbilitySpent: document.getElementById('val-ability-spent'),
        valAbilityMax: document.getElementById('val-ability-max'),
        badgeAbilityStatus: document.getElementById('badge-ability-status'),
        abilityPointsBudget: document.getElementById('ability-points-budget'),
        rulePowersCurrent: document.getElementById('rule-powers-current'),

        // Compendium / Bibliothek
        btnOpenPowersCompendium: document.getElementById('btn-open-powers-compendium'),
        btnOpenTraitsCompendium: document.getElementById('btn-open-traits-compendium'),
        tagPickerSelect: document.getElementById('tag-picker-select'),
        compendiumModal: document.getElementById('compendium-modal'),
        compendiumTitle: document.getElementById('compendium-modal-title'),
        compendiumSearchInput: document.getElementById('compendium-search-input'),
        compendiumFilterSet: document.getElementById('compendium-filter-set'),
        compendiumResultsList: document.getElementById('compendium-results-list'),
        btnCloseCompendium: document.getElementById('btn-close-compendium'),

        // Language Welcome Modal
        languageWelcomeModal: document.getElementById('language-welcome-modal'),
        btnCloseLangModal: document.getElementById('btn-close-lang-modal'),

        // Toast
        toastContainer: document.getElementById('toast-container')
    };

    // -------------------------------------------------------------------------
    // 2. Initialisierung & Dropdowns
    // -------------------------------------------------------------------------
    function populateDropdowns() {
        const origins = (typeof MMRPG_I18N !== 'undefined') ? MMRPG_I18N.getDropdownList('origins') : {};
        const occupations = (typeof MMRPG_I18N !== 'undefined') ? MMRPG_I18N.getDropdownList('occupations') : {};
        const sizes = (typeof MMRPG_I18N !== 'undefined') ? MMRPG_I18N.getDropdownList('sizes') : {};
        const identities = (typeof MMRPG_I18N !== 'undefined') ? MMRPG_I18N.getDropdownList('identities') : {};

        const currentOrigin = character.origin || '';
        const currentOccupation = character.occupation || '';
        const currentSize = character.size || 'Average';
        const currentIdentity = character.identity || 'Geheim';

        const optPresetLabel = (typeof MMRPG_I18N !== 'undefined') ? MMRPG_I18N.t('opt_pick_preset') : '★ Vorgabe...';

        if (elements.originPresetSelect) {
            elements.originPresetSelect.innerHTML = `<option value="">${escapeHtml(optPresetLabel)}</option>` + 
                Object.entries(origins).map(([val, label]) => 
                    `<option value="${escapeHtml(val)}">${escapeHtml(label)}</option>`
                ).join('');
        }
        if (elements.origin) {
            elements.origin.value = currentOrigin;
        }

        if (elements.occupationPresetSelect) {
            elements.occupationPresetSelect.innerHTML = `<option value="">${escapeHtml(optPresetLabel)}</option>` + 
                Object.entries(occupations).map(([val, label]) => 
                    `<option value="${escapeHtml(val)}">${escapeHtml(label)}</option>`
                ).join('');
        }
        if (elements.occupation) {
            elements.occupation.value = currentOccupation;
        }

        if (elements.size) {
            elements.size.innerHTML = Object.entries(sizes).map(([val, label]) => 
                `<option value="${escapeHtml(val)}">${escapeHtml(label)}</option>`
            ).join('');
        }

        if (elements.identity) {
            elements.identity.innerHTML = Object.entries(identities).map(([val, label]) => 
                `<option value="${escapeHtml(val)}">${escapeHtml(label)}</option>`
            ).join('');
        }

        // Werte mit Toleranz gegen alte Werte (mit Klammern) abgleichen
        const matchOption = (selectEl, targetVal) => {
            if (!selectEl || !targetVal || !selectEl.options) return;
            const cleanTarget = targetVal.split('(')[0].trim().toLowerCase();
            for (let i = 0; i < selectEl.options.length; i++) {
                const optVal = selectEl.options[i].value.toLowerCase();
                const optText = selectEl.options[i].text.toLowerCase();
                if (optVal === cleanTarget || optText === cleanTarget || cleanTarget.includes(optVal) || optVal.includes(cleanTarget)) {
                    selectEl.selectedIndex = i;
                    return;
                }
            }
        };

        matchOption(elements.size, currentSize);
        matchOption(elements.identity, currentIdentity);
        
        if (elements.tagPickerSelect && typeof MMRPG_COMPENDIUM !== 'undefined') {
            const defaultTagPrompt = (typeof MMRPG_I18N !== 'undefined') ? MMRPG_I18N.t('tag_picker_default') : '★ Tag aus Liste wählen...';
            elements.tagPickerSelect.innerHTML = `<option value="">${escapeHtml(defaultTagPrompt)}</option>` + 
                MMRPG_COMPENDIUM.TAGS.map(t => `<option value="${escapeHtml(t)}">${escapeHtml(t)}</option>`).join('');
        }
    }

    // -------------------------------------------------------------------------
    // 3. UI Rendern & Werte synchronisieren
    // -------------------------------------------------------------------------
    function renderAll(renderLists = true) {
        try {
            ensureCharacterStructure(character);
            const derived = MMRPG_RULES.calculateDerivedStats(character);

            // Basis-Metriken
            elements.rank.value = character.rank || 1;
            elements.karma.value = character.karma || character.rank || 1;
            elements.valHealthMax.textContent = derived.maxHealth;
            elements.drHealth.value = character.damageReductionHealth !== undefined ? character.damageReductionHealth : '—';
            elements.valFocusMax.textContent = derived.maxFocus;
            elements.drFocus.value = character.damageReductionFocus !== undefined ? character.damageReductionFocus : '—';
            elements.valInitiative.textContent = derived.initiative.text;
            elements.initiativeEdge.checked = Boolean(character.initiativeEdge);

            const limits = MMRPG_RULES.calculateRuleLimits(character);

            if (elements.rankLimitsDisplay) {
                elements.rankLimitsDisplay.innerHTML = (typeof MMRPG_I18N !== 'undefined')
                    ? MMRPG_I18N.t('rank_limits_display', {
                        maxAbility: limits.maxAbility,
                        actualPowers: limits.actualPowers,
                        allowedPowers: limits.allowedPowers,
                        actualTraits: limits.actualTraits,
                        allowedTraits: limits.allowedTraits
                    })
                    : `Max. Attribut: <strong>${limits.maxAbility}</strong> | Powers: <strong>${limits.actualPowers}/${limits.allowedPowers}</strong> | Traits: <strong>${limits.actualTraits}/${limits.allowedTraits}</strong>`;
            }

            // Regelkonformitäts-Zustand & Notizen synchronisieren
            document.body.classList.toggle('rules-disabled', !ruleCompliance);
            if (elements.toggleRuleCompliance) elements.toggleRuleCompliance.checked = ruleCompliance;
        if (elements.toggleRuleComplianceSettings) elements.toggleRuleComplianceSettings.checked = ruleCompliance;
            if (elements.toggleRuleComplianceSettings) elements.toggleRuleComplianceSettings.checked = ruleCompliance;

            // Regel-Notizen Texte mit dynamischen Werten in aktiver Sprache synchronisieren
            const noteRankText = document.querySelector('#rule-note-rank .rule-note-text');
            if (noteRankText && typeof MMRPG_I18N !== 'undefined') {
                noteRankText.innerHTML = MMRPG_I18N.t('rule_note_rank', {
                    points: limits.baseAbilityPoints,
                    cap: limits.maxAbility,
                    powers: limits.basePowers,
                    traits: limits.baseTraits
                });
            }

            const noteAbilitiesText = document.querySelector('#rule-note-abilities .rule-note-text');
            if (noteAbilitiesText && typeof MMRPG_I18N !== 'undefined') {
                noteAbilitiesText.innerHTML = MMRPG_I18N.t('rule_note_abilities', {
                    points: limits.allowedAbilityPoints,
                    cap: limits.maxAbility
                });
            }

            const noteDamageText = document.querySelector('#rule-note-damage .rule-note-text');
            if (noteDamageText && typeof MMRPG_I18N !== 'undefined') {
                noteDamageText.innerHTML = MMRPG_I18N.t('rule_note_damage');
            }

            const notePowersText = document.querySelector('#rule-note-powers .rule-note-text');
            if (notePowersText && typeof MMRPG_I18N !== 'undefined') {
                notePowersText.innerHTML = MMRPG_I18N.t('rule_note_powers', {
                    powers: limits.allowedPowers
                });
            }

            const noteTraitsText = document.querySelector('#rule-note-traits .rule-note-text');
            if (noteTraitsText && typeof MMRPG_I18N !== 'undefined') {
                noteTraitsText.innerHTML = MMRPG_I18N.t('rule_note_traits', {
                    traits: limits.allowedTraits
                });
            }

            document.querySelectorAll('.rule-rank-num').forEach(el => el.textContent = limits.rank);
            document.querySelectorAll('.rule-base-points-num').forEach(el => el.textContent = limits.baseAbilityPoints);
            document.querySelectorAll('.rule-base-powers-num').forEach(el => el.textContent = limits.basePowers);
            document.querySelectorAll('.rule-base-traits-num').forEach(el => el.textContent = limits.baseTraits);
            document.querySelectorAll('.rule-cap-num').forEach(el => el.textContent = limits.maxAbility);

            // Dynamisch erlaubte Limits (inkl. Tausch von Kräften)
            document.querySelectorAll('.rule-points-num').forEach(el => el.textContent = limits.allowedAbilityPoints);
            document.querySelectorAll('.rule-powers-num').forEach(el => el.textContent = limits.allowedPowers);
            document.querySelectorAll('.rule-traits-num').forEach(el => el.textContent = limits.allowedTraits);

            // Ability Points Budget & Status
            const spentPoints = limits.spentAbilityPoints;
            const basePoints = limits.baseAbilityPoints;
            const allowedPoints = limits.allowedAbilityPoints;

            if (elements.valAbilitySpent) elements.valAbilitySpent.textContent = spentPoints;

            if (!ruleCompliance) {
                if (elements.valAbilityMax) elements.valAbilityMax.textContent = '∞';
                if (elements.badgeAbilityStatus) {
                    elements.badgeAbilityStatus.textContent = (typeof MMRPG_I18N !== 'undefined') ? MMRPG_I18N.t('points_free') : 'Freier Modus';
                    elements.badgeAbilityStatus.className = 'points-status-badge status-free';
                }
                if (elements.abilityPointsBudget) {
                    elements.abilityPointsBudget.title = (typeof MMRPG_I18N !== 'undefined') ? MMRPG_I18N.t('toast_rules_off') : 'Regeln sind deaktiviert. Freie Punkteverteilung ohne Begrenzung.';
                }
            } else {
                if (spentPoints <= basePoints) {
                    if (elements.valAbilityMax) elements.valAbilityMax.textContent = basePoints;
                    const remaining = basePoints - spentPoints;
                    if (elements.badgeAbilityStatus) {
                        if (remaining === 0) {
                            elements.badgeAbilityStatus.textContent = (typeof MMRPG_I18N !== 'undefined') ? MMRPG_I18N.t('points_perfect') : '✓ 0 übrig (Perfekt)';
                            elements.badgeAbilityStatus.className = 'points-status-badge status-exact';
                        } else {
                            elements.badgeAbilityStatus.textContent = (typeof MMRPG_I18N !== 'undefined') ? MMRPG_I18N.t('points_remaining', { n: remaining }) : `${remaining} übrig`;
                            elements.badgeAbilityStatus.className = 'points-status-badge status-under';
                        }
                    }
                    if (elements.abilityPointsBudget) {
                        elements.abilityPointsBudget.title = `Budget: ${basePoints} Ability Points (${spentPoints} verteilt, ${basePoints - spentPoints} übrig).`;
                    }
                } else if (spentPoints <= allowedPoints) {
                    const traded = spentPoints - basePoints;
                    if (elements.valAbilityMax) elements.valAbilityMax.textContent = `${basePoints}+${traded}`;
                    if (elements.badgeAbilityStatus) {
                        elements.badgeAbilityStatus.textContent = (typeof MMRPG_I18N !== 'undefined') ? MMRPG_I18N.t('points_traded', { n: traded }) : `✓ +${traded} aus Kräften`;
                        elements.badgeAbilityStatus.className = 'points-status-badge status-exact';
                    }
                    if (elements.abilityPointsBudget) {
                        elements.abilityPointsBudget.title = `${traded} unverbrauchte Kräfte in Ability Points getauscht.`;
                    }
                } else {
                    const over = spentPoints - allowedPoints;
                    if (elements.valAbilityMax) elements.valAbilityMax.textContent = allowedPoints;
                    if (elements.badgeAbilityStatus) {
                        elements.badgeAbilityStatus.textContent = (typeof MMRPG_I18N !== 'undefined') ? MMRPG_I18N.t('points_over', { n: over }) : `⚠️ +${over} zu viel!`;
                        elements.badgeAbilityStatus.className = 'points-status-badge status-over';
                    }
                    if (elements.abilityPointsBudget) {
                        elements.abilityPointsBudget.title = `Punktebudget um ${over} Punkte überschritten!`;
                    }
                }
            }

            // Identität & Physisches
            if (renderLists) {
                elements.charName.value = character.name || '';
                elements.realName.value = character.realName || '';
                elements.playerName.value = character.player || '';
                elements.height.value = character.height || '';
                elements.weight.value = character.weight || '';
                elements.gender.value = character.gender || '';
                elements.eyes.value = character.eyes || '';
                elements.hair.value = character.hair || '';
                elements.size.value = character.size || MMRPG_RULES.SIZES[0];
                elements.distFeatures.value = character.distinguishingFeatures || '';
                elements.origin.value = character.origin || MMRPG_RULES.ORIGINS[0];
                elements.occupation.value = character.occupation || MMRPG_RULES.OCCUPATIONS[0];
                elements.identity.value = character.identity || 'Geheim (Secret Identity)';
                elements.base.value = character.base || '';
                elements.teams.value = character.teams || '';

                // Fortbewegung
                elements.speedRun.value = derived.speeds.run;
                elements.speedClimb.value = derived.speeds.climb;
                elements.speedJump.value = derived.speeds.jump;
                elements.speedSwim.value = derived.speeds.swim;
                renderExtraSpeeds();
            }

            // M.A.R.V.E.L. Attribute
            ['melee', 'agility', 'resilience', 'vigilance', 'ego', 'logic'].forEach(key => {
                const el = elements.abilities[key];
                if (el) {
                    el.score.value = derived.scores[key];
                    if (ruleCompliance) {
                        el.score.setAttribute('min', '-3');
                        el.score.setAttribute('max', String(derived.rankLimits.maxAbility));
                    } else {
                        el.score.setAttribute('min', '-20');
                        el.score.setAttribute('max', '50');
                    }
                    el.defVal.textContent = derived.defenses[key];
                    el.defBonus.value = character.defenseBonuses[key] || 0;
                    el.checkVal.textContent = (derived.nonCombatChecks[key] >= 0 ? `+${derived.nonCombatChecks[key]}` : `${derived.nonCombatChecks[key]}`);
                    el.checkBonus.value = character.nonCombatBonuses[key] || 0;
                }
            });

            // Damage Multipliers
            elements.damage.melee.disp.textContent = `M-Dice × ${derived.damageMultipliers.melee} + ${derived.scores.melee}`;
            elements.damage.melee.bonus.value = character.damageBonuses.melee || 0;

            elements.damage.agility.disp.textContent = `M-Dice × ${derived.damageMultipliers.agility} + ${derived.scores.agility}`;
            elements.damage.agility.bonus.value = character.damageBonuses.agility || 0;

            elements.damage.ego.disp.textContent = `M-Dice × ${derived.damageMultipliers.ego} + ${derived.scores.ego}`;
            elements.damage.ego.bonus.value = character.damageBonuses.ego || 0;

            elements.damage.logic.disp.textContent = `M-Dice × ${derived.damageMultipliers.logic} + ${derived.scores.logic}`;
            elements.damage.logic.bonus.value = character.damageBonuses.logic || 0;

            if (renderLists) {
                // Texte
                elements.history.value = character.history || '';
                elements.personality.value = character.personality || '';

                // Listen
                renderPowers();
                renderTraits();
                renderTags();
            }

            // Print-Sheet aktualisieren
            updatePrintSheet(derived);

            // Auto-Save
            saveCharacterLocally();
        } catch (err) {
            console.error("Fehler beim Rendern des Charakterblatts:", err);
        }
    }

    // -------------------------------------------------------------------------
    // 4. Fortbewegung (Speeds) & Zusätzliche Modi (z.B. Swingline, Glide)
    // -------------------------------------------------------------------------
    function renderExtraSpeeds() {
        const list = character.speed.extra || [];
        if (list.length === 0) {
            const emptyTxt = (typeof MMRPG_I18N !== 'undefined') ? MMRPG_I18N.t('empty_extra_speeds') : 'Keine zusätzlichen Fortbewegungsarten eingetragen.';
            elements.extraSpeedsContainer.innerHTML = `<div style="font-size: 0.8rem; color: var(--text-dim); margin-bottom: 8px;">${emptyTxt}</div>`;
            return;
        }

        const namePh = (typeof MMRPG_I18N !== 'undefined') ? MMRPG_I18N.t('ph_extra_speed_name') : 'z.B. Flight, Swingline, Glide';
        const valPh = (typeof MMRPG_I18N !== 'undefined') ? MMRPG_I18N.t('ph_extra_speed_val') : 'Wert';
        const moveUpTitle = (typeof MMRPG_I18N !== 'undefined') ? MMRPG_I18N.t('btn_move_up') : 'Nach oben verschieben';
        const moveDownTitle = (typeof MMRPG_I18N !== 'undefined') ? MMRPG_I18N.t('btn_move_down') : 'Nach unten verschieben';

        elements.extraSpeedsContainer.innerHTML = list.map((item, idx) => `
            <div class="extra-speed-item" data-index="${idx}">
                <input type="text" class="form-input extra-speed-name" value="${escapeHtml(item.name)}" placeholder="${escapeHtml(namePh)}" style="flex: 2;">
                <input type="number" class="form-input extra-speed-val" value="${item.value || 0}" min="1" max="500" style="width: 80px;" placeholder="${escapeHtml(valPh)}">
                <div style="display: flex; gap: 3px; align-items: center;">
                    <button class="btn btn-secondary btn-sm btn-move-speed-up" data-index="${idx}" title="${escapeHtml(moveUpTitle)}" ${idx === 0 ? 'disabled style="opacity: 0.35; cursor: not-allowed;"' : ''}>▲</button>
                    <button class="btn btn-secondary btn-sm btn-move-speed-down" data-index="${idx}" title="${escapeHtml(moveDownTitle)}" ${idx === list.length - 1 ? 'disabled style="opacity: 0.35; cursor: not-allowed;"' : ''}>▼</button>
                    <button class="btn btn-danger btn-sm btn-delete-extra-speed" data-index="${idx}" title="✕">✕</button>
                </div>
            </div>
        `).join('');

        elements.extraSpeedsContainer.querySelectorAll('.extra-speed-name').forEach((inp, idx) => {
            inp.addEventListener('input', e => { character.speed.extra[idx].name = e.target.value; saveCharacterLocally(); updatePrintSheet(); });
        });
        elements.extraSpeedsContainer.querySelectorAll('.extra-speed-val').forEach((inp, idx) => {
            inp.addEventListener('input', e => { character.speed.extra[idx].value = parseInt(e.target.value, 10) || 0; saveCharacterLocally(); updatePrintSheet(); });
        });

        elements.extraSpeedsContainer.querySelectorAll('.btn-move-speed-up').forEach(btn => {
            btn.addEventListener('click', () => {
                const idx = parseInt(btn.dataset.index, 10);
                if (idx > 0) {
                    const temp = character.speed.extra[idx];
                    character.speed.extra[idx] = character.speed.extra[idx - 1];
                    character.speed.extra[idx - 1] = temp;
                    renderExtraSpeeds();
                    saveCharacterLocally();
                    updatePrintSheet();
                }
            });
        });
        elements.extraSpeedsContainer.querySelectorAll('.btn-move-speed-down').forEach(btn => {
            btn.addEventListener('click', () => {
                const idx = parseInt(btn.dataset.index, 10);
                if (idx < character.speed.extra.length - 1) {
                    const temp = character.speed.extra[idx];
                    character.speed.extra[idx] = character.speed.extra[idx + 1];
                    character.speed.extra[idx + 1] = temp;
                    renderExtraSpeeds();
                    saveCharacterLocally();
                    updatePrintSheet();
                }
            });
        });

        elements.extraSpeedsContainer.querySelectorAll('.btn-delete-extra-speed').forEach((btn, idx) => {
            btn.addEventListener('click', () => {
                const idx = parseInt(btn.dataset.index, 10);
                character.speed.extra.splice(idx, 1);
                renderExtraSpeeds();
                saveCharacterLocally();
                updatePrintSheet();
            });
        });
    }

    if (elements.btnAddExtraSpeed) {
        elements.btnAddExtraSpeed.addEventListener('click', () => {
            if (!character.speed.extra) character.speed.extra = [];
            const defaultSpeedName = (typeof MMRPG_I18N !== 'undefined') ? MMRPG_I18N.t('default_extra_speed_name') : 'Flight';
            character.speed.extra.unshift({ id: 'spd-' + Date.now(), name: defaultSpeedName, value: 12 });
            renderExtraSpeeds();
            const firstItem = elements.extraSpeedsContainer.querySelector('.extra-speed-item');
            if (firstItem) firstItem.classList.add('item-newly-added');
            saveCharacterLocally();
            updatePrintSheet();
            showToast((typeof MMRPG_I18N !== 'undefined') ? MMRPG_I18N.t('toast_speed_added') : "Fortbewegungsart hinzugefügt.");

            // Erstes Eingabefeld fokussieren
            const firstInput = elements.extraSpeedsContainer.querySelector('.extra-speed-name');
            if (firstInput) {
                firstInput.focus();
                firstInput.select();
            }
        });
    }

    // -------------------------------------------------------------------------
    // 5. Powers rendern & verwalten
    // -------------------------------------------------------------------------
    function renderPowers() {
        const limits = MMRPG_RULES.calculateRuleLimits(character);
        elements.powerCountBadge.textContent = ruleCompliance ? `${limits.actualPowers} / ${limits.allowedPowers}` : limits.actualPowers;

        if (character.powers.length === 0) {
            const emptyPowers = (typeof MMRPG_I18N !== 'undefined') ? MMRPG_I18N.t('empty_powers_editor') : 'Noch keine Kräfte eingetragen. Klicke auf <strong>+ Neue Kraft</strong>!';
            elements.powersList.innerHTML = `<div class="empty-state">${emptyPowers}</div>`;
            return;
        }

        const lblName = (typeof MMRPG_I18N !== 'undefined') ? MMRPG_I18N.t('lbl_power_name') : 'Kraft-Name';
        const lblSet = (typeof MMRPG_I18N !== 'undefined') ? MMRPG_I18N.t('lbl_power_set') : 'Kraftgruppe (Power Set)';
        const lblAction = (typeof MMRPG_I18N !== 'undefined') ? MMRPG_I18N.t('lbl_power_action') : 'Aktion';
        const lblCost = (typeof MMRPG_I18N !== 'undefined') ? MMRPG_I18N.t('lbl_power_cost') : 'Fokus-Kosten';
        const lblRange = (typeof MMRPG_I18N !== 'undefined') ? MMRPG_I18N.t('lbl_power_range') : 'Reichweite';
        const lblDesc = (typeof MMRPG_I18N !== 'undefined') ? MMRPG_I18N.t('lbl_power_desc') : 'Beschreibung / Effekt';

        const phName = (typeof MMRPG_I18N !== 'undefined') ? MMRPG_I18N.t('ph_power_name') : 'z.B. Mighty 1, Evasion, Flight';
        const phRange = (typeof MMRPG_I18N !== 'undefined') ? MMRPG_I18N.t('ph_power_range') : 'Nahkampf, 10 Felder...';
        const phDesc = (typeof MMRPG_I18N !== 'undefined') ? MMRPG_I18N.t('ph_power_desc') : 'Effekt, Schaden, Dauer...';

        const titleDel = (typeof MMRPG_I18N !== 'undefined') ? MMRPG_I18N.t('btn_delete_power_title') : 'Kraft entfernen';
        const titleUp = (typeof MMRPG_I18N !== 'undefined') ? MMRPG_I18N.t('btn_move_up') : 'Nach oben verschieben';
        const titleDown = (typeof MMRPG_I18N !== 'undefined') ? MMRPG_I18N.t('btn_move_down') : 'Nach unten verschieben';

        const curLang = (typeof MMRPG_I18N !== 'undefined') ? MMRPG_I18N.currentLang : 'de';

        elements.powersList.innerHTML = character.powers.map((p, idx) => {
            const cleanSet = (typeof MMRPG_COMPENDIUM !== 'undefined' && MMRPG_COMPENDIUM.getCleanSetName)
                ? MMRPG_COMPENDIUM.getCleanSetName(p.set)
                : (p.set ? p.set.split('(')[0].trim() : 'Basic');

            return `
            <div class="power-item" data-index="${idx}">
                <div class="form-group">
                    <label class="form-label">${escapeHtml(lblName)}</label>
                    <input type="text" class="form-input power-name" value="${escapeHtml(p.name || '')}" placeholder="${escapeHtml(phName)}">
                </div>
                <div class="form-group">
                    <label class="form-label">${escapeHtml(lblSet)}</label>
                    <select class="form-select power-set">
                        ${MMRPG_RULES.POWER_SETS.map(set => {
                            const isSel = (cleanSet === set || p.set === set);
                            return `<option value="${escapeHtml(set)}" ${isSel ? 'selected' : ''}>${escapeHtml(set)}</option>`;
                        }).join('')}
                    </select>
                </div>
                <div class="form-group">
                    <label class="form-label">${escapeHtml(lblAction)}</label>
                    <select class="form-select power-action">
                        ${MMRPG_RULES.ACTION_TYPES.map(act => {
                            const locAct = (typeof MMRPG_COMPENDIUM !== 'undefined' && MMRPG_COMPENDIUM.getLocalizedAction) ? MMRPG_COMPENDIUM.getLocalizedAction(act, curLang) : act;
                            return `<option value="${escapeHtml(act)}" ${p.action === act ? 'selected' : ''}>${escapeHtml(locAct)}</option>`;
                        }).join('')}
                        <option value="Permanent" ${p.action === 'Permanent' ? 'selected' : ''}>${(typeof MMRPG_COMPENDIUM !== 'undefined' && MMRPG_COMPENDIUM.getLocalizedAction) ? MMRPG_COMPENDIUM.getLocalizedAction('Permanent', curLang) : 'Permanent'}</option>
                    </select>
                </div>
                <div class="form-group">
                    <label class="form-label">${escapeHtml(lblCost)}</label>
                    <input type="number" class="form-input power-cost" value="${p.cost || 0}" min="0" max="100">
                </div>
                <div class="form-group">
                    <label class="form-label">${escapeHtml(lblRange)}</label>
                    <input type="text" class="form-input power-range" value="${escapeHtml(p.range || '')}" placeholder="${escapeHtml(phRange)}">
                </div>
                <div style="display: flex; gap: 4px; align-items: center; justify-content: flex-end;">
                    <button class="btn btn-secondary btn-sm btn-move-power-up" data-index="${idx}" title="${escapeHtml(titleUp)}" ${idx === 0 ? 'disabled style="opacity: 0.35; cursor: not-allowed;"' : ''}>▲</button>
                    <button class="btn btn-secondary btn-sm btn-move-power-down" data-index="${idx}" title="${escapeHtml(titleDown)}" ${idx === character.powers.length - 1 ? 'disabled style="opacity: 0.35; cursor: not-allowed;"' : ''}>▼</button>
                    <button class="btn btn-danger btn-sm btn-delete-power" title="${escapeHtml(titleDel)}">✕</button>
                </div>
                <div class="power-desc-full">
                    <label class="form-label" style="margin-bottom: 3px; display: block;">${escapeHtml(lblDesc)}</label>
                    <textarea class="form-input form-textarea power-effect" rows="3" style="width: 100%;" placeholder="${escapeHtml(phDesc)}">${escapeHtml(p.effect || '')}</textarea>
                </div>
            </div>
            `;
        }).join('');

        elements.powersList.querySelectorAll('.power-item').forEach(item => {
            const idx = parseInt(item.dataset.index, 10);
            item.querySelector('.power-name').addEventListener('input', e => { character.powers[idx].name = e.target.value; saveCharacterLocally(); updatePrintSheet(); });
            item.querySelector('.power-set').addEventListener('change', e => { character.powers[idx].set = e.target.value; saveCharacterLocally(); updatePrintSheet(); });
            item.querySelector('.power-action').addEventListener('change', e => { character.powers[idx].action = e.target.value; saveCharacterLocally(); updatePrintSheet(); });
            item.querySelector('.power-cost').addEventListener('input', e => { character.powers[idx].cost = parseInt(e.target.value, 10) || 0; saveCharacterLocally(); updatePrintSheet(); });
            item.querySelector('.power-range').addEventListener('input', e => { character.powers[idx].range = e.target.value; saveCharacterLocally(); updatePrintSheet(); });
            item.querySelector('.power-effect').addEventListener('input', e => { character.powers[idx].effect = e.target.value; saveCharacterLocally(); updatePrintSheet(); });
            
            const btnMoveUp = item.querySelector('.btn-move-power-up');
            if (btnMoveUp) {
                btnMoveUp.addEventListener('click', () => {
                    if (idx > 0) {
                        const temp = character.powers[idx];
                        character.powers[idx] = character.powers[idx - 1];
                        character.powers[idx - 1] = temp;
                        renderPowers();
                        updatePrintSheet();
                        saveCharacterLocally();
                    }
                });
            }
            const btnMoveDown = item.querySelector('.btn-move-power-down');
            if (btnMoveDown) {
                btnMoveDown.addEventListener('click', () => {
                    if (idx < character.powers.length - 1) {
                        const temp = character.powers[idx];
                        character.powers[idx] = character.powers[idx + 1];
                        character.powers[idx + 1] = temp;
                        renderPowers();
                        updatePrintSheet();
                        saveCharacterLocally();
                    }
                });
            }

            item.querySelector('.btn-delete-power').addEventListener('click', () => {
                character.powers.splice(idx, 1);
                renderAll();
                showToast((typeof MMRPG_I18N !== 'undefined') ? MMRPG_I18N.t('toast_power_removed') : "Kraft entfernt.");
            });
        });
    }

    if (elements.btnAddPower) {
        elements.btnAddPower.addEventListener('click', () => {
            if (ruleCompliance) {
                const limits = MMRPG_RULES.calculateRuleLimits(character);
                if (limits.actualPowers >= limits.allowedPowers) {
                    showToast((typeof MMRPG_I18N !== 'undefined') ? MMRPG_I18N.t('toast_max_powers', { actual: limits.actualPowers, allowed: limits.allowedPowers }) : `Maximale Anzahl an Kräften erreicht: ${limits.actualPowers} von ${limits.allowedPowers}.`);
                    return;
                }
            }
            const defaultPowName = (typeof MMRPG_I18N !== 'undefined') ? MMRPG_I18N.t('default_new_power') : 'Neue Kraft';
            character.powers.unshift({
                id: 'pow-' + Date.now(),
                name: defaultPowName,
                set: MMRPG_RULES.POWER_SETS[0],
                action: MMRPG_RULES.ACTION_TYPES[0],
                cost: 0,
                range: '',
                duration: 'Instant',
                effect: ''
            });
            renderPowers();
            renderTraits();
            renderAll(false);
            const firstItem = elements.powersList.querySelector('.power-item');
            if (firstItem) firstItem.classList.add('item-newly-added');
            showToast((typeof MMRPG_I18N !== 'undefined') ? MMRPG_I18N.t('toast_power_added') : "Kraft hinzugefügt.");
            
            // Erstes Eingabefeld fokussieren, damit sofort getippt werden kann
            const firstInput = elements.powersList.querySelector('.power-name');
            if (firstInput) {
                firstInput.focus();
                firstInput.select();
            }
        });
    }

    // -------------------------------------------------------------------------
    // 6. Traits & Tags rendern & verwalten
    // -------------------------------------------------------------------------
    function renderTraits() {
        const limits = MMRPG_RULES.calculateRuleLimits(character);
        if (elements.traitCountBadge) {
            elements.traitCountBadge.textContent = ruleCompliance ? `${limits.actualTraits} / ${limits.allowedTraits}` : limits.actualTraits;
        }

        if (!character.traits || character.traits.length === 0) {
            const emptyTraits = (typeof MMRPG_I18N !== 'undefined') ? MMRPG_I18N.t('empty_traits_editor') : 'Keine Traits eingetragen.';
            elements.traitsList.innerHTML = `<div class="empty-state">${emptyTraits}</div>`;
            return;
        }

        const phName = (typeof MMRPG_I18N !== 'undefined') ? MMRPG_I18N.t('ph_trait_name') : 'Trait-Name';
        const phDesc = (typeof MMRPG_I18N !== 'undefined') ? MMRPG_I18N.t('ph_trait_desc') : 'Beschreibung/Regel des Traits...';
        const titleDel = (typeof MMRPG_I18N !== 'undefined') ? MMRPG_I18N.t('btn_delete_trait_title') : 'Trait entfernen';
        const titleUp = (typeof MMRPG_I18N !== 'undefined') ? MMRPG_I18N.t('btn_move_up') : 'Nach oben verschieben';
        const titleDown = (typeof MMRPG_I18N !== 'undefined') ? MMRPG_I18N.t('btn_move_down') : 'Nach unten verschieben';

        elements.traitsList.innerHTML = character.traits.map((t, idx) => `
            <div class="trait-item">
                <div style="flex: 1;">
                    <input type="text" class="form-input trait-name" value="${escapeHtml(t.name || '')}" placeholder="${escapeHtml(phName)}" style="font-weight: bold; margin-bottom: 4px;">
                    <textarea class="form-input form-textarea trait-desc" rows="4" placeholder="${escapeHtml(phDesc)}">${escapeHtml(t.description || '')}</textarea>
                </div>
                <div style="display: flex; flex-direction: column; gap: 4px; align-items: flex-end;">
                    <div style="display: flex; gap: 3px;">
                        <button class="btn btn-secondary btn-sm btn-move-trait-up" data-index="${idx}" title="${escapeHtml(titleUp)}" ${idx === 0 ? 'disabled style="opacity: 0.35; cursor: not-allowed;"' : ''}>▲</button>
                        <button class="btn btn-secondary btn-sm btn-move-trait-down" data-index="${idx}" title="${escapeHtml(titleDown)}" ${idx === character.traits.length - 1 ? 'disabled style="opacity: 0.35; cursor: not-allowed;"' : ''}>▼</button>
                    </div>
                    <button class="btn btn-danger btn-sm btn-delete-trait" data-index="${idx}" title="${escapeHtml(titleDel)}">✕</button>
                </div>
            </div>
        `).join('');

        elements.traitsList.querySelectorAll('.trait-name').forEach((input, idx) => {
            input.addEventListener('input', e => { character.traits[idx].name = e.target.value; saveCharacterLocally(); updatePrintSheet(); });
        });
        elements.traitsList.querySelectorAll('.trait-desc').forEach((input, idx) => {
            input.addEventListener('input', e => { character.traits[idx].description = e.target.value; saveCharacterLocally(); updatePrintSheet(); });
        });
        
        elements.traitsList.querySelectorAll('.btn-move-trait-up').forEach(btn => {
            btn.addEventListener('click', () => {
                const idx = parseInt(btn.dataset.index, 10);
                if (idx > 0) {
                    const temp = character.traits[idx];
                    character.traits[idx] = character.traits[idx - 1];
                    character.traits[idx - 1] = temp;
                    renderTraits();
                    updatePrintSheet();
                    saveCharacterLocally();
                }
            });
        });
        elements.traitsList.querySelectorAll('.btn-move-trait-down').forEach(btn => {
            btn.addEventListener('click', () => {
                const idx = parseInt(btn.dataset.index, 10);
                if (idx < character.traits.length - 1) {
                    const temp = character.traits[idx];
                    character.traits[idx] = character.traits[idx + 1];
                    character.traits[idx + 1] = temp;
                    renderTraits();
                    updatePrintSheet();
                    saveCharacterLocally();
                }
            });
        });

        elements.traitsList.querySelectorAll('.btn-delete-trait').forEach(btn => {
            btn.addEventListener('click', () => {
                const idx = parseInt(btn.dataset.index, 10);
                character.traits.splice(idx, 1);
                renderAll();
                showToast((typeof MMRPG_I18N !== 'undefined') ? MMRPG_I18N.t('toast_trait_removed') : "Trait entfernt.");
            });
        });
    }

    if (elements.btnAddTrait) {
        elements.btnAddTrait.addEventListener('click', () => {
            if (ruleCompliance) {
                const limits = MMRPG_RULES.calculateRuleLimits(character);
                if (limits.actualTraits >= limits.allowedTraits) {
                    showToast((typeof MMRPG_I18N !== 'undefined') ? MMRPG_I18N.t('toast_max_traits', { actual: limits.actualTraits, allowed: limits.allowedTraits }) : `Maximale Anzahl an Traits erreicht: ${limits.actualTraits} von ${limits.allowedTraits}.`);
                    return;
                }
            }
            if (!character.traits) character.traits = [];
            const defaultTraitName = (typeof MMRPG_I18N !== 'undefined') ? MMRPG_I18N.t('default_new_trait') : 'Neuer Trait';
            character.traits.unshift({ id: 'tr-' + Date.now(), name: defaultTraitName, description: '' });
            renderTraits();
            renderPowers();
            renderAll(false);
            const firstItem = elements.traitsList.querySelector('.trait-item');
            if (firstItem) firstItem.classList.add('item-newly-added');
            showToast((typeof MMRPG_I18N !== 'undefined') ? MMRPG_I18N.t('toast_trait_added') : "Trait hinzugefügt.");

            // Erstes Eingabefeld fokussieren
            const firstInput = elements.traitsList.querySelector('.trait-name');
            if (firstInput) {
                firstInput.focus();
                firstInput.select();
            }
        });
    }

    function renderTags() {
        if (!character.tags) character.tags = [];
        if (character.tags.length === 0) {
            const emptyTags = (typeof MMRPG_I18N !== 'undefined') ? MMRPG_I18N.t('empty_tags_editor') : 'Keine Tags hinzugefügt.';
            elements.tagsList.innerHTML = `<div style="font-size: 0.8rem; color: var(--text-dim); padding: 4px 0;">${escapeHtml(emptyTags)}</div>`;
            return;
        }

        elements.tagsList.innerHTML = character.tags.map((tag, idx) => `
            <span class="tag-pill">
                ${escapeHtml(tag)}
                <span class="remove-btn" data-index="${idx}" title="✕">✕</span>
            </span>
        `).join('');

        elements.tagsList.querySelectorAll('.remove-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                const idx = parseInt(btn.dataset.index, 10);
                character.tags.splice(idx, 1);
                renderTags();
                updatePrintSheet();
                saveCharacterLocally();
            });
        });
    }

    function addTag() {
        if (!elements.tagInput) return;
        const val = elements.tagInput.value.trim();
        if (val) {
            if (!character.tags) character.tags = [];
            character.tags.push(val);
            elements.tagInput.value = '';
            renderTags();
            updatePrintSheet();
            saveCharacterLocally();
        }
    }

    if (elements.btnAddTag) {
        elements.btnAddTag.addEventListener('click', addTag);
    }
    if (elements.tagInput) {
        elements.tagInput.addEventListener('keydown', e => {
            if (e.key === 'Enter') {
                e.preventDefault();
                addTag();
            }
        });
    }

    if (elements.tagPickerSelect) {
        elements.tagPickerSelect.addEventListener('change', e => {
            const val = e.target.value;
            if (val) {
                if (!character.tags) character.tags = [];
                character.tags.push(val);
                renderTags();
                updatePrintSheet();
                saveCharacterLocally();
                showToast(`Tag hinzugefügt.`);
                elements.tagPickerSelect.value = '';
            }
        });
    }

    // -------------------------------------------------------------------------
    // 7. Live Event Listener für alle Standard-Eingaben
    // -------------------------------------------------------------------------
    const textBindings = [
        { el: elements.charName, prop: 'name' },
        { el: elements.realName, prop: 'realName' },
        { el: elements.playerName, prop: 'player' },
        { el: elements.height, prop: 'height' },
        { el: elements.weight, prop: 'weight' },
        { el: elements.gender, prop: 'gender' },
        { el: elements.eyes, prop: 'eyes' },
        { el: elements.hair, prop: 'hair' },
        { el: elements.size, prop: 'size' },
        { el: elements.distFeatures, prop: 'distinguishingFeatures' },
        { el: elements.origin, prop: 'origin' },
        { el: elements.occupation, prop: 'occupation' },
        { el: elements.identity, prop: 'identity' },
        { el: elements.base, prop: 'base' },
        { el: elements.teams, prop: 'teams' },
        { el: elements.drHealth, prop: 'damageReductionHealth' },
        { el: elements.drFocus, prop: 'damageReductionFocus' },
        { el: elements.history, prop: 'history' },
        { el: elements.personality, prop: 'personality' }
    ];

    textBindings.forEach(binding => {
        if (binding.el) {
            binding.el.addEventListener('input', e => {
                character[binding.prop] = e.target.value;
                saveCharacterLocally();
                updatePrintSheet();
            });
        }
    });

    if (elements.originPresetSelect) {
        elements.originPresetSelect.addEventListener('change', (e) => {
            const val = e.target.value;
            if (!val) return;
            if (elements.origin) elements.origin.value = val;
            character.origin = val;
            e.target.value = '';
            saveCharacterLocally();
            updatePrintSheet();
        });
    }

    if (elements.occupationPresetSelect) {
        elements.occupationPresetSelect.addEventListener('change', (e) => {
            const val = e.target.value;
            if (!val) return;
            if (elements.occupation) elements.occupation.value = val;
            character.occupation = val;
            e.target.value = '';
            saveCharacterLocally();
            updatePrintSheet();
        });
    }

    // Rang & Karma
    if (elements.rank) {
        elements.rank.addEventListener('change', e => {
            character.rank = parseInt(e.target.value, 10) || 1;
            character.karma = character.rank;
            if (ruleCompliance) {
                const rankLimits = MMRPG_RULES.RANK_INFO[character.rank] || MMRPG_RULES.RANK_INFO[1];
                ['melee', 'agility', 'resilience', 'vigilance', 'ego', 'logic'].forEach(k => {
                    if (character.abilities[k] > rankLimits.maxAbility) {
                        character.abilities[k] = rankLimits.maxAbility;
                    }
                    if (character.abilities[k] < -3) {
                        character.abilities[k] = -3;
                    }
                });
            }
            renderAll();
        });
    }

    if (elements.karma) {
        elements.karma.addEventListener('input', e => {
            character.karma = parseInt(e.target.value, 10) || 1;
            saveCharacterLocally();
            updatePrintSheet();
        });
    }

    if (elements.initiativeEdge) {
        elements.initiativeEdge.addEventListener('change', e => {
            character.initiativeEdge = e.target.checked;
            renderAll();
        });
    }

    // Geschwindigkeiten
    if (elements.speedRun) {
        elements.speedRun.addEventListener('input', e => {
            character.speed.run = parseInt(e.target.value, 10) || 5;
            saveCharacterLocally();
            updatePrintSheet();
        });
    }
    if (elements.speedClimb) {
        elements.speedClimb.addEventListener('input', e => {
            character.speed.climb = parseInt(e.target.value, 10) || character.speed.run;
            saveCharacterLocally();
            updatePrintSheet();
        });
    }
    if (elements.speedJump) {
        elements.speedJump.addEventListener('input', e => {
            character.speed.jump = parseInt(e.target.value, 10) || character.speed.run;
            saveCharacterLocally();
            updatePrintSheet();
        });
    }
    if (elements.speedSwim) {
        elements.speedSwim.addEventListener('input', e => {
            character.speed.swim = parseInt(e.target.value, 10) || 2;
            saveCharacterLocally();
            updatePrintSheet();
        });
    }

    // M.A.R.V.E.L. Inputs (Score, Def-Bonus, Check-Bonus)
    ['melee', 'agility', 'resilience', 'vigilance', 'ego', 'logic'].forEach(key => {
        const item = elements.abilities && elements.abilities[key];
        if (item) {
            if (item.score) {
                item.score.addEventListener('input', e => {
                    let val = parseInt(e.target.value, 10);
                    if (isNaN(val)) val = 0;

                    if (ruleCompliance) {
                        const limits = MMRPG_RULES.calculateRuleLimits(character);
                        const rank = limits.rank;
                        const maxAbility = limits.maxAbility;
                        const currentVal = parseInt(character.abilities[key], 10) || 0;

                        const otherSum = ['melee', 'agility', 'resilience', 'vigilance', 'ego', 'logic']
                            .filter(k => k !== key)
                            .reduce((sum, k) => sum + (parseInt(character.abilities[k], 10) || 0), 0);

                        const budgetCap = limits.allowedAbilityPoints - otherSum;

                        if (val > currentVal) {
                            if (val > maxAbility) {
                                val = Math.min(val, maxAbility);
                                showToast(`Rang ${rank}: Maximaler Attribut-Wert ist ${maxAbility}!`);
                            }
                            if (val > budgetCap) {
                                val = Math.max(currentVal, budgetCap);
                                showToast(`Punktebudget für Rang ${rank} erreicht (${limits.allowedAbilityPoints} Ability Points)!`);
                            }
                        } else if (val < currentVal) {
                            if (val < -3) {
                                val = -3;
                                showToast(`Minimaler Attribut-Wert ist -3 laut offiziellem Regelwerk.`);
                            }
                        }
                    }

                    character.abilities[key] = val;
                    renderAll(false);
                });
            }
            if (item.defBonus) {
                item.defBonus.addEventListener('input', e => {
                    character.defenseBonuses[key] = parseInt(e.target.value, 10) || 0;
                    renderAll(false);
                });
            }
            if (item.checkBonus) {
                item.checkBonus.addEventListener('input', e => {
                    character.nonCombatBonuses[key] = parseInt(e.target.value, 10) || 0;
                    renderAll(false);
                });
            }
        }
    });

    // Damage Multiplier Boni
    ['melee', 'agility', 'ego', 'logic'].forEach(key => {
        if (elements.damage && elements.damage[key] && elements.damage[key].bonus) {
            elements.damage[key].bonus.addEventListener('input', e => {
                character.damageBonuses[key] = parseInt(e.target.value, 10) || 0;
                renderAll(false);
            });
        }
    });

    // -------------------------------------------------------------------------
    // Theme-Verwaltung (Hell / Dunkel)
    // -------------------------------------------------------------------------
    function applyTheme(theme) {
        currentTheme = theme;
        if (theme === 'light') {
            document.documentElement.setAttribute('data-theme', 'light');
            if (elements.themeIcon) elements.themeIcon.textContent = '🌙';
            if (elements.themeLabel) elements.themeLabel.textContent = (typeof MMRPG_I18N !== 'undefined') ? MMRPG_I18N.t('theme_dark') : 'Dunkel';
        } else {
            document.documentElement.removeAttribute('data-theme');
            if (elements.themeIcon) elements.themeIcon.textContent = '☀️';
            if (elements.themeLabel) elements.themeLabel.textContent = (typeof MMRPG_I18N !== 'undefined') ? MMRPG_I18N.t('theme_light') : 'Hell';
        }
        try {
            localStorage.setItem('mmrpg_theme', theme);
        } catch (e) {}
    }

    if (elements.btnThemeToggle) {
        elements.btnThemeToggle.addEventListener('click', () => {
            applyTheme(currentTheme === 'dark' ? 'light' : 'dark');
            showToast(`Design gewechselt zu ${currentTheme === 'light' ? 'Hell' : 'Dunkel'}.`);
        });
    }

    // -------------------------------------------------------------------------
    // Einstellungen: Kraft-Beschreibungen auf Druckbogen
    // -------------------------------------------------------------------------
    function setPowerDescriptions(enabled) {
        showPowerDescriptions = Boolean(enabled);
        try {
            localStorage.setItem('mmrpg_show_power_desc', showPowerDescriptions ? 'true' : 'false');
        } catch (e) {}
        if (elements.togglePowerDescEditor) elements.togglePowerDescEditor.checked = showPowerDescriptions;
        if (elements.togglePowerDescPreview) elements.togglePowerDescPreview.checked = showPowerDescriptions;
        updatePrintSheet();
        showToast(showPowerDescriptions ? "Erklärungen auf Druckbogen aktiviert." : "Erklärungen auf Druckbogen ausgeblendet.");
    }

    if (elements.togglePowerDescEditor) {
        elements.togglePowerDescEditor.checked = showPowerDescriptions;
        elements.togglePowerDescEditor.addEventListener('change', e => setPowerDescriptions(e.target.checked));
    }
    if (elements.togglePowerDescPreview) {
        elements.togglePowerDescPreview.checked = showPowerDescriptions;
        elements.togglePowerDescPreview.addEventListener('change', e => setPowerDescriptions(e.target.checked));
    }

    // -------------------------------------------------------------------------
    // Einstellungen: Offizielle Regeln befolgen (Regelkonformität)
    // -------------------------------------------------------------------------
    function setRuleCompliance(enabled, isUserAction = false) {
        ruleCompliance = Boolean(enabled);
        try {
            localStorage.setItem('mmrpg_rule_compliance', ruleCompliance ? 'true' : 'false');
        } catch (e) {}

        if (elements.toggleRuleCompliance) elements.toggleRuleCompliance.checked = ruleCompliance;
        if (elements.toggleRuleComplianceSettings) elements.toggleRuleComplianceSettings.checked = ruleCompliance;

        document.body.classList.toggle('rules-disabled', !ruleCompliance);

        if (ruleCompliance) {
            if (isUserAction) {
                // Bei Klick auf "Regeln befolgen": Alle Attribute auf 0 zurücksetzen,
                // damit ein sauberes Punktebudget ohne vorherige Überschüsse bereitsteht.
                character.abilities = {
                    melee: 0,
                    agility: 0,
                    resilience: 0,
                    vigilance: 0,
                    ego: 0,
                    logic: 0
                };
                showToast((typeof MMRPG_I18N !== 'undefined') ? MMRPG_I18N.t('toast_rules_on') : "Offizielle Regeln aktiviert: Attribute auf 0 gesetzt (Punktebudget bereit zur Verteilung).");
            } else {
                const rank = character.rank || 1;
                const rankLimits = MMRPG_RULES.RANK_INFO[rank] || MMRPG_RULES.RANK_INFO[1];
                ['melee', 'agility', 'resilience', 'vigilance', 'ego', 'logic'].forEach(k => {
                    if (character.abilities[k] > rankLimits.maxAbility) {
                        character.abilities[k] = rankLimits.maxAbility;
                    }
                    if (character.abilities[k] < -3) {
                        character.abilities[k] = -3;
                    }
                });
            }
        } else {
            if (isUserAction) {
                showToast((typeof MMRPG_I18N !== 'undefined') ? MMRPG_I18N.t('toast_rules_off') : "Freier Modus aktiviert: Keine Begrenzung für Ability Points, Kräfte und Traits.");
            }
        }

        renderAll();
    }

    if (elements.toggleRuleCompliance) {
        elements.toggleRuleCompliance.checked = ruleCompliance;
        elements.toggleRuleCompliance.addEventListener('change', e => setRuleCompliance(e.target.checked, true));
    }
    if (elements.toggleRuleComplianceSettings) {
        elements.toggleRuleComplianceSettings.checked = ruleCompliance;
        elements.toggleRuleComplianceSettings.addEventListener('change', e => setRuleCompliance(e.target.checked, true));
    }

    // -------------------------------------------------------------------------
    // 8. Offizielles Bogen- & Druck-Layout (DIN A4) aktualisieren
    // -------------------------------------------------------------------------
    function updatePrintSheet(derived) {
        try {
            if (!derived) {
                derived = MMRPG_RULES.calculateDerivedStats(character);
            }

        // Powers nach Kraftgruppen gruppieren (Objekte behalten für Beschreibungen & Sortierung)
        const powersBySet = {};
        (character.powers || []).forEach(p => {
            const set = p.set || 'Basic';
            const cleanSet = set.split('(')[0].trim().toUpperCase();
            if (!powersBySet[cleanSet]) powersBySet[cleanSet] = [];
            powersBySet[cleanSet].push(p);
        });

        // Speed-Panel Daten (RUN, CLIMB, JUMP, SWIM + dynamische Zusatz-Modi)
        const extraSpeeds = derived.speeds.extra || [];
        const speedPanelHtml = `
            <div class="official-speed-panel">
                <div class="speed-panel-header">
                    <span>SPEED</span>
                </div>
                <div class="speed-metrics-row">
                    <div class="speed-metric-item">
                        <span class="speed-metric-label">RUN</span>
                        <span class="speed-metric-val">${derived.speeds.run}</span>
                    </div>
                    <div class="speed-metric-item">
                        <span class="speed-metric-label">CLIMB</span>
                        <span class="speed-metric-val">${derived.speeds.climb}</span>
                    </div>
                    <div class="speed-metric-item">
                        <span class="speed-metric-label">JUMP</span>
                        <span class="speed-metric-val">${derived.speeds.jump}</span>
                    </div>
                    <div class="speed-metric-item">
                        <span class="speed-metric-label">SWIM</span>
                        <span class="speed-metric-val">${derived.speeds.swim}</span>
                    </div>
                    ${extraSpeeds.map(ex => `
                        <div class="speed-metric-item speed-extra">
                            <span class="speed-metric-label">${escapeHtml(ex.name.split('(')[0].trim().toUpperCase())}</span>
                            <span class="speed-metric-val">${ex.value}</span>
                        </div>
                    `).join('')}
                </div>
            </div>
        `;

        // Powers-Darstellung: Kompakt vs. Mit Erklärungen
        const totalPowersCount = (character.powers || []).length;
        const denseModeClass = totalPowersCount > 10 ? 'dense-mode' : '';
        const emptyPowersText = (typeof MMRPG_I18N !== 'undefined') ? MMRPG_I18N.t('sheet_empty_powers') : 'Keine Kräfte eingetragen.';

        const powersContentHtml = showPowerDescriptions
            ? `
                <div class="powers-grouped-content show-descriptions ${denseModeClass}">
                    ${Object.keys(powersBySet).length === 0 ? `<div style="color: #64748b; font-size: 7pt; padding: 10px;">${emptyPowersText}</div>` : ''}
                    ${Object.entries(powersBySet).map(([setName, powersArray]) => `
                        <div>
                            <div class="power-set-group-title">${escapeHtml(setName)}</div>
                            <div class="power-bullets-list">
                                ${powersArray.map(p => {
                                    const curLang = (typeof MMRPG_I18N !== 'undefined') ? MMRPG_I18N.currentLang : 'de';
                                    const locP = (typeof MMRPG_COMPENDIUM !== 'undefined' && MMRPG_COMPENDIUM.getLocalizedPower)
                                        ? MMRPG_COMPENDIUM.getLocalizedPower(p, curLang)
                                        : p;
                                    const effectText = locP.effect || p.effect || '';
                                    const actionText = locP.action || p.action || '';
                                    return `
                                    <div class="power-detail-item">
                                        <div class="power-detail-row">
                                            <span class="power-bullet-dot">◆</span>
                                            <span class="power-name-bold">${escapeHtml(p.name || 'Kraft')}</span>
                                            ${actionText ? `<span class="power-action-tag">${escapeHtml(actionText.split(' ')[0])}</span>` : ''}
                                            ${p.cost ? `<span class="power-cost-tag">${p.cost}F</span>` : ''}
                                        </div>
                                        ${effectText ? `<div class="power-desc-inline">${escapeHtml(effectText)}</div>` : ''}
                                    </div>
                                    `;
                                }).join('')}
                            </div>
                        </div>
                    `).join('')}
                </div>
            `
            : `
                <div class="powers-grouped-content">
                    ${Object.keys(powersBySet).length === 0 ? `<div style="color: #64748b; font-size: 7pt; padding: 10px;">${emptyPowersText}</div>` : ''}
                    ${Object.entries(powersBySet).map(([setName, powersArray]) => `
                        <div>
                            <div class="power-set-group-title">${escapeHtml(setName)}</div>
                            <ul class="power-bullets-list">
                                ${powersArray.map(p => `<li>${escapeHtml(p.name || 'Kraft')}</li>`).join('')}
                            </ul>
                        </div>
                    `).join('')}
                </div>
            `;

        // Dynamische Schriftgrößen-Anpassung für die Biografie
        const totalBioLength = (character.history || '').length + (character.personality || '').length;
        let bioFontSize = '8.8pt';
        let bioLineHeight = '1.36';
        if (totalBioLength > 1600) {
            bioFontSize = '6.8pt';
            bioLineHeight = '1.18';
        } else if (totalBioLength > 1200) {
            bioFontSize = '7.5pt';
            bioLineHeight = '1.24';
        } else if (totalBioLength > 750) {
            bioFontSize = '8.2pt';
            bioLineHeight = '1.30';
        }

        const pw = (character.portrait && character.portrait.width) ? character.portrait.width : 200;
        const ph = (character.portrait && character.portrait.height) ? character.portrait.height : 125;
        const pfit = (character.portrait && character.portrait.fit) ? character.portrait.fit : 'cover';
        const pUrl = (character.portrait && character.portrait.url) ? character.portrait.url : '';

        elements.printSheet.innerHTML = `
            <div class="official-sheet" style="--col-left-width: ${pw}px; --portrait-height: ${ph}px; --portrait-fit: ${pfit};">
                <!-- Kopfzeile -->
                <div class="official-header">
                    <div class="official-char-title">${escapeHtml(character.name || 'NEW HERO')}</div>
                    <div class="official-logo-tag">MULTIVERSE HERO SYSTEM</div>
                </div>

                <!-- 3-Spalten Hauptbereich -->
                <div class="official-grid">
                    
                    <!-- ==============================================
                         SPALTE 1: PORTRAIT, ABILITIES, DAMAGE
                         ============================================== -->
                    <div class="col-left">
                        <!-- Portrait Box mit interaktiven Zieh-Griffen -->
                        <div class="official-portrait-box" id="official-portrait-box" title="Klicken zum Ändern, Ziehen an Ecken/Kanten zum Skalieren">
                            ${pUrl ? `
                                <img id="official-portrait-img" src="${escapeHtml(pUrl)}" alt="${escapeHtml(character.name || 'Held')}">
                                <div class="portrait-overlay-hint no-print">${(typeof MMRPG_I18N !== 'undefined') ? MMRPG_I18N.t('ph_portrait_hover_change') : '📷 Bild ändern'}</div>
                            ` : `
                                <div class="portrait-placeholder" id="portrait-placeholder-btn">
                                    <span style="font-size: 18pt; line-height: 1; display: block; margin-bottom: 3px;">🖼️</span>
                                    <strong>${escapeHtml(character.name || 'HELD')}</strong><br>
                                    <span style="font-size: 6.5pt; color: #64748b;">${(typeof MMRPG_I18N !== 'undefined') ? MMRPG_I18N.t('ph_portrait_click') : '[ Bild einfügen ]'}</span>
                                </div>
                                <div class="portrait-overlay-hint no-print">${(typeof MMRPG_I18N !== 'undefined') ? MMRPG_I18N.t('ph_portrait_hover_upload') : '📷 Klicken zum Hochladen'}</div>
                            `}
                            <!-- Interaktive Zieh-Griffe für Bogen-Vorschau -->
                            <div class="portrait-resize-handle portrait-resize-se no-print" title="${(typeof MMRPG_I18N !== 'undefined') ? MMRPG_I18N.t('sheet_drag_resize_hint') : 'Ziehen zum Ändern von Breite & Höhe'}">
                                <svg width="12" height="12" viewBox="0 0 12 12" fill="none"><path d="M10 2v8H2" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/><path d="M10 6v4H6" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/></svg>
                            </div>
                            <div class="portrait-resize-handle portrait-resize-e no-print" title="${(typeof MMRPG_I18N !== 'undefined') ? MMRPG_I18N.t('sheet_drag_width_hint') : 'Ziehen zum Ändern der Spaltenbreite'}"></div>
                            <div class="portrait-resize-handle portrait-resize-s no-print" title="${(typeof MMRPG_I18N !== 'undefined') ? MMRPG_I18N.t('sheet_drag_height_hint') : 'Ziehen zum Ändern der Bildhöhe'}"></div>
                        </div>

                        <!-- ABILITIES TABELLE (3 Spalten wie im Original) -->
                        <div class="official-abilities-box">
                            <div class="abilities-header-bar">ABILITIES</div>
                            <table class="abilities-table">
                                <thead>
                                    <tr>
                                        <th style="width: 34%;">ABILITY SCORE</th>
                                        <th style="width: 33%;">DEFENSE SCORE</th>
                                        <th style="width: 33%;">NON-COMBAT CHECKS</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>
                                            <span class="stat-score-val">${derived.scores.melee}</span>
                                            <span class="stat-sub-label">MELEE</span>
                                        </td>
                                        <td><span class="stat-def-val">${derived.defenses.melee}</span></td>
                                        <td><span class="stat-check-val">${derived.nonCombatChecks.melee >= 0 ? '+' + derived.nonCombatChecks.melee : derived.nonCombatChecks.melee}</span></td>
                                    </tr>
                                    <tr>
                                        <td>
                                            <span class="stat-score-val">${derived.scores.agility}</span>
                                            <span class="stat-sub-label">AGILITY</span>
                                        </td>
                                        <td><span class="stat-def-val">${derived.defenses.agility}</span></td>
                                        <td><span class="stat-check-val">${derived.nonCombatChecks.agility >= 0 ? '+' + derived.nonCombatChecks.agility : derived.nonCombatChecks.agility}</span></td>
                                    </tr>
                                    <tr>
                                        <td>
                                            <span class="stat-score-val">${derived.scores.resilience}</span>
                                            <span class="stat-sub-label">RESILIENCE</span>
                                        </td>
                                        <td><span class="stat-def-val">${derived.defenses.resilience}</span></td>
                                        <td><span class="stat-check-val">${derived.nonCombatChecks.resilience >= 0 ? '+' + derived.nonCombatChecks.resilience : derived.nonCombatChecks.resilience}</span></td>
                                    </tr>
                                    <tr>
                                        <td>
                                            <span class="stat-score-val">${derived.scores.vigilance}</span>
                                            <span class="stat-sub-label">VIGILANCE</span>
                                        </td>
                                        <td><span class="stat-def-val">${derived.defenses.vigilance}</span></td>
                                        <td><span class="stat-check-val">${derived.nonCombatChecks.vigilance >= 0 ? '+' + derived.nonCombatChecks.vigilance : derived.nonCombatChecks.vigilance}</span></td>
                                    </tr>
                                    <tr>
                                        <td>
                                            <span class="stat-score-val">${derived.scores.ego}</span>
                                            <span class="stat-sub-label">EGO</span>
                                        </td>
                                        <td><span class="stat-def-val">${derived.defenses.ego}</span></td>
                                        <td><span class="stat-check-val">${derived.nonCombatChecks.ego >= 0 ? '+' + derived.nonCombatChecks.ego : derived.nonCombatChecks.ego}</span></td>
                                    </tr>
                                    <tr>
                                        <td>
                                            <span class="stat-score-val">${derived.scores.logic}</span>
                                            <span class="stat-sub-label">LOGIC</span>
                                        </td>
                                        <td><span class="stat-def-val">${derived.defenses.logic}</span></td>
                                        <td><span class="stat-check-val">${derived.nonCombatChecks.logic >= 0 ? '+' + derived.nonCombatChecks.logic : derived.nonCombatChecks.logic}</span></td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>

                        <!-- DAMAGE BOX (Exakt wie im offiziellen Core Rulebook) -->
                        <div class="official-damage-box">
                            <div class="damage-header-bar">DAMAGE</div>
                            
                            <!-- Melee -->
                            <div class="damage-row">
                                <div class="damage-type-pill">MELEE</div>
                                <div class="damage-mult-card">
                                    <span class="marvel-die-badge">M-DICE</span>
                                    <span class="damage-mult-val">&times;&nbsp;${derived.damageMultipliers.melee}</span>
                                </div>
                                <div class="damage-plus-symbol">+</div>
                                <div class="damage-score-card">
                                    <span class="damage-score-val">${derived.scores.melee}</span>
                                </div>
                            </div>

                            <!-- Agility -->
                            <div class="damage-row">
                                <div class="damage-type-pill">AGILITY</div>
                                <div class="damage-mult-card">
                                    <span class="marvel-die-badge">M-DICE</span>
                                    <span class="damage-mult-val">&times;&nbsp;${derived.damageMultipliers.agility}</span>
                                </div>
                                <div class="damage-plus-symbol">+</div>
                                <div class="damage-score-card">
                                    <span class="damage-score-val">${derived.scores.agility}</span>
                                </div>
                            </div>

                            <!-- Ego -->
                            <div class="damage-row">
                                <div class="damage-type-pill">EGO</div>
                                <div class="damage-mult-card">
                                    <span class="marvel-die-badge">M-DICE</span>
                                    <span class="damage-mult-val">&times;&nbsp;${derived.damageMultipliers.ego}</span>
                                </div>
                                <div class="damage-plus-symbol">+</div>
                                <div class="damage-score-card">
                                    <span class="damage-score-val">${derived.scores.ego}</span>
                                </div>
                            </div>

                            <!-- Logic -->
                            <div class="damage-row">
                                <div class="damage-type-pill">LOGIC</div>
                                <div class="damage-mult-card">
                                    <span class="marvel-die-badge">M-DICE</span>
                                    <span class="damage-mult-val">&times;&nbsp;${derived.damageMultipliers.logic}</span>
                                </div>
                                <div class="damage-plus-symbol">+</div>
                                <div class="damage-score-card">
                                    <span class="damage-score-val">${derived.scores.logic}</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    <!-- ==============================================
                         SPALTE 2: PROFILE BADGES, SPEED, TRAITS & TAGS, POWERS
                         ============================================== -->
                    <div class="col-middle">
                        <!-- Top Badges Raster -->
                        <div class="profile-badges-grid">
                            <!-- Rank -->
                            <div class="badge-card">
                                <div class="badge-card-title">RANK</div>
                                <div class="badge-card-value">${derived.rank}</div>
                            </div>
                            <!-- Karma -->
                            <div class="badge-card">
                                <div class="badge-card-title">KARMA</div>
                                <div class="badge-card-value">${character.karma || derived.rank}</div>
                            </div>
                            <!-- Health + DR -->
                            <div class="badge-card">
                                <div class="badge-card-title">HEALTH</div>
                                <div class="badge-card-value">${derived.maxHealth}</div>
                                <div class="badge-card-sub">DAMAGE REDUCTION: ${escapeHtml(character.damageReductionHealth || '—')}</div>
                            </div>
                            <!-- Focus + DR -->
                            <div class="badge-card">
                                <div class="badge-card-title">FOCUS</div>
                                <div class="badge-card-value">${derived.maxFocus}</div>
                                <div class="badge-card-sub">DAMAGE REDUCTION: ${escapeHtml(character.damageReductionFocus || '—')}</div>
                            </div>
                            <!-- Prominentes Speed Panel -->
                            ${speedPanelHtml}
                            <!-- Initiative Modifier -->
                            <div class="badge-card" style="grid-column: 1 / -1; display: flex; justify-content: space-between; align-items: center; padding: 4px 10px;">
                                <span class="badge-card-title" style="margin: 0; border: none; font-size: 7.2pt;">INITIATIVE MODIFIER</span>
                                <span class="badge-card-value" style="font-size: 14pt; color: #b91c1c;">${derived.initiative.text}</span>
                            </div>
                        </div>

                        <!-- TRAITS & TAGS (Nebeneinander wie im Buch) -->
                        <div class="official-traits-tags-box">
                            <div class="traits-tags-header">TRAITS & TAGS</div>
                            <div class="traits-tags-columns">
                                <div>
                                    <div class="tt-subheading">TRAITS</div>
                                    <ul class="tt-list">
                                        ${(!character.traits || character.traits.length === 0) ? `<li><em>${(typeof MMRPG_I18N !== 'undefined') ? MMRPG_I18N.t('sheet_none') : 'Keine'}</em></li>` : ''}
                                        ${(character.traits || []).map(t => `<li><strong>${escapeHtml(t.name)}</strong></li>`).join('')}
                                    </ul>
                                </div>
                                <div>
                                    <div class="tt-subheading">TAGS</div>
                                    <ul class="tt-list">
                                        ${(!character.tags || character.tags.length === 0) ? `<li><em>${(typeof MMRPG_I18N !== 'undefined') ? MMRPG_I18N.t('sheet_none') : 'Keine'}</em></li>` : ''}
                                        ${(character.tags || []).map(tag => `<li>${escapeHtml(tag)}</li>`).join('')}
                                    </ul>
                                </div>
                            </div>
                        </div>

                        <!-- POWERS (Gruppiert nach Kraftgruppen wie im Buch, mit optionalen Erklärungen) -->
                        <div class="official-powers-box">
                            <div class="powers-header-bar">
                                <span>POWERS</span>
                                <span class="powers-header-meta">${showPowerDescriptions ? ((typeof MMRPG_I18N !== 'undefined') ? MMRPG_I18N.t('sheet_powers_with_desc') : 'Inkl. Effekte') : ((typeof MMRPG_I18N !== 'undefined') ? MMRPG_I18N.t('sheet_powers_compact') : 'Kompakt')}</span>
                            </div>
                            ${powersContentHtml}
                        </div>
                    </div>

                    <!-- ==============================================
                         SPALTE 3: BIOGRAPHY, HISTORY, PERSONALITY
                         ============================================== -->
                    <div class="col-right">
                        <!-- BIOGRAPHY BOX -->
                        <div class="official-bio-box">
                            <div class="bio-header-bar">BIOGRAPHY</div>
                            <div class="bio-content-pad">
                                <div class="bio-prop-line"><strong>Real Name:</strong> ${escapeHtml(character.realName || '-')}</div>
                                <div class="bio-prop-line"><strong>Height:</strong> ${escapeHtml(character.height || '-')} | <strong>Weight:</strong> ${escapeHtml(character.weight || '-')}</div>
                                <div class="bio-prop-line"><strong>Gender:</strong> ${escapeHtml(character.gender || '-')} | <strong>Size:</strong> ${escapeHtml(character.size || 'Average')}</div>
                                <div class="bio-prop-line"><strong>Eyes:</strong> ${escapeHtml(character.eyes || '-')} | <strong>Hair:</strong> ${escapeHtml(character.hair || '-')}</div>
                                <div class="bio-prop-line"><strong>Distinguishing Features:</strong> ${escapeHtml(character.distinguishingFeatures || 'None')}</div>
                                <div class="bio-prop-line"><strong>Occupation:</strong> ${escapeHtml(character.occupation || '-')}</div>
                                <div class="bio-prop-line"><strong>Origin:</strong> ${escapeHtml(character.origin || '-')}</div>
                                <div class="bio-prop-line"><strong>Teams:</strong> ${escapeHtml(character.teams || '-')}</div>
                                <div class="bio-prop-line"><strong>Base:</strong> ${escapeHtml(character.base || '-')}</div>

                                <!-- HISTORY -->
                                <div class="bio-section-subhead">HISTORY</div>
                                <div class="bio-narrative-text" style="font-size: ${bioFontSize}; line-height: ${bioLineHeight};">
                                    ${escapeHtml(character.history || ((typeof MMRPG_I18N !== 'undefined') ? MMRPG_I18N.t('sheet_empty_history') : 'Keine Vorgeschichte hinterlegt.'))}
                                </div>

                                <!-- PERSONALITY -->
                                <div class="bio-section-subhead">PERSONALITY</div>
                                <div class="bio-narrative-text" style="font-size: ${bioFontSize}; line-height: ${bioLineHeight};">
                                    ${escapeHtml(character.personality || ((typeof MMRPG_I18N !== 'undefined') ? MMRPG_I18N.t('sheet_empty_personality') : 'Keine Persönlichkeitsnotizen hinterlegt.'))}
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        `;

        let isPortraitDragging = false;

        function initPortraitDragResize(boxEl) {
            if (!boxEl) return;
            const handles = boxEl.querySelectorAll('.portrait-resize-handle');
            handles.forEach(handle => {
                handle.addEventListener('pointerdown', (e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    isPortraitDragging = true;
                    const type = handle.classList.contains('portrait-resize-se') ? 'se' :
                                 handle.classList.contains('portrait-resize-e') ? 'e' : 's';
                    const startX = e.clientX;
                    const startY = e.clientY;
                    const startW = (character.portrait && character.portrait.width) ? character.portrait.width : 200;
                    const startH = (character.portrait && character.portrait.height) ? character.portrait.height : 125;

                    try {
                        handle.setPointerCapture(e.pointerId);
                    } catch (err) {}

                    const onPointerMove = (moveEvt) => {
                        if (!isPortraitDragging) return;
                        moveEvt.preventDefault();
                        const dx = moveEvt.clientX - startX;
                        const dy = moveEvt.clientY - startY;
                        let targetW = startW;
                        let targetH = startH;

                        if (type === 'se' || type === 'e') {
                            targetW = Math.max(150, Math.min(270, Math.round(startW + dx)));
                        }
                        if (type === 'se' || type === 's') {
                            targetH = Math.max(60, Math.min(250, Math.round(startH + dy)));
                        }

                        setPortraitDimensions(targetW, targetH, true, false);
                    };

                    const onPointerUp = (upEvt) => {
                        if (!isPortraitDragging) return;
                        try {
                            handle.releasePointerCapture(upEvt.pointerId);
                        } catch (err) {}
                        handle.removeEventListener('pointermove', onPointerMove);
                        handle.removeEventListener('pointerup', onPointerUp);
                        handle.removeEventListener('pointercancel', onPointerUp);

                        const finalW = (character.portrait && character.portrait.width) ? character.portrait.width : 200;
                        const finalH = (character.portrait && character.portrait.height) ? character.portrait.height : 125;
                        setPortraitDimensions(finalW, finalH, true, true);

                        setTimeout(() => {
                            isPortraitDragging = false;
                        }, 100);
                    };

                    handle.addEventListener('pointermove', onPointerMove);
                    handle.addEventListener('pointerup', onPointerUp);
                    handle.addEventListener('pointercancel', onPointerUp);
                });
            });
        }

        const portraitBox = elements.printSheet.querySelector('#official-portrait-box');
        if (portraitBox) {
            portraitBox.addEventListener('click', (e) => {
                if (isPortraitDragging || e.target.closest('.portrait-resize-handle')) {
                    return;
                }
                if (elements.portraitFileInput) elements.portraitFileInput.click();
            });
            initPortraitDragResize(portraitBox);
        }
        updatePortraitControls();

        } catch (err) {
            console.error("Fehler beim Aktualisieren des Druckbogens:", err);
        }
    }

    // -------------------------------------------------------------------------
    // 8b. Heldenbild & Bogen-Größenanpassung
    // -------------------------------------------------------------------------
    function updatePortraitControls() {
        const pw = (character.portrait && character.portrait.width) ? character.portrait.width : 200;
        const ph = (character.portrait && character.portrait.height) ? character.portrait.height : 125;
        const hasImage = Boolean(character.portrait && character.portrait.url);

        if (elements.portraitWidthRange) elements.portraitWidthRange.value = pw;
        if (elements.portraitWidthNum) elements.portraitWidthNum.value = pw;
        if (elements.portraitHeightRange) elements.portraitHeightRange.value = ph;
        if (elements.portraitHeightNum) elements.portraitHeightNum.value = ph;
        if (elements.btnRemovePortrait) elements.btnRemovePortrait.style.display = hasImage ? 'inline-flex' : 'none';
        if (elements.btnFitOriginalSize) {
            elements.btnFitOriginalSize.disabled = !hasImage;
            elements.btnFitOriginalSize.style.opacity = hasImage ? '1' : '0.5';
            elements.btnFitOriginalSize.style.cursor = hasImage ? 'pointer' : 'not-allowed';
        }
    }

    function setPortraitDimensions(w, h, updateInputs = true, persist = true) {
        w = Math.max(150, Math.min(270, parseInt(w, 10) || 200));
        h = Math.max(60, Math.min(250, parseInt(h, 10) || 125));

        if (!character.portrait) character.portrait = {};
        character.portrait.width = w;
        character.portrait.height = h;

        if (updateInputs) {
            if (elements.portraitWidthRange) elements.portraitWidthRange.value = w;
            if (elements.portraitWidthNum) elements.portraitWidthNum.value = w;
            if (elements.portraitHeightRange) elements.portraitHeightRange.value = h;
            if (elements.portraitHeightNum) elements.portraitHeightNum.value = h;
        }

        const sheet = elements.printSheet ? elements.printSheet.querySelector('.official-sheet') : null;
        if (sheet) {
            sheet.style.setProperty('--col-left-width', `${w}px`);
            sheet.style.setProperty('--portrait-height', `${h}px`);
        }

        if (persist) {
            saveCharacterLocally();
        }
    }

    // Slider- & Pixel-Events für Bildbreite
    if (elements.portraitWidthRange) {
        elements.portraitWidthRange.addEventListener('input', e => {
            setPortraitDimensions(e.target.value, character.portrait ? character.portrait.height : 125, true, false);
        });
        elements.portraitWidthRange.addEventListener('change', e => {
            setPortraitDimensions(e.target.value, character.portrait ? character.portrait.height : 125, true, true);
        });
    }

    if (elements.portraitWidthNum) {
        elements.portraitWidthNum.addEventListener('input', e => {
            setPortraitDimensions(e.target.value, character.portrait ? character.portrait.height : 125, true, false);
        });
        elements.portraitWidthNum.addEventListener('change', e => {
            setPortraitDimensions(e.target.value, character.portrait ? character.portrait.height : 125, true, true);
        });
    }

    // Slider- & Pixel-Events für Bildhöhe
    if (elements.portraitHeightRange) {
        elements.portraitHeightRange.addEventListener('input', e => {
            setPortraitDimensions(character.portrait ? character.portrait.width : 200, e.target.value, true, false);
        });
        elements.portraitHeightRange.addEventListener('change', e => {
            setPortraitDimensions(character.portrait ? character.portrait.width : 200, e.target.value, true, true);
        });
    }

    if (elements.portraitHeightNum) {
        elements.portraitHeightNum.addEventListener('input', e => {
            setPortraitDimensions(character.portrait ? character.portrait.width : 200, e.target.value, true, false);
        });
        elements.portraitHeightNum.addEventListener('change', e => {
            setPortraitDimensions(character.portrait ? character.portrait.width : 200, e.target.value, true, true);
        });
    }

    // Bilddatei vom Computer hochladen
    if (elements.btnUploadPortrait && elements.portraitFileInput) {
        elements.btnUploadPortrait.addEventListener('click', () => {
            elements.portraitFileInput.click();
        });

        elements.portraitFileInput.addEventListener('change', e => {
            const file = e.target.files && e.target.files[0];
            if (!file) return;

            if (!file.type.startsWith('image/')) {
                showToast("Bitte wähle eine Bilddatei aus (PNG, JPG, WebP).");
                return;
            }

            const reader = new FileReader();
            reader.onload = evt => {
                const dataUrl = evt.target.result;
                if (!character.portrait) character.portrait = {};
                character.portrait.url = dataUrl;
                saveCharacterLocally();
                updatePrintSheet();
                showToast((typeof MMRPG_I18N !== 'undefined') ? MMRPG_I18N.t('toast_portrait_uploaded') : "Charakterbild hochgeladen!");
            };
            reader.readAsDataURL(file);
            e.target.value = '';
        });
    }

    // Bild über URL einfügen
    if (elements.btnUrlPortrait) {
        elements.btnUrlPortrait.addEventListener('click', () => {
            const currentUrl = (character.portrait && character.portrait.url && !character.portrait.url.startsWith('data:')) ? character.portrait.url : '';
            const promptMsg = (typeof MMRPG_I18N !== 'undefined') ? MMRPG_I18N.t('prompt_image_url') : "Internet-Adresse (URL) des Heldenbildes eingeben:";
            const newUrl = prompt(promptMsg, currentUrl);
            if (newUrl !== null) {
                const trimmed = newUrl.trim();
                if (!character.portrait) character.portrait = {};
                character.portrait.url = trimmed;
                saveCharacterLocally();
                updatePrintSheet();
                showToast(trimmed ? ((typeof MMRPG_I18N !== 'undefined') ? MMRPG_I18N.t('toast_portrait_url') : "Bild-URL übernommen!") : ((typeof MMRPG_I18N !== 'undefined') ? MMRPG_I18N.t('toast_portrait_removed') : "Bild entfernt."));
            }
        });
    }

    // Bild entfernen
    if (elements.btnRemovePortrait) {
        elements.btnRemovePortrait.addEventListener('click', () => {
            if (character.portrait) {
                character.portrait.url = '';
            }
            saveCharacterLocally();
            updatePrintSheet();
            showToast((typeof MMRPG_I18N !== 'undefined') ? MMRPG_I18N.t('toast_portrait_removed') : "Charakterbild entfernt.");
        });
    }

    // Button: "📐 An Originalgröße anpassen"
    if (elements.btnFitOriginalSize) {
        elements.btnFitOriginalSize.addEventListener('click', () => {
            if (!character.portrait || !character.portrait.url) {
                showToast((typeof MMRPG_I18N !== 'undefined') ? MMRPG_I18N.t('toast_need_image') : "Bitte lade zuerst ein Bild hoch oder gib eine Bild-URL ein.");
                return;
            }

            const img = new Image();
            img.onload = () => {
                const natW = img.naturalWidth || 200;
                const natH = img.naturalHeight || 125;
                const ratio = natW / natH;

                let currentW = (character.portrait && character.portrait.width) ? character.portrait.width : 200;
                let targetW = currentW;
                let targetH = Math.round(targetW / ratio);

                if (targetH > 240) {
                    targetH = 240;
                    targetW = Math.round(targetH * ratio);
                    targetW = Math.max(150, Math.min(265, targetW));
                } else if (targetH < 60) {
                    targetH = 60;
                    targetW = Math.round(targetH * ratio);
                    targetW = Math.max(150, Math.min(265, targetW));
                }

                targetW = Math.round(targetW);
                targetH = Math.round(targetH);

                character.portrait.fit = 'contain';
                setPortraitDimensions(targetW, targetH, true, true);
                updatePrintSheet();
                showToast((typeof MMRPG_I18N !== 'undefined') ? MMRPG_I18N.t('toast_portrait_fit', { w: targetW, h: targetH }) : `Vorschau an Originalbild angepasst: ${targetW} × ${targetH} px.`);
            };
            img.onerror = () => {
                showToast((typeof MMRPG_I18N !== 'undefined') ? MMRPG_I18N.t('toast_image_err') : "Fehler: Das Bild konnte nicht geladen werden.");
            };
            img.src = character.portrait.url;
        });
    }

    // Button: "↺ Standard"
    if (elements.btnResetPortraitSize) {
        elements.btnResetPortraitSize.addEventListener('click', () => {
            if (!character.portrait) character.portrait = {};
            character.portrait.fit = 'cover';
            setPortraitDimensions(200, 125, true, true);
            updatePrintSheet();
            showToast((typeof MMRPG_I18N !== 'undefined') ? MMRPG_I18N.t('toast_portrait_reset') : "Standardgröße wiederhergestellt (200 × 125 px).");
        });
    }

    // -------------------------------------------------------------------------
    // 9. Umschalten zwischen Editor und Bogen-Vorschau
    // -------------------------------------------------------------------------
    if (elements.tabEditor) {
        elements.tabEditor.addEventListener('click', () => {
            elements.tabEditor.classList.add('active');
            if (elements.tabPreview) elements.tabPreview.classList.remove('active');
            if (elements.mainContent) elements.mainContent.style.display = 'block';
            if (elements.printSheet) elements.printSheet.classList.remove('preview-mode');
            if (elements.previewToolbar) elements.previewToolbar.classList.remove('active');
        });
    }

    if (elements.tabPreview) {
        elements.tabPreview.addEventListener('click', () => {
            elements.tabPreview.classList.add('active');
            if (elements.tabEditor) elements.tabEditor.classList.remove('active');
            if (elements.mainContent) elements.mainContent.style.display = 'none';
            updatePrintSheet();
            if (elements.printSheet) elements.printSheet.classList.add('preview-mode');
            if (elements.previewToolbar) elements.previewToolbar.classList.add('active');
        });
    }

    // -------------------------------------------------------------------------
    // 10. Drucken & PDF-Export
    // -------------------------------------------------------------------------
    if (elements.btnPrint) {
        elements.btnPrint.addEventListener('click', () => {
            updatePrintSheet();
            showToast((typeof MMRPG_I18N !== 'undefined') ? MMRPG_I18N.t('toast_printed') : "Druckdialog wird geöffnet...");
            setTimeout(() => {
                window.print();
            }, 150);
        });
    }

    // -------------------------------------------------------------------------
    // 11. Speichern, Laden, JSON-Export & Code-Share
    // -------------------------------------------------------------------------
    function saveCharacterLocally() {
        try {
            localStorage.setItem('mmrpg_current_character', JSON.stringify(character));
            if (character && character.id) {
                let roster = getRoster();
                const idx = roster.findIndex(item => item.id === character.id);
                if (idx >= 0) {
                    roster[idx].name = character.name || 'Unbenannter Held';
                    roster[idx].rank = character.rank || 1;
                    roster[idx].updatedAt = Date.now();
                    roster[idx].data = JSON.parse(JSON.stringify(character));
                    localStorage.setItem('mmrpg_saved_roster', JSON.stringify(roster));
                }
            }
        } catch (e) {
            console.error("Fehler beim lokalen Speichern:", e);
        }
    }

    function loadSavedCharacter() {
        try {
            const data = localStorage.getItem('mmrpg_current_character');
            return data ? JSON.parse(data) : null;
        } catch (e) {
            return null;
        }
    }

    function saveToRoster(char) {
        if (!char) return;
        ensureCharacterStructure(char);
        if (!char.id || char.id === 'char-blank') {
            char.id = 'char-' + Date.now();
        }
        let roster = getRoster();
        const existingIdx = roster.findIndex(item => item.id === char.id);
        const heroRecord = {
            id: char.id,
            name: char.name || 'Unbenannter Held',
            rank: char.rank || 1,
            updatedAt: Date.now(),
            data: JSON.parse(JSON.stringify(char))
        };

        if (existingIdx >= 0) {
            roster[existingIdx] = heroRecord;
        } else {
            roster.unshift(heroRecord);
        }

        try {
            localStorage.setItem('mmrpg_saved_roster', JSON.stringify(roster));
        } catch (e) {
            console.error("Fehler beim Roster-Speichern:", e);
        }

        populateRosterDropdown();
    }

    function populateRosterDropdown() {
        if (!elements.presetSelect) return;
        const roster = getRoster();
        const currentId = character ? character.id : '';

        const defaultLabel = (typeof MMRPG_I18N !== 'undefined') ? MMRPG_I18N.t('preset_default') : '★ Helden-Verwaltung...';
        const blankLabel = (typeof MMRPG_I18N !== 'undefined') ? MMRPG_I18N.t('preset_blank') : '+ Neues leeres Blatt (Rank 1)';

        let html = `<option value="">${escapeHtml(defaultLabel)}</option>`;
        html += `<option value="blank">${escapeHtml(blankLabel)}</option>`;

        if (roster.length > 0) {
            html += `<optgroup label="Gespeicherte Helden (${roster.length})">`;
            roster.forEach(item => {
                const isSelected = item.id === currentId ? 'selected' : '';
                html += `<option value="${escapeHtml(item.id)}" ${isSelected}>${escapeHtml(item.name || 'Held')} (Rank ${item.rank || 1})</option>`;
            });
            html += `</optgroup>`;
        }

        elements.presetSelect.innerHTML = html;
        if (currentId && roster.some(item => item.id === currentId)) {
            elements.presetSelect.value = currentId;
        } else {
            elements.presetSelect.value = '';
        }

        updateDeleteHeroButton();
    }

    function updateDeleteHeroButton() {
        if (!elements.btnDeleteHero || !elements.presetSelect) return;
        const val = elements.presetSelect.value;
        const roster = getRoster();
        const isSavedHero = roster.some(item => item.id === val);
        elements.btnDeleteHero.style.display = isSavedHero ? 'inline-flex' : 'none';
        if (isSavedHero) {
            const delTitle = (typeof MMRPG_I18N !== 'undefined') ? MMRPG_I18N.t('btn_delete_hero_title') : 'Ausgewählten Helden löschen';
            elements.btnDeleteHero.setAttribute('title', delTitle);
        }
    }

    if (elements.presetSelect) {
        elements.presetSelect.addEventListener('change', e => {
            const val = e.target.value;
            if (!val) {
                updateDeleteHeroButton();
                return;
            }

            if (val === 'blank') {
                const confirmMsg = (typeof MMRPG_I18N !== 'undefined') ? MMRPG_I18N.t('confirm_reset') : "Neues leeres Blatt erstellen? Nicht gespeicherte Änderungen werden überschrieben.";
                if (confirm(confirmMsg)) {
                    character = JSON.parse(JSON.stringify(SAMPLE_CHARACTERS["blank"]));
                    character.id = 'char-' + Date.now();
                    saveCharacterLocally();
                    renderAll();
                    populateRosterDropdown();
                    showToast((typeof MMRPG_I18N !== 'undefined') ? MMRPG_I18N.t('toast_reset_sheet') : "Neues leeres Charakterblatt erstellt.");
                } else {
                    populateRosterDropdown();
                }
            } else {
                const roster = getRoster();
                const found = roster.find(item => item.id === val);
                if (found && found.data) {
                    character = JSON.parse(JSON.stringify(found.data));
                    saveCharacterLocally();
                    renderAll();
                    showToast((typeof MMRPG_I18N !== 'undefined') ? MMRPG_I18N.t('toast_loaded', { name: character.name || 'Held' }) : `"${character.name || 'Held'}" geladen!`);
                }
                updateDeleteHeroButton();
            }
        });
    }

    if (elements.btnDeleteHero) {
        elements.btnDeleteHero.addEventListener('click', () => {
            const val = elements.presetSelect ? elements.presetSelect.value : '';
            if (!val || val === 'blank') return;
            const roster = getRoster();
            const found = roster.find(item => item.id === val);
            if (!found) return;

            const name = found.name || 'Held';
            const confirmMsg = (typeof MMRPG_I18N !== 'undefined')
                ? MMRPG_I18N.t('confirm_delete_hero', { name })
                : `Möchtest du den Helden "${name}" wirklich aus deinen gespeicherten Charakteren löschen?`;

            if (confirm(confirmMsg)) {
                const updatedRoster = roster.filter(item => item.id !== val);
                try {
                    localStorage.setItem('mmrpg_saved_roster', JSON.stringify(updatedRoster));
                } catch (e) {}

                if (character.id === val) {
                    character = JSON.parse(JSON.stringify(SAMPLE_CHARACTERS["blank"]));
                    character.id = 'char-' + Date.now();
                    saveCharacterLocally();
                    renderAll();
                }

                populateRosterDropdown();
                const toastMsg = (typeof MMRPG_I18N !== 'undefined')
                    ? MMRPG_I18N.t('toast_hero_deleted', { name })
                    : `Held "${name}" wurde gelöscht.`;
                showToast(toastMsg);
            }
        });
    }

    if (elements.btnExportJson) {
        elements.btnExportJson.addEventListener('click', () => {
            saveToRoster(character);
            saveCharacterLocally();

            const fileName = (character.name ? character.name.toLowerCase().replace(/[^a-z0-9]/g, '_') : 'hero') + '_sheet.json';
            const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(character, null, 2));
            const downloadAnchor = document.createElement('a');
            downloadAnchor.setAttribute("href", dataStr);
            downloadAnchor.setAttribute("download", fileName);
            document.body.appendChild(downloadAnchor);
            downloadAnchor.click();
            downloadAnchor.remove();

            const saveToast = (typeof MMRPG_I18N !== 'undefined')
                ? MMRPG_I18N.t('toast_saved', { name: character.name || 'Held' })
                : `Charakter "${character.name || 'Held'}" im Browser gesichert & als Datei exportiert!`;
            showToast(saveToast);
        });
    }

    if (elements.btnImportJson && elements.fileInput) {
        elements.btnImportJson.addEventListener('click', () => {
            elements.fileInput.click();
        });
    }

    if (elements.fileInput) {
        elements.fileInput.addEventListener('change', e => {
            const file = e.target.files[0];
            if (!file) return;

            const reader = new FileReader();
            reader.onload = event => {
                try {
                    const imported = JSON.parse(event.target.result);
                    if (imported && (imported.abilities || imported.rank)) {
                        character = imported;
                        ensureCharacterStructure(character);
                        saveToRoster(character);
                        saveCharacterLocally();
                        renderAll();
                        showToast((typeof MMRPG_I18N !== 'undefined') ? MMRPG_I18N.t('toast_loaded', { name: character.name || 'Charakter' }) : `"${character.name || 'Charakter'}" erfolgreich geladen!`);
                    } else {
                        alert("Ungültige Charakterdatei!");
                    }
                } catch (err) {
                    alert("Fehler beim Lesen der Datei: " + err.message);
                }
            };
            reader.readAsText(file);
            elements.fileInput.value = '';
        });
    }

    // -------------------------------------------------------------------------
    // Einstellungen & Spenden Modals
    // -------------------------------------------------------------------------
    if (elements.btnSettingsOpen && elements.settingsModal) {
        elements.btnSettingsOpen.addEventListener('click', () => {
            elements.settingsModal.classList.add('active');
        });
    }

    if (elements.btnCloseSettings && elements.settingsModal) {
        elements.btnCloseSettings.addEventListener('click', () => {
            elements.settingsModal.classList.remove('active');
        });
    }

    if (elements.btnCloseSettingsDone && elements.settingsModal) {
        elements.btnCloseSettingsDone.addEventListener('click', () => {
            elements.settingsModal.classList.remove('active');
        });
    }

    if (elements.settingsModal) {
        elements.settingsModal.addEventListener('click', e => {
            if (e.target === elements.settingsModal) {
                elements.settingsModal.classList.remove('active');
            }
        });
    }

    // -------------------------------------------------------------------------
    // 11.1. Kompendium / Bibliothek (Powers & Traits Picker mit Sofortsuche)
    // -------------------------------------------------------------------------
    compendiumMode = 'powers';

    function openCompendium(mode) {
        compendiumMode = mode;
        elements.compendiumSearchInput.value = '';
        const curLang = (typeof MMRPG_I18N !== 'undefined') ? MMRPG_I18N.currentLang : 'de';

        if (mode === 'powers') {
            const titlePowers = (typeof MMRPG_I18N !== 'undefined') ? MMRPG_I18N.t('compendium_title_powers') : '📖 Kräfte-Bibliothek (Offizielles Regelwerk)';
            elements.compendiumTitle.innerHTML = escapeHtml(titlePowers);
            elements.compendiumFilterSet.style.display = 'block';
            const allSetsPrompt = (typeof MMRPG_I18N !== 'undefined') ? MMRPG_I18N.t('compendium_all_sets') : 'Alle Kraftgruppen';
            elements.compendiumFilterSet.innerHTML = `<option value="">${escapeHtml(allSetsPrompt)}</option>` + 
                MMRPG_RULES.POWER_SETS.map(s => `<option value="${escapeHtml(s)}">${escapeHtml(s)}</option>`).join('');
            const searchPowersPh = (typeof MMRPG_I18N !== 'undefined') ? MMRPG_I18N.t('compendium_search_powers_ph') : '🔍 Suchen nach Kraft (z.B. Mighty, Shield, Blast, Flight)...';
            elements.compendiumSearchInput.placeholder = searchPowersPh;
        } else {
            const titleTraits = (typeof MMRPG_I18N !== 'undefined') ? MMRPG_I18N.t('compendium_title_traits') : '📖 Traits-Bibliothek (Offizielle Charaktereigenschaften)';
            elements.compendiumTitle.innerHTML = escapeHtml(titleTraits);
            elements.compendiumFilterSet.style.display = 'none';
            const searchTraitsPh = (typeof MMRPG_I18N !== 'undefined') ? MMRPG_I18N.t('compendium_search_traits_ph') : '🔍 Suchen nach Trait (z.B. Reflexes, Senses, Combat)...';
            elements.compendiumSearchInput.placeholder = searchTraitsPh;
        }
        renderCompendiumResults();
        elements.compendiumModal.classList.add('active');
        elements.compendiumSearchInput.focus();
    }

    function renderCompendiumResults() {
        if (typeof MMRPG_COMPENDIUM === 'undefined') return;
        const query = (elements.compendiumSearchInput.value || '').trim().toLowerCase();
        const setFilter = elements.compendiumFilterSet ? elements.compendiumFilterSet.value : '';
        const curLang = (typeof MMRPG_I18N !== 'undefined') ? MMRPG_I18N.currentLang : 'de';
        const addBtnText = (typeof MMRPG_I18N !== 'undefined') ? MMRPG_I18N.t('btn_add_compendium') : '+ Hinzufügen';

        if (compendiumMode === 'powers') {
            let list = MMRPG_COMPENDIUM.POWERS || [];
            if (setFilter) {
                list = list.filter(p => {
                    const clean = (typeof MMRPG_COMPENDIUM.getCleanSetName === 'function') ? MMRPG_COMPENDIUM.getCleanSetName(p.set) : p.set;
                    return clean.toLowerCase() === setFilter.toLowerCase() || p.set === setFilter;
                });
            }
            if (query) {
                list = list.filter(p => {
                    const loc = (typeof MMRPG_COMPENDIUM.getLocalizedPower === 'function') ? MMRPG_COMPENDIUM.getLocalizedPower(p, curLang) : p;
                    return p.name.toLowerCase().includes(query) || 
                        p.set.toLowerCase().includes(query) || 
                        (p.effect && p.effect.toLowerCase().includes(query)) ||
                        (loc && loc.effect && loc.effect.toLowerCase().includes(query));
                });
            }

            if (list.length === 0) {
                const noPowersTxt = (typeof MMRPG_I18N !== 'undefined') ? MMRPG_I18N.t('compendium_no_powers') : 'Keine Kräfte gefunden.';
                elements.compendiumResultsList.innerHTML = `<div style="text-align: center; padding: 30px; color: var(--text-dim);">${escapeHtml(noPowersTxt)}</div>`;
                return;
            }

            elements.compendiumResultsList.innerHTML = list.map((p, idx) => {
                const loc = (typeof MMRPG_COMPENDIUM.getLocalizedPower === 'function') ? MMRPG_COMPENDIUM.getLocalizedPower(p, curLang) : p;
                const costTxt = (typeof MMRPG_I18N !== 'undefined') ? MMRPG_I18N.t('compendium_cost', { cost: p.cost }) : `Kosten: ${p.cost} Fokus`;
                const rangeTxt = (typeof MMRPG_I18N !== 'undefined') ? MMRPG_I18N.t('compendium_range', { range: loc.range }) : `Reichweite: ${loc.range}`;

                return `
                <div class="compendium-item-card">
                    <div class="compendium-item-info">
                        <div class="compendium-item-title">
                            ${escapeHtml(p.name)}
                            <span class="compendium-badge set-badge">${escapeHtml(loc.set)}</span>
                            <span class="compendium-badge action-badge">${escapeHtml(loc.action)}</span>
                            <span class="compendium-badge" style="color: #60a5fa;">${escapeHtml(costTxt)}</span>
                            <span class="compendium-badge">${escapeHtml(rangeTxt)}</span>
                        </div>
                        <div class="compendium-item-desc">${escapeHtml(loc.effect)}</div>
                    </div>
                    <button class="btn btn-primary btn-sm btn-compendium-add" data-index="${idx}">
                        ${escapeHtml(addBtnText)}
                    </button>
                </div>
                `;
            }).join('');

            elements.compendiumResultsList.querySelectorAll('.btn-compendium-add').forEach((btn, idx) => {
                btn.addEventListener('click', () => {
                    if (ruleCompliance) {
                        const limits = MMRPG_RULES.calculateRuleLimits(character);
                        if (limits.actualPowers >= limits.allowedPowers) {
                            showToast((typeof MMRPG_I18N !== 'undefined') ? MMRPG_I18N.t('toast_max_powers', { actual: limits.actualPowers, allowed: limits.allowedPowers }) : `Maximale Anzahl an Kräften erreicht: ${limits.actualPowers} von ${limits.allowedPowers}.`);
                            return;
                        }
                    }
                    const powerToAdd = list[idx];
                    const loc = (typeof MMRPG_COMPENDIUM.getLocalizedPower === 'function') ? MMRPG_COMPENDIUM.getLocalizedPower(powerToAdd, curLang) : powerToAdd;
                    character.powers.unshift({
                        id: 'pow-' + Date.now(),
                        name: powerToAdd.name,
                        set: loc.set,
                        action: powerToAdd.action,
                        cost: powerToAdd.cost,
                        range: loc.range || powerToAdd.range,
                        duration: loc.duration || powerToAdd.duration,
                        effect: loc.effect || powerToAdd.effect
                    });
                    renderAll();
                    showToast((typeof MMRPG_I18N !== 'undefined') ? MMRPG_I18N.t('toast_power_added') : `"${powerToAdd.name}" hinzugefügt!`);
                });
            });

        } else if (compendiumMode === 'traits') {
            let list = MMRPG_COMPENDIUM.TRAITS || [];
            if (query) {
                list = list.filter(t => {
                    const loc = (typeof MMRPG_COMPENDIUM.getLocalizedTrait === 'function') ? MMRPG_COMPENDIUM.getLocalizedTrait(t, curLang) : t;
                    return t.name.toLowerCase().includes(query) || 
                        (t.description && t.description.toLowerCase().includes(query)) ||
                        (loc && loc.description && loc.description.toLowerCase().includes(query));
                });
            }

            if (list.length === 0) {
                const noTraitsTxt = (typeof MMRPG_I18N !== 'undefined') ? MMRPG_I18N.t('compendium_no_traits') : 'Keine Traits gefunden.';
                elements.compendiumResultsList.innerHTML = `<div style="text-align: center; padding: 30px; color: var(--text-dim);">${escapeHtml(noTraitsTxt)}</div>`;
                return;
            }

            const officialTraitBadge = (typeof MMRPG_I18N !== 'undefined') ? MMRPG_I18N.t('compendium_official_trait') : 'Offizieller Trait';

            elements.compendiumResultsList.innerHTML = list.map((t, idx) => {
                const loc = (typeof MMRPG_COMPENDIUM.getLocalizedTrait === 'function') ? MMRPG_COMPENDIUM.getLocalizedTrait(t, curLang) : t;
                return `
                <div class="compendium-item-card">
                    <div class="compendium-item-info">
                        <div class="compendium-item-title">
                            ${escapeHtml(t.name)}
                            <span class="compendium-badge" style="color: var(--marvel-gold);">${escapeHtml(officialTraitBadge)}</span>
                        </div>
                        <div class="compendium-item-desc">${escapeHtml(loc.description)}</div>
                    </div>
                    <button class="btn btn-primary btn-sm btn-compendium-add-trait" data-index="${idx}">
                        ${escapeHtml(addBtnText)}
                    </button>
                </div>
                `;
            }).join('');

            elements.compendiumResultsList.querySelectorAll('.btn-compendium-add-trait').forEach((btn, idx) => {
                btn.addEventListener('click', () => {
                    if (ruleCompliance) {
                        const limits = MMRPG_RULES.calculateRuleLimits(character);
                        if (limits.actualTraits >= limits.allowedTraits) {
                            showToast((typeof MMRPG_I18N !== 'undefined') ? MMRPG_I18N.t('toast_max_traits', { actual: limits.actualTraits, allowed: limits.allowedTraits }) : `Maximale Anzahl an Traits erreicht: ${limits.actualTraits} von ${limits.allowedTraits}.`);
                            return;
                        }
                    }
                    const traitToAdd = list[idx];
                    const loc = (typeof MMRPG_COMPENDIUM.getLocalizedTrait === 'function') ? MMRPG_COMPENDIUM.getLocalizedTrait(traitToAdd, curLang) : traitToAdd;
                    if (!character.traits) character.traits = [];
                    character.traits.unshift({
                        id: 'tr-' + Date.now(),
                        name: traitToAdd.name,
                        description: loc.description || traitToAdd.description
                    });
                    renderAll();
                    showToast((typeof MMRPG_I18N !== 'undefined') ? MMRPG_I18N.t('toast_trait_added') : `Trait "${traitToAdd.name}" hinzugefügt!`);
                });
            });
        }
    }

    if (elements.btnOpenPowersCompendium) {
        elements.btnOpenPowersCompendium.addEventListener('click', () => openCompendium('powers'));
    }
    if (elements.btnOpenTraitsCompendium) {
        elements.btnOpenTraitsCompendium.addEventListener('click', () => openCompendium('traits'));
    }
    if (elements.compendiumSearchInput) {
        elements.compendiumSearchInput.addEventListener('input', renderCompendiumResults);
    }
    if (elements.compendiumFilterSet) {
        elements.compendiumFilterSet.addEventListener('change', renderCompendiumResults);
    }
    if (elements.btnCloseCompendium) {
        elements.btnCloseCompendium.addEventListener('click', () => elements.compendiumModal.classList.remove('active'));
    }
    if (elements.compendiumModal) {
        elements.compendiumModal.addEventListener('click', e => {
            if (e.target === elements.compendiumModal) elements.compendiumModal.classList.remove('active');
        });
    }

    // -------------------------------------------------------------------------
    // 12. Blatt zurücksetzen
    // -------------------------------------------------------------------------

    if (elements.btnResetSheet) {
        elements.btnResetSheet.addEventListener('click', () => {
            const confirmResetMsg = (typeof MMRPG_I18N !== 'undefined') ? MMRPG_I18N.t('confirm_reset') : "Möchtest du das gesamte Charakterblatt zurücksetzen?";
            if (confirm(confirmResetMsg)) {
                character = JSON.parse(JSON.stringify(SAMPLE_CHARACTERS["blank"]));
                character.id = 'char-' + Date.now();
                saveCharacterLocally();
                renderAll();
                populateRosterDropdown();
                showToast((typeof MMRPG_I18N !== 'undefined') ? MMRPG_I18N.t('toast_reset_sheet') : "Neues leeres Charakterblatt erstellt.");
            }
        });
    }

    // -------------------------------------------------------------------------
    // 13. Hilfsfunktionen
    // -------------------------------------------------------------------------
    function ensureCharacterStructure(char) {
        if (!char) return;
        if (!char.id || char.id === 'char-spiderman') char.id = 'char-' + Date.now();
        if (!char.abilities) char.abilities = { melee: 1, agility: 1, resilience: 1, vigilance: 1, ego: 1, logic: 0 };
        // Kompatibilität might -> melee
        if (char.abilities.melee === undefined && char.abilities.might !== undefined) {
            char.abilities.melee = char.abilities.might;
        }
        if (!char.defenseBonuses) char.defenseBonuses = { melee: 0, agility: 0, resilience: 0, vigilance: 0, ego: 0, logic: 0 };
        if (!char.nonCombatBonuses) char.nonCombatBonuses = { melee: 0, agility: 0, resilience: 0, vigilance: 0, ego: 0, logic: 0 };
        if (!char.damageBonuses) char.damageBonuses = { melee: 0, agility: 0, ego: 0, logic: 0 };

        if (!char.speed || typeof char.speed !== 'object') {
            const oldSpeed = parseInt(char.speed, 10) || 5;
            char.speed = { run: oldSpeed, climb: oldSpeed, jump: oldSpeed, swim: Math.floor(oldSpeed / 2), extra: [] };
        }
        if (!Array.isArray(char.speed.extra)) char.speed.extra = [];
        if (!Array.isArray(char.powers)) char.powers = [];
        if (!Array.isArray(char.traits)) char.traits = [];
        if (!Array.isArray(char.tags)) char.tags = [];

        if (!char.portrait || typeof char.portrait !== 'object') {
            char.portrait = {
                url: typeof char.portrait === 'string' ? char.portrait : '',
                width: 200,
                height: 125,
                fit: 'cover'
            };
        }
        if (char.portrait.width === undefined) char.portrait.width = 200;
        if (char.portrait.height === undefined) char.portrait.height = 125;
        if (!char.portrait.fit) char.portrait.fit = 'cover';
        if (char.portrait.url === undefined) char.portrait.url = '';
    }

    function showToast(msg) {
        if (!elements.toastContainer) return;
        const toast = document.createElement('div');
        toast.className = 'toast';
        toast.innerHTML = `<span>★</span> <span>${escapeHtml(msg)}</span>`;
        elements.toastContainer.appendChild(toast);
        setTimeout(() => {
            toast.style.opacity = '0';
            toast.style.transform = 'translateX(100%)';
            toast.style.transition = 'all 0.3s ease';
            setTimeout(() => toast.remove(), 300);
        }, 3000);
    }

    function escapeHtml(str) {
        if (str === null || str === undefined) return '';
        return String(str)
            .replace(/&/g, '&amp;')
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;')
            .replace(/"/g, '&quot;')
            .replace(/'/g, '&#039;');
    }

    // -------------------------------------------------------------------------
    // 14. Einklappbare Sektionen (Collapsible Sections) zur UI-Anpassung
    // -------------------------------------------------------------------------
    function setupCollapsibleSections() {
        document.querySelectorAll('.section-card .section-header').forEach(header => {
            if (header.dataset.collapsibleInit) return;
            header.dataset.collapsibleInit = 'true';

            let toggleBtn = header.querySelector('.section-toggle-btn');
            if (!toggleBtn) {
                toggleBtn = document.createElement('button');
                toggleBtn.className = 'section-toggle-btn';
                toggleBtn.title = 'Bereich ein-/ausklappen';
                toggleBtn.type = 'button';
                toggleBtn.innerHTML = '▾';
                header.appendChild(toggleBtn);
            }

            header.addEventListener('click', (e) => {
                // Klicks auf Buttons, Dropdowns, Inputs im Header nicht abfangen
                if (e.target.closest('button:not(.section-toggle-btn), select, input, label')) return;
                const card = header.closest('.section-card');
                if (card) {
                    card.classList.toggle('collapsed');
                }
            });
        });
    }

    // -------------------------------------------------------------------------
    // 15. Initiale Ausführung nach vollständiger Registrierung
    // -------------------------------------------------------------------------
    if (typeof MMRPG_I18N !== 'undefined') {
        const activeLang = MMRPG_I18N.initLanguage();
        if (elements.languageSelect) {
            elements.languageSelect.value = activeLang;
            elements.languageSelect.addEventListener('change', (e) => {
                MMRPG_I18N.setLanguage(e.target.value);
                renderAll(true);
            });
        }
    }

    // Modal: Willkommen / Sprachauswahl beim Website-Start
    if (elements.languageWelcomeModal) {
        let hasChosen = false;
        try {
            hasChosen = localStorage.getItem('mmrpg_lang_chosen');
        } catch (e) {}

        if (!hasChosen) {
            elements.languageWelcomeModal.classList.add('active');
        }

        elements.languageWelcomeModal.querySelectorAll('.btn-lang-choice').forEach(btn => {
            btn.addEventListener('click', () => {
                const lang = btn.dataset.lang;
                try {
                    localStorage.setItem('mmrpg_lang_chosen', 'true');
                } catch (e) {}
                if (typeof MMRPG_I18N !== 'undefined') {
                    MMRPG_I18N.setLanguage(lang);
                }
                if (elements.languageSelect) {
                    elements.languageSelect.value = lang;
                }
                elements.languageWelcomeModal.classList.remove('active');
                if (typeof window.refreshI18nDynamicContent === 'function') {
                    window.refreshI18nDynamicContent();
                }
            });
        });

        if (elements.btnCloseLangModal) {
            elements.btnCloseLangModal.addEventListener('click', () => {
                try {
                    localStorage.setItem('mmrpg_lang_chosen', 'true');
                } catch (e) {}
                elements.languageWelcomeModal.classList.remove('active');
            });
        }

        elements.languageWelcomeModal.addEventListener('click', (e) => {
            if (e.target === elements.languageWelcomeModal) {
                try {
                    localStorage.setItem('mmrpg_lang_chosen', 'true');
                } catch (e) {}
                elements.languageWelcomeModal.classList.remove('active');
            }
        });
    }

    window.refreshI18nDynamicContent = () => {
        populateDropdowns();
        renderAll(true);
        populateRosterDropdown();
    };

    applyTheme(currentTheme);
    setRuleCompliance(ruleCompliance, false);
    if (elements.togglePowerDescEditor) elements.togglePowerDescEditor.checked = showPowerDescriptions;
    if (elements.togglePowerDescPreview) elements.togglePowerDescPreview.checked = showPowerDescriptions;
    populateDropdowns();
    populateRosterDropdown();
    renderAll();
    setupCollapsibleSections();
});
