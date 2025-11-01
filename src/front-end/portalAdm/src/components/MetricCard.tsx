interface MetricCardProps {
  title: string;
  value: number | string;
  description?: string;
  // icon?: React.ReactNode; // Ícone opcional
}

export function MetricCard({ title, value, description }: MetricCardProps) {
  return (
    <div className="p-1 md:p-2">
      {/* Seção do Título */}
      <h3 className="text-xs md:text-sm font-medium text-gray-100 uppercase tracking-wider mb-0 md:mb-1">
        {title}
      </h3>
      {/* Seção do Valor */}
      <p className="pl-1 md:pl-2 text-lg md:text-xl font-semibold text-green-100 mb-0.5 md:mb-2">
        {value}
      </p>
      {/* Seção da Descrição (opcional) */}
      {description && (
        <p className="text-xs text-gray-500 hidden md:block">
          {description}
        </p>
      )}
    </div>
  );
};