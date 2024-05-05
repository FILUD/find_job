import React, { useEffect, useState } from 'react'
import SetNavbar from '../component/navbar/SetNavbar';
import axios from 'axios';
import Footer from '../component/footer/Footer';
import { useParams } from 'react-router-dom';
import Swal from 'sweetalert2';

function EditCvPage() {

    const { cvID } = useParams<{ cvID: string }>();
    const [title, setTitle] = useState('');
    const [occupation, setOccupation] = useState('');
    const [categories, setCategories] = useState<{ CategoryID: number; CategoryName: string }[]>([]);
    const [occupations, setOccupations] = useState<{ OccupationID: number; OccupationName: string }[]>([]);
    const [selectedCategory, setSelectedCategory] = useState<number | null>(null);
    const [imageUrl, setImageUrl] = useState<string>('');
    const [file, setFile] = useState<File | null>(null);

    const [cvData, setCvData] = useState<any>(null);
    const [error, setError] = useState<string>('');
    const [isLoading, setLoading] = useState(true);

    // Fetch job data
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`http://localhost:3001/viewcv4edit/${cvID}`);
                setCvData(response.data);
                console.log("data cv 4edit :", response.data)
                setError('');
            } catch (error) {
                setError('Error fetching data cv.');
            }
        };
        fetchData();
        return () => { };
    }, [cvID]);

    // Set initial form values
    useEffect(() => {
        if (cvData && cvData.length) {
            const cv = cvData[0];
            setTitle(cv.Title);
            setOccupation(cv.SalaryStart);
            setFile(cv.IMG_CV);
            if (cv.CategoryID) {
                // setSelectedCategory(Job.CategoryID);
                handleCategoryChange({ target: { value: cv.CategoryID } } as React.ChangeEvent<HTMLSelectElement>);
                handleOccupationChange({ target: { value: cv.OccupationID } } as React.ChangeEvent<HTMLSelectElement>);
            }
        }
    }, [cvData]);

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

    const handleOccupationChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setOccupation(event.target.value);
    };

    useEffect(() => {
        fetch('http://localhost:3001/getallcategory')
            .then(response => response.json())
            .then(data => {
                if (data.error === false) {
                    setCategories(data.data);
                } else {
                    console.error('Failed to fetch categories:', data.message);
                }
            })
            .catch(error => {
                console.error('Error fetching categories:', error);
            });
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

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!file || !title || !occupation === null) {
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "Enter complete information.",
            });
            return;
        }

        const formDataToSend = new FormData();
        formDataToSend.delete('IMG_CV');
        formDataToSend.delete('Title');
        formDataToSend.delete('OccupationID');

        formDataToSend.append('IMG_CV', file);
        formDataToSend.append('Title', title);
        formDataToSend.append('OccupationID', occupation);

        console.log(formDataToSend.get('IMG_CV'));
        console.log(formDataToSend.get('Title'));
        console.log(formDataToSend.get("OccupationID"));


        try {
            await axios.post(`http://localhost:3001/editcv/${cvID}`, formDataToSend, {
                headers: { 'Content-Type': 'multipart/form-data' }
            });
            Swal.fire({
                position: "top",
                icon: "success",
                title: "Edit Cv success",
                showConfirmButton: false,
                timer: 1500
            });
            window.location.reload();
        } catch (error) {
            Swal.fire({
                position: "top",
                icon: "error",
                title: "Something when wrong Tryagin Later",
                showConfirmButton: false,
                timer: 1500
            });
            console.error('Error editing CV:', error);
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


    return (
        <div>
            <SetNavbar />

            {isLoading ? (
                <div className='w-full h-96 max-h-screen text-center place-content-center bg-black bg-opacity-75'> Loading....</div>
            ) : (
                <>
                    {error && <p>{error}</p>}
                    {cvData && (
                        <>
                            <center>
                                <div className='card bg-purple-300 bg-opacity-20 rounded-2xl mx-20 mt-3 '>
                                    <div className='py-5 self-center font-bold text-3xl'>Post CV</div>
                                </div>
                                <div className="card bg-purple-300 bg-opacity-20 rounded-2xl mx-20  mt-4">
                                    <form onSubmit={handleSubmit}>
                                        <main className='grid grid-cols-2 gap-4 justify-items-center pt-20 mt-5 pb-20'>
                                            <div className='bg-base-100 p-12 justify-self-end rounded-2xl'>
                                                <div className='box-content h-60 w-60 border-4 bg-sky-50 rounded-2xl mb-10 overflow-hidden items-center grid justify-items-center'>
                                                    {imageUrl ? (
                                                        <img src={imageUrl} alt="IMG_CV" style={{ width: '100%', height: '100%', objectFit: 'cover', scale: '0.80' }} />
                                                    ) : (
                                                        <img src={cvData[0].IMG_CV} style={{ width: '100%', height: '100%', objectFit: 'cover', scale: '0.80' }} alt="IMG_CV" />
                                                    )}
                                                </div>
                                                <input
                                                    type="file"
                                                    accept="image/jpeg, image/png"
                                                    className="file-input file-input-bordered file-input-secondary w-full max-w-xs"
                                                    // onChange={(e) => setFile(e.target.files ? e.target.files[0] : null)}
                                                    onChange={handleFileChange}
                                                />


                                            </div>

                                            <div className='justify-self-start grid grid-cols-1 bg-base-100 p-12 rounded-2xl'>
                                                <input
                                                    type="text"
                                                    placeholder="Title"
                                                    className="input input-bordered input-secondary w-80"
                                                    value={title}
                                                    onChange={(e) => setTitle(e.target.value)}
                                                />

                                                <select
                                                    className="select select-primary w-full max-w-xs"
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

                                                <select
                                                    className="select select-primary w-full max-w-xs"
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

                                                <button type="submit" className="btn btn-primary self-end">Edit My CV</button>
                                            </div>
                                        </main>
                                    </form>
                                </div>
                            </center>
                            <Footer />
                        </>
                    )}
                </>
            )}
        </div>
    )
}

export default EditCvPage