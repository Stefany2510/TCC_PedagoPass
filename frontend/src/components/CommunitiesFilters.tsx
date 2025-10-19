import React from 'react';

interface CommunitiesFiltersProps {
  selectedDiscipline: string;
  selectedGrade: string;
  selectedRegion: string;
  selectedExcursionType: string;
  selectedSort: string;
  onDisciplineChange: (value: string) => void;
  onGradeChange: (value: string) => void;
  onRegionChange: (value: string) => void;
  onExcursionTypeChange: (value: string) => void;
  onSortChange: (value: string) => void;
}

const DISCIPLINES = [
  'Todas',
  'Português',
  'Matemática',
  'Ciências',
  'História',
  'Geografia',
  'Arte',
  'Educação Física',
  'Tecnologia',
  'Interdisciplinar',
];

const GRADES = [
  'Todas',
  'Educação Infantil',
  'Fundamental I (1º-5º)',
  'Fundamental II (6º-9º)',
  'Ensino Médio',
  'Ensino Superior',
];

const REGIONS = [
  'Todos',
  'Norte',
  'Nordeste',
  'Centro-Oeste',
  'Sudeste',
  'Sul',
];

const EXCURSION_TYPES = [
  'Todos',
  'Museu',
  'Trilha',
  'Campus',
  'Sítio Histórico',
  'Parque',
  'Laboratório',
  'Virtual',
];

const SORT_OPTIONS = [
  { label: 'Mais ativas', value: 'activity' },
  { label: 'Novas', value: 'newest' },
  { label: 'Com mais roteiros', value: 'roteiros' },
  { label: 'Mais membros', value: 'members' },
];

export const CommunitiesFilters: React.FC<CommunitiesFiltersProps> = ({
  selectedDiscipline,
  selectedGrade,
  selectedRegion,
  selectedExcursionType,
  selectedSort,
  onDisciplineChange,
  onGradeChange,
  onRegionChange,
  onExcursionTypeChange,
  onSortChange,
}) => {
  return (
    <div className="space-y-4">
      {/* Filtros em chips horizontais */}
      <div className="space-y-3">
        {/* Disciplinas */}
        <div>
          <p className="text-xs font-semibold text-gray-700 uppercase tracking-wide mb-2">
            Disciplina
          </p>
          <div className="flex flex-wrap gap-2">
            {DISCIPLINES.map((discipline) => (
              <button
                key={discipline}
                onClick={() => onDisciplineChange(discipline === 'Todas' ? '' : discipline)}
                className={`px-3 py-1 rounded-full text-sm font-medium transition-all duration-200 ${
                  (selectedDiscipline === '' && discipline === 'Todas') ||
                  selectedDiscipline === discipline
                    ? 'bg-blue-600 text-white shadow-md'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {discipline}
              </button>
            ))}
          </div>
        </div>

        {/* Séries/Anos */}
        <div>
          <p className="text-xs font-semibold text-gray-700 uppercase tracking-wide mb-2">
            Série/Ano
          </p>
          <div className="flex flex-wrap gap-2">
            {GRADES.map((grade) => (
              <button
                key={grade}
                onClick={() => onGradeChange(grade === 'Todas' ? '' : grade)}
                className={`px-3 py-1 rounded-full text-sm font-medium transition-all duration-200 ${
                  (selectedGrade === '' && grade === 'Todas') || selectedGrade === grade
                    ? 'bg-green-600 text-white shadow-md'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {grade}
              </button>
            ))}
          </div>
        </div>

        {/* Regiões */}
        <div>
          <p className="text-xs font-semibold text-gray-700 uppercase tracking-wide mb-2">
            Região/UF
          </p>
          <div className="flex flex-wrap gap-2">
            {REGIONS.map((region) => (
              <button
                key={region}
                onClick={() => onRegionChange(region === 'Todos' ? '' : region)}
                className={`px-3 py-1 rounded-full text-sm font-medium transition-all duration-200 ${
                  (selectedRegion === '' && region === 'Todos') || selectedRegion === region
                    ? 'bg-purple-600 text-white shadow-md'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {region}
              </button>
            ))}
          </div>
        </div>

        {/* Tipo de Saída */}
        <div>
          <p className="text-xs font-semibold text-gray-700 uppercase tracking-wide mb-2">
            Tipo de Saída
          </p>
          <div className="flex flex-wrap gap-2">
            {EXCURSION_TYPES.map((type) => (
              <button
                key={type}
                onClick={() => onExcursionTypeChange(type === 'Todos' ? '' : type)}
                className={`px-3 py-1 rounded-full text-sm font-medium transition-all duration-200 ${
                  (selectedExcursionType === '' && type === 'Todos') ||
                  selectedExcursionType === type
                    ? 'bg-orange-600 text-white shadow-md'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {type}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Ordenação */}
      <div className="pt-4 border-t border-gray-200">
        <p className="text-xs font-semibold text-gray-700 uppercase tracking-wide mb-2">
          Ordenar por
        </p>
        <select
          value={selectedSort}
          onChange={(e) => onSortChange(e.target.value)}
          className="w-full md:w-auto px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          {SORT_OPTIONS.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default CommunitiesFilters;
