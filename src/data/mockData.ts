import { Movie, Showtime, Theater, SeatRow, Seat } from "@/types/cinema";

export const movies: Movie[] = [
  {
    id: "1",
    title: "Interstellar Odyssey",
    posterUrl: "https://images.unsplash.com/photo-1594909122845-11baa439b7bf?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8bW92aWUlMjBwb3N0ZXJ8ZW58MHx8MHx8fDA%3D",
    backdropUrl: "https://images.unsplash.com/photo-1534447677768-be436bb09401?w=1200&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8c3BhY2V8ZW58MHx8MHx8fDA%3D",
    releaseDate: "2023-07-15",
    duration: 142,
    rating: 8.7,
    genres: ["Science Fiction", "Adventure", "Drama"],
    synopsis: "A team of explorers travel through a wormhole in space in an attempt to ensure humanity's survival.",
    director: "Christopher Nolan",
    cast: ["Matthew McConaughey", "Anne Hathaway", "Jessica Chastain"],
    trailerUrl: "https://www.youtube.com/watch?v=2LqzF5WauAw"
  },
  {
    id: "2",
    title: "Phantom Kingdom",
    posterUrl: "https://images.unsplash.com/photo-1536440136628-849c177e76a1?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8bW92aWUlMjBwb3N0ZXJ8ZW58MHx8MHx8fDA%3D",
    backdropUrl: "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=1200&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8bWlzdHxlbnwwfHwwfHx8MA%3D%3D",
    releaseDate: "2023-08-22",
    duration: 128,
    rating: 7.9,
    genres: ["Fantasy", "Adventure", "Action"],
    synopsis: "A warrior discovers a hidden realm where mythical creatures exist and must save both worlds from an ancient evil.",
    director: "Guillermo del Toro",
    cast: ["Tom Holland", "Zendaya", "Idris Elba"],
    trailerUrl: "https://www.youtube.com/watch?v=2LqzF5WauAw"
  },
  {
    id: "3",
    title: "Shadow Protocol",
    posterUrl: "https://images.unsplash.com/photo-1626814026160-2237a95fc5a0?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTh8fG1vdmllJTIwcG9zdGVyfGVufDB8fDB8fHww",
    backdropUrl: "https://images.unsplash.com/photo-1605806616949-59450e20fc2a?w=1200&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8ZGFyayUyMGNpdHl8ZW58MHx8MHx8fDA%3D",
    releaseDate: "2023-06-10",
    duration: 135,
    rating: 8.2,
    genres: ["Action", "Thriller", "Espionage"],
    synopsis: "An elite spy team uncovers a global conspiracy that threatens to destabilize world powers.",
    director: "Kathryn Bigelow",
    cast: ["Michael B. Jordan", "Florence Pugh", "John David Washington"],
    trailerUrl: "https://www.youtube.com/watch?v=2LqzF5WauAw"
  },
  {
    id: "4",
    title: "Eternal Echoes",
    posterUrl: "https://images.unsplash.com/photo-1560169897-fc0cdbdfa4d5?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8d29tYW4lMjBwb3J0cmFpdHxlbnwwfHwwfHx8MA%3D%3D",
    backdropUrl: "https://images.unsplash.com/photo-1519681393784-d120267933ba?w=1200&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8bW91bnRhaW4lMjBzdGFyc3xlbnwwfHwwfHx8MA%3D%3D",
    releaseDate: "2023-09-05",
    duration: 152,
    rating: 8.9,
    genres: ["Romance", "Drama", "Fantasy"],
    synopsis: "Two souls connected across time and space find each other repeatedly throughout different eras.",
    director: "Wong Kar-wai",
    cast: ["Saoirse Ronan", "Timothée Chalamet", "Lupita Nyong'o"],
    trailerUrl: "https://www.youtube.com/watch?v=2LqzF5WauAw"
  },
  {
    id: "5",
    title: "Velocity Surge",
    posterUrl: "https://images.unsplash.com/photo-1493246507139-91e8fad9978e?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8c3BlZWR8ZW58MHx8MHx8fDA%3D",
    backdropUrl: "https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?w=1200&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8Y2FyfGVufDB8fDB8fHww",
    releaseDate: "2023-05-18",
    duration: 118,
    rating: 7.6,
    genres: ["Action", "Heist", "Thriller"],
    synopsis: "A professional driver gets caught up in a high-stakes heist that puts his skills and loyalty to the test.",
    director: "Justin Lin",
    cast: ["Vin Diesel", "Michelle Rodriguez", "Charlize Theron"],
    trailerUrl: "https://www.youtube.com/watch?v=2LqzF5WauAw"
  },
  {
    id: "6",
    title: "Whispers in the Dark",
    posterUrl: "https://images.unsplash.com/photo-1509347528160-9a9e33742cdb?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8aG9ycm9yfGVufDB8fDB8fHww",
    backdropUrl: "https://images.unsplash.com/photo-1555661530-68c8e98db4e6?w=1200&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8Zm9nZ3klMjBmb3Jlc3R8ZW58MHx8MHx8fDA%3D",
    releaseDate: "2023-10-20",
    duration: 110,
    rating: 7.8,
    genres: ["Horror", "Psychological", "Thriller"],
    synopsis: "A family moves into a secluded house only to discover it harbors a terrifying presence that preys on their deepest fears.",
    director: "Ari Aster",
    cast: ["Toni Collette", "Florence Pugh", "Willem Dafoe"],
    trailerUrl: "https://www.youtube.com/watch?v=2LqzF5WauAw"
  },
  {
    id: "7",
    title: "Crimson Tide",
    posterUrl: "https://images.unsplash.com/photo-1616530940355-351fabd9524b?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fG1vdmllJTIwcG9zdGVyfGVufDB8fDB8fHww",
    backdropUrl: "https://images.unsplash.com/photo-1551763337-ff6a5e2338f7?w=1200&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8b2NlYW58ZW58MHx8MHx8fDA%3D",
    releaseDate: "2025-03-01",
    duration: 124,
    rating: 8.1,
    genres: ["Action", "Drama", "Submarine"],
    synopsis: "In the midst of a global crisis, a submarine commander and his executive officer clash over a potentially catastrophic decision.",
    director: "Denis Villeneuve",
    cast: ["Oscar Isaac", "Jessica Chastain", "Denzel Washington"],
    trailerUrl: "https://www.youtube.com/watch?v=2LqzF5WauAw"
  },
  {
    id: "8",
    title: "The Last Dawn",
    posterUrl: "https://images.unsplash.com/photo-1559583109-3e7968136c99?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTJ8fG1vdmllJTIwcG9zdGVyfGVufDB8fDB8fHww",
    backdropUrl: "https://images.unsplash.com/photo-1513326738677-b964603b136d?w=1200&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8ZGF3bnxlbnwwfHwwfHx8MA%3D%3D",
    releaseDate: "2025-02-15",
    duration: 145,
    rating: 8.4,
    genres: ["Epic", "War", "Drama"],
    synopsis: "As war consumes their kingdom, a warrior and a princess journey to find a mythical weapon that could save their people.",
    director: "Bong Joon-ho",
    cast: ["Steven Yeun", "John Cho", "Karen Gillan"],
    trailerUrl: "https://www.youtube.com/watch?v=2LqzF5WauAw"
  },
  {
    id: "9",
    title: "Midnight Heist",
    posterUrl: "https://images.unsplash.com/photo-1535016120720-40c646be5580?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8bmVvbiUyMHBvc3RlcnxlbnwwfHwwfHx8MA%3D%3D",
    backdropUrl: "https://images.unsplash.com/photo-1501769752-a59efa2298ce?w=1200&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8Y2l0eSUyMG5pZ2h0fGVufDB8fDB8fHww",
    releaseDate: "2025-03-20",
    duration: 112,
    rating: 7.9,
    genres: ["Crime", "Thriller", "Heist"],
    synopsis: "A master thief assembles an unlikely crew for one last impossible heist that could change their lives forever.",
    director: "Steve McQueen",
    cast: ["Idris Elba", "Lupita Nyong'o", "Michael Fassbender"],
    trailerUrl: "https://www.youtube.com/watch?v=2LqzF5WauAw"
  },
  {
    id: "10",
    title: "Eternal Winter",
    posterUrl: "https://images.unsplash.com/photo-1518134346374-184f9d21cea2?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8bW92aWUlMjBwb3N0ZXJ8ZW58MHx8MHx8fDA%3D",
    backdropUrl: "https://images.unsplash.com/photo-1483664852095-d6cc6870702d?w=1200&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8d2ludGVyfGVufDB8fDB8fHww",
    releaseDate: "2025-06-15",
    duration: 132,
    rating: 8.6,
    genres: ["Survival", "Drama", "Thriller"],
    synopsis: "Stranded in the arctic wilderness after a plane crash, a group of strangers must work together to survive the harsh elements.",
    director: "Alejandro G. Iñárritu",
    cast: ["Leonardo DiCaprio", "Viggo Mortensen", "Daisy Ridley"],
    trailerUrl: "https://www.youtube.com/watch?v=2LqzF5WauAw"
  },
  {
    id: "11",
    title: "Neon Dynasty",
    posterUrl: "https://images.unsplash.com/photo-1635552322112-0194846b0d75?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
    backdropUrl: "https://images.unsplash.com/photo-1610296669228-602fa827fc1f?w=1200&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8Y3liZXJwdW5rfGVufDB8fDB8fHww",
    releaseDate: "2025-08-01",
    duration: 158,
    rating: 9.0,
    genres: ["Cyberpunk", "Action", "Sci-Fi"],
    synopsis: "In a dystopian future where corporations control every aspect of life, a hacker discovers a secret that could liberate humanity.",
    director: "The Wachowskis",
    cast: ["Keanu Reeves", "Ana de Armas", "Daniel Kaluuya"],
    trailerUrl: "https://www.youtube.com/watch?v=2LqzF5WauAw"
  },
  {
    id: "12",
    title: "Emerald Kingdom",
    posterUrl: "https://images.unsplash.com/photo-1740511085476-797f5ef848cd?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
    backdropUrl: "https://images.unsplash.com/photo-1520962880247-cfaf541c8724?w=1200&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8anVuZ2xlfGVufDB8fDB8fHww",
    releaseDate: "2025-07-12",
    duration: 136,
    rating: 8.3,
    genres: ["Adventure", "Fantasy", "Family"],
    synopsis: "A young explorer discovers a hidden civilization deep in the Amazon rainforest with incredible technology and mysterious powers.",
    director: "Patty Jenkins",
    cast: ["Gal Gadot", "John Boyega", "Pedro Pascal"],
    trailerUrl: "https://www.youtube.com/watch?v=2LqzF5WauAw"
  },
  {
    id: "13",
    title: "Silent Symphony",
    posterUrl: "https://images.unsplash.com/photo-1620754733890-75a20f393d01?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
    backdropUrl: "https://images.unsplash.com/photo-1507838153414-b4b713384a76?w=1200&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8bXVzaWNpYW58ZW58MHx8MHx8fDA%3D",
    releaseDate: "2025-09-05",
    duration: 127,
    rating: 8.8,
    genres: ["Musical", "Drama", "Biography"],
    synopsis: "The remarkable story of a deaf composer who overcomes incredible obstacles to create some of the most beautiful music ever written.",
    director: "Damien Chazelle",
    cast: ["Emma Stone", "Andrew Garfield", "Ryan Gosling"],
    trailerUrl: "https://www.youtube.com/watch?v=2LqzF5WauAw"
  },
  {
    id: "14",
    title: "The Last Guardian",
    posterUrl: "https://images.unsplash.com/photo-1559108318-39ed452bb6c9?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mjl8fG1vdmllJTIwcG9zdGVyfGVufDB8fDB8fHww",
    backdropUrl: "https://images.unsplash.com/photo-1518709414768-a88981a4515d?w=1200&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8ZmFudGFzeSUyMGxhbmRzY2FwZXxlbnwwfHwwfHx8MA%3D%3D",
    releaseDate: "2025-10-20",
    duration: 155,
    rating: 9.2,
    genres: ["Fantasy", "Adventure", "Epic"],
    synopsis: "When ancient forces threaten to destroy the realm, a reluctant hero must embrace their destiny and awaken powers dormant for centuries.",
    director: "Guillermo del Toro",
    cast: ["Dave Bautista", "Tilda Swinton", "Cynthia Erivo"],
    trailerUrl: "https://www.youtube.com/watch?v=2LqzF5WauAw"
  }
];

export const theaters: Theater[] = [
  {
    id: "1",
    name: "Starlight Cinema",
    location: "123 Main Street, Downtown",
    screens: [
      {
        id: "screen1",
        name: "Screen 1 - IMAX",
        features: ["IMAX", "Dolby Atmos"],
        seatsLayout: generateSeatsLayout("A", "J", 12, 2)
      },
      {
        id: "screen2",
        name: "Screen 2 - Standard",
        features: ["Standard"],
        seatsLayout: generateSeatsLayout("A", "H", 10, 0)
      }
    ]
  },
  {
    id: "2",
    name: "Galaxy Multiplex",
    location: "456 Park Avenue, Uptown",
    screens: [
      {
        id: "screen1",
        name: "Screen 1 - Ultra",
        features: ["Ultra Screen", "4D Experience"],
        seatsLayout: generateSeatsLayout("A", "K", 14, 3)
      },
      {
        id: "screen2",
        name: "Screen 2 - Standard",
        features: ["Standard"],
        seatsLayout: generateSeatsLayout("A", "G", 9, 0)
      }
    ]
  }
];

export const showtimes: Showtime[] = [
  {
    id: "st1",
    movieId: "1",
    theaterId: "1",
    screenId: "screen1",
    startTime: "2023-12-15T10:00:00",
    endTime: "2023-12-15T12:22:00",
    price: {
      standard: 12.99,
      premium: 18.99
    }
  },
  {
    id: "st2",
    movieId: "1",
    theaterId: "1",
    screenId: "screen1",
    startTime: "2023-12-15T14:00:00",
    endTime: "2023-12-15T16:22:00",
    price: {
      standard: 14.99,
      premium: 20.99
    }
  },
  {
    id: "st3",
    movieId: "1",
    theaterId: "1",
    screenId: "screen1",
    startTime: "2023-12-15T18:00:00",
    endTime: "2023-12-15T20:22:00",
    price: {
      standard: 16.99,
      premium: 22.99
    }
  },
  {
    id: "st4",
    movieId: "2",
    theaterId: "1",
    screenId: "screen2",
    startTime: "2023-12-15T11:30:00",
    endTime: "2023-12-15T13:38:00",
    price: {
      standard: 12.99,
      premium: 18.99
    }
  },
  {
    id: "st5",
    movieId: "2",
    theaterId: "1",
    screenId: "screen2",
    startTime: "2023-12-15T15:30:00",
    endTime: "2023-12-15T17:38:00",
    price: {
      standard: 14.99,
      premium: 20.99
    }
  },
  {
    id: "st6",
    movieId: "3",
    theaterId: "2",
    screenId: "screen1",
    startTime: "2023-12-15T12:15:00",
    endTime: "2023-12-15T14:30:00",
    price: {
      standard: 13.99,
      premium: 19.99
    }
  },
  {
    id: "st7",
    movieId: "3",
    theaterId: "2",
    screenId: "screen1",
    startTime: "2023-12-15T16:45:00",
    endTime: "2023-12-15T19:00:00",
    price: {
      standard: 15.99,
      premium: 21.99
    }
  }
];

function generateSeatsLayout(startRow: string, endRow: string, seatsPerRow: number, premiumRows: number): SeatRow[] {
  const rows: SeatRow[] = [];
  const startCharCode = startRow.charCodeAt(0);
  const endCharCode = endRow.charCodeAt(0);
  
  for (let i = startCharCode; i <= endCharCode; i++) {
    const rowLetter = String.fromCharCode(i);
    const seats: Seat[] = [];
    
    for (let j = 1; j <= seatsPerRow; j++) {
      seats.push({
        id: `${rowLetter}${j}`,
        number: j,
        type: (endCharCode - i < premiumRows) ? 'premium' : 'standard',
        status: 'available'
      });
    }
    
    rows.push({
      row: rowLetter,
      seats
    });
  }
  
  return rows;
}

export function getMovieById(id: string): Movie | undefined {
  return movies.find(movie => movie.id === id);
}

export function getTheaterById(id: string): Theater | undefined {
  return theaters.find(theater => theater.id === id);
}

export function getShowtimesByMovieId(movieId: string): Showtime[] {
  return showtimes.filter(showtime => showtime.movieId === movieId);
}

export function getShowtimeById(id: string): Showtime | undefined {
  return showtimes.find(showtime => showtime.id === id);
}
