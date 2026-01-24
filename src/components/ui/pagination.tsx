import { ChevronLeft, ChevronRight, MoreHorizontal } from 'lucide-react';
import { Button } from './button';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  showInfo?: boolean;
  totalItems?: number;
  itemsPerPage?: number;
}

export const Pagination = ({
  currentPage,
  totalPages,
  onPageChange,
  showInfo = false,
  totalItems,
  itemsPerPage
}: PaginationProps) => {
  if (totalPages <= 1) return null;

  const getVisiblePages = () => {
    const delta = 2; // Nombre de pages de chaque côté de la page actuelle
    const range = [];
    const rangeWithDots = [];

    for (let i = Math.max(2, currentPage - delta); i <= Math.min(totalPages - 1, currentPage + delta); i++) {
      range.push(i);
    }

    if (currentPage - delta > 2) {
      rangeWithDots.push(1, '...');
    } else {
      rangeWithDots.push(1);
    }

    rangeWithDots.push(...range);

    if (currentPage + delta < totalPages - 1) {
      rangeWithDots.push('...', totalPages);
    } else if (totalPages > 1) {
      rangeWithDots.push(totalPages);
    }

    return rangeWithDots;
  };

  const visiblePages = getVisiblePages();

  return (
    <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mt-8">
      {showInfo && totalItems && itemsPerPage && (
        <div className="text-sm text-muted-foreground">
          Affichage de {Math.min((currentPage - 1) * itemsPerPage + 1, totalItems)} à{' '}
          {Math.min(currentPage * itemsPerPage, totalItems)} sur {totalItems} éléments
        </div>
      )}

      <div className="flex items-center gap-1">
        {/* Bouton Précédent */}
        <Button
          variant="outline"
          size="sm"
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="gap-1"
        >
          <ChevronLeft className="w-4 h-4" />
          Précédent
        </Button>

        {/* Pages */}
        <div className="flex items-center gap-1 mx-2">
          {visiblePages.map((page, index) => (
            <div key={index}>
              {page === '...' ? (
                <div className="w-8 h-8 flex items-center justify-center">
                  <MoreHorizontal className="w-4 h-4 text-muted-foreground" />
                </div>
              ) : (
                <Button
                  variant={currentPage === page ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => onPageChange(page as number)}
                  className="w-8 h-8 p-0"
                >
                  {page}
                </Button>
              )}
            </div>
          ))}
        </div>

        {/* Bouton Suivant */}
        <Button
          variant="outline"
          size="sm"
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="gap-1"
        >
          Suivant
          <ChevronRight className="w-4 h-4" />
        </Button>
      </div>
    </div>
  );
};
