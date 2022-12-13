import React from 'react';
import { CourseList } from './components/Courses/CourseList';
import { Banner } from './components/Others/Banner'
import { addScheduleTimes } from './utilities/ScheduleTimes';
import { useData } from './utilities/firebase.js';
import './App.css';



const App = () => {
  const [schedule, loading, error] = useData('/', addScheduleTimes); 
  
  if (error) return <h1>{error}</h1>;
  if (loading) return <h1>Loading the schedule...</h1>

  return (
    <div className="container">
      <Banner title={ schedule.title } />
      <CourseList courses={ schedule.courses } />
    </div>
  );
};


export default App;