
import React from 'react';
import { Showtime, Theater } from '@/types/cinema';
import { Button } from '@/components/ui/button';
import { CalendarIcon, Clock } from 'lucide-react';
import { format } from 'date-fns';
import { Card, CardContent } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

interface ShowtimeSelectorProps {
  showtimes: Showtime[];
  theaters: Theater[];
  onSelectShowtime: (showtime: Showtime) => void;
}

const ShowtimeSelector: React.FC<ShowtimeSelectorProps> = ({ 
  showtimes, 
  theaters, 
  onSelectShowtime 
}) => {
  // Group showtimes by theater
  const showtimesByTheater: Record<string, Showtime[]> = {};
  
  showtimes.forEach(showtime => {
    if (!showtimesByTheater[showtime.theaterId]) {
      showtimesByTheater[showtime.theaterId] = [];
    }
    showtimesByTheater[showtime.theaterId].push(showtime);
  });

  return (
    <div className="my-8">
      <div className="flex items-center mb-4">
        <CalendarIcon className="mr-2 h-5 w-5 text-primary" />
        <h2 className="text-xl font-semibold">Select Showtime</h2>
      </div>
      
      <Tabs defaultValue={theaters[0]?.id}>
        <TabsList className="mb-4">
          {theaters.map(theater => (
            <TabsTrigger key={theater.id} value={theater.id}>
              {theater.name}
            </TabsTrigger>
          ))}
        </TabsList>
        
        {theaters.map(theater => (
          <TabsContent key={theater.id} value={theater.id}>
            <Card>
              <CardContent className="p-6">
                <h3 className="font-medium mb-2">{theater.location}</h3>
                
                <div className="mt-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {showtimesByTheater[theater.id]?.map(showtime => {
                    const screen = theater.screens.find(s => s.id === showtime.screenId);
                    return (
                      <Button
                        key={showtime.id}
                        variant="outline"
                        className="flex-col h-auto py-3 hover:border-primary"
                        onClick={() => onSelectShowtime(showtime)}
                      >
                        <span className="text-base font-semibold">
                          {format(new Date(showtime.startTime), 'h:mm a')}
                        </span>
                        <div className="flex items-center mt-1 text-xs text-muted-foreground">
                          <Clock className="h-3 w-3 mr-1" />
                          <span>{screen?.name}</span>
                        </div>
                      </Button>
                    );
                  })}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
};

export default ShowtimeSelector;
