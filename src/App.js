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

  /*This works but has a serious flaw. By default, the function passed to useEffect() is called whenever the component is added or updated. React apps can update the page very frequently, sometimes on every keystroke. We don't want to do a fetch everytime the component is updated. That could get our app kicked off a network service for violating service limits!

  You can tell useEffect() to run the function only on updates where specific state variables have changed. You pass an array of those variables as the second argument. If no argument is given, React runs the function on all updates. If an empty list is given, then React runs the function only when the component is first added. That's what we want here: */

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

const CourseList = ({ courses }) => {
  const [term, setTerm] = useState('Fall');
  const termCourses = Object.values(courses).filter(course => term === getCourseTerm(course));
  return (
    <>
    <TermSelector term={term} setTerm={setTerm} />
    <div className='course-list'>
    { termCourses.map(course => <Course key ={course.title} course={ course } />) } {/* there's an error with the keys, json doesn't contain id's. */}
    </div>
    </>
  )
  };

const terms = { F: 'Fall', W: 'Winter', S: 'Spring'};

/* const TermSelector = ({term, setTerm}) => (
  <div className="btn-group">
  { 
    Object.values(terms).map(value => (
      <TermButton key={value} term={value} setTerm={setTerm} checked={value === term} />
    ))
  }
  </div>
);

const TermButton = ({term, setTerm, checked}) => (
  <>
    <input type="radio" id={term} className="btn-check" autoComplete="off" checked={checked} onChange={()=> setTerm=(term)} />
    <label className="btn btn-success m-1 p-2" htmlFor={term}>
    { term }
    </label>
  </>
); */

const TermButton = ({term, setTerm, checked}) => (
  <>
    <input type="radio" id={term} className="btn-check" checked={checked} autoComplete="off"
      onChange={() => setTerm(term)} />
    <label class="btn btn-success m-1 p-2" htmlFor={term}>
    { term }
    </label>
  </>
);

const TermSelector = ({term, setTerm}) => (
  <div className="btn-group">
  { 
    Object.values(terms).map(value => (
      <TermButton key={value} term={value} setTerm={setTerm} checked={value === term} />
    ))
  }
  </div>
);

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