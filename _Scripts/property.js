function property(tp) {
  return {
    name,
    tier,
    casting_time,
    target,
    range,
    duration,
  };

  async function name(rename_file = false) {
    const name = await tp.system.prompt("Name");
    if (rename_file) await tp.file.rename(name);
    return name;
  }

  async function tier(with_cantrip = false) {
    const common_labels = ["1", "2", "3"];
    const common_values = [1, 2, 3];

    const labels = with_cantrip ? ["Cantrip", ...common_labels] : common_labels;
    const values = with_cantrip ? [0, ...common_values] : common_values;

    return await tp.system.suggester(labels, values, false, "Tier");
  }

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
    const values = ["Self", prompt_for_creatures];

    return await tp.user
      .extend(tp)
      .suggester(labels, values, "Target")
      .with_other("Target");
  }

  async function range() {
    const prompt_for_range = build_prompt("Spell Range", "30", "foot", "feet");

    const labels = ["Self", "Touch", "Range"];
    const values = ["Self", "Touch", prompt_for_range];

    return await tp.user
      .extend(tp)
      .suggester(labels, values, "Range")
      .with_other("Range");
  }

  async function duration() {
    const prompt_for_rounds = build_prompt("Duration", "1", "round");
    const prompt_for_minutes = build_prompt("Duration", "1", "minute");
    const prompt_for_hours = build_prompt("Duration", "1", "hour");
    const prompt_for_days = build_prompt("Duration", "1", "day");

    const labels = ["Instantaneous", "Rounds", "Minutes", "Hours", "Days"];
    const values = [
      "Instantaneous",
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

  // HELPER FUNCTIONS ////////////////////////////
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
