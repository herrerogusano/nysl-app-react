import React, {useState} from 'react';
import { Course } from './Course';
import { TermSelector } from '../Terms/TermSelector';
import { getCourseTerm } from '../../utilities/Utilities';

const scheduleChanged = (selected, courses) => (
  selected.some(course => course !== courses[course.id])
);

export const CourseList = ({ courses }) => {
  const [term, setTerm] = useState('Fall');
  const [selected, setSelected] = useState([]);

  if (scheduleChanged(selected, courses)) {
    setSelected([])
  };
  
  const termCourses = Object.values(courses).filter(course => term === getCourseTerm(course));
  
  return (
    <>
      <TermSelector term={term} setTerm={setTerm} />
      <div className="course-list">
      { 
        termCourses.map(course =>
          <Course key={ course.id } course={ course }
            selected={selected} setSelected={ setSelected } 
          />) 
      }
      </div>
    </>
  );
};

