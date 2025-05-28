import React, { useEffect, useState } from "react";
import SessionItem from "./SessionItem";
import PropTypes from "prop-types";

export default function SessionsList({ refreshCount, onSessionAdded, serverBaseUrl }) {
  const [sessions, setSessions] = useState([]);

  const fetchLists = () => {
    const token = localStorage.getItem("token");

    fetch(`${serverBaseUrl}get-sessions`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => {
        if (!res.ok)
          throw new Error("Erreur lors de la récupération des séances");
        return res.json();
      })
      .then((data) => {
        setSessions(data.sessions);
      })
      .catch((err) => {
        console.error("Erreur fetch :", err);
      });
  };

  useEffect(() => {
    fetchLists();
  }, [refreshCount]);

  return (
    <>
      {sessions.map((session) => (
        <SessionItem
          key={session.id}
          session={session}
          onSessionAdded={onSessionAdded}
          serverBaseUrl={serverBaseUrl}
        />
      ))}
    </>
  );
}

SessionsList.propTypes = {
  refreshCount: PropTypes.number.isRequired,
  onSessionAdded: PropTypes.func.isRequired,
  serverBaseUrl: PropTypes.string.isRequired,
};
