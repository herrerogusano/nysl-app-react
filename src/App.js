import React, { useState, useEffect } from 'react';
import './App.css';

/*const schedule = {
  "title": "CS Courses for 2018-2019",
  "courses": {
    "F101" : {
      "id" : "F101",
      "meets" : "MWF 11:00-11:50",
      "title" : "Computer Science: Concepts, Philosophy, and Connections"
    },
    "F110" : {
      "id" : "F110",
      "meets" : "MWF 10:00-10:50",
      "title" : "Intro Programming for non-majors"
    },
    "S313" : {
      "id" : "S313",
      "meets" : "TuTh 15:30-16:50",
      "title" : "Tangible Interaction Design and Learning"
    },
    "S314" : {
      "id" : "S314",
      "meets" : "TuTh 9:30-10:50",
      "title" : "Tech & Human Interaction"
    }
  }
};*/

const App = () =>  {
  const [schedule, setSchedule] = useState();
  const url = 'https://courses.cs.northwestern.edu/394/guides/data/cs-courses.php';

  useEffect(() => {
    const fetchSchedule = async () => {
      const response = await fetch(url);
      if (!response.ok) throw response;
      const json = await response.json();
      setSchedule(json);
    }
    fetchSchedule();
  }, [])

  if (!schedule) return <h1>Loading schedule...</h1>;

  return (
  <div className='container'>
    <Banner title={ schedule.title } />
    <CourseList courses={ schedule.courses } />
  </div>
)

};

const Banner = ({ title }) => (
  <h1>{ title }</h1>
);

const CourseList = ({ courses,key }) => (

  
  <div className='course-list'>
  { Object.values(courses).map(course => <Course key ={course.title} course={ course } />) } {/* there's an error with the keys, json doesn't contain id's. */}
  </div>
);

const terms = { F: 'Fall', W: 'Winter', S: 'Spring'};

const getCourseTerm = course => (
  course.term
);

const getCourseNumber = course => (
  course.number
);

const Course = ({ course }) => (
  <div className='card m-1 p-2'>
    <div className='card-body'>
      <div className='card-title'>
        { getCourseTerm(course) } CS { getCourseNumber(course) }:
      </div>
      <div className='card-text'>
        { course.title } 
      </div>
    </div>
  </div>
);

export default App;