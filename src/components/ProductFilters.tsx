import { useTranslation } from 'react-i18next';

interface ProductFiltersProps {
  selectedCategory: string | null;
  onCategoryChange: (category: string | null) => void;
}

export default function ProductFilters({
  selectedCategory,
  onCategoryChange,
}: ProductFiltersProps) {
  const { t } = useTranslation();
  const categories = ['beanie', 'mask', 'sweater', 'sunglasses'];

  return (
    <div className="bg-white p-4 rounded-lg shadow">
      <h3 className="text-lg font-semibold mb-4">{t('filters.categories')}</h3>
      <div className="space-y-2">
        <button
          onClick={() => onCategoryChange(null)}
          className={`w-full text-left px-4 py-2 rounded ${
            selectedCategory === null
              ? 'bg-gray-900 text-white'
              : 'hover:bg-gray-100'
          }`}
        >
          {t('filters.all')}
        </button>
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => onCategoryChange(category)}
            className={`w-full text-left px-4 py-2 rounded ${
              selectedCategory === category
                ? 'bg-gray-900 text-white'
                : 'hover:bg-gray-100'
            }`}
          >
            {t(`categories.${category}`)}
          </button>
        ))}
      </div>
    </div>
  );
}