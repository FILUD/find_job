import React, { useEffect, useState } from 'react'
import Navbar from '../component/navbar/Navbar'
import Footer from '../component/footer/Footer'
import { format } from 'path';
function PostJobPage() {

    const [title, setTitle] = useState('');
    const [occupation, setOccupation] = useState('');
    const [categories, setCategories] = useState<{ CategoryID: number; CategoryName: string }[]>([]);
    const [occupations, setOccupations] = useState<{ OccupationID: number; OccupationName: string }[]>([]);
    const [selectedCategory, setSelectedCategory] = useState<number | null>(null);
    const [jobseekerID, setJobseekerID] = useState<number | null>(null);
    const [formData, setFormData] = useState(new FormData());
    const [img, setIMG] = useState<{ type: string; data: number[] } | null>(null);
    const [imageUrl, setImageUrl] = useState<string>('');
    const [isLoading, setLoading] = useState(true);


    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true); // Set loading to true before fetching data

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

    useEffect(() => {
        const userID = localStorage.getItem('UserID');
        if (userID) {
            setLoading(true);

            fetch('http://localhost:3001/getjobseekerid', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ UserID: parseInt(userID) })
            })
                .then(response => response.json())
                .then(data => {
                    if (data.error === false && data.data.length > 0) {
                        setJobseekerID(data.data[0].JobseekerID);
                    } else {
                        console.error('Failed to retrieve JobseekerID:', data.message);
                    }
                })
                .catch(error => {
                    console.error('Error retrieving JobseekerID:', error);
                })
                .finally(() => {
                    setTimeout(() => {
                        setLoading(false);
                    }, 200);
                });
        }
    }, []);

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

    // new one import file to filedata for send to back end
    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const selectedFile = e.target.files ? e.target.files[0] : null;

        if (selectedFile) {
            const reader = new FileReader();
            reader.onloadend = () => {
                if (typeof reader.result === 'string') {
                    const base64String = reader.result.split(',')[1];
                    const fileData = {
                        type: selectedFile.type,
                        data: base64String ? base64String.split('').map(char => char.charCodeAt(0)) : []
                    };
                    // Set the file data in the desired format
                    setIMG({ type: selectedFile.type, data: fileData.data });
                    const imgUrl = URL.createObjectURL(selectedFile);

                    // Set the object URL to state
                    setImageUrl(imgUrl);
                } else {
                    console.error('Failed to read file as string');
                }
            };
            reader.readAsDataURL(selectedFile);
        } else {
            setIMG(null);
            URL.revokeObjectURL(imageUrl);
        }
    };

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        if (!img || !title || !occupation || jobseekerID === null) {
            console.error('Missing required data for CV submission');
            return;
        }
        formData.delete('JobseekerID');
        formData.delete('IMG_CV');
        formData.delete('Title');
        formData.delete('OccupationID');

        // Append form data
        formData.append('JobseekerID', jobseekerID.toString());
        formData.append('IMG_CV', JSON.stringify(img));
        formData.append('Title', title);
        formData.append('OccupationID', occupation);

        // console.log('Form Data:', formData.get('IMG_CV')); 


        try {
            const response = await fetch('http://localhost:3001/postcv', {
                method: 'POST',
                body: JSON.stringify({
                    JobseekerID: formData.get('JobseekerID'),
                    IMG_CV: formData.get('IMG_CV'),
                    Title: formData.get('Title'),
                    OccupationID: formData.get('OccupationID')
                }),
                headers: {
                    'Content-Type': 'application/json'
                }

            });

            if (response.ok) {
                // Handle success
                console.log('CV uploaded successfully');
            } else {
                // Handle server error
                console.error('Failed to upload CV');
            }
        } catch (error) {
            // Handle network error
            console.error('Network error:', error);
        }
    };


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
                                            // value={title}
                                            onChange={(e) => setTitle(e.target.value)}
                                        />
                                    </div>
                                    <div id="col1">
                                        <p className='ml-2 horizontal'>Salary maximum</p>
                                        <input
                                            type="text"
                                            placeholder="3,000,000 ກີບ"
                                            className="input input-bordered w-5/6 text-end"
                                            // value={title}
                                            onChange={(e) => setTitle(e.target.value)}
                                        />
                                    </div>
                                </div>


                                {/* row2 */}
                                <div className='grid grid-cols-3'>
                                    <div id="col1">
                                        <p className='ml-2 horizontal'>Occupation</p>
                                        <select
                                            className="select select-primary w-5/6"
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
                                    <div id="col2">
                                        <p className='ml-2 horizontal'>Work Category</p>
                                        <select
                                            className="select select-primary w-5/6"
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
                                    <div id="col3">
                                        <p className='ml-2 horizontal'>Work type</p>
                                        <select className="select select-bordered w-5/6">
                                            <option disabled selected>Work type</option>
                                            <option>Full-time</option>
                                            <option>Part-time</option>
                                        </select>
                                    </div>
                                </div>


                                {/* row3 */}
                                <div className='grid grid-cols-3 space-x-12'>
                                    <div className=''>
                                        <div className='card w-full h-full max-h-60 bg-base-100 shadow-xl mt-16 p-4 self-center'>
                                            <textarea className="textarea textarea-bordered h-full" placeholder="Work description"></textarea>
                                        </div>
                                    </div>
                                    <div className='col-span-2 '>
                                        <div className='card w-full h-full max-h-72 pl-4 bg-base-100 shadow-xl mt-8 grid grid-cols-2 '>
                                            {/* image input */}
                                            <div className='card h-60 w-5/6 border-4 bg-sky-50 rounded-2xl overflow-hidden self-center'>
                                                {img ? (
                                                    <img src={imageUrl} alt="CV" style={{ width: '100%', height: '100%', objectFit: 'cover', scale: '0.80' }} />
                                                ) : (
                                                    <img src="Image/cv-example.jpg" alt="CV" style={{ width: '100%', height: '100%', objectFit: 'cover', scale: '0.80' }} />
                                                )}
                                            </div>
                                            <div className='space-y-8 p-2 pt-8'>
                                                <p className='text-2xl'>Input Your Image</p>
                                                <input
                                                    type="file"
                                                    accept="image/jpeg, image/png"
                                                    className="file-input file-input-bordered file w-full max-w-xs"
                                                    // onChange={(e) => setFile(e.target.files ? e.target.files[0] : null)}
                                                    onChange={handleFileChange}
                                                />
                                            </div>
                                        </div>
                                        <div className=' col-span-2 w-full flex justify-end mb-5'>
                                            <button type="submit" className="btn btn-primary btn-wide m-5">Post Job</button>
                                        </div>
                                    </div>
                                </div>



                            </div>

                        </div>
                    </div>
                    <Footer />
                </>
            )}




        </div>
    )
}

export default PostJobPage