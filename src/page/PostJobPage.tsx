import React, { useEffect, useState } from 'react';
import Navbar from '../component/navbar/Navbar';
import Footer from '../component/footer/Footer';
import axios from 'axios';
import SetNavbar from '../component/navbar/SetNavbar';
import Swal from 'sweetalert2';
import { useTheme } from './../theme/theme';
import HashLoader from 'react-spinners/HashLoader';
import '../css/style.css';

function PostJobPage() {
    //theme
    const { theme } = useTheme();
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

        const salaryMinNumber = Number(salaryMinimum);
        const salaryMaxNumber = Number(salaryMaximum);

        if (!file || !title || !occupation || !employerID || !salaryMinNumber || !salaryMaxNumber === null) {
            Swal.fire({
                icon: "error",
                title: "ຜິດພາດ",
                text: "ກະລຸນາໃສ່ຂໍ້ມູນໃຫ້ຄົບຖ້ວນ.",
            });
            return;
        // } else if (salaryMinNumber > salaryMaxNumber) {
        //     Swal.fire({
        //         icon: "error",
        //         title: "ຜິດພາດ",
        //         text: "ເງິນເດືອນ ເລີ່ມຕົ້ນ ຄວນຕ່ຳກວ່າ ເງິນເດືອນສູງສຸດ.",
        //     });
        //     return;
        // } else if (salaryMaxNumber > 99999999) {
        //     Swal.fire({
        //         icon: "error",
        //         title: "ຜິດພາດ",
        //         text: "ຈຳນວນເງິນເດືອນສູງເກີນໄປ.",
        //     });
        //     return;
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
            Swal.fire({
                position: "top",
                icon: "success",
                title: "ສຳເລັດ",
                text: "ວຽກຂອງທ່ານໄດ້ ປະກາດ ຮຽບຮ້ອຍ.",
                showConfirmButton: false,
                timer: 1500
            }).then(() => {
                setTimeout(() => {
                    window.location.reload();
                }, 1500); 
            });
            
        } catch (error) {
            Swal.fire({
                position: "top",
                icon: "error",
                title: "ຜິດພາດ",
                text: "ມີບາງຢ່າງຜິດປົກກະຕິ ກາລຸນາລອງໃຫມ່ພາຍຫຼັງ.",
                showConfirmButton: false,
                timer: 1500
            });
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
        <html className='font-notoLao' data-theme={theme}>
            <div>
                <SetNavbar />
                {isLoading ?
                    (
                        <div className='flex flex-col w-full h-screen max-h-screen text-center justify-center items-center bg-base-300 bg-opacity-75 '>
                            <HashLoader color="#36d7b7" />
                            <p className='font-semibold'>ກຳລັງໂຫລດຂໍ້ມູນ....</p>
                        </div>
                    ) : (
                        <>
                            <div className='card bg-purple-900 bg-opacity-90 rounded-2xl mx-20 mt-3'>
                                <div className='py-5 self-center font-bold text-3xl text-white'>ສ້າງວຽກໃໝ່</div>
                            </div>
                            <div className='card h-fit bg-black bg-opacity-15 rounded-2xl mx-20 mt-4 shadow-xl mb-10 pb-10'>
                                <form onSubmit={handleSubmit}>
                                    <div className='p-6 mt-2 px-24 '>
                                        <div className='space-y-3'>
                                            {/* row1 */}
                                            <div className='grid grid-cols-3'>
                                                <div id="col1">
                                                    <p className='ml-2 horizontal text-sm font-semibold'>ຊື່ຫົວຂໍ້ :</p>
                                                    <input
                                                        type="text"
                                                        placeholder="ໃສ່ຫົວຂໍ້"
                                                        className="input input-bordered w-4/5"
                                                        value={title}
                                                        onChange={(e) => setTitle(e.target.value)}
                                                    />
                                                </div>

                                                <div id="col1">
                                                    <p className='ml-2 horizontal text-sm font-semibold'>ເງິນເດືອນເລີ່ມຕົ້ນ :</p>
                                                    <input
                                                        type="number"
                                                        placeholder="ຕົວຢ່າງ 1000000 ກີບ"
                                                        className="input input-bordered w-5/6 text-end"
                                                        value={salaryMinimum}
                                                        onChange={(e) => setSalaryMinimum(e.target.value)}
                                                    />
                                                    
                                                </div>
                                                <div id="col1">
                                                    <p className='ml-2 horizontal text-sm font-semibold'>ເງິນເດືອນສູງສຸດ :</p>
                                                    <input
                                                        type="number"
                                                        placeholder="ຕົວຢ່າງ 3000000 ກີບ"
                                                        className="input input-bordered w-5/6 text-end"
                                                        value={salaryMaximum}
                                                        onChange={(e) => setSalaryMaximum(e.target.value)}
                                                    />
                                                </div>
                                            </div>


                                            {/* row2 */}
                                            <div className='grid grid-cols-3'>
                                                <div id="col1">
                                                    <p className='ml-2 horizontal text-sm font-semibold'>ປະເພດຂອງອາຊີບ :</p>
                                                    <select
                                                        className="select  w-5/6"
                                                        value={selectedCategory || ''}
                                                        onChange={handleCategoryChange}
                                                    >
                                                        <option disabled value="">ເລືອກປະເພດຂອງອາຊີບ</option>
                                                        {categories.map(category => (
                                                            <option key={category.CategoryID} value={category.CategoryID}>
                                                                {category.CategoryName}
                                                            </option>
                                                        ))}
                                                    </select>

                                                </div>
                                                <div id="col2">
                                                    <p className='ml-2 horizontal text-sm font-semibold'>ອາຊີບ :</p>
                                                    <select
                                                        className="select  w-5/6"
                                                        value={occupation}
                                                        onChange={(e) => setOccupation(e.target.value)}
                                                    >
                                                       
                                                        <option disabled value="">ກາລຸນາເລືອກປະເພດອາຊີບກ່ອນ</option>
                                                        {occupations.map(occupation => (
                                                            <option key={occupation.OccupationID} value={occupation.OccupationID}>
                                                                {occupation.OccupationName}
                                                            </option>
                                                        ))}
                                                    </select>
                                                </div>
                                                <div id="col3">
                                                    <p className='ml-2 horizontal text-sm font-semibold'>ປະເພດວຽກ :</p>
                                                    <select
                                                        className="select select-bordered w-5/6"
                                                        value={workType}
                                                        onChange={(e) => setWorkType(e.target.value)}
                                                    >
                                                        <option disabled value="">ປະເພດວຽກ</option>
                                                        <option value="Full-time">Full-time</option>
                                                        <option value="Part-time">Part-time</option>
                                                    </select>
                                                </div>
                                            </div>


                                            {/* row3 */}
                                            <div className='grid grid-cols-3 space-x-12'>
                                                <div className='-mt-8 mb-8'>
                                                    <div className='card w-full h-full bg-base-100 shadow-xl mt-16 p-4 self-center'>
                                                        <textarea className="textarea textarea-bordered h-full " placeholder="ໃສ່ລາຍລະອຽດກ່ຽວກັບວຽກ..." value={description} onChange={(e) => setDescription(e.target.value)}>

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
                                                        <div className='space-y-6 p-2 pt-8'>
                                                            <p className='text-2xl'>ໃສ່ຮູບພາບກ່ຽວກັບວຽກ</p>
                                                            <input
                                                                type="file"
                                                                accept="image/jpeg, image/png"
                                                                className="file-input file-input-bordered file w-full max-w-xs"
                                                                onChange={handleFileChange}
                                                            />
                                                            <div className='w-5/6 '>
                                                                <button type="submit" onClick={handleSubmit} className="btn btn-primary btn-wide " >ປະກາດວຽກ</button>
                                                            </div>
                                                        </div>

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
        </html>

    )
}

export default PostJobPage