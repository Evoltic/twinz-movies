const stringToPath = (title, id) => (
  'id' + id + '-' + title.replace(/[^A-Za-z0-9^ ^-]/g, '').replace(/ /g, '-').toLowerCase()
)

// for example: 'Avengers-10: Infinity Movie' becomes '1234-avengers-10-infinity-war'

export default stringToPath;
