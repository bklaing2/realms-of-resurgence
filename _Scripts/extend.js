function extend(tp) {
  return {
    suggester,
  };

  function suggester(
    labels,
    values,
    placeholder = "",
    throw_on_cancel = false,
    limit = undefined,
  ) {
    return {
      with_other,
    };

    async function with_other(prompt_other, text_other = "Other") {
      const labels_with_other = [...labels, text_other];
      const values_with_other = [
        ...values,
        async () => await tp.system.prompt(prompt_other),
      ].map((item) => (typeof item === "function" ? item : async () => item));

      const choice = await tp.system.suggester(
        labels_with_other,
        values_with_other,
        throw_on_cancel,
        placeholder,
        limit,
      );

      return await choice();
    }
  }
}

module.exports = extend;
