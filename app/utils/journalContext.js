'use client';
import React, { createContext, useState, useEffect } from 'react';
import { hostUrl } from '../lib/utilFunctions';

const JournalContext = createContext(undefined);

const JournalProvider = ({ children }) => {
    const [journals, setJournals] = useState([]);
    const [selectedJournal, setSelectedJournal] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    // useEffect(() => {
    //   const fetchJournals = async () => {
    //     setIsLoading(true);
    //     try {
    //       const response = await fetch(hostUrl + 'journals');
    //       const data = await response.json();
    //       setJournals(data.data);
    //       if (data.length > 0) {
    //         setSelectedJournal(data[0]);
    //       }
    //     } catch (error) {
    //       console.error('Failed to fetch journals:', error);
    //     } finally {
    //       setIsLoading(false);
    //     }
    //   };

    //   fetchJournals();
    // }, []);

    useEffect(() => {
      const fetchJournals = async () => {
        setIsLoading(true);
        setError(null);
        try {
          const response = await fetch(hostUrl + 'journals'); // Replace with your API endpoint
          if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
          }
          const data = await response.json();
          setJournals(data.data);
  
          // Ensure the initial selected journal is set
          if (data.data.length > 0) {
            setSelectedJournal(data.data[0]);
          }
        } catch (error) {
          console.error('Failed to fetch journals:', error);
          setError('Failed to fetch journals. Please try again later.');
        } finally {
          setIsLoading(false);
        }
      };
  
      fetchJournals();
    }, []);


    const handleJournalChange = (journal) => {
      setIsLoading(true);
      setSelectedJournal(journal);
      setTimeout(() => {
        setIsLoading(false);
      }, 500); // Simulate a brief loading state
    };
  
    return (
      <JournalContext.Provider value={{ journals, selectedJournal, handleJournalChange, isLoading }}>
        {children}
      </JournalContext.Provider>
    );
  };
  

export {
  JournalContext,
  JournalProvider,
};
  