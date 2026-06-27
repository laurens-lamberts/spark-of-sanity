const base = import.meta.env.BASE_URL

export const members = [
  { id: 1, name: 'Laurens', instrument: 'Vocals & Guitar', photo: `${base}assets/images/member-laurens.png` },
  { id: 2, name: 'Bjorn',   instrument: 'Bass Guitar',     photo: `${base}assets/images/member-bjorn.png` },
  { id: 3, name: 'Robin',   instrument: 'Guitar',          photo: `${base}assets/images/member-robin.png` },
  { id: 4, name: 'Nick',    instrument: 'Drums',           photo: `${base}assets/images/member-nick.png` },
]
