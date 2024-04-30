import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Navbar from '../component/navbar/Navbar';
import axios from 'axios';
import Footer from '../component/footer/Footer';
import SetNavbar from '../component/navbar/SetNavbar';

const EditJobPage: React.FC = () => {
    const { jobID } = useParams<{ jobID: string }>();
    const [jobData, setJobData] = useState<any>(null);
    const [error, setError] = useState<string>('');
    const [occupations, setOccupations] = useState<{ OccupationID: number; OccupationName: string }[]>([]);
    const [selectedCategory, setSelectedCategory] = useState<number | null>(null);
    const [categories, setCategories] = useState<{ CategoryID: number; CategoryName: string }[]>([]);
    const [isLoading, setLoading] = useState(true);
    const [occupation, setOccupation] = useState('');

    // State variables
    const [salaryMinimum, setSalaryMinimum] = useState('');
    const [salaryMaximum, setSalaryMaximum] = useState('');
    const [workType, setWorkType] = useState('');
    const [title, setTitle] = useState('');
    const [employerID, setEmployerID] = useState<number | null>(null);
    const [formData, setFormData] = useState(new FormData());
    const [imageUrl, setImageUrl] = useState<string>('');
    const [description, setDescription] = useState<string>('');
    const [file, setFile] = useState<File | null>(null);



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

    // Handle file change
    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const selectedFile = e.target.files ? e.target.files[0] : null;
        if (selectedFile) {
            setFile(selectedFile);
            const reader = new FileReader();
            reader.onloadend = () => {
                if (typeof reader.result === 'string') {
                    setImageUrl(reader.result as string);
                } else {
                    console.error('Failed to read file as string');
                }
            };
            reader.readAsDataURL(selectedFile);
        } else {
            setImageUrl('');
        }
    };


    return (
        <div>
            <SetNavbar />
            {isLoading ? (
                <div className='w-full h-96 max-h-screen text-center place-content-center bg-black bg-opacity-75'> Loading....</div>
            ) : (
                <>
                    {error && <p>{error}</p>}
                    {jobData && (
                        <>
                            <div className='card bg-purple-300 bg-opacity-20 rounded-2xl mx-20 mt-3 '>
                                <div className='py-5 self-center font-bold text-3xl'>Edit Job</div>
                            </div>
                            <div className='card bg-purple-300 bg-opacity-20 rounded-2xl mx-20 mt-4 '>
                                <form onSubmit={handleSubmit}>
                                    <div className='p-6 mt-2 px-24 '>
                                        <div className='space-y-3'>
                                            {/* row1 */}
                                            <div className='grid grid-cols-3'>
                                                <div id="col1">
                                                    <p className='ml-2 horizontal'>Title</p>
                                                    <input
                                                        type="text"
                                                        placeholder="Title"
                                                        className="input input-bordered w-4/5"
                                                        value={jobData.Title}
                                                        onChange={(e) => setTitle(e.target.value)}
                                                    />
                                                </div>

                                                <div id="col1">
                                                    <p className='ml-2 horizontal'>Salary minimum</p>
                                                    <input
                                                        type="text"
                                                        placeholder="1,000 ກີບ"
                                                        className="input input-bordered w-5/6 text-end"
                                                        value={jobData.SalaryStart}
                                                        onChange={(e) => setSalaryMinimum(e.target.value)}
                                                    />
                                                </div>
                                                <div id="col1">
                                                    <p className='ml-2 horizontal font'>Salary maximum</p>
                                                    <input
                                                        type="text"
                                                        placeholder="3,000,000 ກີບ"
                                                        className="input input-bordered w-5/6 text-end"
                                                        value={jobData.SalaryMax}
                                                        onChange={(e) => setSalaryMaximum(e.target.value)}
                                                    />
                                                </div>
                                            </div>


                                            {/* row2 */}
                                            <div className='grid grid-cols-3'>
                                                <div id="col1">
                                                    <p className='ml-2 horizontal text-xs'>Old Category : {jobData.CategoryName}</p>
                                                    <select
                                                        className="select  w-5/6"
                                                        value={selectedCategory || ''}
                                                        onChange={handleCategoryChange}
                                                    >
                                                        <option disabled value="">{jobData.CategoryName}</option>
                                                        {categories.map(category => (
                                                            <option key={category.CategoryID} value={category.CategoryID}>
                                                                {category.CategoryName}
                                                            </option>
                                                        ))}
                                                    </select>

                                                </div>
                                                <div id="col2">
                                                    <p className='ml-2 horizontal text-xs'>Old Occupation : {jobData.OccupationName}</p>
                                                    <select
                                                        className="select  w-5/6"
                                                        value={occupation}
                                                        onChange={(e) => setOccupation(e.target.value)}
                                                    >
                                                        <option disabled value="">{jobData.OccupationName}</option>
                                                        <option disabled value="">Please Select Category</option>
                                                        {occupations.map(occupation => (
                                                            <option key={occupation.OccupationID} value={occupation.OccupationID}>
                                                                {occupation.OccupationName}
                                                            </option>
                                                        ))}
                                                    </select>
                                                </div>
                                                <div id="col3">
                                                    <p className='ml-2 horizontal'>Work type</p>
                                                    <select
                                                        className="select select-bordered w-5/6"
                                                        value={workType}
                                                        onChange={(e) => setWorkType(e.target.value)}
                                                    >
                                                        <option disabled value="">{jobData.WorkType}</option>
                                                        <option value="Full-time">Full-time</option>
                                                        <option value="Part-time">Part-time</option>
                                                    </select>
                                                </div>
                                            </div>


                                            {/* row3 */}
                                            <div className='grid grid-cols-3 space-x-12'>
                                                <div className=''>
                                                    <div className='card w-full h-full max-h-60 bg-base-100 shadow-xl mt-16 p-4 self-center'>
                                                        <textarea
                                                            className="textarea textarea-bordered h-full"
                                                            placeholder="Work description"
                                                            value={jobData.Description}
                                                            onChange={(e) => setDescription(e.target.value)}
                                                        />

                                                    </div>
                                                </div>
                                                <div className='col-span-2 '>
                                                    <div className='card w-full h-full max-h-72 pl-4 bg-base-100 shadow-xl mt-8 grid grid-cols-2 '>
                                                        {/* image input */}
                                                        <div className='card h-60 w-5/6 border-4 bg-sky-50 rounded-2xl overflow-hidden self-center'>
                                                            {imageUrl ? (
                                                                <img src={imageUrl} alt="PostJob" style={{ width: '100%', height: '100%', objectFit: 'cover', scale: '0.80' }} />
                                                            ) : (
                                                                <img src={jobData.Post_IMG} alt="PostJob" style={{ width: '100%', height: '100%', objectFit: 'cover', scale: '0.80' }} />
                                                            )}
                                                        </div>
                                                        <div className='space-y-8 p-2 pt-8'>
                                                            <p className='text-2xl'>Input Your Image</p>
                                                            <input
                                                                type="file"
                                                                accept="image/jpeg, image/png"
                                                                className="file-input file-input-bordered file w-full max-w-xs"
                                                                onChange={handleFileChange}
                                                            />
                                                        </div>
                                                    </div>
                                                    <div className=' col-span-2 w-full flex justify-end mb-5'>
                                                        <button type="submit" className="btn btn-primary btn-wide m-5" >Edit Job</button>
                                                    </div>
                                                </div>
                                            </div>



                                        </div>

                                    </div>
                                </form>
                            </div>
                            <Footer />
                        </>
                    )}
                </>
            )}
        </div>
    );
};

export default EditJobPage;
