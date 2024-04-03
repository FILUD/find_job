import axios from 'axios';
import { useEffect, useState } from 'react';

interface CvData {
    cvId: number;
    JobseekerID: string;
    Title: string;
    OccupationID: string;
    imgURL: string;
  }

function TestPage() {


    //post

    const [file, setFile] = useState<File | null>(null);
    const [formData, setFormData] = useState({
      JobseekerID: '',
      Title: '',
      OccupationID: ''
    });
  
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      setFormData({ ...formData, [e.target.name]: e.target.value });
    };
  
    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      if (e.target.files) {
        setFile(e.target.files[0]);
      }
    };
    
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
    
        const formDataToSend = new FormData();
        formDataToSend.append('image', file as File);
        formDataToSend.append('JobseekerID', formData.JobseekerID);
        formDataToSend.append('Title', formData.Title);
        formDataToSend.append('OccupationID', formData.OccupationID);
    
        try {
          await axios.post('http://localhost:3001/uploadsss', formDataToSend, {
            headers: {
              'Content-Type': 'multipart/form-data'
            }
          });
          alert('Image uploaded successfully');
        } catch (error) {
          console.error('Error uploading image:', error);
        }
      };


      //display

      const [cvData, setCvData] = useState<CvData[]>([]);

      useEffect(() => {
        const fetchData = async () => {
          try {
            const response = await axios.get<CvData[]>('http://localhost:3001/getCvData');
            setCvData(response.data);
          } catch (error) {
            console.error('Error fetching CV data:', error);
          }
        };
    
        fetchData();
      }, []);

    
      return (
        <div>
          <h2>Upload Image</h2>
          <form onSubmit={handleSubmit}>
            <input type="text" name="JobseekerID" placeholder="Jobseeker ID" value={formData.JobseekerID} onChange={handleChange} />
            <input type="text" name="Title" placeholder="Title" value={formData.Title} onChange={handleChange} />
            <input type="text" name="OccupationID" placeholder="Occupation ID" value={formData.OccupationID} onChange={handleChange} />
            <input type="file" onChange={handleFileChange} />
            <button type="submit">Upload</button>
          </form>

          <div>
      <h2>CV Data</h2>
      {cvData.map((cv) => (
        <div key={cv.cvId} className="cv-item">
          <img src={cv.imgURL} alt="CV" />
          <div>
            <p>Jobseeker ID: {cv.JobseekerID}</p>
            <p>Title: {cv.Title}</p>
            <p>Occupation ID: {cv.OccupationID}</p>
            {/* Add additional fields as needed */}
          </div>
        </div>
      ))}
    </div>
        </div>
      );
}

export default TestPage;
