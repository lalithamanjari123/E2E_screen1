import React, { useState, useEffect } from 'react';
import './App.css'; // You can create this CSS file to style your components
//import { Container } from "react-bootstrap";
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import CalendarIcon from '@mui/icons-material/Event';
import image1 from './asserts/image1.jpg';

const App = () => {
  const [isMobile, setIsMobile] = useState(false);
  const [selectedExamination, setSelectedExamination] = useState('');
  const [selectesDate, setSelectedDate] = useState('');
  const [isWindowOpen, setWindowOpen] = useState(false);
  const [isWindowOpen1, setWindowOpen1] = useState(false);
  const [activeTab, setActiveTab] = useState('A Block');
  const [selectedRooms, setSelectedRooms] = useState(new Set());
  const [windowSize, setWindowSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });

  useEffect(() => {
    const handleResize = () => {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    // Attach the event listener
    window.addEventListener('resize', handleResize);

    // Remove the event listener on component unmount
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const imageStyle = {
    width: windowSize.width,
    height: windowSize.height,
    opacity: 0.5,
    
    
  };

  const [formFields, setFormFields] = useState([
    { id: 1, selectedOption: '', inputValue: '' },
  ]);

  const handleOptionChange = (id, value) => {
    setFormFields((prevFields) =>
      prevFields.map((field) =>
        field.id === id ? { ...field, selectedOption: value } : field
      )
    );
  };

  const handleInputChange = (id, value) => {
    setFormFields((prevFields) =>
      prevFields.map((field) =>
        field.id === id ? { ...field, inputValue: value } : field
      )
    );
  };

  const handleAddMore = () => {
    const newId = formFields.length + 1;
    setFormFields((prevFields) => [
      ...prevFields,
      { id: newId, selectedOption: '', inputValue: '' },
    ]);
  };

  const handleTabClick = (tab) => {
    setActiveTab(tab);
    setSelectedRooms(new Set()); // Reset selected rooms when changing floors
  };

  const handleRoomClick = (room) => {
    const updatedSelectedRooms = new Set(selectedRooms);
    if (updatedSelectedRooms.has(room)) {
      updatedSelectedRooms.delete(room);
    } else {
      updatedSelectedRooms.add(room);
    }
    setSelectedRooms(updatedSelectedRooms);
  };


  const openWindow = () => {
    setWindowOpen(true);
  };

  const closeWindow = () => {
    setWindowOpen(false);
  };
  const openWindow1 = () => {
    setWindowOpen1(true);
  };

  const closeWindow1 = () => {
    setWindowOpen1(false);
  };

  const handleExaminationChange = (event) => {
    setSelectedExamination(event.target.value);
  };

  useEffect(() => {
    // Add event listener to check window width for responsiveness
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768); // Adjust the breakpoint as needed
    };

    // Initial check on component mount
    handleResize();

    // Attach the event listener
    window.addEventListener('resize', handleResize);

    // Clean up the event listener on component unmount
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);



  return (
    <div>
      <div className={`top-bar ${isMobile ? 'mobile' : ''}`}>
        <div className="bar-content">
          <div className="exam-dropdown">
            <select
              id="examination"
              name="examination"
              value={selectedExamination}
              onChange={handleExaminationChange}
            >
              <option value="" disabled>
                Select an Examination
              </option>
              <option value="mid-1">Mid-1</option>
              <option value="mid-2">Mid-2</option>
              <option value="semester">Semester</option>
            </select>
          </div>
          <div>
            <div className="exam-date-picker">
              <DatePicker selected={selectesDate}
                onChange={date => setSelectedDate(date)}
                dateFormat="dd-MM-yyyy"
                placeholderText='Select Exam Date'
                showYearDropdown id="exam-date-picker" className='date-input'
              />
              <CalendarIcon
                className="calendar-icon"
                onClick={() => document.getElementById('exam-date-picker').click()}
              />
            </div>
          </div>
          <button onClick={openWindow} className="chooseRooms">Choose Rooms</button>

          {isWindowOpen && (
            <div className="overlay">
              <div className="window">
                {/* Your window content goes here */}
                <div>
                  <div className="top-bar1">
                    <div className="tabs">
                      {['A Block', 'B Block', 'C Block', 'D Block', 'N Block'].map((tab) => (
                        <div
                          key={tab}
                          className={`tab ${activeTab === tab && 'active'}`}
                          onClick={() => handleTabClick(tab)}
                        >
                          <div className="tab-bar">{tab}</div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="tab-content">
                    {(activeTab === 'A Block' || activeTab === 'B Block' || activeTab === 'C Block' || activeTab === 'D Block' || activeTab === 'N Block') && (
                      <div>
                        <table className="room-table">
                          <thead>
                            <tr>
                              {[1, 2, 3, 4].map((floor) => (
                                <th key={floor}>{`${floor}st Floor`}</th>
                              ))}
                            </tr>
                          </thead>
                          <tbody>
                            {Array.from({ length: 5 }, (_, index) => (
                              <tr key={index + 1}>
                                {[1, 2, 3, 4].map((floor) => {
                                  const roomNumber = floor * 100 + index + 1;
                                  return (
                                    <td key={roomNumber}>
                                      <button
                                        className={`room-button ${selectedRooms.has(roomNumber) && 'selected'}`}
                                        onClick={() => handleRoomClick(roomNumber)}
                                      >
                                        {roomNumber}
                                        {selectedRooms.has(roomNumber) && <span className="tick-mark">✔</span>}
                                      </button>
                                    </td>
                                  );
                                })}
                              </tr>
                            ))}
                          </tbody>
                        </table>
                        <div className="button-row">
                          <button className="action-button save" onClick={closeWindow}>
                            Save
                          </button>
                          <button className="action-button cancel" onClick={closeWindow}>
                            Cancel
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          )}
          <button onClick={openWindow1} className="selectInvi">Select Invisilators</button>

          {isWindowOpen1 && (
            <div className="overlay">
              <div className="window">
              
                {/* Your window content goes here */}
                <div className='selectingInvi'>
       <div className="top-bar2">
        <div className="thin-blue-bar"></div>
      </div>
      {formFields.map((field) => (
        <div key={field.id} className="form-row">
          <select
            id={`dropdown-${field.id}`}
            value={field.selectedOption}
            onChange={(e) => handleOptionChange(field.id, e.target.value)}
          >
            <option value="" disabled hidden>
              Select Branch
            </option>
            <option value="cse">CSE</option>
            <option value="it">IT</option>
            <option value="ece">ECE</option>
            <option value="eee">EEE</option>
            <option value="mech">Mechanical</option>
            <option value="civil">Civil</option>
          </select>

          <input
            type="number"
            id={`numberInput-${field.id}`}
            value={field.inputValue}
            className='NoOfInvi'
            onChange={(e) => handleInputChange(field.id, e.target.value)}
            placeholder="No.Of Invigilators"
          />
        </div>
      ))}

<div className="bottom-bar">
        <button className="action-button save" onClick={closeWindow1}>
          Save
        </button>
        <button className="action-button add-more" onClick={handleAddMore}>
          Add More
        </button>
        <button className="action-button cancel" onClick={closeWindow1}>
          Cancel
        </button>
      </div>
    </div>
              </div>
            </div>
          )}

        </div>
      </div>
      <div className='inviImage'>
        <img src={image1} alt="invigilation" style={imageStyle}/>
      </div>
    </div>
  );
};
export default App;