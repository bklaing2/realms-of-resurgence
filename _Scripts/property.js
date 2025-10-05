const RESOURCES_FOLDER = "Resources";

function property(tp) {
  return {
    // Common Properties
    name,
    damage,
    duration,

    // Specific Properties
    item,
    equipment,
    weapon,
    armor,
    potion,
    spell,
    rune,
  };

  // Common Properties ///////////////////////////
  async function name(rename_file = false) {
    const name = await tp.system.prompt("Name");
    if (rename_file) await tp.file.rename(name);
    return name;
  }

  async function damage() {
    return await prompt_for_dice("Damage");
  }

  async function duration() {
    const prompt_for_rounds = build_prompt("Duration", "1", "round");
    const prompt_for_minutes = build_prompt("Duration", "1", "minute");
    const prompt_for_hours = build_prompt("Duration", "1", "hour");
    const prompt_for_days = build_prompt("Duration", "1", "day");

    const labels = ["Instantaneous", "Rounds", "Minutes", "Hours", "Days"];
    const values = [
      "instantaneous",
      prompt_for_rounds,
      prompt_for_minutes,
      prompt_for_hours,
      prompt_for_days,
    ];

    return await tp.user
      .extend(tp)
      .suggester(labels, values, "Duration")
      .with_other("Duration");
  }

  async function tier(with_cantrip = false) {
    const common_labels = ["1", "2", "3"];
    const common_values = [1, 2, 3];

    const labels = with_cantrip ? ["Cantrip", ...common_labels] : common_labels;
    const values = with_cantrip ? [0, ...common_values] : common_values;

    return await tp.system.suggester(labels, values, false, "Tier");
  }

  // Item Properties /////////////////////////////
  async function item(item_name) {
    const item_properties = {
      name: item_name || (await name(true)),
      price: await tp.system.prompt("Price"),
      weight: await tp.system.prompt("Weight"),
      size: await tp.system.prompt("Size"),
    };

    await move_to_resources(item_properties.name);
    return item_properties;
  }

  // Equipment Properties ////////////////////////
  async function equipment() {
    const equipment_name = await name(true);

    const equipment_properties = {
      ...(await item(equipment_name)),
    };

    await move_to_resources(equipment_properties.name);
    return equipment_properties;
  }

  // Weapon Properties ////////////////////////////
  async function weapon() {
    const weapon_name = await name(true);
    const prompt_for_range = build_prompt("Weapon Range", "30", "foot", "feet");

    const weapon_properties = {
      type: await type(),
      range: await prompt_for_range(),
      attack: await prompt_for_dice("Attack"),
      damage: await damage(),
      ...(await item(weapon_name)),
    };

    return weapon_properties;

    async function type() {
      const labels = ["Sword", "Dagger", "Bow"];
      const values = labels.map((label) => label.toLowerCase());

      return await tp.system.suggester(labels, values, "Weapon Type");
    }
  }

  // Armor Properties ////////////////////////////
  async function armor() {
    const armor_name = await name(true);
    const armor_type = await type();
    const armor_mitigation = mitigation(armor_type);

    const armor_properties = {
      type: armor_type,
      class: armor_class(armor_type),
      mitigation: armor_mitigation,
      damage_threshold: damage_threshold(armor_mitigation),
      damage_slots: damage_slots(armor_type),
      ...(await item(armor_name)),
    };

    return armor_properties;

    async function type() {
      const labels = ["Light", "Medium", "Heavy"];
      const values = ["light", "medium", "heavy"];

      return await tp.system.suggester(labels, values, "Armor Type");
    }

    function armor_class(armor_type) {
      switch (armor_type) {
        case "light":
          return 8;
        case "medium":
          return 6;
        case "heavy":
          return 4;
      }
    }

    function mitigation(armor_type) {
      switch (armor_type) {
        case "light":
          return 4;
        case "medium":
          return 6;
        case "heavy":
          return 8;
      }
    }

    function damage_threshold(mitigation) {
      return 2 * mitigation;
    }

    function damage_slots(armor_type) {
      switch (armor_type) {
        case "light":
          return 2;
        case "medium":
          return 4;
        case "heavy":
          return 6;
      }
    }
  }

  // Potion Properties ///////////////////////////
  async function potion() {
    const potion_name = await name(true);

    const potion_properties = {
      type: await type(),
      ...(await item(potion_name)),
    };

    return potion_properties;

    async function type() {
      const labels = ["Potion", "Unstable Mixture"];
      const values = labels.map((label) => label.toLowerCase());

      return await tp.system.suggester(labels, values, "Potion Type");
    }
  }
  // Spell Properties ////////////////////////////
  async function spell() {
    const spell_properties = {
      name: await name(true),
      tier: await tier(true),
      casting_time: await casting_time(),
      target: await target(),
      range: await range(),
      duration: await duration(),
      aoe: await aoe(),
      damage: await prompt_for_dice(),
    };

    await move_to_resources();
    return spell_properties;

    async function casting_time() {
      const prompt_for_minutes = build_prompt("Casting Time", "1", "minute");

      const labels = ["Action", "Quick Action", "Reaction", "Minutes"];
      const values = ["action", "quick action", "reaction", prompt_for_minutes];

      return await tp.user
        .extend(tp)
        .suggester(labels, values, "Casting Time")
        .with_other("Casting Time");
    }

    async function target() {
      const prompt_for_creatures = build_prompt(
        "Creatures in Range",
        "1",
        "creature in range",
        "creatures in range",
      );

      const labels = ["Self", "Creature"];
      const values = ["self", prompt_for_creatures];

      return await tp.user
        .extend(tp)
        .suggester(labels, values, "Target")
        .with_other("Target");
    }

    async function range() {
      const prompt_for_range = build_prompt(
        "Spell Range",
        "30",
        "foot",
        "feet",
      );

      const labels = ["Self", "Touch", "Range"];
      const values = ["self", "touch", prompt_for_range];

      return await tp.user
        .extend(tp)
        .suggester(labels, values, "Range")
        .with_other("Range");
    }

    async function aoe() {
      const prompt_for_creatures = build_prompt("Creatures", "1", "creature");
      const prompt_for_cube = build_prompt("Cube", "15", "foot", "feet");
      const prompt_for_cone = build_prompt("Cone", "1", "foot", "feet");
      const prompt_for_cylinder = build_prompt("Cylinder", "1", "foot", "feet");
      const prompt_for_sphere = build_prompt("Sphere", "1", "foot", "feet");

      const labels = [
        "Self",
        "Creature",
        "Beam",
        "Cube",
        "Cone",
        "Cylinder",
        "Sphere",
      ];
      const values = [
        "self",
        prompt_for_creatures,
        "beam",
        prompt_for_cube,
        prompt_for_cone,
        prompt_for_cylinder,
        prompt_for_sphere,
      ];

      return await tp.user
        .extend(tp)
        .suggester(labels, values, "Area of Effect")
        .with_other("Area of Effect");
    }
  }

  // Rune Properties /////////////////////////////
  async function rune() {
    const rune_properties = {
      name: await name(true),
      tier: await tier(),
      scribing_time: await scribing_time(),
      duration: await duration(),
    };

    await move_to_resources();
    return rune_properties;

    async function scribing_time() {
      const prompt_for_minutes = build_prompt("Scribing Time", "1", "minute");

      const labels = ["Action", "Minutes"];
      const values = ["action", prompt_for_minutes];

      return await tp.user
        .extend(tp)
        .suggester(labels, values, "Scribing Time")
        .with_other("Scribing Time");
    }
  }

  // HELPER FUNCTIONS ////////////////////////////
  async function move_to_resources(title) {
    await tp.file.move(`/${RESOURCES_FOLDER}/${title || tp.file.title}`);
  }

  async function prompt_for_dice(prompt = "Dice") {
    return (await tp.system.prompt(prompt)).toUpperCase();
  }

  function build_prompt(prompt, placeholder, singular, plural) {
    const pluralized = tp.user.util(tp).pluralize(0, singular, plural);
    prompt = `${prompt} (${pluralized})`;

    return async () => {
      const value = await tp.system.prompt(prompt, placeholder);
      return `${value} ${tp.user.util(tp).pluralize(value, singular, plural)}`;
    };
  }
}

module.exports = property;
