import React, { useEffect, useState } from 'react'
import Navbar from '../component/navbar/Navbar'
import Footer from '../component/footer/Footer'
function PostCvPage() {

    const [title, setTitle] = useState('');
    const [occupation, setOccupation] = useState('');
    const [file, setFile] = useState<File | null>(null);
    const [categories, setCategories] = useState<{ CategoryID: number; CategoryName: string }[]>([]);
    const [occupations, setOccupations] = useState<{ OccupationID: number; OccupationName: string }[]>([]);
    const [selectedCategory, setSelectedCategory] = useState<number | null>(null);

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

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        if (!file || !title || !occupation) {
            // Handle validation error
            return;
        }

        const formData = new FormData();
        formData.append('IMG_CV', file);
        formData.append('Title', title);
        formData.append('OccupationID', occupation);

        try {
            const response = await fetch('/postcv', {
                method: 'POST',
                body: formData
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
            <Navbar />
            <center>
                <div className="container mx-auto bg-purple-300 bg-opacity-20 rounded-2xl">
                    <form onSubmit={handleSubmit}>
                        <main className='grid grid-cols-2 gap-4 justify-items-center pt-20 mt-5 pb-20'>
                            <div className='bg-cyan-950 p-12 justify-self-end rounded-2xl'>
                                <div className='box-content h-60 w-60 border-4 bg-sky-50 rounded-2xl mb-10 overflow-hidden'>
                                    <img src="Image/cv-example.jpg" alt="CV" />
                                </div>
                                <input
                                    type="file"
                                    accept="image/jpeg, image/png"
                                    className="file-input file-input-bordered file-input-secondary w-full max-w-xs"
                                    onChange={(e) => setFile(e.target.files ? e.target.files[0] : null)}
                                />
                            </div>

                            <div className='justify-self-start grid grid-cols-1 bg-cyan-950 p-12 rounded-2xl'>
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

                                <button type="submit" className="btn btn-primary self-end">Post My CV</button>
                            </div>
                        </main>
                    </form>
                </div>
            </center>
            <Footer />
        </div>
    )
}

export default PostCvPage