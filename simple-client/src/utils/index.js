const showFormattedDate = (date, lang = 'id-ID') => {
  const options = {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  };
  return new Date(date).toLocaleDateString(lang, options);
};

export { showFormattedDate };