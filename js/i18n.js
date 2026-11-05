/**
 * Multiverse d616 RPG - Internationalisierung (i18n)
 * Unterstützte Sprachen: Deutsch (de), English (en), Español (es), Italiano (it), Français (fr)
 * 
 * HINWEIS: Alle grundlegenden englischen Spielbegriffe (Melee, Agility, Resilience, Vigilance,
 * Ego, Logic, Rank, Karma, Damage Multipliers, Powers, Traits, Tags)
 * bleiben laut Anforderung unverändert auf Englisch.
 * Übersetzt werden Bedienungsanleitungen, Hilfsnotizen, UI-Buttons, Tooltips, Toasts und Sektionen.
 */

const MMRPG_I18N = {
    currentLang: 'de',

    translations: {
        de: {
            // Header & Navigation
            app_title: "MULTIVERSE HERO CREATOR",
            app_subtitle: "",
            nav_editor: "✏️ Editor",
            nav_preview: "📄 Bogen-Vorschau",
            preset_default: "★ Helden-Verwaltung...",
            preset_blank: "+ Neues leeres Blatt (Rank 1)",
            btn_open: "📂 Öffnen",
            btn_save: "💾 Speichern",
            btn_print: "🖨️ Drucken / PDF",
            btn_settings: "Einstellungen",
            rule_compliance: "Regeln befolgen",
            theme_light: "Hell",
            theme_dark: "Dunkel",
            btn_reset: "🗑️ Blatt leeren",
            btn_done: "Fertig",

            // Einstellungen-Modal
            settings_title: "Einstellungen",
            setting_rules_title: "Regeln befolgen",
            setting_rules_desc: "Punktebudget, Attribut-Caps und Limits je nach Rang erzwingen",
            setting_lang_title: "Sprache / Language",
            setting_lang_desc: "Benutzeroberfläche und Hilfetexte übersetzen",
            setting_theme_title: "Farbschema / Theme",
            setting_theme_desc: "Zwischen Dunkel- und Hell-Modus umschalten",
            setting_contact: "Feedback, Wünsche oder Fragen? Schreibe gerne an:",

            // Untertitel der 6 Attribute
            sub_melee: "Nahkampf & Physis",
            sub_agility: "Fernkampf & Reflexe",
            sub_resilience: "Zähigkeit & Leben",
            sub_vigilance: "Wahrnehmung & Fokus",
            sub_ego: "Charisma & Willenskraft",
            sub_logic: "Wissen & Taktik",

            // Profil & Kernwerte
            stat_rank: "Rang",
            stat_karma: "Karma",
            stat_karma_sub: "Startet standardmäßig bei Rang",
            stat_health: "Gesundheit",
            stat_focus: "Fokus",
            stat_initiative: "Initiative-Modifier",
            stat_with_edge: "Mit Edge (E)",

            // Fortbewegung (Speed)
            speed_run: "Run (Laufen)",
            speed_climb: "Climb (Klettern)",
            speed_jump: "Jump (Springen)",
            speed_swim: "Swim (Schwimmen)",
            default_extra_speed_name: "Fliegen",
            empty_extra_speeds: "Keine zusätzlichen Fortbewegungsarten eingetragen.",
            ph_extra_speed_name: "z.B. Flight, Swingline, Glide",
            ph_extra_speed_val: "Wert",

            // Leere Zustände im Editor
            empty_powers_editor: "Noch keine Kräfte eingetragen. Klicke auf <strong>+ Neue Kraft</strong>!",
            empty_traits_editor: "Keine Traits eingetragen.",
            empty_tags_editor: "Keine Tags hinzugefügt.",

            // Formular-Platzhalter
            ph_char_name: "z.B. Shadow Knight",
            ph_char_real_name: "John Doe",
            ph_char_player: "Dein Name / Spielleiter",
            ph_char_height: "5'10\" (1,78 m)",
            ph_char_weight: "170 lbs. (77 kg)",
            ph_char_gender: "Männlich / Weiblich / Divers",
            ph_char_eyes: "Braun / Blau / Grün...",
            ph_char_hair: "Schwarz / Braun / Blond...",
            ph_char_dist_features: "Narben, Tätowierungen, Maske...",
            ph_char_origin: "z.B. High-Tech, Mutant, Alien...",
            ph_char_occupation: "z.B. Adventurer, Scientist, Student...",
            ph_char_base: "New York City",
            ph_char_teams: "Midnight Sons, Champions, Freelance...",
            ph_char_history: "Eigene Heldengeschichte und Ursprung...",
            ph_char_personality: "Persönlichkeit, Werte, Kodex und Antriebe...",
            ph_tag_custom: "Oder eigener Tag...",

            // Kraft & Trait Editor
            ph_power_name: "z.B. Mighty 1, Evasion, Flight",
            ph_power_range: "Nahkampf, 10 Felder...",
            ph_trait_name: "Trait-Name",
            btn_delete_power_title: "Kraft entfernen",
            btn_delete_trait_title: "Trait entfernen",
            btn_move_up: "Nach oben verschieben",
            btn_move_down: "Nach unten verschieben",
            default_new_power: "Neue Kraft",
            default_new_trait: "Neuer Trait",

            // Bibliothek / Kompendium Modal
            compendium_title_powers: "📖 Kräfte-Bibliothek (Offizielles Regelwerk)",
            compendium_title_traits: "📖 Traits-Bibliothek (Offizielle Eigenschaften)",
            compendium_search_powers_ph: "🔍 Suchen nach Kraft (z.B. Mighty, Shield, Blast, Flight)...",
            compendium_search_traits_ph: "🔍 Suchen nach Trait (z.B. Reflexes, Senses, Combat)...",
            compendium_no_powers: "Keine Kräfte gefunden.",
            compendium_no_traits: "Keine Traits gefunden.",
            compendium_cost: "Kosten: {cost} Fokus",
            compendium_range: "Reichweite: {range}",
            compendium_official_trait: "Offizieller Trait",

            // Heldenverwaltung Löschen
            btn_delete_hero_title: "Ausgewählten Helden löschen",
            confirm_delete_hero: "Möchtest du den Helden \"{name}\" wirklich aus deinen gespeicherten Charakteren löschen?",
            toast_hero_deleted: "Held \"{name}\" wurde gelöscht.",
            lbl_saved_roster: "Gespeicherte Helden:",
            msg_no_saved_heroes: "Noch keine Helden gespeichert.",
            btn_delete_hero_item_title: "Diesen Helden löschen",
            opt_pick_preset: "Vorgaben",
            footer_contact: "✉️ Kontakt:",
            welcome_lang_title: "🌐 Sprache wählen / Choose Language",
            welcome_lang_desc: "Wähle deine bevorzugte Sprache für den Editor, die Regeln und die Bogen-Vorschau.",
            btn_open_lang_selector: "Sprachauswahl öffnen",

            // Regel-Notizen (Tipps)
            rule_note_rank: "Der Rang bestimmt das Punktebudget von <strong class=\"rule-base-points-num\">{points}</strong> Ability Points, das Attribut-Maximum von <strong class=\"rule-cap-num\">{cap}</strong> sowie das Limit von <strong class=\"rule-base-powers-num\">{powers}</strong> Kräften und <strong class=\"rule-base-traits-num\">{traits}</strong> Traits. Nicht genutzte Kräfte können 1 zu 1 in Ability Points oder Traits umgewandelt werden.",
            rule_note_abilities: "Das Punktebudget beträgt <strong class=\"rule-points-num\">{points}</strong> Ability Points. Der Maximalwert pro Attribut liegt bei <strong class=\"rule-cap-num\">{cap}</strong>. Werte bis -3 sind erlaubt und geben Punkte für andere Attribute frei.",
            rule_note_damage: "Der Basis-Schadensmultiplikator entspricht dem Rang. Bestimmte Kräfte erhöhen diesen Multiplikator weiter.",
            rule_note_powers: "Erlaubt sind maximal <strong class=\"rule-powers-num\">{powers}</strong> Kräfte.",
            rule_note_traits: "Erlaubt sind bis zu <strong class=\"rule-traits-num\">{traits}</strong> Traits. Tags sind rein narrativ und haben kein Limit.",
            rank_limits_display: "Max. Attribut: <strong>{maxAbility}</strong> | Powers: <strong>{actualPowers}/{allowedPowers}</strong> | Traits: <strong>{actualTraits}/{allowedTraits}</strong>",

            // Sektionen
            section_1_title: "Attribute, Verteidigung & Checks",
            section_2_title: "Schadensmultiplikatoren",
            section_2_formula: "Formel: [M-Dice] × Multiplikator + Ability Score",
            section_3_title: "Fortbewegung & Geschwindigkeiten",
            btn_add_speed: "+ Neue Fortbewegung",
            section_4_title: "Helden-Identität & Physische Details",
            section_5_title: "Kräfte",
            toggle_power_desc: "Erklärungen im Bogen anzeigen",
            btn_compendium_powers: "📖 Aus Bibliothek auswählen",
            btn_add_power: "+ Neue Kraft",
            section_6_title: "Traits & Tags",
            btn_add_trait: "+ Neuer Trait",
            btn_compendium_traits: "📖 Aus Bibliothek",
            btn_add_tag: "+ Neuer Tag",
            tag_picker_default: "★ Tag aus Liste wählen...",
            section_7_title: "Biografie & Persönlichkeit",

            // Formular-Labels
            lbl_hero_name: "Heldenname",
            lbl_real_name: "Bürgerlicher Name",
            lbl_player: "Spieler / Narrator",
            lbl_height: "Größe",
            lbl_weight: "Gewicht",
            lbl_gender: "Geschlecht",
            lbl_eyes: "Augen",
            lbl_hair: "Haare",
            lbl_size: "Größenkategorie",
            lbl_dist_features: "Besondere Merkmale",
            lbl_origin: "Herkunft",
            lbl_occupation: "Beruf",
            lbl_identity: "Identitätsstatus",
            lbl_base: "Einsatzbasis",
            lbl_teams: "Teams & Allianzen",
            lbl_history: "Geschichte & Werdegang",
            lbl_personality: "Persönlichkeit & Motivation",
            lbl_power_name: "Kraft-Name",
            lbl_power_set: "Kraftgruppe (Power Set)",
            lbl_power_action: "Aktion",
            lbl_power_cost: "Fokus-Kosten",
            lbl_power_range: "Reichweite",
            lbl_power_desc: "Beschreibung / Effekt",
            ph_power_desc: "Effekt, Schaden, Dauer...",
            ph_trait_desc: "Beschreibung oder Regel des Traits...",

            // Bogenvorschau Toolbar & Interaktion
            pt_power_desc: "📖 Kraft-Erklärungen",
            pt_hero_image: "Heldenbild:",
            pt_choose_image: "🖼️ Bild wählen",
            pt_url: "🌐 URL",
            pt_delete_image: "✕ Bild löschen",
            pt_width: "Breite:",
            pt_height: "Höhe:",
            pt_fit_original: "📐 An Originalgröße anpassen",
            pt_reset: "↺ Standard",
            ph_portrait_click: "[ Bild einfügen ]",
            ph_portrait_hover_upload: "📷 Klicken zum Hochladen",
            ph_portrait_hover_change: "📷 Bild ändern",

            // Druckbogen Texte & Platzhalter
            sheet_empty_powers: "Keine Kräfte eingetragen.",
            sheet_empty_traits: "Keine Traits eingetragen.",
            sheet_none: "Keine",
            sheet_empty_history: "Keine Vorgeschichte hinterlegt.",
            sheet_empty_personality: "Keine Persönlichkeitsnotizen hinterlegt.",
            sheet_powers_with_desc: "Inkl. Effekte",
            sheet_powers_compact: "Kompakt",
            sheet_drag_resize_hint: "Ziehen zum Ändern von Breite & Höhe",
            sheet_drag_width_hint: "Ziehen zum Ändern der Spaltenbreite",
            sheet_drag_height_hint: "Ziehen zum Ändern der Bildhöhe",

            // Status-Badges
            points_perfect: "✓ 0 übrig (Perfekt)",
            points_remaining: "{n} übrig",
            points_traded: "✓ +{n} aus Kräften",
            points_over: "⚠️ +{n} zu viel!",
            points_free: "Freier Modus",
            points_budget_title: "Punkte: {spent} / {max}",

            // Modals
            modal_compendium_title: "📖 Offizielle Bibliothek",
            compendium_search_ph: "🔍 Suchen nach Name oder Effekt (z.B. Mighty, Shield, Blast)...",
            compendium_all_sets: "Alle Kraftgruppen",
            btn_add_compendium: "+ Hinzufügen",

            // Toasts & Dialoge
            toast_max_powers: "Maximale Anzahl an Kräften erreicht: {actual} von {allowed}.",
            toast_max_traits: "Maximale Anzahl an Traits erreicht: {actual} von {allowed}.",
            toast_rules_on: "Offizielle Regeln aktiviert: Attribute auf 0 gesetzt (Punktebudget bereit zur Verteilung).",
            toast_rules_off: "Freier Modus aktiviert: Keine Begrenzung für Ability Points, Kräfte und Traits.",
            toast_power_added: "Kraft hinzugefügt.",
            toast_trait_added: "Trait hinzugefügt.",
            toast_power_removed: "Kraft entfernt.",
            toast_trait_removed: "Trait entfernt.",
            toast_speed_added: "Fortbewegungsart hinzugefügt.",
            toast_portrait_uploaded: "Charakterbild hochgeladen!",
            toast_portrait_fit: "Vorschau an Originalbild angepasst: {w} × {h} px.",
            toast_portrait_reset: "Standardgröße wiederhergestellt (200 × 125 px).",
            toast_portrait_removed: "Charakterbild entfernt.",
            toast_portrait_url: "Bild-URL übernommen!",
            toast_printed: "Druckdialog wird geöffnet...",
            toast_saved: "Charakter \"{name}\" im Browser gesichert & als Datei exportiert!",
            toast_loaded: "\"{name}\" erfolgreich geladen!",
            toast_reset_sheet: "Neues leeres Charakterblatt erstellt.",
            toast_need_image: "Bitte lade zuerst ein Bild hoch oder gib eine Bild-URL ein.",
            toast_image_err: "Fehler: Das Bild konnte nicht geladen werden.",
            prompt_image_url: "Internet-Adresse (URL) des Heldenbildes eingeben:",
            confirm_reset: "Möchtest du das gesamte Charakterblatt zurücksetzen?",
            confirm_load_preset: "Charakter \"{name}\" laden? Nicht gespeicherte Änderungen werden überschrieben.",

            // Dropdown Optionen (sauber ohne Klammern)
            origins: {
                "Alien": "Außerirdisch",
                "High-Tech": "Hochtechnologie",
                "Inhuman": "Inhuman",
                "Magic": "Magisch",
                "Mutant": "Mutant",
                "Special Training": "Spezielles Training",
                "Weird Science": "Unerforschte Wissenschaft",
                "Cybernetic": "Kybernetisch",
                "Mythic": "Mythisch",
                "Sonstiges": "Sonstiges / Eigener Ursprung"
            },
            occupations: {
                "Adventurer": "Abenteurer",
                "Assassin": "Attentäter",
                "Criminal": "Krimineller",
                "Engineer": "Ingenieur",
                "Journalist": "Journalist",
                "Law Enforcement": "Polizei / Sicherheit",
                "Leader": "Anführer",
                "Military": "Militär",
                "Outsider": "Außenseiter",
                "Scientist": "Wissenschaftler",
                "Spy": "Spion / Geheimagent",
                "Student": "Schüler / Student",
                "Tycoon": "Unternehmer",
                "Sonstiges": "Sonstiges / Eigener Beruf"
            },
            sizes: {
                "Average": "Durchschnittlich",
                "Small": "Klein",
                "Big": "Groß",
                "Gigantic": "Gigantisch",
                "Microscopic": "Mikroskopisch"
            },
            identities: {
                "Geheim": "Geheim",
                "Öffentlich": "Öffentlich"
            },

            footer_disclaimer: "<strong>Disclaimer:</strong> Dies ist ein unabhängiges, nicht-kommerzielles Fan-Begleitwerkzeug für das <em>Multiverse d616 Rollenspielsystem</em>. Nicht autorisiert, unterstützt oder verbunden mit Marvel Characters, Inc. oder The Walt Disney Company. Alle ursprünglichen Spielmechaniken, Markenzeichen und Urheberrechte sind Eigentum ihrer jeweiligen Inhaber. Alle Rechte vorbehalten."
        },

        en: {
            // Header & Navigation
            app_title: "MULTIVERSE HERO CREATOR",
            app_subtitle: "",
            nav_editor: "✏️ Editor",
            nav_preview: "📄 Sheet Preview",
            preset_default: "★ Hero Manager...",
            preset_blank: "+ New Blank Sheet (Rank 1)",
            btn_open: "📂 Open",
            btn_save: "💾 Save",
            btn_print: "🖨️ Print / PDF",
            btn_settings: "Settings",
            rule_compliance: "Follow Rules",
            theme_light: "Light",
            theme_dark: "Dark",
            btn_reset: "🗑️ Reset sheet",
            btn_done: "Done",

            // Settings Modal
            settings_title: "Settings",
            setting_rules_title: "Follow Rules",
            setting_rules_desc: "Enforce points budget, attribute caps, and limits based on Rank",
            setting_lang_title: "Language",
            setting_lang_desc: "Translate interface, labels, and helper tips",
            setting_theme_title: "Theme",
            setting_theme_desc: "Toggle between dark and light appearance",
            setting_contact: "Feedback, suggestions, or questions? Contact:",

            // Subtitles of the 6 Abilities
            sub_melee: "Close Combat & Physical",
            sub_agility: "Ranged Combat & Reflexes",
            sub_resilience: "Stamina & Health",
            sub_vigilance: "Perception & Focus",
            sub_ego: "Charisma & Willpower",
            sub_logic: "Knowledge & Tactics",

            // Profile & Core Stats
            stat_rank: "Rank",
            stat_karma: "Karma",
            stat_karma_sub: "Starts at Rank by default",
            stat_health: "Health",
            stat_focus: "Focus",
            stat_initiative: "Initiative Modifier",
            stat_with_edge: "With Edge (E)",

            // Movement & Speeds
            speed_run: "Run",
            speed_climb: "Climb",
            speed_jump: "Jump",
            speed_swim: "Swim",
            default_extra_speed_name: "Flight",
            empty_extra_speeds: "No additional movement modes added.",
            ph_extra_speed_name: "e.g. Flight, Swingline, Glide",
            ph_extra_speed_val: "Value",

            // Editor Empty States
            empty_powers_editor: "No powers added yet. Click <strong>+ New Power</strong>!",
            empty_traits_editor: "No traits added.",
            empty_tags_editor: "No tags added.",

            // Form Placeholders
            ph_char_name: "e.g. Shadow Knight",
            ph_char_real_name: "John Doe",
            ph_char_player: "Your Name / Narrator",
            ph_char_height: "5'10\" (1.78 m)",
            ph_char_weight: "170 lbs. (77 kg)",
            ph_char_gender: "Male / Female / Other",
            ph_char_eyes: "Brown / Blue / Green...",
            ph_char_hair: "Black / Brown / Blonde...",
            ph_char_dist_features: "Scars, tattoos, mask...",
            ph_char_origin: "e.g. High-Tech, Mutant, Alien...",
            ph_char_occupation: "e.g. Adventurer, Scientist, Student...",
            ph_char_base: "New York City",
            ph_char_teams: "Midnight Sons, Champions, Freelance...",
            ph_char_history: "Hero origin story, background, and history...",
            ph_char_personality: "Personality, values, code of conduct, and drives...",
            ph_tag_custom: "Or custom tag...",

            // Power & Trait Editor
            ph_power_name: "e.g. Mighty 1, Evasion, Flight",
            ph_power_range: "Melee, 10 spaces...",
            ph_trait_name: "Trait Name",
            btn_delete_power_title: "Remove power",
            btn_delete_trait_title: "Remove trait",
            btn_move_up: "Move up",
            btn_move_down: "Move down",
            default_new_power: "New Power",
            default_new_trait: "New Trait",

            // Compendium Modal
            compendium_title_powers: "📖 Powers Library (Official Rules)",
            compendium_title_traits: "📖 Traits Library (Official Traits)",
            compendium_search_powers_ph: "🔍 Search power (e.g. Mighty, Shield, Blast, Flight)...",
            compendium_search_traits_ph: "🔍 Search trait (e.g. Reflexes, Senses, Combat)...",
            compendium_no_powers: "No powers found.",
            compendium_no_traits: "No traits found.",
            compendium_cost: "Cost: {cost} Focus",
            compendium_range: "Range: {range}",
            compendium_official_trait: "Official Trait",

            // Hero Delete
            btn_delete_hero_title: "Delete selected hero",
            confirm_delete_hero: "Do you really want to delete \"{name}\" from your saved heroes?",
            toast_hero_deleted: "Hero \"{name}\" was deleted.",
            lbl_saved_roster: "Saved Heroes:",
            msg_no_saved_heroes: "No heroes saved yet.",
            btn_delete_hero_item_title: "Delete this hero",
            opt_pick_preset: "Presets",
            footer_contact: "✉️ Contact:",
            welcome_lang_title: "🌐 Choose Language / Sprache wählen",
            welcome_lang_desc: "Choose your preferred language for the editor, rules, and sheet preview.",
            btn_open_lang_selector: "Open language picker",

            // Rule Notes (Tips)
            rule_note_rank: "Rank determines the points budget of <strong class=\"rule-base-points-num\">{points}</strong> Ability Points, maximum attribute cap of <strong class=\"rule-cap-num\">{cap}</strong>, and limits of <strong class=\"rule-base-powers-num\">{powers}</strong> Powers and <strong class=\"rule-base-traits-num\">{traits}</strong> Traits. Unused Powers convert 1 to 1 into Ability Points or Traits.",
            rule_note_abilities: "Points budget is <strong class=\"rule-points-num\">{points}</strong> Ability Points. Maximum value per attribute is <strong class=\"rule-cap-num\">{cap}</strong>. Values down to -3 are permitted and grant points for other attributes.",
            rule_note_damage: "Base damage multiplier equals Rank. Specific powers further increase this multiplier.",
            rule_note_powers: "Allowed maximum is <strong class=\"rule-powers-num\">{powers}</strong> Powers.",
            rule_note_traits: "Allowed up to <strong class=\"rule-traits-num\">{traits}</strong> Traits. Tags are purely narrative and have no limit.",
            rank_limits_display: "Max. Ability: <strong>{maxAbility}</strong> | Powers: <strong>{actualPowers}/{allowedPowers}</strong> | Traits: <strong>{actualTraits}/{allowedTraits}</strong>",

            // Sections
            section_1_title: "Attributes, Defense & Checks",
            section_2_title: "Damage Multipliers",
            section_2_formula: "Formula: [M-Dice] × Multiplier + Ability Score",
            section_3_title: "Movement & Speeds",
            btn_add_speed: "+ New Movement",
            section_4_title: "Hero Identity & Physical Details",
            section_5_title: "Powers",
            toggle_power_desc: "Show descriptions on printed sheet",
            btn_compendium_powers: "📖 Select from Library",
            btn_add_power: "+ New Power",
            section_6_title: "Traits & Tags",
            btn_add_trait: "+ New Trait",
            btn_compendium_traits: "📖 From Library",
            btn_add_tag: "+ Add Tag",
            tag_picker_default: "★ Choose Tag from list...",
            section_7_title: "Biography & Personality",

            // Form Labels
            lbl_hero_name: "Hero Name",
            lbl_real_name: "Real Name",
            lbl_player: "Player / Narrator",
            lbl_height: "Height",
            lbl_weight: "Weight",
            lbl_gender: "Gender",
            lbl_eyes: "Eyes",
            lbl_hair: "Hair",
            lbl_size: "Size Category",
            lbl_dist_features: "Distinguishing Features",
            lbl_origin: "Origin",
            lbl_occupation: "Occupation",
            lbl_identity: "Identity Status",
            lbl_base: "Base of Operations",
            lbl_teams: "Teams / Affiliations",
            lbl_history: "History & Background",
            lbl_personality: "Personality & Motivation",
            lbl_power_name: "Power Name",
            lbl_power_set: "Power Set",
            lbl_power_action: "Action",
            lbl_power_cost: "Focus Cost",
            lbl_power_range: "Range",
            lbl_power_desc: "Description / Effect",
            ph_power_desc: "Effect, damage, duration...",
            ph_trait_desc: "Description or rule of the trait...",

            // Sheet Preview Toolbar & Interaction
            pt_power_desc: "📖 Power Descriptions",
            pt_hero_image: "Hero Image:",
            pt_choose_image: "🖼️ Choose Image",
            pt_url: "🌐 URL",
            pt_delete_image: "✕ Remove Image",
            pt_width: "Width:",
            pt_height: "Height:",
            pt_fit_original: "📐 Fit to Original Size",
            pt_reset: "↺ Reset",
            ph_portrait_click: "[ Add Image ]",
            ph_portrait_hover_upload: "📷 Click to upload",
            ph_portrait_hover_change: "📷 Change image",

            // Sheet Preview Texts & Placeholders
            sheet_empty_powers: "No powers recorded.",
            sheet_empty_traits: "No traits recorded.",
            sheet_none: "None",
            sheet_empty_history: "No history recorded.",
            sheet_empty_personality: "No personality notes recorded.",
            sheet_powers_with_desc: "With effects",
            sheet_powers_compact: "Compact",
            sheet_drag_resize_hint: "Drag to resize (width & height)",
            sheet_drag_width_hint: "Drag to change column width",
            sheet_drag_height_hint: "Drag to change image height",

            // Status Badges
            points_perfect: "✓ 0 remaining (Perfect)",
            points_remaining: "{n} remaining",
            points_traded: "✓ +{n} from Powers",
            points_over: "⚠️ +{n} over limit!",
            points_free: "Free Mode",
            points_budget_title: "Points: {spent} / {max}",

            // Modals
            modal_compendium_title: "📖 Official Library",
            compendium_search_ph: "🔍 Search by name or effect (e.g. Mighty, Shield, Blast)...",
            compendium_all_sets: "All Power Sets",
            btn_add_compendium: "+ Add",

            // Toasts & Dialogs
            toast_max_powers: "Maximum number of Powers reached: {actual} of {allowed}.",
            toast_max_traits: "Maximum number of Traits reached: {actual} of {allowed}.",
            toast_rules_on: "Official rules enabled: Attributes reset to 0 (points budget ready for distribution).",
            toast_rules_off: "Free mode enabled: No limits on ability points, powers, or traits.",
            toast_power_added: "Power added.",
            toast_trait_added: "Trait added.",
            toast_power_removed: "Power removed.",
            toast_trait_removed: "Trait removed.",
            toast_speed_added: "Movement mode added.",
            toast_portrait_uploaded: "Hero portrait uploaded!",
            toast_portrait_fit: "Preview fitted to original image: {w} × {h} px.",
            toast_portrait_reset: "Standard dimensions restored (200 × 125 px).",
            toast_portrait_removed: "Hero image removed.",
            toast_portrait_url: "Image URL applied!",
            toast_printed: "Opening print dialog...",
            toast_saved: "Character \"{name}\" saved locally and exported as file!",
            toast_loaded: "\"{name}\" loaded successfully!",
            toast_reset_sheet: "New blank character sheet created.",
            toast_need_image: "Please upload an image or provide an image URL first.",
            toast_image_err: "Error: Could not load the image.",
            prompt_image_url: "Enter image URL:",
            confirm_reset: "Do you want to reset the entire character sheet?",
            confirm_load_preset: "Load character \"{name}\"? Unsaved changes will be overwritten.",

            // Dropdown Options
            origins: {
                "Alien": "Alien",
                "High-Tech": "High-Tech",
                "Inhuman": "Inhuman",
                "Magic": "Magic",
                "Mutant": "Mutant",
                "Special Training": "Special Training",
                "Weird Science": "Weird Science",
                "Cybernetic": "Cybernetic",
                "Mythic": "Mythic",
                "Sonstiges": "Other / Custom Origin"
            },
            occupations: {
                "Adventurer": "Adventurer",
                "Assassin": "Assassin",
                "Criminal": "Criminal",
                "Engineer": "Engineer",
                "Journalist": "Journalist",
                "Law Enforcement": "Law Enforcement",
                "Leader": "Leader",
                "Military": "Military",
                "Outsider": "Outsider",
                "Scientist": "Scientist",
                "Spy": "Spy",
                "Student": "Student",
                "Tycoon": "Tycoon",
                "Sonstiges": "Other / Custom Occupation"
            },
            sizes: {
                "Average": "Average",
                "Small": "Small",
                "Big": "Big",
                "Gigantic": "Gigantic",
                "Microscopic": "Microscopic"
            },
            identities: {
                "Geheim": "Secret",
                "Öffentlich": "Public"
            },

            footer_disclaimer: "<strong>Disclaimer:</strong> This is an independent, non-commercial fan-created companion tool for the <em>Multiverse d616 Role-Playing System</em>. Not authorized, endorsed, or affiliated with Marvel Characters, Inc. or The Walt Disney Company. All original game mechanics, trademarks, and copyrights belong to their respective owners. All rights reserved."
        },

        es: {
            // Header & Navigation
            app_title: "MULTIVERSE HERO CREATOR",
            app_subtitle: "",
            nav_editor: "✏️ Editor",
            nav_preview: "📄 Vista previa",
            preset_default: "★ Gestión de héroes...",
            preset_blank: "+ Nueva hoja en blanco (Rank 1)",
            btn_open: "📂 Abrir",
            btn_save: "💾 Guardar",
            btn_print: "🖨️ Imprimir / PDF",
            btn_settings: "Ajustes",
            rule_compliance: "Seguir reglas",
            theme_light: "Claro",
            theme_dark: "Oscuro",
            btn_reset: "🗑️ Limpiar hoja",
            btn_done: "Listo",

            // Settings Modal
            settings_title: "Ajustes",
            setting_rules_title: "Seguir las reglas",
            setting_rules_desc: "Aplicar presupuesto de puntos, límites de atributos según el rango",
            setting_lang_title: "Idioma / Language",
            setting_lang_desc: "Traducir interfaz de usuario y consejos",
            setting_theme_title: "Tema de color",
            setting_theme_desc: "Alternar entre modo oscuro y claro",
            setting_contact: "¿Comentarios o dudas? Contacta con:",

            // Subtitles of the 6 Abilities
            sub_melee: "Cuerpo a cuerpo y físico",
            sub_agility: "Combate a distancia y reflejos",
            sub_resilience: "Resistencia y salud",
            sub_vigilance: "Percepción y concentración",
            sub_ego: "Carisma y fuerza de voluntad",
            sub_logic: "Conocimiento y táctica",

            // Perfil y valores clave
            stat_rank: "Rango",
            stat_karma: "Karma",
            stat_karma_sub: "Inicia por defecto en el rango",
            stat_health: "Salud",
            stat_focus: "Concentración",
            stat_initiative: "Modificador de iniciativa",
            stat_with_edge: "Con Edge (E)",

            // Movimiento y velocidades
            speed_run: "Run (Correr)",
            speed_climb: "Climb (Escalar)",
            speed_jump: "Jump (Saltar)",
            speed_swim: "Swim (Nadar)",
            default_extra_speed_name: "Vuelo",
            empty_extra_speeds: "No hay modos de movimiento adicionales registrados.",
            ph_extra_speed_name: "p. ej. Flight, Swingline, Glide",
            ph_extra_speed_val: "Valor",

            // Estados vacíos en el editor
            empty_powers_editor: "Aún no hay poderes añadidos. ¡Haz clic en <strong>+ Nuevo poder</strong>!",
            empty_traits_editor: "No hay traits registrados.",
            empty_tags_editor: "No hay tags añadidos.",

            // Marcadores de posición del formulario
            ph_char_name: "p. ej. Caballero Sombra",
            ph_char_real_name: "Juan Pérez",
            ph_char_player: "Tu nombre / Narrador",
            ph_char_height: "5'10\" (1,78 m)",
            ph_char_weight: "170 lbs. (77 kg)",
            ph_char_gender: "Masculino / Femenino / Otro",
            ph_char_eyes: "Marrón / Azul / Verde...",
            ph_char_hair: "Negro / Castaño / Rubio...",
            ph_char_dist_features: "Cicatrices, tatuajes, máscara...",
            ph_char_origin: "p. ej. High-Tech, Mutant, Alien...",
            ph_char_occupation: "p. ej. Adventurer, Scientist, Student...",
            ph_char_base: "Ciudad de Nueva York",
            ph_char_teams: "Midnight Sons, Champions, Freelance...",
            ph_char_history: "Historia y orígenes del héroe...",
            ph_char_personality: "Personalidad, valores, código de honor y motivaciones...",
            ph_tag_custom: "O etiqueta personalizada...",

            // Editor de Powers y Traits
            ph_power_name: "p. ej. Mighty 1, Evasion, Flight",
            ph_power_range: "Cuerpo a cuerpo, 10 casillas...",
            ph_trait_name: "Nombre del trait",
            btn_delete_power_title: "Eliminar poder",
            btn_delete_trait_title: "Eliminar trait",
            btn_move_up: "Mover arriba",
            btn_move_down: "Mover abajo",
            default_new_power: "Nuevo poder",
            default_new_trait: "Nuevo trait",

            // Modal Biblioteca / Compendio
            compendium_title_powers: "📖 Biblioteca de Poderes (Reglas Oficiales)",
            compendium_title_traits: "📖 Biblioteca de Traits (Traits Oficiales)",
            compendium_search_powers_ph: "🔍 Buscar poder (p. ej. Mighty, Shield, Blast, Flight)...",
            compendium_search_traits_ph: "🔍 Buscar trait (p. ej. Reflexes, Senses, Combat)...",
            compendium_no_powers: "No se encontraron poderes.",
            compendium_no_traits: "No se encontraron traits.",
            compendium_cost: "Coste: {cost} Focus",
            compendium_range: "Alcance: {range}",
            compendium_official_trait: "Trait oficial",

            // Borrar héroe
            btn_delete_hero_title: "Eliminar héroe seleccionado",
            confirm_delete_hero: "¿Realmente quieres eliminar a \"{name}\" de tus héroes guardados?",
            toast_hero_deleted: "El héroe \"{name}\" ha sido eliminado.",
            lbl_saved_roster: "Héroes guardados:",
            msg_no_saved_heroes: "Aún no hay héroes guardados.",
            btn_delete_hero_item_title: "Eliminar este héroe",
            opt_pick_preset: "Opciones",
            footer_contact: "✉️ Contacto:",
            welcome_lang_title: "🌐 Elige tu idioma / Choose Language",
            welcome_lang_desc: "Elige tu idioma preferido para el editor, las reglas y la vista previa de la hoja.",
            btn_open_lang_selector: "Abrir selector de idioma",

            // Rule Notes
            rule_note_rank: "El rango determina el presupuesto de <strong class=\"rule-base-points-num\">{points}</strong> Ability Points, el valor máximo de atributo de <strong class=\"rule-cap-num\">{cap}</strong> y límites de <strong class=\"rule-base-powers-num\">{powers}</strong> Powers y <strong class=\"rule-base-traits-num\">{traits}</strong> Traits. Los poderes no utilizados pueden convertirse 1 a 1 en Ability Points o Traits.",
            rule_note_abilities: "El presupuesto de puntos es de <strong class=\"rule-points-num\">{points}</strong> Ability Points. El valor máximo por atributo es <strong class=\"rule-cap-num\">{cap}</strong>. Se permiten valores hasta -3 que liberan puntos para otros atributos.",
            rule_note_damage: "El multiplicador de daño base equivale al rango. Ciertos poderes aumentan este multiplicador.",
            rule_note_powers: "Se permiten como máximo <strong class=\"rule-powers-num\">{powers}</strong> Powers.",
            rule_note_traits: "Se permiten hasta <strong class=\"rule-traits-num\">{traits}</strong> Traits. Los Tags son puramente narrativos y no tienen límite.",
            rank_limits_display: "Máx. Ability: <strong>{maxAbility}</strong> | Powers: <strong>{actualPowers}/{allowedPowers}</strong> | Traits: <strong>{actualTraits}/{allowedTraits}</strong>",

            // Sections
            section_1_title: "Atributos, Defensa y Pruebas",
            section_2_title: "Multiplicadores de daño",
            section_2_formula: "Fórmula: [M-Dice] × Multiplicador + Ability Score",
            section_3_title: "Movimiento y Velocidades",
            btn_add_speed: "+ Nuevo movimiento",
            section_4_title: "Identidad del héroe y detalles físicos",
            section_5_title: "Powers",
            toggle_power_desc: "Mostrar descripciones en la hoja",
            btn_compendium_powers: "📖 Seleccionar de la biblioteca",
            btn_add_power: "+ Nuevo Power",
            section_6_title: "Traits y Tags",
            btn_add_trait: "+ Nuevo Trait",
            btn_compendium_traits: "📖 De la biblioteca",
            btn_add_tag: "+ Añadir Tag",
            tag_picker_default: "★ Elegir Tag de la lista...",
            section_7_title: "Biografía y personalidad",

            // Form Labels
            lbl_hero_name: "Nombre del héroe",
            lbl_real_name: "Nombre real",
            lbl_player: "Jugador / Narrador",
            lbl_height: "Altura",
            lbl_weight: "Peso",
            lbl_gender: "Género",
            lbl_eyes: "Ojos",
            lbl_hair: "Pelo",
            lbl_size: "Categoría de tamaño",
            lbl_dist_features: "Rasgos distintivos",
            lbl_origin: "Origen",
            lbl_occupation: "Ocupación",
            lbl_identity: "Estado de identidad",
            lbl_base: "Base de operaciones",
            lbl_teams: "Equipos / Alianzas",
            lbl_history: "Historia y trasfondo",
            lbl_personality: "Personalidad y motivación",
            lbl_power_name: "Nombre del Power",
            lbl_power_set: "Power Set",
            lbl_power_action: "Acción",
            lbl_power_cost: "Coste de Focus",
            lbl_power_range: "Alcance",
            lbl_power_desc: "Descripción / Efecto",
            ph_power_desc: "Efecto, daño, duración...",
            ph_trait_desc: "Descripción o regla del trait...",

            // Sheet Preview Toolbar & Interaction
            pt_power_desc: "📖 Descripciones de poderes",
            pt_hero_image: "Imagen del héroe:",
            pt_choose_image: "🖼️ Elegir imagen",
            pt_url: "🌐 URL",
            pt_delete_image: "✕ Eliminar imagen",
            pt_width: "Anchura:",
            pt_height: "Altura:",
            pt_fit_original: "📐 Ajustar a tamaño original",
            pt_reset: "↺ Restablecer",
            ph_portrait_click: "[ Añadir imagen ]",
            ph_portrait_hover_upload: "📷 Haz clic para subir",
            ph_portrait_hover_change: "📷 Cambiar imagen",

            // Sheet Preview Texts & Placeholders
            sheet_empty_powers: "Sin poderes registrados.",
            sheet_empty_traits: "Sin traits registrados.",
            sheet_none: "Ninguno",
            sheet_empty_history: "Sin historia registrada.",
            sheet_empty_personality: "Sin notas de personalidad.",
            sheet_powers_with_desc: "Con efectos",
            sheet_powers_compact: "Compacto",
            sheet_drag_resize_hint: "Arrastrar para cambiar ancho y alto",
            sheet_drag_width_hint: "Arrastrar para cambiar ancho de columna",
            sheet_drag_height_hint: "Arrastrar para cambiar alto de imagen",

            // Status Badges
            points_perfect: "✓ 0 restantes (Perfecto)",
            points_remaining: "{n} restantes",
            points_traded: "✓ +{n} de Powers",
            points_over: "⚠️ +{n} sobre el límite!",
            points_free: "Modo libre",
            points_budget_title: "Puntos: {spent} / {max}",

            // Modals
            modal_compendium_title: "📖 Biblioteca Oficial",
            compendium_search_ph: "🔍 Buscar por nombre o efecto (ej. Mighty, Shield, Blast)...",
            compendium_all_sets: "Todos los Power Sets",
            btn_add_compendium: "+ Añadir",

            // Toasts & Dialogs
            toast_max_powers: "Número máximo de poderes alcanzado: {actual} de {allowed}.",
            toast_max_traits: "Número máximo de traits alcanzado: {actual} de {allowed}.",
            toast_rules_on: "Reglas oficiales activadas: atributos a 0 (presupuesto listo).",
            toast_rules_off: "Modo libre activado: sin límite para puntos, poderes y traits.",
            toast_power_added: "Power añadido.",
            toast_trait_added: "Trait añadido.",
            toast_power_removed: "Power eliminado.",
            toast_trait_removed: "Trait eliminado.",
            toast_speed_added: "Modo de movimiento añadido.",
            toast_portrait_uploaded: "¡Imagen de personaje subida!",
            toast_portrait_fit: "Vista previa ajustada a imagen original: {w} × {h} px.",
            toast_portrait_reset: "Tamaño estándar restaurado (200 × 125 px).",
            toast_portrait_removed: "Imagen de personaje eliminada.",
            toast_portrait_url: "¡URL de imagen aplicada!",
            toast_printed: "Abriendo diálogo de impresión...",
            toast_saved: "¡Personaje \"{name}\" guardado en el navegador y exportado!",
            toast_loaded: "¡\"{name}\" cargado con éxito!",
            toast_reset_sheet: "Nueva hoja de personaje creada.",
            toast_need_image: "Por favor, sube una imagen o proporciona una URL primero.",
            toast_image_err: "Error: No se pudo cargar la imagen.",
            prompt_image_url: "Introduce la URL de la imagen del héroe:",
            confirm_reset: "¿Deseas restablecer toda la hoja de personaje?",
            confirm_load_preset: "¿Cargar personaje \"{name}\"? Se sobrescribirán los cambios no guardados.",

            // Dropdown Options
            origins: {
                "Alien": "Extraterrestre",
                "High-Tech": "Alta tecnología",
                "Inhuman": "Inhumano",
                "Magic": "Magia",
                "Mutant": "Mutante",
                "Special Training": "Entrenamiento especial",
                "Weird Science": "Ciencia extraña",
                "Cybernetic": "Cibernético",
                "Mythic": "Mítico",
                "Sonstiges": "Otro / Personalizado"
            },
            occupations: {
                "Adventurer": "Aventurero",
                "Assassin": "Asesino",
                "Criminal": "Criminal",
                "Engineer": "Ingeniero",
                "Journalist": "Periodista",
                "Law Enforcement": "Fuerzas del orden",
                "Leader": "Líder",
                "Military": "Militar",
                "Outsider": "Marginado",
                "Scientist": "Científico",
                "Spy": "Espía",
                "Student": "Estudiante",
                "Tycoon": "Magnate",
                "Sonstiges": "Otro / Personalizado"
            },
            sizes: {
                "Average": "Medio",
                "Small": "Pequeño",
                "Big": "Grande",
                "Gigantic": "Gigantesco",
                "Microscopic": "Microscópico"
            },
            identities: {
                "Geheim": "Secreta",
                "Öffentlich": "Pública"
            },

            footer_disclaimer: "<strong>Descargo de responsabilidad:</strong> Esta es una herramienta complementaria independiente y sin fines de lucro creada por fans para el <em>sistema de rol Multiverse d616</em>. No está respaldada, autorizada ni afiliada a Marvel Characters, Inc. ni a The Walt Disney Company. Todos los conceptos de juego originales y marcas pertenecen a sus respectivos titulares. Todos los derechos reservados."
        },

        it: {
            // Header & Navigation
            app_title: "MULTIVERSE HERO CREATOR",
            app_subtitle: "",
            nav_editor: "✏️ Editor",
            nav_preview: "📄 Anteprima scheda",
            preset_default: "★ Gestione eroi...",
            preset_blank: "+ Nuova scheda vuota (Rank 1)",
            btn_open: "📂 Apri",
            btn_save: "💾 Salva",
            btn_print: "🖨️ Stampa / PDF",
            btn_settings: "Impostazioni",
            rule_compliance: "Segui regole",
            theme_light: "Chiaro",
            theme_dark: "Scuro",
            btn_reset: "🗑️ Svuota scheda",
            btn_done: "Fatto",

            // Settings Modal
            settings_title: "Impostazioni",
            setting_rules_title: "Segui regole",
            setting_rules_desc: "Applica budget punti, limiti di attributi in base al rango",
            setting_lang_title: "Lingua / Language",
            setting_lang_desc: "Traduci interfaccia utente e suggerimenti",
            setting_theme_title: "Schema colori",
            setting_theme_desc: "Passa da tema scuro a chiaro",
            setting_contact: "Feedback o domande? Scrivi a:",

            // Subtitles of the 6 Abilities
            sub_melee: "Mischia e fisico",
            sub_agility: "Attacco a distanza e riflessi",
            sub_resilience: "Resistenza e salute",
            sub_vigilance: "Percezione e concentrazione",
            sub_ego: "Carisma e forza di volontà",
            sub_logic: "Conoscenza e tattica",

            // Profilo e statistiche chiave
            stat_rank: "Rango",
            stat_karma: "Karma",
            stat_karma_sub: "Inizia per impostazione predefinita al rango",
            stat_health: "Salute",
            stat_focus: "Focus",
            stat_initiative: "Modificatore di iniziativa",
            stat_with_edge: "Con Edge (E)",

            // Movimento e velocità
            speed_run: "Run (Corsa)",
            speed_climb: "Climb (Scalata)",
            speed_jump: "Jump (Salto)",
            speed_swim: "Swim (Nuoto)",
            default_extra_speed_name: "Volo",
            empty_extra_speeds: "Nessuna modalità di movimento aggiuntiva registrata.",
            ph_extra_speed_name: "es. Flight, Swingline, Glide",
            ph_extra_speed_val: "Valore",

            // Stati vuoti nell'editor
            empty_powers_editor: "Nessun potere ancora registrato. Clicca su <strong>+ Nuovo potere</strong>!",
            empty_traits_editor: "Nessun trait registrato.",
            empty_tags_editor: "Nessun tag aggiunto.",

            // Segnaposto del modulo
            ph_char_name: "es. Cavaliere d'Ombra",
            ph_char_real_name: "Mario Rossi",
            ph_char_player: "Tuo nome / Narratore",
            ph_char_height: "5'10\" (1,78 m)",
            ph_char_weight: "170 lbs. (77 kg)",
            ph_char_gender: "Maschile / Femminile / Altro",
            ph_char_eyes: "Marroni / Blu / Verdi...",
            ph_char_hair: "Nero / Castano / Biondo...",
            ph_char_dist_features: "Cicatrici, tatuaggi, maschera...",
            ph_char_origin: "es. High-Tech, Mutant, Alien...",
            ph_char_occupation: "es. Adventurer, Scientist, Student...",
            ph_char_base: "New York City",
            ph_char_teams: "Midnight Sons, Champions, Freelance...",
            ph_char_history: "Storia e origini dell'eroe...",
            ph_char_personality: "Personalità, valori, codice morale e motivazioni...",
            ph_tag_custom: "O tag personalizzato...",

            // Editor di poteri e trait
            ph_power_name: "es. Mighty 1, Evasion, Flight",
            ph_power_range: "Mischia, 10 caselle...",
            ph_trait_name: "Nome del trait",
            btn_delete_power_title: "Rimuovi potere",
            btn_delete_trait_title: "Rimuovi trait",
            btn_move_up: "Sposta su",
            btn_move_down: "Sposta giù",
            default_new_power: "Nuovo potere",
            default_new_trait: "Nuovo trait",

            // Modale Compendio
            compendium_title_powers: "📖 Libreria dei Poteri (Regole Ufficiali)",
            compendium_title_traits: "📖 Libreria dei Traits (Traits Ufficiali)",
            compendium_search_powers_ph: "🔍 Cerca potere (es. Mighty, Shield, Blast, Flight)...",
            compendium_search_traits_ph: "🔍 Cerca trait (es. Reflexes, Senses, Combat)...",
            compendium_no_powers: "Nessun potere trovato.",
            compendium_no_traits: "Nessun trait trovato.",
            compendium_cost: "Costo: {cost} Focus",
            compendium_range: "Gittata: {range}",
            compendium_official_trait: "Trait ufficiale",

            // Cancellazione eroe
            btn_delete_hero_title: "Elimina eroe selezionato",
            confirm_delete_hero: "Vuoi davvero eliminare \"{name}\" dai tuoi eroi salvati?",
            toast_hero_deleted: "L'eroe \"{name}\" è stato eliminato.",
            lbl_saved_roster: "Eroi salvati:",
            msg_no_saved_heroes: "Nessun eroe salvato.",
            btn_delete_hero_item_title: "Elimina questo eroe",
            opt_pick_preset: "Opzioni",
            footer_contact: "✉️ Contatto:",
            welcome_lang_title: "🌐 Scegli la lingua / Choose Language",
            welcome_lang_desc: "Scegli la tua lingua preferita per l'editor, le regole e l'anteprima della scheda.",
            btn_open_lang_selector: "Apri selettore lingua",

            // Rule Notes
            rule_note_rank: "Il rango determina il budget di <strong class=\"rule-base-points-num\">{points}</strong> Ability Points, il punteggio massimo di <strong class=\"rule-cap-num\">{cap}</strong> e i limiti di <strong class=\"rule-base-powers-num\">{powers}</strong> Powers e <strong class=\"rule-base-traits-num\">{traits}</strong> Traits. I poteri inutilizzati possono essere convertiti 1 a 1 in punti o traits.",
            rule_note_abilities: "Il budget punti è di <strong class=\"rule-points-num\">{points}</strong> Ability Points. Il valore massimo per attributo è <strong class=\"rule-cap-num\">{cap}</strong>. I valori fino a -3 liberano punti per altri attributi.",
            rule_note_damage: "Il moltiplicatore di danno base è pari al rango. Alcuni poteri aumentano ulteriormente questo moltiplicatore.",
            rule_note_powers: "Consentiti al massimo <strong class=\"rule-powers-num\">{powers}</strong> Powers.",
            rule_note_traits: "Consentiti fino a <strong class=\"rule-traits-num\">{traits}</strong> Traits. I tag sono puramente narrativi.",
            rank_limits_display: "Max. Ability: <strong>{maxAbility}</strong> | Powers: <strong>{actualPowers}/{allowedPowers}</strong> | Traits: <strong>{actualTraits}/{allowedTraits}</strong>",

            // Sections
            section_1_title: "Attributi, Difesa e Prove",
            section_2_title: "Moltiplicatori di danno",
            section_2_formula: "Formula: [M-Dice] × Moltiplicatore + Ability Score",
            section_3_title: "Movimento e Velocità",
            btn_add_speed: "+ Nuovo movimento",
            section_4_title: "Identità dell'eroe e dettagli fisici",
            section_5_title: "Powers",
            toggle_power_desc: "Mostra descrizioni sulla scheda",
            btn_compendium_powers: "📖 Seleziona dalla libreria",
            btn_add_power: "+ Nuovo Power",
            section_6_title: "Traits e Tags",
            btn_add_trait: "+ Nuovo Trait",
            btn_compendium_traits: "📖 Dalla libreria",
            btn_add_tag: "+ Aggiungi Tag",
            tag_picker_default: "★ Scegli Tag dalla lista...",
            section_7_title: "Biografia e personalità",

            // Form Labels
            lbl_hero_name: "Nome dell'eroe",
            lbl_real_name: "Nome reale",
            lbl_player: "Giocatore / Narratore",
            lbl_height: "Altezza",
            lbl_weight: "Peso",
            lbl_gender: "Genere",
            lbl_eyes: "Occhi",
            lbl_hair: "Capelli",
            lbl_size: "Categoria di taglia",
            lbl_dist_features: "Segni particolari",
            lbl_origin: "Origine",
            lbl_occupation: "Occupazione",
            lbl_identity: "Stato dell'identità",
            lbl_base: "Base operativa",
            lbl_teams: "Squadre / Alleanze",
            lbl_history: "Storia e background",
            lbl_personality: "Personalità e motivazione",
            lbl_power_name: "Nome del Power",
            lbl_power_set: "Power Set",
            lbl_power_action: "Azione",
            lbl_power_cost: "Costo Focus",
            lbl_power_range: "Portata",
            lbl_power_desc: "Descrizione / Effetto",
            ph_power_desc: "Effetto, danno, durata...",
            ph_trait_desc: "Descrizione o regola del trait...",

            // Sheet Preview Toolbar & Interaction
            pt_power_desc: "📖 Descrizioni poteri",
            pt_hero_image: "Immagine eroe:",
            pt_choose_image: "🖼️ Scegli immagine",
            pt_url: "🌐 URL",
            pt_delete_image: "✕ Rimuovi immagine",
            pt_width: "Larghezza:",
            pt_height: "Altezza:",
            pt_fit_original: "📐 Adatta a dimensioni originali",
            pt_reset: "↺ Ripristina",
            ph_portrait_click: "[ Aggiungi immagine ]",
            ph_portrait_hover_upload: "📷 Clicca per caricare",
            ph_portrait_hover_change: "📷 Cambia immagine",

            // Sheet Preview Texts & Placeholders
            sheet_empty_powers: "Nessun potere registrato.",
            sheet_empty_traits: "Nessun trait registrato.",
            sheet_none: "Nessuno",
            sheet_empty_history: "Nessuna storia registrata.",
            sheet_empty_personality: "Nessuna nota di personalità.",
            sheet_powers_with_desc: "Con effetti",
            sheet_powers_compact: "Compatto",
            sheet_drag_resize_hint: "Trascina per ridimensionare larghezza e altezza",
            sheet_drag_width_hint: "Trascina per larghezza colonna",
            sheet_drag_height_hint: "Trascina per altezza immagine",

            // Status Badges
            points_perfect: "✓ 0 rimanenti (Perfetto)",
            points_remaining: "{n} rimanenti",
            points_traded: "✓ +{n} da Powers",
            points_over: "⚠️ +{n} oltre il limite!",
            points_free: "Modalità libera",
            points_budget_title: "Punti: {spent} / {max}",

            // Modals
            modal_compendium_title: "📖 Libreria Ufficiale",
            compendium_search_ph: "🔍 Cerca per nome o effetto (es. Mighty, Shield, Blast)...",
            compendium_all_sets: "Tutti i Power Sets",
            btn_add_compendium: "+ Aggiungi",

            // Toasts & Dialogs
            toast_max_powers: "Numero massimo di poteri raggiunto: {actual} su {allowed}.",
            toast_max_traits: "Numero massimo di traits raggiunto: {actual} su {allowed}.",
            toast_rules_on: "Regole ufficiali attivate: attributi reimpostati a 0.",
            toast_rules_off: "Modalità libera attivata: nessun limite per punti o poteri.",
            toast_power_added: "Power aggiunto.",
            toast_trait_added: "Trait aggiunto.",
            toast_power_removed: "Power rimosso.",
            toast_trait_removed: "Trait rimosso.",
            toast_speed_added: "Modalità di movimento aggiunta.",
            toast_portrait_uploaded: "Immagine del personaggio caricata!",
            toast_portrait_fit: "Anteprima adattata all'immagine originale: {w} × {h} px.",
            toast_portrait_reset: "Dimensioni predefinite ripristinate (200 × 125 px).",
            toast_portrait_removed: "Immagine del personaggio rimossa.",
            toast_portrait_url: "URL dell'immagine applicato!",
            toast_printed: "Apertura della finestra di stampa...",
            toast_saved: "Personaggio \"{name}\" salvato nel browser ed esportato!",
            toast_loaded: "\"{name}\" caricato con successo!",
            toast_reset_sheet: "Nuova scheda personaggio creata.",
            toast_need_image: "Carica prima un'immagine o inserisci un URL.",
            toast_image_err: "Errore: Impossibile caricare l'immagine.",
            prompt_image_url: "Inserisci l'indirizzo web (URL) dell'immagine:",
            confirm_reset: "Vuoi reimpostare l'intera scheda del personaggio?",
            confirm_load_preset: "Caricare personaggio \"{name}\"? Le modifiche non salvate verranno sovrascritte.",

            // Dropdown Options
            origins: {
                "Alien": "Alieno",
                "High-Tech": "Alta tecnologia",
                "Inhuman": "Inumano",
                "Magic": "Magia",
                "Mutant": "Mutante",
                "Special Training": "Addestramento speciale",
                "Weird Science": "Scienza bizzarra",
                "Cybernetic": "Cibernetico",
                "Mythic": "Mitico",
                "Sonstiges": "Altro / Personalizzato"
            },
            occupations: {
                "Adventurer": "Avventuriero",
                "Assassin": "Assassino",
                "Criminal": "Criminale",
                "Engineer": "Ingegnere",
                "Journalist": "Giornalista",
                "Law Enforcement": "Forze dell'ordine",
                "Leader": "Leader",
                "Military": "Militare",
                "Outsider": "Emarginato",
                "Scientist": "Scienziato",
                "Spy": "Spia",
                "Student": "Studente",
                "Tycoon": "Magnate",
                "Sonstiges": "Altro / Personalizzato"
            },
            sizes: {
                "Average": "Medio",
                "Small": "Piccolo",
                "Big": "Grande",
                "Gigantic": "Gigantesco",
                "Microscopic": "Microscopico"
            },
            identities: {
                "Geheim": "Segreta",
                "Öffentlich": "Pubblica"
            },

            footer_disclaimer: "<strong>Dichiarazione di non responsabilità:</strong> Questo è uno strumento complementare indipendente e non commerciale creato da fan per il <em>sistema di gioco di ruolo Multiverse d616</em>. Non approvato, sponsorizzato o affiliato con Marvel Characters, Inc. o The Walt Disney Company. Tutti i marchi e i diritti appartengono ai rispettivi proprietari. Tutti i diritti riservati."
        },

        fr: {
            // Header & Navigation
            app_title: "MULTIVERSE HERO CREATOR",
            app_subtitle: "",
            nav_editor: "✏️ Éditeur",
            nav_preview: "📄 Aperçu fiche",
            preset_default: "★ Gestion des héros...",
            preset_blank: "+ Nouvelle fiche vierge (Rank 1)",
            btn_open: "📂 Ouvrir",
            btn_save: "💾 Enregistrer",
            btn_print: "🖨️ Imprimer / PDF",
            btn_settings: "Paramètres",
            rule_compliance: "Suivre règles",
            theme_light: "Clair",
            theme_dark: "Sombre",
            btn_reset: "🗑️ Vider la feuille",
            btn_done: "Terminé",

            // Settings Modal
            settings_title: "Paramètres",
            setting_rules_title: "Suivre les règles",
            setting_rules_desc: "Appliquer le budget de points et limites selon le rang",
            setting_lang_title: "Langue / Language",
            setting_lang_desc: "Traduire l'interface et les conseils d'aide",
            setting_theme_title: "Thème d'affichage",
            setting_theme_desc: "Basculer entre le mode sombre et le mode clair",
            setting_contact: "Des retours ou des questions ? Écrivez à :",

            // Subtitles of the 6 Abilities
            sub_melee: "Corps à corps & Physique",
            sub_agility: "Combat à distance & Réflexes",
            sub_resilience: "Endurance & Santé",
            sub_vigilance: "Perception & Concentration",
            sub_ego: "Charisme & Volonté",
            sub_logic: "Savoir & Tactique",

            // Profil et statistiques clés
            stat_rank: "Rang",
            stat_karma: "Karma",
            stat_karma_sub: "Commence par défaut au rang",
            stat_health: "Santé",
            stat_focus: "Focus",
            stat_initiative: "Modificateur d'initiative",
            stat_with_edge: "Avec Edge (E)",

            // Déplacement et vitesses
            speed_run: "Run (Course)",
            speed_climb: "Climb (Escalade)",
            speed_jump: "Jump (Saut)",
            speed_swim: "Swim (Nage)",
            default_extra_speed_name: "Vol",
            empty_extra_speeds: "Aucun mode de déplacement supplémentaire enregistré.",
            ph_extra_speed_name: "ex. Flight, Swingline, Glide",
            ph_extra_speed_val: "Valeur",

            // États vides dans l'éditeur
            empty_powers_editor: "Aucun pouvoir enregistré. Cliquez sur <strong>+ Nouveau pouvoir</strong> !",
            empty_traits_editor: "Aucun trait enregistré.",
            empty_tags_editor: "Aucun tag ajouté.",

            // Espaces réservés du formulaire
            ph_char_name: "ex. Chevalier d'Ombre",
            ph_char_real_name: "Jean Dupont",
            ph_char_player: "Votre nom / Narrateur",
            ph_char_height: "5'10\" (1,78 m)",
            ph_char_weight: "170 lbs. (77 kg)",
            ph_char_gender: "Masculin / Féminin / Autre",
            ph_char_eyes: "Marron / Bleu / Vert...",
            ph_char_hair: "Noir / Châtain / Blond...",
            ph_char_dist_features: "Cicatrices, tatouages, masque...",
            ph_char_origin: "ex. High-Tech, Mutant, Alien...",
            ph_char_occupation: "ex. Adventurer, Scientist, Student...",
            ph_char_base: "New York City",
            ph_char_teams: "Midnight Sons, Champions, Freelance...",
            ph_char_history: "Histoire et origines du héros...",
            ph_char_personality: "Personnalité, valeurs, code d'honneur et motivations...",
            ph_tag_custom: "Ou tag personnalisé...",

            // Éditeur de pouvoirs et traits
            ph_power_name: "ex. Mighty 1, Evasion, Flight",
            ph_power_range: "Corps à corps, 10 cases...",
            ph_trait_name: "Nom du trait",
            btn_delete_power_title: "Supprimer le pouvoir",
            btn_delete_trait_title: "Supprimer le trait",
            btn_move_up: "Déplacer vers le haut",
            btn_move_down: "Déplacer vers le bas",
            default_new_power: "Nouveau pouvoir",
            default_new_trait: "Nouveau trait",

            // Modal Compendium
            compendium_title_powers: "📖 Bibliothèque des Pouvoirs (Règles Officielles)",
            compendium_title_traits: "📖 Bibliothèque des Traits (Traits Officiels)",
            compendium_search_powers_ph: "🔍 Rechercher un pouvoir (ex. Mighty, Shield, Blast, Flight)...",
            compendium_search_traits_ph: "🔍 Rechercher un trait (ex. Reflexes, Senses, Combat)...",
            compendium_no_powers: "Aucun pouvoir trouvé.",
            compendium_no_traits: "Aucun trait trouvé.",
            compendium_cost: "Coût : {cost} Focus",
            compendium_range: "Portée : {range}",
            compendium_official_trait: "Trait officiel",

            // Suppression du héros
            btn_delete_hero_title: "Supprimer le héros sélectionné",
            confirm_delete_hero: "Voulez-vous vraiment supprimer \"{name}\" de vos héros enregistrés ?",
            toast_hero_deleted: "Le héros \"{name}\" a été supprimé.",
            lbl_saved_roster: "Héros enregistrés :",
            msg_no_saved_heroes: "Aucun héros enregistré.",
            btn_delete_hero_item_title: "Supprimer ce héros",
            opt_pick_preset: "Choix",
            footer_contact: "✉️ Contact :",
            welcome_lang_title: "🌐 Choisissez la langue / Choose Language",
            welcome_lang_desc: "Choisissez votre langue préférée pour l'éditeur, les règles et l'aperçu de la feuille.",
            btn_open_lang_selector: "Ouvrir le sélecteur de langue",

            // Rule Notes
            rule_note_rank: "Le rang détermine le budget de <strong class=\"rule-base-points-num\">{points}</strong> Ability Points, la valeur maximale de <strong class=\"rule-cap-num\">{cap}</strong> ainsi que la limite de <strong class=\"rule-base-powers-num\">{powers}</strong> Powers et <strong class=\"rule-base-traits-num\">{traits}</strong> Traits. Les pouvoirs non utilisés se convertissent 1 pour 1.",
            rule_note_abilities: "Le budget de points est de <strong class=\"rule-points-num\">{points}</strong> Ability Points. Le plafond est de <strong class=\"rule-cap-num\">{cap}</strong>. Les valeurs jusqu'à -3 sont permises pour libérer des points.",
            rule_note_damage: "Le multiplicateur de dégâts de base équivaut au rang. Certains pouvoirs l'augmentent.",
            rule_note_powers: "Limite maximale de <strong class=\"rule-powers-num\">{powers}</strong> Powers autorisée.",
            rule_note_traits: "Jusqu'à <strong class=\"rule-traits-num\">{traits}</strong> Traits autorisés. Les Tags sont libres.",
            rank_limits_display: "Max. Ability : <strong>{maxAbility}</strong> | Powers : <strong>{actualPowers}/{allowedPowers}</strong> | Traits : <strong>{actualTraits}/{allowedTraits}</strong>",

            // Sections
            section_1_title: "Attributs, Défense et Tests",
            section_2_title: "Multiplicateurs de dégâts",
            section_2_formula: "Formule : [M-Dice] × Multiplicateur + Ability Score",
            section_3_title: "Déplacement & Vitesses",
            btn_add_speed: "+ Nouveau déplacement",
            section_4_title: "Identité du héros & Détails physiques",
            section_5_title: "Powers",
            toggle_power_desc: "Afficher descriptions sur la fiche",
            btn_compendium_powers: "📖 Choisir dans la bibliothèque",
            btn_add_power: "+ Nouveau Power",
            section_6_title: "Traits & Tags",
            btn_add_trait: "+ Nouveau Trait",
            btn_compendium_traits: "📖 Depuis la bibliothèque",
            btn_add_tag: "+ Ajouter Tag",
            tag_picker_default: "★ Choisir Tag dans la liste...",
            section_7_title: "Biographie & Personnalité",

            // Form Labels
            lbl_hero_name: "Nom du héros",
            lbl_real_name: "Nom civil",
            lbl_player: "Joueur / Narrateur",
            lbl_height: "Taille",
            lbl_weight: "Poids",
            lbl_gender: "Genre",
            lbl_eyes: "Yeux",
            lbl_hair: "Cheveux",
            lbl_size: "Catégorie de taille",
            lbl_dist_features: "Signes distinctifs",
            lbl_origin: "Origine",
            lbl_occupation: "Occupation",
            lbl_identity: "Statut d'identité",
            lbl_base: "Base d'opérations",
            lbl_teams: "Équipes / Alliances",
            lbl_history: "Histoire et origines",
            lbl_personality: "Personnalité et motivations",
            lbl_power_name: "Nom du Power",
            lbl_power_set: "Power Set",
            lbl_power_action: "Action",
            lbl_power_cost: "Coût en Focus",
            lbl_power_range: "Portée",
            lbl_power_desc: "Description / Effet",
            ph_power_desc: "Effet, dégâts, durée...",
            ph_trait_desc: "Description ou règle du trait...",

            // Sheet Preview Toolbar & Interaction
            pt_power_desc: "📖 Descriptions des pouvoirs",
            pt_hero_image: "Image du héros :",
            pt_choose_image: "🖼️ Choisir image",
            pt_url: "🌐 URL",
            pt_delete_image: "✕ Supprimer l'image",
            pt_width: "Largeur :",
            pt_height: "Hauteur :",
            pt_fit_original: "📐 Adapter à l'image originale",
            pt_reset: "↺ Réinitialiser",
            ph_portrait_click: "[ Insérer image ]",
            ph_portrait_hover_upload: "📷 Cliquer pour téléverser",
            ph_portrait_hover_change: "📷 Modifier l'image",

            // Sheet Preview Texts & Placeholders
            sheet_empty_powers: "Aucun pouvoir enregistré.",
            sheet_empty_traits: "Aucun trait enregistré.",
            sheet_none: "Aucun",
            sheet_empty_history: "Aucun historique enregistré.",
            sheet_empty_personality: "Aucune note de personnalité.",
            sheet_powers_with_desc: "Avec effets",
            sheet_powers_compact: "Compact",
            sheet_drag_resize_hint: "Glisser pour redimensionner largeur et hauteur",
            sheet_drag_width_hint: "Glisser pour changer la largeur de colonne",
            sheet_drag_height_hint: "Glisser pour changer la hauteur d'image",

            // Status Badges
            points_perfect: "✓ 0 restant (Parfait)",
            points_remaining: "{n} restant(s)",
            points_traded: "✓ +{n} via Powers",
            points_over: "⚠️ +{n} en trop !",
            points_free: "Mode libre",
            points_budget_title: "Points : {spent} / {max}",

            // Modals
            modal_compendium_title: "📖 Bibliothèque Officielle",
            compendium_search_ph: "🔍 Rechercher par nom ou effet (ex. Mighty, Shield, Blast)...",
            compendium_all_sets: "Tous les Power Sets",
            btn_add_compendium: "+ Ajouter",

            // Toasts & Dialogs
            toast_max_powers: "Nombre maximal de pouvoirs atteint : {actual} sur {allowed}.",
            toast_max_traits: "Nombre maximal de traits atteint : {actual} sur {allowed}.",
            toast_rules_on: "Règles officielles activées : attributs remis à 0.",
            toast_rules_off: "Mode libre activé : aucune limite sur les points ou pouvoirs.",
            toast_power_added: "Power ajouté.",
            toast_trait_added: "Trait ajouté.",
            toast_power_removed: "Power supprimé.",
            toast_trait_removed: "Trait supprimé.",
            toast_speed_added: "Mode de déplacement ajouté.",
            toast_portrait_uploaded: "Image du personnage téléversée !",
            toast_portrait_fit: "Aperçu adapté à l'image originale : {w} × {h} px.",
            toast_portrait_reset: "Taille standard restaurée (200 × 125 px).",
            toast_portrait_removed: "Image du personnage supprimée.",
            toast_portrait_url: "URL de l'image appliquée !",
            toast_printed: "Ouverture de la boîte de dialogue d'impression...",
            toast_saved: "Personnage \"{name}\" enregistré localement et exporté !",
            toast_loaded: "\"{name}\" chargé avec succès !",
            toast_reset_sheet: "Nouvelle fiche de personnage créée.",
            toast_need_image: "Veuillez d'abord téléverser une image ou fournir une URL.",
            toast_image_err: "Erreur : Impossible de charger l'image.",
            prompt_image_url: "Entrez l'adresse web (URL) de l'image :",
            confirm_reset: "Voulez-vous réinitialiser toute la fiche de personnage ?",
            confirm_load_preset: "Charger le personnage \"{name}\" ? Les modifications non enregistrées seront écrasées.",

            // Dropdown Options
            origins: {
                "Alien": "Extraterrestre",
                "High-Tech": "Haute technologie",
                "Inhuman": "Inhumain",
                "Magic": "Magie",
                "Mutant": "Mutant",
                "Special Training": "Entraînement spécial",
                "Weird Science": "Science étrange",
                "Cybernetic": "Cybernetique",
                "Mythic": "Mythique",
                "Sonstiges": "Autre / Personnalisé"
            },
            occupations: {
                "Adventurer": "Aventurier",
                "Assassin": "Assassin",
                "Criminal": "Criminel",
                "Engineer": "Ingénieur",
                "Journalist": "Journaliste",
                "Law Enforcement": "Forces de l'ordre",
                "Leader": "Meneur",
                "Military": "Militaire",
                "Outsider": "Marginal",
                "Scientist": "Scientifique",
                "Spy": "Espion",
                "Student": "Étudiant",
                "Tycoon": "Magnat",
                "Sonstiges": "Autre / Personnalisé"
            },
            sizes: {
                "Average": "Moyen",
                "Small": "Petit",
                "Big": "Grand",
                "Gigantic": "Gigantesque",
                "Microscopic": "Microscopique"
            },
            identities: {
                "Geheim": "Secrète",
                "Öffentlich": "Publique"
            },

            footer_disclaimer: "<strong>Avertissement :</strong> Il s'agit d'un outil d'accompagnement indépendant et non commercial créé par des fans pour le <em>système de jeu de rôle Multiverse d616</em>. Non approuvé, soutenu ou affilié à Marvel Characters, Inc. ou The Walt Disney Company. Tous les concepts de jeu et marques appartiennent à leurs détenteurs respectifs. Tous droits réservés."
        }
    },

    t(key, params = {}) {
        const lang = this.currentLang || 'de';
        const dict = this.translations[lang] || this.translations['de'];
        let text = dict[key] !== undefined ? dict[key] : (this.translations['de'][key] || key);

        if (params && typeof params === 'object') {
            Object.entries(params).forEach(([k, v]) => {
                text = text.replace(new RegExp(`\\{${k}\\}`, 'g'), v);
            });
        }
        return text;
    },

    getDropdownList(category) {
        const lang = this.currentLang || 'de';
        const dict = this.translations[lang] || this.translations['de'];
        return (dict && dict[category]) ? dict[category] : (this.translations['de'][category] || {});
    },

    setLanguage(lang) {
        if (!this.translations[lang]) lang = 'de';
        this.currentLang = lang;
        try {
            localStorage.setItem('mmrpg_lang', lang);
        } catch (e) {}

        this.applyLanguage();
    },

    initLanguage() {
        let saved = null;
        try {
            saved = localStorage.getItem('mmrpg_lang');
        } catch (e) {}

        if (!saved || !this.translations[saved]) {
            const nav = (navigator.language || navigator.userLanguage || '').toLowerCase();
            if (nav.startsWith('es')) saved = 'es';
            else if (nav.startsWith('it')) saved = 'it';
            else if (nav.startsWith('fr')) saved = 'fr';
            else if (nav.startsWith('en')) saved = 'en';
            else saved = 'de';
        }

        this.currentLang = saved;
        this.applyLanguage();
        return saved;
    },

    applyLanguage() {
        const lang = this.currentLang;
        document.documentElement.lang = lang;

        // 1. data-i18n
        document.querySelectorAll('[data-i18n]').forEach(el => {
            const key = el.getAttribute('data-i18n');
            if (key) {
                const val = this.t(key);
                if (val !== undefined && val !== null) {
                    if (val.includes('<') && val.includes('>')) {
                        el.innerHTML = val;
                    } else {
                        el.textContent = val;
                    }
                }
            }
        });

        // 2. data-i18n-placeholder
        document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
            const key = el.getAttribute('data-i18n-placeholder');
            if (key) {
                el.setAttribute('placeholder', this.t(key));
            }
        });

        // 3. data-i18n-title
        document.querySelectorAll('[data-i18n-title]').forEach(el => {
            const key = el.getAttribute('data-i18n-title');
            if (key) {
                el.setAttribute('title', this.t(key));
            }
        });

        // Dropdown-Auswahl synchronisieren falls vorhanden
        const select = document.getElementById('language-select');
        if (select && select.value !== lang) {
            select.value = lang;
        }

        // Dynamische Notizen, Dropdowns und Bogenvorschau aktualisieren
        if (typeof window.refreshI18nDynamicContent === 'function') {
            window.refreshI18nDynamicContent();
        }
    }
};

if (typeof module !== 'undefined' && module.exports) {
    module.exports = MMRPG_I18N;
}
