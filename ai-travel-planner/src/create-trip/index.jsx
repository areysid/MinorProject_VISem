import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { SelectBudgetOptions, SelectTravelersList } from '@/constants/options';
// import { log } from 'console';
import React, { useEffect, useState } from 'react'
import ReactGoogleAutocomplete from 'react-google-autocomplete'

function CreateTrip() {
  const [place, setPlace] = useState();

  const [formData,setFormData]=useState([]);

  const handleInputChange=(name,value)=>{

    // if(name='noOfDays' && value>5){
    //   console.log("Please enter a value which is equal to or less than 5.");
    //   return;
      
    // }

    setFormData({
      ...formData,
      [name]:value
    })
  }

  useEffect(()=>{
    console.log(formData); 
  },[formData])


  const OnGenerateTrip=()=>{
    if(formData?.noOfdays>5){
      alert("Please enter a value which is less than or equal to 5.");
      return;
    }

    console.log(formData);
  }

  return (
    <div className='max-w-4xl mx-auto sm:px-16 px-5 mt-10 w-full mb-20'>
      <h2 className='font-bold text-3xl'>Tell us your travel preferences! 🏕️🏝️</h2>
      <p className='mt-3 text-gray-500 text-xl mb-5'>Just provide some basic information and our trip planner will generate customized
        itinerary based on your preferences.
      </p>
      <div className='flex flex-col gap-5'>
        <div>
          <h2 className='text-xl my-3 font-medium'>What is the destination of choice?</h2>
          <ReactGoogleAutocomplete
            className="w-full p-3 border rounded-lg shadow-sm"
            apiKey={import.meta.env.VITE_GOOGLE_PLACE_API_KEY}
            onPlaceSelected={(place) => {
              // console.log("Selected place:", place); // ✅ This will now log correctly
              setPlace(place);
              handleInputChange('place',place); // ✅ Stores the selected place in state
            }}
          />
        </div>
        <div>
          <h2 className='text-xl my-3 font-medium mt-15'>How many days are you planning your trip?</h2>
          <Input placeholder={'Ex.3'} type="number" 
            onChange={(e)=>handleInputChange('noOfdays',e.target.value)}
          />
        </div>
      </div>
      <div>
        <h2 className='text-xl my-3 font-medium mt-15'>What is your budget?</h2>
        <div className='grid grid-cols-3 gap-5 mt-5'>
          {SelectBudgetOptions.map((item, index) => (
            <div key={index} 
            onClick={()=>handleInputChange('budget',item.title)}
            className= {`p-4 border cursor-pointer rounded-lg hover:shadow text-sm
            ${formData?.budget==item.title && 'shadow-lg border-black'}
            `} >
              <h2 className='text-3xl mb-1'>{item.icon}</h2>
              <h2 className='font-bold mb-1'>{item.title}</h2>
              <h2 className='text-sm text-gray-500'>{item.desc}</h2>
            </div>
          ))}
        </div>
      </div>

      <div>
        <h2 className='text-xl my-3 font-medium mt-15'>Who do you plan on travelling with on your next adventure?</h2>
        <div className='grid grid-cols-4 gap-5 mt-5'>
          {SelectTravelersList.map((item, index) => (
            <div key={index} 
            onClick={()=>handleInputChange('Travelers',item.people)}
            className={`p-4 border cursor-pointer rounded-lg hover:shadow text-sm
            ${formData?.Travelers==item.people && 'shadow-lg border-black'}
            `}>
              <h2 className='text-3xl mb-1'>{item.icon}</h2>
              <h2 className='font-bold mb-1'>{item.title}</h2>
              <h2 className='text-sm text-gray-500'>{item.desc}</h2>
            </div>
          ))}
        </div>
      </div>
          <div className='my-10 justify-end flex'>
          <Button onClick={OnGenerateTrip}>Generate Trip</Button>
          </div>
    </div>
  )
}

export default CreateTrip