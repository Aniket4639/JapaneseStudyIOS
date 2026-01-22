export const getLanguageLabel = (activeLanguage: string) => {
  switch (activeLanguage) {
    case 'N3':
      return 'Japanese-English (N3)';
    default:
      return 'Spanish-English';
  }
};
