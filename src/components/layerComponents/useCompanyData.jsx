import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux'; // Import useDispatch from redux
import { signInSuccess } from '../../store/authSlice'; // Import your action creator

const useCompanyData = (companyId) => {
  const [companyData, setCompanyData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch(); // Initialize the dispatch function

  useEffect(() => {
    if (!companyId) return;

    const fetchCompanyData = async () => {
      setLoading(true);
      try {
        const response = await fetch(`https://fastagtracking.com/customulip/company/${companyId}`);
        if (!response.ok) {
          throw new Error(`Error fetching company data: ${response.status}`);
        }
        const data = await response.json();
        setCompanyData(data);

        // Dispatch the action to update the store with the fetched data
        dispatch(signInSuccess(data));
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchCompanyData();
  }, [companyId, dispatch]);

  return { companyData, error, loading };
};

export default useCompanyData;
