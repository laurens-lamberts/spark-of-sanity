export const releases = [
  {
    id: 'ep1',
    year: 2018,
    cover: '/assets/images/ep1-cover.jpg',
    tracks: [
      { id: 1, title: 'Storm', src: '/assets/audio/Storm.mp3' },
      { id: 2, title: 'Sweet or Salty', src: '/assets/audio/Sweet-or-Salty.mp3' },
      { id: 3, title: 'Not Me', src: '/assets/audio/Not-Me.mp3' },
      { id: 4, title: 'Starts Again', src: '/assets/audio/Starts-Again.mp3' },
      { id: 5, title: 'Breaking Out', src: '/assets/audio/Breaking-Out.mp3' },
    ],
  },
  {
    id: 'ep2',
    year: 2020,
    cover: '/assets/images/ep2-cover.jpg',
    tracks: [
      { id: 6, title: 'Make Up Your Mind', src: '/assets/audio/Make-Up-Your-Mind.mp3' },
      { id: 7, title: 'Willow Tree', src: '/assets/audio/Willow-Tree.mp3' },
      { id: 8, title: 'Short Life', src: '/assets/audio/Short-Life.mp3' },
      { id: 9, title: 'Lies For A Living', src: '/assets/audio/Lies-For-A-Living.mp3' },
    ],
  },
]

export const allTracks = releases.flatMap(r => r.tracks)
