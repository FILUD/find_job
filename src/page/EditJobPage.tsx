import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const EditJobPage: React.FC = () => {
    const { jobID } = useParams<{ jobID: string }>();
    const [jobData, setJobData] = useState<any>(null);
    const [error, setError] = useState<string>('');
    const [occupations, setOccupations] = useState<{ OccupationID: number; OccupationName: string }[]>([]);
    const [selectedCategory, setSelectedCategory] = useState<number | null>(null);
    const [categories, setCategories] = useState<{ CategoryID: number; CategoryName: string }[]>([]);
    const [isLoading, setLoading] = useState(true);
    const [occupation, setOccupation] = useState('');


    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`http://localhost:3001/viewjobpostings/${jobID}`);
                setJobData(response.data);
                setError('');
            } catch (error) {
                setError('Error fetching data. Please try again.');
            }
        };

        fetchData();

        // Cleanup function to cancel fetch if component unmounts or jobID changes
        return () => { };
    }, [jobID]);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>, field: string) => {
        setJobData({
            ...jobData,
            [field]: e.target.value,
        });
    };

    const handleSubmit = async () => {
        try {
            await axios.put(`http://localhost:3001/editJob/${jobID}`, jobData);
            // Optionally, you can redirect the user to another page after successful submission
        } catch (error) {
            setError('Error updating data. Please try again.');
        }
    };

    // Handle category change
    const handleCategoryChange = async (event: React.ChangeEvent<HTMLSelectElement>) => {
        const selectedCategoryId = parseInt(event.target.value);
        setSelectedCategory(selectedCategoryId);
        try {
            const response = await fetch('http://localhost:3001/getoccupationbycategory', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ CategoryID: selectedCategoryId })
            });

            const data = await response.json();
            if (data.error === false) {
                setOccupations(data.data);
            } else {
                console.error('Failed to fetch occupations:', data.message);
            }
        } catch (error) {
            console.error('Error fetching occupations:', error);
        }
    };

    // Fetch categories data
    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);
                const categoriesResponse = await fetch('http://localhost:3001/getallcategory');
                const categoriesData = await categoriesResponse.json();
                if (categoriesData.error === false) {
                    setCategories(categoriesData.data);
                } else {
                    console.error('Failed to fetch categories:', categoriesData.message);
                }
            } catch (error) {
                console.error('Error fetching categories:', error);
            } finally {
                setTimeout(() => {
                    setLoading(false);
                }, 3000);
            }
        };

        fetchData();
    }, []);

    // Inside your useEffect for fetching job data
    const fetchData = async () => {
        try {
            const response = await axios.get(`http://localhost:3001/viewjobpostings/${jobID}`);
            const data = response.data;

            // Fetch occupations and categories only if job data is fetched successfully
            if (!data.error) {
                setJobData(data);
                setSelectedCategory(data.CategoryID);

                // Fetch occupation name by ID
                const occupationResponse = await fetch(`http://localhost:3001/getoccupationbyid/${data.OccupationID}`);
                const occupationData = await occupationResponse.json();
                if (!occupationData.error) {
                    setOccupation(occupationData.data.OccupationName);
                } else {
                    console.error('Failed to fetch occupation:', occupationData.message);
                }

                // Fetch occupations by category
                const occupationsResponse = await fetch('http://localhost:3001/getoccupationbycategory', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ CategoryID: data.CategoryID })
                });
                const occupationsData = await occupationsResponse.json();
                if (occupationsData.error === false) {
                    setOccupations(occupationsData.data);
                } else {
                    console.error('Failed to fetch occupations:', occupationsData.message);
                }
            } else {
                setError('Error fetching job data. Please try again.');
            }
        } catch (error) {
            setError('Error fetching job data. Please try again.');
        }
    };




    return (
        <div>
            {error && <p>{error}</p>}
            {jobData && (
                <div className='grid grid-cols-1'>
                    <input type="text" value={jobData.CompanyName} onChange={(e) => handleInputChange(e, 'CompanyName')} />
                    <input type="text" value={jobData.Title} onChange={(e) => handleInputChange(e, 'Title')} />
                    <input type="text" value={jobData.Description} onChange={(e) => handleInputChange(e, 'Description')} />
                    <input type="text" value={jobData.SalaryStart} onChange={(e) => handleInputChange(e, 'SalaryStart')} />
                    <input type="text" value={jobData.SalaryMax} onChange={(e) => handleInputChange(e, 'SalaryMax')} />
                    <input type="text" value={jobData.OccupationID} onChange={(e) => handleInputChange(e, 'OccupationName')} />
                    <input type="text" value={jobData.CategoryName} onChange={(e) => handleInputChange(e, 'CategoryName')} />


                    <div id="col1">
                        <p className='ml-2 horizontal'>Work Category</p>
                        <select
                            className="select  w-5/6"
                            value={selectedCategory || ''}
                            onChange={handleCategoryChange}
                        >
                            <option disabled value="">Work Category</option>
                            {categories.map(category => (
                                <option key={category.CategoryID} value={category.CategoryID}>
                                    {category.CategoryName}
                                </option>
                            ))}
                        </select>

                    </div>

                    <div id="col2">
                        <p className='ml-2 horizontal'>Occupation</p>
                        <select
                            className="select w-5/6"
                            value={occupation}
                            onChange={(e) => setOccupation(e.target.value)}
                        >
                            <option disabled value="">Occupation</option>
                            {occupations.map(occupation => (
                                <option key={occupation.OccupationID} value={occupation.OccupationName}>
                                    {occupation.OccupationName}
                                </option>
                            ))}
                        </select>
                    </div>



                    <input type="text" value={new Date(jobData.PostDate).toLocaleDateString()} onChange={(e) => handleInputChange(e, 'PostDate')} />
                    <input type="text" value={jobData.WorkType} onChange={(e) => handleInputChange(e, 'WorkType')} />
                    <button className='btn' onClick={handleSubmit}>Submit</button>
                    <img id="fullScreenImage" className='bg-cover rounded-2xl hover:scale-110 transition duration-300' src={jobData.Post_IMG} alt="IMG_CV" />
                </div>
            )}
        </div>
    );
};

export default EditJobPage;
