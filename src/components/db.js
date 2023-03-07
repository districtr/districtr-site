// db.js
import Dexie from 'dexie'

export const db = new Dexie('DistrictrDatabase')
db.version(3).stores({
  userMaps:
    '++id, uuid, name, description, problemId, problem, dateCreated, dateModified, live, publishedDate, lastPublishedDate, folder, image, style, units, unitAssignments, unitPopulations, unitColumnPopulations'
})

// Open it
db.open().catch((err) => {
  console.error(`Open failed: ${err.stack}`)
})
