import React, { useEffect, useState } from 'react'
import Navbar from '../component/navbar/Navbar'
import Footer from '../component/footer/Footer'
import axios from 'axios';
import SetNavbar from '../component/navbar/SetNavbar';
import Swal from 'sweetalert2';
import { useTheme } from '../theme/theme';


function PostCvPage() {
    const { theme } = useTheme();
    const [title, setTitle] = useState('');

    const [occupation, setOccupation] = useState('');
    const [categories, setCategories] = useState<{ CategoryID: number; CategoryName: string }[]>([]);
    const [occupations, setOccupations] = useState<{ OccupationID: number; OccupationName: string }[]>([]);
    const [selectedCategory, setSelectedCategory] = useState<number | null>(null);

    const [jobseekerID, setJobseekerID] = useState<number | null>(null);
    const [imageUrl, setImageUrl] = useState<string>('');

    const [file, setFile] = useState<File | null>(null);
    // const [formData, setFormData] = useState({
    //     JobseekerID: '',
    //     Title: '',
    //     OccupationID: ''
    // });

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

    useEffect(() => {
        const userID = localStorage.getItem('UserID');
        if (userID) {
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


    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const selectedFile = e.target.files ? e.target.files[0] : null;
        if (selectedFile) {
            setFile(selectedFile);
            const reader = new FileReader();
            reader.onloadend = () => {
                if (typeof reader.result === 'string') {
                    // Set the image URL directly from the reader result
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




    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!file || !title || !occupation || jobseekerID === null) {
            console.error('Missing required data for CV submission');
            return;
        }
        const formDataToSend = new FormData();
        formDataToSend.delete('image');
        formDataToSend.delete('JobseekerID');
        formDataToSend.delete('Title');
        formDataToSend.delete('OccupationID');

        formDataToSend.append('image', file as File);
        formDataToSend.append('JobseekerID', jobseekerID.toString());
        formDataToSend.append('Title', title);
        formDataToSend.append('OccupationID', occupation);

        console.log(formDataToSend.get('JobseekerID'));
        console.log(formDataToSend.get('OccupationID'));
        console.log(formDataToSend.get('Title'));
        console.log(formDataToSend.get("image"))


        try {
            await axios.post('http://localhost:3001/uploadsss', formDataToSend, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            Swal.fire({
                position: "top",
                icon: "success",
                title: "ປະກາດ Cv ສຳເລັດແລ້ວ",
                showConfirmButton: false,
                timer: 1500
            });
            window.location.reload();
        } catch (error) {
            Swal.fire({
                position: "top",
                icon: "error",
                title: "ປະກາດຜິດພາດ ກະລຸນາລອງໃຫມ່ພາຍຫລັງ",
                showConfirmButton: false,
                timer: 1500
            });
            console.error('Error uploading image:', error);
        }
    };


    return (
        <html className='font-notoLao' data-theme={theme}>
            <div>
                <SetNavbar />
                <center>
                    <div className='card bg-purple-900 bg-opacity-90 rounded-2xl mx-20 mt-3'>
                        <div className='py-5 self-center font-bold text-3xl text-white'>ປະກາດ CV</div>
                    </div>
                    <div className="card h-fit bg-black bg-opacity-15 rounded-2xl mx-20 mt-1 shadow-xl mb-10 pb-10">
                        <form onSubmit={handleSubmit}>
                            <main className='grid grid-cols-2 gap-4 justify-items-center py-3 mt-5'>
                                <div className='bg-base-100 p-12 justify-self-end rounded-2xl'>
                                    <div className='box-content h-60 w-60 border-2  bg-black bg-opacity-15 rounded-2xl mb-10 overflow-hidden items-center grid justify-items-center'>
                                        {imageUrl ? (
                                            <img src={imageUrl} alt="CV" style={{ width: '100%', height: '100%', objectFit: 'cover', scale: '0.8' }} />
                                        ) : (
                                            <img className='w-20' src="Icon/gallery.png" alt="CV" />
                                        )}
                                    </div>
                                    <input
                                        type="file"
                                        // accept="image/jpeg, image/png"
                                        className="file-input file-input-bordered file-input-primary w-full max-w-xs"
                                        // onChange={(e) => setFile(e.target.files ? e.target.files[0] : null)}
                                        onChange={handleFileChange}
                                    />


                                </div>

                                <div className='justify-self-start grid grid-cols-1 bg-base-100 p-12 rounded-2xl'>
                                    <input
                                        type="text"
                                        placeholder="ຫົວຂໍ້ cv"
                                        className="input input-bordered input-primary w-80"
                                        value={title}
                                        onChange={(e) => setTitle(e.target.value)}
                                    />

                                    <select
                                        className="select select-primary w-full max-w-xs"
                                        value={selectedCategory || ''}
                                        onChange={handleCategoryChange}
                                    >
                                        <option disabled value="">ໝວດຫມູ່ອາຊີບ</option>
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
                                        <option disabled value="">ອາຊີບ</option>
                                        {occupations.map(occupation => (
                                            <option key={occupation.OccupationID} value={occupation.OccupationID}>
                                                {occupation.OccupationName}
                                            </option>
                                        ))}
                                    </select>

                                    <button type="submit" className="btn btn-primary self-end">ປະກາດ CV</button>
                                </div>
                            </main>
                        </form>
                    </div>
                </center>
                <Footer />
            </div>
        </html>

    )
}

export default PostCvPage