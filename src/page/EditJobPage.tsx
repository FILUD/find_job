import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import SetNavbar from '../component/navbar/SetNavbar';
import Footer from '../component/footer/Footer';
import CurrencyInput from 'react-currency-input-field';
import Swal from 'sweetalert2';
import { useTheme } from './../theme/theme';
import HashLoader from 'react-spinners/HashLoader';

const EditJobPage: React.FC = () => {
    const { jobID } = useParams<{ jobID: string }>();
    const [jobData, setJobData] = useState<any>(null);
    const [error, setError] = useState<string>('');
    const { theme } = useTheme();

    const [salaryMinimum, setSalaryMinimum] = useState('');
    const [salaryMaximum, setSalaryMaximum] = useState('');
    const [workType, setWorkType] = useState('');
    const [title, setTitle] = useState('');
    const [occupation, setOccupation] = useState('');
    const [categories, setCategories] = useState<{ CategoryID: number; CategoryName: string }[]>([]);
    const [occupations, setOccupations] = useState<{ OccupationID: number; OccupationName: string }[]>([]);
    const [selectedCategory, setSelectedCategory] = useState<number | null>(null);
    const [formData, setFormData] = useState(new FormData());
    const [imageUrl, setImageUrl] = useState<string>('');
    const [description, setDescription] = useState<string>('');
    const [file, setFile] = useState<File | null>(null);
    const [isLoading, setLoading] = useState(true);

    // Fetch job data
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

    // Set initial form values
    useEffect(() => {
        if (jobData && jobData.length) {
            const Job = jobData[0];
            setTitle(Job.Title);
            setSalaryMinimum(Job.SalaryStart);
            setSalaryMaximum(Job.SalaryMax);
            setDescription(Job.Description);
            setWorkType(Job.WorkType);
            setFile(Job.Post_IMG);
            if (Job.CategoryID) {
                // setSelectedCategory(Job.CategoryID);
                handleCategoryChange({ target: { value: Job.CategoryID } } as React.ChangeEvent<HTMLSelectElement>);
                handleOccupationChange({ target: { value: Job.OccupationID } } as React.ChangeEvent<HTMLSelectElement>);
            }
        }
    }, [jobData]);

    // Handle form submission
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!file || !title || !occupation || !salaryMaximum || !salaryMinimum || !workType === null) {
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "Enter complete information.",
            });
            return;
        } else if (salaryMinimum > salaryMaximum) {
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "The starting salary should be less than the maximum salary.",
            });
            return;
        } else if (salaryMaximum >= "100000000") {
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "The salary is over Maxinum",
            });
            return;
        }

        const formDataToSend = new FormData();
        formDataToSend.delete('Post_IMG');
        formDataToSend.delete('Title');
        formDataToSend.delete('Description');
        formDataToSend.delete('SalaryStart');
        formDataToSend.delete('SalaryMax');
        formDataToSend.delete('OccupationID');
        formDataToSend.delete('WorkType');

        formDataToSend.append('Post_IMG', file);
        formDataToSend.append('Title', title);
        formDataToSend.append('Description', description);
        formDataToSend.append('SalaryStart', salaryMinimum);
        formDataToSend.append('SalaryMax', salaryMaximum);
        formDataToSend.append('OccupationID', occupation);
        formDataToSend.append('WorkType', workType);


        console.log(formDataToSend.get('Post_IMG'));
        console.log(formDataToSend.get('Title'));
        console.log(formDataToSend.get('Description'));
        console.log(formDataToSend.get("SalaryStart"));
        console.log(formDataToSend.get("SalaryMax"));
        console.log(formDataToSend.get("OccupationID"));
        console.log(formDataToSend.get("WorkType"));


        try {
            await axios.post(`http://localhost:3001/editjobposting/${jobID}`, formDataToSend, {
                headers: { 'Content-Type': 'multipart/form-data' }
            });
            Swal.fire({
                position: "top",
                icon: "success",
                title: "Edit Post success",
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
            console.error('Error editing job:', error);
        }
    };

    // Handle category change
    const handleCategoryChange = async (event: React.ChangeEvent<HTMLSelectElement>) => {
        const selectedCategoryId = parseInt(event.target.value);
        setSelectedCategory(selectedCategoryId);
        try {
            const response = await fetch('http://localhost:3001/getoccupationbycategory', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
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
        if (selectedCategoryId !== jobData[0].CategoryID) {
            setOccupation('');
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

    // Handle occupation change
    const handleOccupationChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setOccupation(event.target.value);
    };

    // Fetch occupations data initially if occupation is already selected
    useEffect(() => {
        if (jobData && jobData.length && jobData[0].OccupationID) {
            setOccupation(jobData[0].OccupationID.toString());
        }
    }, [jobData]);

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
        <html className='font-notoLao' data-theme={theme}>
            <div>
                <SetNavbar />
                {isLoading ? (
                    <div className='flex flex-col w-full h-screen max-h-screen text-center justify-center items-center bg-base-300 bg-opacity-75 '>
                        <HashLoader color="#36d7b7" />
                        <p className='font-semibold'>Loading....</p>
                    </div>
                ) : (
                    <>
                        {error && <p>{error}</p>}
                        {jobData && (
                            <>
                                <div className='card bg-purple-900 bg-opacity-90 rounded-2xl mx-20 mt-3 '>
                                    <div className='py-5 self-center font-bold text-3xl text-white'>ແກ້ໄຂວຽກ</div>
                                </div>
                                <div className='card h-fit bg-black bg-opacity-15 rounded-2xl mx-20 mt-4 shadow-xl mb-10 pb-10 '>
                                    <form onSubmit={handleSubmit}>
                                        <div className='p-6 mt-2 px-24 '>
                                            <div className='space-y-3'>
                                                <div className='grid grid-cols-3'>
                                                    <div id="col1">
                                                        <p className='ml-2 horizontal text-sm font-semibold'>ຫົວຂໍ້ວຽກ :</p>
                                                        <input
                                                            type="text"
                                                            placeholder={jobData[0].Title}
                                                            className="input input-bordered w-4/5"
                                                            value={title}
                                                            onChange={(e) => setTitle(e.target.value)}
                                                        />
                                                    </div>
                                                    <div id="col1">
                                                        <p className='ml-2 horizontal text-sm font-semibold'>ເງິນເດືອນເລີ່ມຕົ້ນ :</p>
                                                        <CurrencyInput
                                                            placeholder={jobData[0].SalaryStart || ''}
                                                            className="input input-bordered w-5/6 text-end"
                                                            value={salaryMinimum}
                                                            onValueChange={(value) => {
                                                                if (typeof value === 'string') {
                                                                    setSalaryMinimum(value);
                                                                }
                                                            }}
                                                            prefix=""
                                                            // suffix=' ₭ip'
                                                            // suffix=' ກີບ'
                                                            decimalSeparator=","
                                                            groupSeparator=" "

                                                        />
                                                    </div>

                                                    <div id="col1">
                                                        <p className='ml-2 horizontal text-sm font-semibold'>ເງິນເດືອນສູງສຸດ :</p>

                                                        <CurrencyInput
                                                            placeholder={jobData[0].SalaryMax || ''}
                                                            className="input input-bordered w-5/6 text-end"
                                                            value={salaryMaximum}
                                                            onValueChange={(value) => {
                                                                if (typeof value === 'string') {
                                                                    setSalaryMaximum(value);
                                                                }
                                                            }}
                                                            prefix=""
                                                            // suffix=' ₭ip'
                                                            // suffix='ກີບ'
                                                            decimalSeparator=","
                                                            groupSeparator=" "
                                                        />
                                                    </div>
                                                </div>
                                                <div className='grid grid-cols-3'>
                                                    <div id="col1">
                                                        <p className='ml-2 horizontal text-sm font-semibold'>ປະເພດວຽກເກົ່າ : {jobData[0].CategoryName}</p>
                                                        <select
                                                            className="select  w-5/6 select-bordered"
                                                            value={selectedCategory || ''}
                                                            onChange={handleCategoryChange}
                                                        >
                                                            <option disabled value="">ເລືອກໝວກໝູ່ອາຊີບ</option>
                                                            {categories.map(category => (
                                                                <option key={category.CategoryID} value={category.CategoryID}>
                                                                    {category.CategoryName}
                                                                </option>
                                                            ))}
                                                        </select>
                                                    </div>
                                                    <div id="col2">
                                                        <p className='ml-2 horizontal text-sm font-semibold '>ອາຊີບ : {jobData[0].OccupationName}</p>
                                                        <select
                                                            className="select  w-5/6 select-bordered"
                                                            value={occupation}
                                                            onChange={handleOccupationChange}
                                                        >
                                                            <option disabled value="">ເລືອກໝວກໝູ່ອາຊີບກ່ອນ</option>
                                                            {occupations.map(occupation => (
                                                                <option key={occupation.OccupationID} value={occupation.OccupationID}>
                                                                    {occupation.OccupationName}
                                                                </option>
                                                            ))}
                                                        </select>
                                                    </div>
                                                    <div id="col3">
                                                        <p className='ml-2 horizontal text-sm font-semibold'>ປະເພດຂອງວຽກ :</p>
                                                        <select
                                                            className="select select-bordered w-5/6"
                                                            value={workType}
                                                            onChange={(e) => setWorkType(e.target.value)}
                                                        >
                                                            <option value="Full-time">Full-time</option>
                                                            <option value="Part-time">Part-time</option>
                                                        </select>
                                                    </div>
                                                </div>
                                                <div className='grid grid-cols-3 space-x-12'>
                                                    <div className='-mt-8 mb-8'>
                                                        <div className='card w-full h-full max-h-60 bg-base-100 shadow-xl mt-16 p-4 self-center'>
                                                            <textarea
                                                                className="textarea textarea-bordered h-full"
                                                                placeholder={jobData[0].Description}
                                                                value={description}
                                                                onChange={(e) => setDescription(e.target.value)}
                                                            />
                                                        </div>
                                                    </div>
                                                    <div className='col-span-2 '>
                                                        <div className='card w-full h-full max-h-72 pl-4 bg-base-100 shadow-xl mt-8 grid grid-cols-2 '>
                                                            <div className='card h-60 w-5/6 border-4 bg-sky-50 rounded-2xl overflow-hidden self-center'>
                                                                {imageUrl ? (
                                                                    <img src={imageUrl} alt="PostJob" style={{ width: '100%', height: '100%', objectFit: 'cover', scale: '0.80' }} />
                                                                ) : (
                                                                    <img src={jobData[0].Post_IMG} alt="PostJob" style={{ width: '100%', height: '100%', objectFit: 'cover', scale: '0.80' }} />
                                                                )}
                                                            </div>
                                                            <div className='space-y-6 p-2 pt-8'>
                                                                <p className='text-2xl font-semibold'>ໃສ່ຮຼບພາບປະກອບວຽກ</p>
                                                                <input
                                                                    type="file"
                                                                    accept="image/jpeg, image/png"
                                                                    className="file-input file-input-bordered file w-4/6 max-w-xs"
                                                                    onChange={handleFileChange}
                                                                />
                                                                <div className='w-5/6 '>
                                                                    <button type="submit" onClick={handleSubmit} className="btn btn-primary w-4/5" >ແກ້ໄຂວຽກ</button>
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
                    </>
                )}
            </div>
        </html>

    );
};

export default EditJobPage;
