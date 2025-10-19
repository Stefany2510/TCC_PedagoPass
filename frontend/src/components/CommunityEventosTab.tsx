import React, { useState } from 'react';

interface Evento {
  id: string;
  title: string;
  description: string;
  date: string;
  time: string;
  location: string;
  type: 'reunion' | 'tour' | 'webinar' | 'workshop';
  capacity: number;
  attendees: number;
}

interface CommunityEventosTabProps {
  eventos?: Evento[];
  isLoading: boolean;
  isMember: boolean;
  onCreateEvento?: () => void;
  onJoinEvento?: (eventoId: string) => void;
}

const eventTypeIcons: Record<string, string> = {
  reunion: '🤝',
  tour: '🚶',
  webinar: '💻',
  workshop: '🛠️',
};

const eventTypeLabels: Record<string, string> = {
  reunion: 'Reunião',
  tour: 'Tour Virtual',
  webinar: 'Webinar',
  workshop: 'Workshop',
};

export const CommunityEventosTab: React.FC<CommunityEventosTabProps> = ({
  eventos = [],
  isLoading,
  isMember,
  onCreateEvento,
  onJoinEvento,
}) => {
  const [view, setView] = useState<'calendar' | 'list'>('list');

  if (isLoading) {
    return (
      <div className="space-y-4">
        {Array.from({ length: 3 }).map((_, i) => (
          <div
            key={i}
            className="bg-white rounded-lg p-4 shadow-sm animate-pulse"
          >
            <div className="h-6 bg-gray-200 rounded-lg mb-4 w-1/3" />
            <div className="h-16 bg-gray-200 rounded-lg" />
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header com CTA */}
      <div className="flex items-center justify-between bg-white rounded-lg p-4 shadow-sm border border-gray-100">
        <div>
          <h3 className="font-semibold text-gray-900">Eventos</h3>
          <p className="text-sm text-gray-600">
            {eventos.length} eventos agendados
          </p>
        </div>
        <div className="flex items-center gap-2">
          <div className="bg-gray-100 rounded-lg p-1 flex gap-1">
            <button
              onClick={() => setView('list')}
              className={`px-3 py-2 rounded text-sm font-medium transition-all ${
                view === 'list'
                  ? 'bg-white text-gray-900 shadow-sm'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              📋 Lista
            </button>
            <button
              onClick={() => setView('calendar')}
              className={`px-3 py-2 rounded text-sm font-medium transition-all ${
                view === 'calendar'
                  ? 'bg-white text-gray-900 shadow-sm'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              📅 Calendário
            </button>
          </div>
          {isMember && (
            <button
              onClick={onCreateEvento}
              className="px-4 py-2 bg-gradient-to-r from-purple-600 to-purple-700 text-white rounded-lg font-medium hover:shadow-lg transition-all"
            >
              + Novo
            </button>
          )}
        </div>
      </div>

      {/* Vista de Lista */}
      {view === 'list' && (
        <div className="space-y-4">
          {eventos.length === 0 ? (
            <div className="text-center py-12 bg-white rounded-lg">
              <svg
                className="mx-auto h-12 w-12 text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M8 7V3m8 4V3m-9 8h18M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                />
              </svg>
              <p className="mt-4 text-gray-600 font-medium">Nenhum evento programado</p>
              <p className="text-sm text-gray-500">Fique atento para novos eventos!</p>
            </div>
          ) : (
            eventos.map((evento) => (
              <div
                key={evento.id}
                className="bg-white rounded-lg shadow-sm border border-gray-100 hover:shadow-md transition-all duration-200 overflow-hidden"
              >
                <div className="p-5">
                  <div className="flex items-start gap-4">
                    {/* Ícone do tipo */}
                    <div className="text-4xl">{eventTypeIcons[evento.type]}</div>

                    {/* Conteúdo */}
                    <div className="flex-1">
                      <div className="flex items-start justify-between mb-2">
                        <div>
                          <h3 className="font-semibold text-gray-900 text-lg">
                            {evento.title}
                          </h3>
                          <span className="inline-block mt-1 px-2 py-1 bg-purple-100 text-purple-700 text-xs font-medium rounded">
                            {eventTypeLabels[evento.type]}
                          </span>
                        </div>
                      </div>

                      <p className="text-sm text-gray-600 mb-3">{evento.description}</p>

                      {/* Info do evento */}
                      <div className="grid md:grid-cols-2 gap-3 mb-4 text-sm">
                        <div className="flex items-center gap-2 text-gray-700">
                          <svg
                            className="w-4 h-4 text-gray-500"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M8 7V3m8 4V3m-9 8h18M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                            />
                          </svg>
                          <span>
                            {new Date(evento.date).toLocaleDateString('pt-BR')} às{' '}
                            {evento.time}
                          </span>
                        </div>
                        <div className="flex items-center gap-2 text-gray-700">
                          <svg
                            className="w-4 h-4 text-gray-500"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                            />
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                            />
                          </svg>
                          <span>{evento.location}</span>
                        </div>
                      </div>

                      {/* Participação */}
                      <div className="flex items-center justify-between pt-3 border-t border-gray-100">
                        <div className="text-sm">
                          <p className="text-gray-600">
                            <span className="font-semibold text-gray-900">
                              {evento.attendees}
                            </span>
                            /{evento.capacity} participantes
                          </p>
                          <div className="w-32 h-2 bg-gray-200 rounded-full mt-1 overflow-hidden">
                            <div
                              className="h-full bg-gradient-to-r from-purple-600 to-purple-700"
                              style={{
                                width: `${(evento.attendees / evento.capacity) * 100}%`,
                              }}
                            />
                          </div>
                        </div>
                        <button
                          onClick={() => onJoinEvento?.(evento.id)}
                          className="px-4 py-2 bg-purple-600 text-white rounded-lg font-medium hover:bg-purple-700 transition-all"
                        >
                          Participar
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      )}

      {/* Vista de Calendário (simplificada) */}
      {view === 'calendar' && (
        <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-6">
          <p className="text-center text-gray-600">
            Calendário de eventos virá em breve com integração completa
          </p>
        </div>
      )}
    </div>
  );
};

export default CommunityEventosTab;
