import React, { useState } from 'react';
import './App.css'; 


function Feedbackk(){

    const [formData, setFormData] = useState({
        name: '',
        phoneNo: '',
        area: '',
        sections: [],
        subject: '',
    });

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        if (type === 'checkbox') {
            const updatedSections = checked
                ? [...formData.sections, value]
                : formData.sections.filter((section) => section !== value);
            setFormData({ ...formData, sections: updatedSections });
        } else {
            setFormData({ ...formData, [name]: value });
        }
    };

    const handleSubmit = () => {
        // Handle form submission here
        console.log(formData);
    };

    return(

        <div>
        <div className="mainform1">
            <div className="header1">
                <h1><b>Feedback Us</b></h1>
                <p>
                Your Feedback are important to us
                    </p>
                <hr />
            </div>
            
        </div>

        <div className="mainform">
            <form>
              
                <div className="form-group">
                    <label htmlFor="name"><b>Name:</b></label>
                    <input type="text" className="form-control" id="name" placeholder="Enter name" name="fname" value={formData.fname} onChange={handleChange} />
                </div>

                <div className="form-group">
                    <label htmlFor="phoneNo"><b>Phone Number:</b></label>
                    <input type="text" id="phone" className="form-control" placeholder="Enter Number" name="phoneNo" value={formData.phoneNo} onChange={handleChange} />
                </div>

                <label htmlFor="area"><b>Select Your Area:</b></label>
                <select id="area" name="area" value={formData.area} onChange={handleChange}>
                    <option value="----">----</option>
                    <option value="Anuradhapura">Anuradhapura</option>
                    <option value="Polonnaruwa">Polonnaruwa</option>
                    <option value="Matara">Matara</option>
                    <option value="Colombo">Colombo</option>
                    <option value="Kandy">Kandy</option>
                    <option value="Matale">Matale</option>
                </select>

                <div id="formsection">
                    <label><b>What is the item category of Feedback us you are facing?</b></label>
                    <p><input type="checkbox" name="section" value="Electic" checked={formData.sections.includes('Electric')} onChange={handleChange} /> Electric</p>
                    <p><input type="checkbox" name="section" value="Toys" checked={formData.sections.includes('Toys')} onChange={handleChange} /> Toys</p>
                    <p><input type="checkbox" name="section" value="Vehicle Parts" checked={formData.sections.includes('Vehicle Parts')} onChange={handleChange} /> Vehicle Parts</p>
                </div>

                <label htmlFor="subject"><b>Comment</b></label>
                <textarea id="subject" name="subject" placeholder="Enter your comment......." style={{ height: '200px' }} value={formData.subject} onChange={handleChange}></textarea>

                <button type="button" className="btn btn-outline-primary" onClick={handleSubmit}>Submit</button>
            </form>
            </div>
        </div>
       

    )
}

export default Feedbackk;