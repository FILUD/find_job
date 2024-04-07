import React, { useEffect, useState } from 'react';
import Navbar from '../component/navbar/Navbar';
import Footer from '../component/footer/Footer';
import axios from 'axios';

function PostJobPage() {
    // State variables
    const [salaryMinimum, setSalaryMinimum] = useState('');
    const [salaryMaximum, setSalaryMaximum] = useState('');
    const [workType, setWorkType] = useState('');
    const [title, setTitle] = useState('');
    const [occupation, setOccupation] = useState('');
    const [categories, setCategories] = useState<{ CategoryID: number; CategoryName: string }[]>([]);
    const [occupations, setOccupations] = useState<{ OccupationID: number; OccupationName: string }[]>([]);
    const [selectedCategory, setSelectedCategory] = useState<number | null>(null);
    const [employerID, setEmployerID] = useState<number | null>(null);
    const [formData, setFormData] = useState(new FormData());
    const [imageUrl, setImageUrl] = useState<string>('');
    const [description, setDescription] = useState<string>('');
    const [file, setFile] = useState<File | null>(null);
    const [isLoading, setLoading] = useState(true);

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

    // Fetch employer ID
    useEffect(() => {
        const userID = localStorage.getItem('UserID');
        if (userID) {
            setLoading(true);
            fetch('http://localhost:3001/getEmployerID', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ UserID: parseInt(userID) })
            })
                .then(response => response.json())
                .then(data => {
                    if (data.error === false && data.data.length > 0) {
                        setEmployerID(data.data[0].EmployerID);
                    } else {
                        console.error('Failed to retrieve EmployerID:', data.message);
                    }
                })
                .catch(error => {
                    console.error('Error retrieving EmployerID:', error);
                })
                .finally(() => {
                    setTimeout(() => {
                        setLoading(false);
                    }, 200);
                });
        }
    }, []);

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

    // Handle form submission
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!file || !title || !occupation || !employerID || !salaryMaximum || !salaryMinimum === null) {
            console.error('Missing required data for job submission');
            return;
        }

        // Remove existing form data
        formData.delete('EmployerID');
        formData.delete('Post_IMG');
        formData.delete('Title');
        formData.delete('Descrition');
        formData.delete('SalaryStart');
        formData.delete('SalaryMax');
        formData.delete('OccupationID');
        formData.delete('WorkType');

        // Append form data
        formData.append('EmployerID', employerID.toString());
        formData.append('Post_IMG', file as File);
        formData.append('Title', title);
        formData.append('Description', description);
        formData.append('SalaryStart', salaryMinimum);
        formData.append('SalaryMax', salaryMaximum);
        formData.append('OccupationID', occupation);
        formData.append('WorkType', workType);

        try {
            await axios.post('http://localhost:3001/uploadJob', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            alert('Job posted successfully');
        } catch (error) {
            console.error('Error posting job:', error);
        }
    };


    const clearInput = () => {
        setEmployerID(null)
        formData.append('Post_IMG', file as File);
        formData.append('Title', title);
        formData.append('Description', description);
        formData.append('SalaryStart', salaryMinimum);
        formData.append('SalaryMax', salaryMaximum);
        formData.append('OccupationID', occupation);
        formData.append('WorkType', workType);
    }

    return (
        <div>
            {/* <div className='bg-base-200 w-full h-20 sticky top-0'> */}
            <Navbar />
            {/* </div> */}

            {isLoading ? (<div className='w-full h-96 max-h-screen text-center place-content-center bg-black bg-opacity-75'> Loading....</div>) : (
                <>
                    <div className='card bg-purple-300 bg-opacity-20 rounded-2xl mx-20 mt-3 '>
                        <div className='py-5 self-center font-bold text-3xl'>Post Job</div>
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
                                                value={title}
                                                onChange={(e) => setTitle(e.target.value)}
                                            />
                                        </div>

                                        <div id="col1">
                                            <p className='ml-2 horizontal'>Salary minimum</p>
                                            <input
                                                type="text"
                                                placeholder="1,000 ກີບ"
                                                className="input input-bordered w-5/6 text-end"
                                                value={salaryMinimum}
                                                onChange={(e) => setSalaryMinimum(e.target.value)}
                                            />
                                        </div>
                                        <div id="col1">
                                            <p className='ml-2 horizontal'>Salary maximum</p>
                                            <input
                                                type="text"
                                                placeholder="3,000,000 ກີບ"
                                                className="input input-bordered w-5/6 text-end"
                                                value={salaryMaximum}
                                                onChange={(e) => setSalaryMaximum(e.target.value)}
                                            />
                                        </div>
                                    </div>


                                    {/* row2 */}
                                    <div className='grid grid-cols-3'>
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
                                                className="select  w-5/6"
                                                value={occupation}
                                                onChange={(e) => setOccupation(e.target.value)}
                                            >
                                                <option disabled value="">Occupation</option>
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
                                                <option disabled value="">Work type</option>
                                                <option value="Full-time">Full-time</option>
                                                <option value="Part-time">Part-time</option>
                                            </select>
                                        </div>
                                    </div>


                                    {/* row3 */}
                                    <div className='grid grid-cols-3 space-x-12'>
                                        <div className=''>
                                            <div className='card w-full h-full max-h-60 bg-base-100 shadow-xl mt-16 p-4 self-center'>
                                                <textarea className="textarea textarea-bordered h-full" placeholder="Work description" value={description} onChange={(e) => setDescription(e.target.value)}>

                                                </textarea>
                                            </div>
                                        </div>
                                        <div className='col-span-2 '>
                                            <div className='card w-full h-full max-h-72 pl-4 bg-base-100 shadow-xl mt-8 grid grid-cols-2 '>
                                                {/* image input */}
                                                <div className='card h-60 w-5/6 border-4 bg-sky-50 rounded-2xl overflow-hidden self-center'>
                                                    {imageUrl ? (
                                                        <img src={imageUrl} alt="PostJob" style={{ width: '100%', height: '100%', objectFit: 'cover', scale: '0.80' }} />
                                                    ) : (
                                                        <img src="Image/cv-example.jpg" alt="PostJob" style={{ width: '100%', height: '100%', objectFit: 'cover', scale: '0.80' }} />
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
                                                <button type="submit" className="btn btn-primary btn-wide m-5" >Post Job</button>
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

        </div>
    )
}

export default PostJobPage