import { useState, useEffect } from "react";
import axios from "axios";

interface Event {
  _id: string;
  title: string;
  description: string;
  date: string;
  url: string;
}

const EventList: React.FC = () => {
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>("");

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await axios.get<Event[]>(
          "http://localhost:5000/api/admin/events",
          { withCredentials: true }
        );
        console.log("Fetched Events:", response.data);
        setEvents(response.data);
      } catch (err) {
        console.error("Error fetching events:", err);
        setError("Failed to load events");
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, []);

  if (loading) return <p className="text-center text-gray-500">Loading events...</p>;
  if (error) return <p className="text-center text-red-500">{error}</p>;

  return (
    <div className="max-w-5xl mx-auto p-6">
      <h2 className="text-3xl font-semibold text-center mb-6">Upcoming Events</h2>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {events.length > 0 ? (
          events.map((event) => (
            <div key={event._id} className="bg-white shadow-lg rounded-lg p-4">
              <h3 className="text-xl font-semibold">{event.title}</h3>
              <p className="text-gray-600">{event.description}</p>
              <p className="text-sm text-gray-500 mt-2">
                📅 {new Date(event.date).toDateString()}
              </p>
              <button
                onClick={() => window.open(event.url, "_blank")}
                className="mt-4 w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600"
              >
                View Event
              </button>
            </div>
          ))
        ) : (
          <p className="text-center text-gray-500 col-span-3">No events available.</p>
        )}
      </div>
    </div>
  );
};

export default EventList;
