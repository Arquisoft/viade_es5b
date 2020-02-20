async function addNote(note, notesList) {
    // Initialise the new Subject:
    const newNote = notesList.addSubject();
  
    // Indicate that the Subject is a schema:TextDigitalDocument:
    newNote.addRef(rdf.type, schema.TextDigitalDocument);
  
    // Set the Subject's `schema:text` to the actual note contents:
    newNote.addLiteral(schema.text, note);
  
    // Store the date the note was created (i.e. now):
    newNote.addLiteral(schema.dateCreated, new Date(Date.now()))
  
    const success = await notesList.save([newNote]);
    return success;
  }