
import React, { useState } from 'react';
import { SeatRow } from '@/types/cinema';
import { Button } from '@/components/ui/button';
import { InfoIcon } from 'lucide-react';

interface SeatMapProps {
  seatsLayout: SeatRow[];
  onSelectSeats: (selectedSeats: string[]) => void;
}

const SeatMap: React.FC<SeatMapProps> = ({ seatsLayout, onSelectSeats }) => {
  const [selectedSeatIds, setSelectedSeatIds] = useState<string[]>([]);
  
  const handleSeatClick = (seatId: string, status: string) => {
    if (status === 'reserved') return;
    
    setSelectedSeatIds(prev => {
      const isSelected = prev.includes(seatId);
      
      if (isSelected) {
        return prev.filter(id => id !== seatId);
      } else {
        return [...prev, seatId];
      }
    });
  };
  
  React.useEffect(() => {
    onSelectSeats(selectedSeatIds);
  }, [selectedSeatIds, onSelectSeats]);

  return (
    <div className="my-8">
      <div className="flex justify-center mb-8 relative">
        <div className="w-full max-w-4xl overflow-x-auto">
          <div className="min-w-[600px]">
            <div className="bg-muted/20 h-8 w-3/4 mx-auto rounded-t-3xl flex items-center justify-center text-sm text-muted-foreground mb-10">
              Screen
            </div>
            
            <div className="flex flex-col items-center space-y-2">
              {seatsLayout.map((row) => (
                <div key={row.row} className="flex items-center">
                  <div className="w-6 text-center text-sm font-medium mr-2">
                    {row.row}
                  </div>
                  <div className="flex">
                    {row.seats.map((seat) => {
                      const isSelected = selectedSeatIds.includes(seat.id);
                      let seatClass = "seat ";
                      
                      if (seat.status === 'reserved') {
                        seatClass += 'seat-reserved';
                      } else if (isSelected) {
                        seatClass += 'seat-selected';
                      } else {
                        seatClass += 'seat-available';
                      }
                      
                      if (seat.type === 'premium') {
                        seatClass += ' seat-premium';
                      }
                      
                      return (
                        <div
                          key={seat.id}
                          className={seatClass}
                          onClick={() => handleSeatClick(seat.id, seat.status)}
                        >
                          <div className="flex items-center justify-center h-full text-xs">
                            {seat.number}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                  <div className="w-6 text-center text-sm font-medium ml-2">
                    {row.row}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      
      <div className="flex justify-center space-x-6 mb-6">
        <div className="flex items-center">
          <div className="seat-available seat w-6 h-6"></div>
          <span className="ml-2 text-sm">Available</span>
        </div>
        <div className="flex items-center">
          <div className="seat-selected seat w-6 h-6"></div>
          <span className="ml-2 text-sm">Selected</span>
        </div>
        <div className="flex items-center">
          <div className="seat-reserved seat w-6 h-6"></div>
          <span className="ml-2 text-sm">Reserved</span>
        </div>
        <div className="flex items-center">
          <div className="seat-available seat-premium seat w-6 h-6"></div>
          <span className="ml-2 text-sm">Premium</span>
        </div>
      </div>
      
      <div className="flex items-center justify-center text-sm text-muted-foreground">
        <InfoIcon className="h-4 w-4 mr-1" />
        <span>Select up to 10 seats</span>
      </div>
    </div>
  );
};

export default SeatMap;
