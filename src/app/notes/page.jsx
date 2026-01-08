"use client";
import { Trash2 } from "lucide-react";
import { FadeLoader } from "react-spinners";
import { useEffect, useState } from "react";

function Page() {
  const [notesData, setNotesData] = useState([]);
  const [loading, setLoading] = useState(true);

  // Load notes + loader
  useEffect(() => {
    const timer = setTimeout(() => {
      const notes = JSON.parse(localStorage.getItem("notes")) || [];
      setNotesData(notes);
      setLoading(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  // Delete note
  const deleteNotes = (id) => {
    const updatedNotes = notesData.filter(
      (note) => note.id !== id
    );
    setNotesData(updatedNotes);
    localStorage.setItem("notes", JSON.stringify(updatedNotes));
  };

  return (
    <div className="max-w-2xl mx-auto ">
      {loading ? (
        <div className="flex justify-center mt-20 md:h-72 items-center">
          <FadeLoader color="#4F46E5" />
        </div>
      ) : notesData.length > 0 ? (
        <div className="space-y-4">
          {notesData.map((note) => (
            <div
              key={note.id}
              className="border border-indigo-400 p-5 flex justify-between items-start rounded-md"
            >
              <div>
                <p className="text-lg font-semibold">
                  {note.title}
                </p>
                <p className="text-base pt-2 text-gray-600">
                  {note.desc}
                </p>
              </div>

              <Trash2
                onClick={() => deleteNotes(note.id)}
                className="text-red-500 cursor-pointer hover:text-red-600"
                size={20}
              />
            </div>
          ))}
        </div>
      ) : (
        <p className="flex items-center justify-center h-screen text-xl sm:text-2xl font-semibold text-gray-600">
          No Notes Available 
        </p>
      )}
    </div>
  );
}

export default Page;
