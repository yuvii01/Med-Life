import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { dbToCart } from '../../Reducers/cartSlice';
import { Context } from '../../Context/MainContext';
import axios from 'axios';
import { jsPDF } from 'jspdf';
import "jspdf-autotable";
import { FaLanguage } from "react-icons/fa";
import { IoAddCircleOutline } from "react-icons/io5";
import { CiPhone } from "react-icons/ci";




const Home = () => {
  const { fetchProduct, fetchCategory, fetchMedi, medicine , onSent, recentPrompt, showResult, loading, resultData, setInput, input } = useContext(Context);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [gimini , setGim] = useState(null) ;
  const navigate = useNavigate();
  const dispatcher = useDispatch();
  const notificationSound = new Audio('/audio.mp3');
  const [currentReminder, setCurrentReminder] = useState(null);
  
  const [currentReminders, setCurrentReminders] = useState([]);
  const [filteredMedicine, setFilteredMedicine] = useState([]);

  const user = useSelector(store => store.user);
  console.log(user);
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };


  const [language, setLanguage] = useState('en');


  useEffect(() => {
    fetchCategory();
    fetchProduct();
    fetchMedi();
    dispatcher(dbToCart());

    if (Notification.permission !== 'granted') {
      Notification.requestPermission();
    }
  }, []);

  const filterMedicinesByDate = () => {
    console.log("user is", user);
    console.log(medicine);
    const medicines = medicine.filter((med) => formatDate(med.date) === formatDate(selectedDate) && med?.user_id == user?.data?._id);
    setFilteredMedicine(medicines);
  };

  useEffect(() => {
    filterMedicinesByDate();
  }, [selectedDate, medicine]);

  const closePopup = (medicine) => {
    console.log("Closing popup for medicine:", medicine);
    setCurrentReminder(null);
    notificationSound.pause();
    notificationSound.currentTime = 0;

    if (medicine) {
      handleTaken(medicine);
    }
  }

  const checkMedicineTimers = () => {
    const currentTime = new Date();
    console.log("Checking medicine timers at:", currentTime ) ;
    const dueReminders = filteredMedicine.filter((med) => {
      const medTime = new Date(`${formatDate(med.date)}T${med.timing.replace('.', ':')}:00`);
      // console.log(`Medicine: ${med.name}, Time: ${medTime}, Current Time: ${currentTime}`);
      return medTime <= currentTime && medTime > new Date(currentTime.getTime() - 10000);
    });
  
    if (dueReminders.length) {
      // console.log("Due reminders found");
      // console.log("Due reminders found:", dueReminders);
      setCurrentReminders(dueReminders);
      setCurrentReminder(dueReminders[0]);
      // /send-reminder
      const body = `${dueReminders[0].name} qty: ${dueReminders[0].qty} unit is due to be taken at ${dueReminders[0].timing}` ;
      const formData = new FormData();
        formData.append('body', body  ) ;
        formData.append('no', user.data.contactNumber  ) ;
        formData.append('gno', user.data.guardian_contactNo ) ;

       
        const data = {
            body: body,
            no: user.data.contactNumber,
            gno: user.data.guardian_contactNo,
          }
        console.log(data)
      
      axios
      .post(`http://localhost:5000/api/send-reminder`,  data )
      .then((success) => {
        if (success.data.status === 1) {
          // fetchMedi();
          navigate('/');
        }
      })
      .catch((error) => {
        console.log(error);
      });
      
      // Set the first due reminder to display the popup
      notificationSound.play().catch((error) => {
        console.error('Audio playback failed:', error);
      })
      ;
    } else {
      console.log("No due reminders found.");
    }
  };
  


  
  const toggleLanguage = () => {
    setLanguage((prevLanguage) => (prevLanguage === 'en' ? 'hi' : 'en'));
  };


  const text = {
    en: {
      reminderTitle: "⏰ Reminder",
      reminderMessage: "It's time to take your medicine:",
      quantity: "Quantity:",
      takenButton: "I have taken this Medicine",
      downloadPDF: "Today's Medical Report",
      scanPDF: "Scan Prespriction",
      toTake: "To Take",
    },
    hi: {
      reminderTitle: "⏰ अनुस्मारक",
      reminderMessage: "यह आपकी दवा लेने का समय है:",
      quantity: "मात्रा:",
      takenButton: "मैंने यह दवा ले ली है",
      downloadPDF: "पीडीएफ डाउनलोड करें",
      scanPDF: "पीडीएफ स्कैन करें",
      toTake: "लेने के लिए",
    },
  };



  useEffect(() => {
    const interval = setInterval(checkMedicineTimers, 3000); // Check every 10 seconds for more accuracy
    console.log("Timer started.");
    return () => {
      clearInterval(interval);
      console.log("Timer cleared.");
    };
  }, [filteredMedicine]);

  const handleTaken = (med) => {
    const id = med._id;
    axios
      .post(`http://localhost:5000/api/medi_status/${id}`, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })
      .then((success) => {
        if (success.data.status === 1) {
          fetchMedi();
          navigate('/');
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const getNearbyDates = (createdAt) => {
    const currentDate = new Date(createdAt);
    return Array.from({ length: 5 }, (_, index) => {
      const date = new Date(currentDate);
      date.setDate(currentDate.getDate() + index - 2); // Adjust range (-2 to +2)
      return date;
    });
  };

  const dates = getNearbyDates(new Date());

  const generatePDF = () => {
    console.log("Filtered Medicines:", filteredMedicine);
    if (filteredMedicine.length === 0) {
      alert("No medicines scheduled for the selected date.");
      return;
    }

    const doc = new jsPDF();
    const title = `Medicines Status for ${selectedDate.toLocaleDateString()}`;
    const tableHeaders = ["Name", "Timing", "Quantity", "Notes", "Status"];
    const tableData = filteredMedicine.map((med) => [
      med.name || "N/A",
      med.timing || "N/A",
      med.qty || "N/A",
      med.description || "N/A",
      med.isTrue ? "Taken" : "Not Taken", // Status of the medicine
    ]);

    // Add title
    doc.setFontSize(16);
    doc.text(title, 10, 10);

    // Add table
    doc.autoTable({
      head: [tableHeaders],
      body: tableData,
      startY: 20, // Position below the title
    });

    // Save the PDF
    const formattedDate = formatDate(selectedDate);
    doc.save(`medicines_${formattedDate}.pdf`);
  };

  // Voice Assistant Setup
  // useEffect(() => {
  //   const recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
  //   recognition.lang = 'en-US';
  //   recognition.interimResults = false;
  //   recognition.maxAlternatives = 1;

  //   recognition.onstart = () => {
  //     console.log('Speech recognition started');
  //   };

  //   recognition.onresult = (event) => {
  //     const speechResult = event.results[0][0].transcript.toLowerCase();
  //     console.log('Voice command received:', speechResult);

  //     if (speechResult.includes('schedule medicine')) {
  //       // Handle scheduling medicine
  //       alert('Scheduling medicine...');
  //     } else if (speechResult.includes('show reminders')) {
  //       // Handle showing reminders
  //       alert('Showing reminders...');
  //     } else if (speechResult.includes('download pdf')) {
  //       // Handle downloading PDF
  //       console.log("Generating PDF...");
  //       generatePDF();
  //     } else {
  //       alert('Command not recognized.');
  //     }
  //   };

  //   recognition.onspeechend = () => {
  //     console.log('Speech recognition ended');
  //     if (recognition) {
  //       recognition.stop();
  //       recognition.start(); // Restart recognition to keep listening
  //     }
  //   };

  //   recognition.onerror = (event) => {
  //     console.error('Speech recognition error:', event.error);
  //     if (recognition) {
  //       recognition.stop();
  //       recognition.start(); // Restart recognition on error
  //     }
  //   };

  //   // Greet the user and prompt for a command
  //   const synth = window.speechSynthesis;
  //   const utterance = new SpeechSynthesisUtterance(`Hello ${user?.data?.name || 'User'}, what can I help you with today?`);
  //   synth.speak(utterance);

  //   // Restart recognition after the greeting
  //   utterance.onend = () => {
  //     console.log('Greeting ended, starting recognition');
  //     if (recognition) {
  //       recognition.start();
  //     }
  //   };

  //   return () => {
  //     if (recognition) {
  //       recognition.stop();
  //     }
  //   };

  // }, [user]);


  const [val , setVal] = useState(null) ;
  const formhandler = (e) => {
    e.preventDefault() ;
    console.log(e.target.prompt.value) ;
    const data = {
      prompt: e.target.prompt.value,
    } ;
    e.target.prompt.value = null ;
    console.log("data is " ,data.prompt) ;
    axios
    .post(`http://localhost:5000/api/chat_bot/${data.prompt}` , {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })
    .then((success) => {
      console.log("success aara h bhai")
      console.log("data is" , success.data)
      console.log(success.status)
      setVal(success.data.data)
    })
    .catch((error) => {
      console.log("error aara h bhai")
      console.log(error);
    });

  }

  const [open , setOpen] =useState(false)
  return (
    <div className="relative p-4 md:p-8">

      <div className='fixed z-[100] text-xl left-[160px] bottom-[30px]'>
      <button
      className=" w-[100px] h-[100px] bg-red-500 text-white rounded-full flex items-center justify-center shadow-lg hover:bg-red-600 transition"
    >
      <CiPhone className='text-5xl'/>
    </button>
      </div>

      <div className='fixed z-[100] text-xl left-[50] bottom-[80px] '>
      <button onClick={() => console.log('Search clicked')} className="p-2 bg-gray-100 rounded-full" > 
        <FaLanguage onClick={toggleLanguage} className='text-4xl font-semibold' />
      </button>
      </div>
      <div onClick={() => navigate('/doctors')} className='rounded-xl mt-3 mb-5 overflow-hidden shadow-lg'>
        <img src="/1.png" alt="" />
      </div>
      {/* <button  className="bg-blue-500 text-white px-4 py-2 rounded mb-4">
        {language === 'en' ? 'Switch to Hindi' : 'Switch to English'}
      </button> */}

      <div className='flex justify-between mb-5'>
      <button onClick={generatePDF} className="bg-[#2DAA9E] text-white px-2  py-2 rounded">
        {text[language].downloadPDF}
      </button>

      <button onClick={() => navigate('/scan')} className="bg-[#2DAA9E] text-white px-4 py-2 rounded">
        {text[language].scanPDF}
      </button>
      </div>

      {/* Date Selector */}
      <div className="flex space-x-4 mb-6 overflow-x-auto scrollbar-hide">
        {dates?.map((date, index) => (
          <button
            key={index}
            className={`flex flex-col items-center w-16 py-2 rounded-lg ${
              formatDate(date) === formatDate(selectedDate) ? 'bg-[#336D82] text-white' : 'bg-gray-100 text-gray-600'
            }`}
            onClick={() => setSelectedDate(date)}
          >
            <p className="text-sm">{date.toLocaleDateString('en-US', { weekday: 'short' })}</p>
            <p className="font-semibold">{date.getDate()}</p>
          </button>
        ))}
      </div>

      {/* Medicine List */}
      <div className="bg-white shadow-md rounded-lg p-6 mb-[100px]">
        <div className="flex justify-between items-center mb-2">
          <h2 className="text-xl font-medium text-gray-800">{text[language].toTake}</h2>
          <IoAddCircleOutline onClick={() => (navigate('/create_medi'))} className='text-3xl font-bold ' />
        </div>
        <div className="space-y-4">
          {filteredMedicine.map((med, index) => (
            <div
            key={index}
            className="bg-gray-50 p-4 rounded-lg shadow-sm space-y-2 relative group"
          >
            {/* First Row: Image, Name, Quantity, and Time */}
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <img
                  src={`http://localhost:5000/image/medi/${med.image}`}
                  alt={med.name}
                  className="w-16 h-16 object-cover rounded-lg"
                />
                <div>
                  <h3 className="text-gray-800 font-semibold">{med.name}</h3>
                  <p className="text-sm text-gray-500">
                    {text[language].quantity}: {med.qty}
                  </p>
                </div>
              </div>
              <p className="text-sm text-gray-600 text-right">
                {med.timing} | {formatDate(med.date)}
              </p>
            </div>
          
            {/* Second Row: Button */}
            <div className="flex items-center justify-end">
              {med.isTrue ? (
                <button className="bg-[#336D82] hover:bg-[#3E3F5B] text-white text-sm px-3 py-1 rounded-md shadow-sm">
                  I have Taken this medicine
                </button>
              ) : (
                <button
                  onClick={() => handleTaken(med)}
                  className="bg-[#9ACBD0] hover:bg-[#006A71] text-white text-sm px-3 py-1 rounded-md shadow-sm"
                >
                  Take this medicine
                </button>
              )}
            </div>
          
            {/* Hover Dialog for Description */}
            <div className="absolute bottom-[50px] left-[-10px] transform translate-y-full bg-white p-2 rounded-lg shadow-lg hidden group-hover:flex z-10">
              <div className="text-sm text-gray-600">
                <h4 className="font-semibold text-gray-800 mb-1">Description</h4>
                <p>{med.description}</p>
              </div>
            </div>
          </div>
          ))}
        </div>
      </div>

      {/* Floating Action Button */}
      
      <div
      onClick={() => {
        setOpen(true);
      }}
      className={`fixed bottom-[70px] right-5 bg-white p-4 shadow-lg ${
        open ? 'w-80 h-96' : 'w-[75px] h-[75px] text-center text-[#2D336B] rounded-full overflow-hidden'
      } flex flex-col`}
    >
      <label htmlFor="prompt" className="block text-lg font-semibold mb-2">
        {open ? ' Med-Life Chatbot' : 'Medi Bot'}
        <span
          onClick={(e) => {
            e.stopPropagation(); // Prevent the parent div's onClick from firing
            setOpen(false);
            setVal(null);
          }}
          className={`ps-24 cursor-pointer ${open ? '' : 'hidden'}`}
        >
          ❌
        </span>
      </label>
      {open && (
        <>
          <div className="flex-1 overflow-y-auto space-y-2 mb-4">
            {val ? <p className="text-gray-700">{val}</p> : ''}
          </div>
          <form onSubmit={formhandler} className="flex space-x-2">
            <input
              type="text"
              name="prompt"
              id="prompt"
              placeholder="Enter prompt here..."
              className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button
              type="submit"
              className="bg-blue-500 text-white px-3 py-2 rounded-md hover:bg-blue-600"
            >
              Submit
            </button>
          </form>
        </>
      )}
    </div>

      {/* Medicine Reminder Popup Modal */}
      {currentReminder && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-75 z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-80">
            <h2 className="text-xl font-bold text-center mb-4">{text[language].reminderTitle}</h2>
            <p className="text-center mb-4">
              {text[language].reminderMessage} <b>{currentReminder.name}</b>
            </p>
            <p className="text-center mb-4">{text[language].quantity} {currentReminder.qty}</p>
            <div className="flex justify-center mb-4">
              <img src={`http://localhost:5000/image/medi/${currentReminder.image}`} alt={currentReminder.name} className="w-32 h-32 object-cover rounded-lg" />
            </div>
            <button onClick={() => closePopup(currentReminder)} className="bg-red-500 text-white px-4 py-2 rounded w-full">
              {text[language].takenButton}
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Home;