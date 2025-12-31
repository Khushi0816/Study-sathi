export default function ImportantNotes(){
  const notes = [
    "Exam tomorrow — revise Chapter 3",
    "Finish assignments: DBMS",
    "Flashcards to review: 12"
  ];
  return (
    <div className="card p-4">
      <h4 className="font-header mb-3">Important Notes</h4>
      <ul className="list-disc pl-5 text-white/90">
        {notes.map((n,i) => <li key={i} className="mb-2 small-muted">{n}</li>)}
      </ul>
    </div>
  );
}
